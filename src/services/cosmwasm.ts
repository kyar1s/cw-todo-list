import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

export const createSignClient = async (signer: any) => {
  return await SigningCosmWasmClient.connectWithSigner(
    "https://rpc.malaga-420.cosmwasm.com:443",
    signer,
    { prefix: "wasm", gasPrice: GasPrice.fromString("0.025" + "umlg") }
  );
};
