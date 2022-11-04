export const malagaConfig = {
  chainId: "malaga-420",
  chainName: "Wasm (malaga-420)",
  addressPrefix: "wasm",
  rpcUrl: "https://rpc.malaga-420.cosmwasm.com:443",
  httpUrl: "https://api.malaga-420.cosmwasm.com",
  feeToken: "umlg",
  stakingToken: "uand",
  coinMap: {
    umlg: { denom: "MLG", fractionalDigits: 6 },
    uand: { denom: "AND", fractionalDigits: 6 },
  },
  gasPrice: 0.04,
};

export const junoConfig = {
  chainId: "uni-5",
  chainName: "Juno Testnet (junotestnet)",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.uni.junonetwork.io",
  httpUrl: "https://api.uni.junonetwork.io",
  feeToken: "ujunox",
  stakingToken: "ujunox",
  coinMap: {
    ujunox: { denom: "JUNOX", fractionalDigits: 6 },
  },
  gasPrice: 0.04,
};
