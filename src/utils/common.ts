import dotenv from "dotenv";
dotenv.config();
import { Wallet, ethers } from "ethers";

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
