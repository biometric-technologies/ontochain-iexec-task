const ethers = require("ethers");
const fs = require("fs").promises;

const iexecOut = process.env.IEXEC_OUT;
const callbackFilePath = `${iexecOut}/callback.txt`;
const errorFilePath = `${iexecOut}/error.txt`;

const argsList = process.argv.slice(2);
const [rpc, getInfoLink] = argsList;

(async () => {
  try {
    const result = await fetch(getInfoLink, {
      method: "GET",
    });

    const calldata = await result.text();

    const provider = new ethers.JsonRpcProvider(rpc);

    const broadcasted = await provider.broadcastTransaction(calldata);
    const tx = await broadcasted.wait();

    await fs.appendFile(
      callbackFilePath,
      `${new Date().toISOString()}:${JSON.stringify(tx)}\n`
    );

    const computedJsonObj = {
      "deterministic-output-path": `${callbackFilePath}`,
    };

    await fs.appendFile(
      `${iexecOut}/computed.json`,
      JSON.stringify(computedJsonObj)
    );
  } catch (e) {
    console.error(e);
    await fs.appendFile(
      errorFilePath,
      `${new Date().toISOString()}:${e.toString()}\n`,
      (error) => {
        console.error(error);
      }
    );
    const computedJsonObj = {
      "deterministic-output-path": `${errorFilePath}`,
    };

    await fs.appendFile(
      `${iexecOut}/computed.json`,
      JSON.stringify(computedJsonObj)
    );
    process.exit(1);
  }
})();
