import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";

export const createSignClient = async (signer: OfflineSigner, config: any) => {
  const { rpcUrl, feeToken, gasPrice } = config;
  return await SigningCosmWasmClient.connectWithSigner(rpcUrl, signer, {
    prefix: feeToken,
    gasPrice: GasPrice.fromString(gasPrice + feeToken),
  });
};
