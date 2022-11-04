
import {DirectSecp256k1HdWallet } from'@cosmjs/proto-signing'
import {SigningCosmWasmClient } from"@cosmjs/cosmwasm-stargate"
import {GasPrice } from "@cosmjs/stargate";
import fs from 'fs'
import path from 'path'
import "dotenv/config"

const chains = {
    "uni-5": {
        rpcUrl: "https://rpc.uni.junonetwork.io",
        feeToken: "ujunox",
        gasPrice: 0.04,
        addressPrefix: "juno"
    },
    "malaga-420": {
        rpcUrl:"https://rpc.malaga-420.cosmwasm.com:443",
        feeToken: "umlg",
        gasPrice: 0.04,
        addressPrefix: "wasm"
    }
}

const upload = async () => {
    const mnemonic = process.env.MNEMONIC
    const config = chains[process.env.CHAIN];
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic,{prefix: config.addressPrefix })
    const client = await SigningCosmWasmClient.connectWithSigner(config.rpcUrl,wallet,{prefix: config.addressPrefix, gasPrice: GasPrice.fromString(config.gasPrice + config.feeToken)})
    const wasmByte = fs.readFileSync(path.join(process.cwd(), './contracts/todo_list.wasm'));
    const accounts = await wallet.getAccounts()
    const result = await client.upload(accounts[0].address, wasmByte, 'auto')
    console.log(result)
}

upload()
