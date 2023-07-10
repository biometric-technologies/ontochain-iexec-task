const ABI = [
  { type: "constructor", inputs: [] },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getHashInfo",
    inputs: [{ type: "string", name: "hash", internalType: "string" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "saveHashes",
    inputs: [{ type: "string[]", name: "_hashes", internalType: "string[]" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "event",
    name: "NewHash",
    inputs: [
      { type: "string[]", name: "hash", indexed: false },
      { type: "uint256", name: "date", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ type: "address", name: "owner", internalType: "address" }],
  },
];

module.exports = { contractAbi: ABI };
