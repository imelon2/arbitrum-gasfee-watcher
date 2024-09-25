import dotenv from "dotenv";
import { Wallet, ethers } from "ethers";
import fs from 'fs';
import { NETWORK_INFO_PATH } from "./path";
import { EventFetcher } from "@arbitrum/sdk";
import { SequencerInbox } from "../system/SequencerInbox";
import { MAX_EVENT_BLOCK } from "./constants";
dotenv.config();


export type IChainName = "L1" | "L2" | "L3"


export const init = (chain:IChainName) => {
    const providers = {
        "L1": new ethers.providers.JsonRpcProvider(process.env.L1_URL),
        "L2":new ethers.providers.JsonRpcProvider(process.env.L2_URL),
        "L3":new ethers.providers.JsonRpcProvider(process.env.L3_URL)
    }
    
    const wsProviders = {
        "L1": new ethers.providers.WebSocketProvider(process.env.L1_WS_URL || ""),
        "L2":new ethers.providers.WebSocketProvider(process.env.L2_WS_URL || ""),
        "L3":new ethers.providers.WebSocketProvider(process.env.L3_WS_URL || "")
    }

    const wallet = process.env.SIGNER_PK_KEY ? new Wallet(process.env.SIGNER_PK_KEY) : Wallet.createRandom()
    const wallets = {
        "L1": wallet.connect(providers["L1"]),
        "L2":  wallet.connect(providers["L2"]),
        "L3":  wallet.connect(providers["L3"])
    }

    return {
        wsProviders:wsProviders[chain],
        provider : providers[chain],
        wallet : wallets[chain]
    }
}

export const getFunctionSelector = (functionSignature:string) => {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(functionSignature));
    return hash.substring(0, 10); // '0x'를 포함한 처음 10자리;
}

export const getBatchTransactionByNumber = async (batchNum : number,parentProvider:ethers.providers.JsonRpcProvider,count:number) => {
    const network = JSON.parse(fs.readFileSync(NETWORK_INFO_PATH, 'utf8'));

    const blockNumber = await parentProvider.getBlockNumber();
    const fetcher = new EventFetcher(parentProvider);
  
    const from = blockNumber < MAX_EVENT_BLOCK ? 0 : blockNumber-MAX_EVENT_BLOCK
    const logs = await fetcher.getEvents(SequencerInbox.factory, (contract) => contract.filters['SequencerBatchDelivered'](batchNum), {
      fromBlock: from,
      toBlock: 'latest',
      address:network.l2Network.ethBridge.sequencerInbox
    });
  
    const {transactionHash} = logs[0]
    return transactionHash;
}