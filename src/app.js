const { JsonRpcProvider, Wallet, Contract } = require("ethers");
const contractAbi = require("./contractAbi");

const argsList = process.argv.slice(2);

const [privateKey, rpc, contractAddress, ...hashes] = argsList;

const writeToContract = async () => {
  try {
    //create chain signer
    const provider = new JsonRpcProvider(rpc);
    const wallet = new Wallet(privateKey, provider);

    //create contract instance
    const contract = new Contract(
      contractAddress,
      contractAbi.contractAbi,
      wallet
    );

    //check is pushed info about hash
    const checkedHashes = await Promise.all(
      hashes.map(async (hash) => {
        try {
          const info = await contract.getHashInfo(hash);
          if (info) {
            return null;
          } else {
            return hash;
          }
        } catch (error) {
          return hash;
        }
      })
    );

    //filter only not pushed hashes
    const validHashes = checkedHashes.filter((hash) => !!hash);

    if (validHashes.length) {
      //save info into contract
      const tx = await contract.saveHashes(validHashes);
      await tx.wait();
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

writeToContract();
