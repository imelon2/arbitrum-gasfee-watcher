import { ArbSys__factory } from "@arbitrum/sdk/dist/lib/abi/factories/ArbSys__factory";
import { ArbSys as IArbSys } from "@arbitrum/sdk/dist/lib/abi/ArbSys";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";
import { ARB_SYS_ADDRESS } from "@arbitrum/sdk/dist/lib/dataEntities/constants";
import { BigNumberish } from "ethers";

export class ArbSys {
    public ArbSys: IArbSys;
    constructor(provider: SignerOrProvider) {
      const arbosActs = ArbSys__factory.connect(ARB_SYS_ADDRESS, provider);
      this.ArbSys = arbosActs;
    }

    async arbBlockNumber() {
        return await this.ArbSys.arbBlockNumber()
    }

    async arbBlockHash(arbBlockNum:BigNumberish) {
        return await this.ArbSys.arbBlockHash(arbBlockNum)
    }

    async arbChainID() {
        return await this.ArbSys.arbChainID()
    }

    async arbOSVersion() {
        return await this.ArbSys.arbOSVersion()
    }

    async getStorageGasAvailable() {
        return await this.ArbSys.getStorageGasAvailable()
    }
}