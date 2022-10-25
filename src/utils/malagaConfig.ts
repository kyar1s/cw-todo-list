import { configKeplr } from "./configKeplr";

export const malagaConfig = configKeplr({
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
  gasPrice: 0.025,
});
