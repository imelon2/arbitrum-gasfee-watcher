import { ArbAggregator__factory } from "@arbitrum/sdk/dist/lib/abi/factories/ArbAggregator__factory";
import { ArbAggregator as IArbAggregator } from "@arbitrum/sdk/dist/lib/abi/ArbAggregator";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";
import { ARB_AGGREGATOR } from "../utils/constants";
import { Overrides } from "ethers";
export class ArbAggregator {
    public IArbAggregator: IArbAggregator;
    constructor(provider: SignerOrProvider) {
      const arbAggregator = ArbAggregator__factory.connect(ARB_AGGREGATOR, provider);
      this.IArbAggregator = arbAggregator;
    }

    async getBatchPosters() {
        return await this.IArbAggregator.getBatchPosters()
    }

    async getFeeCollector(batchPoster:string) {
        return await this.IArbAggregator.getFeeCollector(batchPoster)
    }
    
    async setFeeCollector(batchPoster:string,newFeeCollector:string,overrides:Overrides) {
        return await this.IArbAggregator.setFeeCollector(batchPoster,newFeeCollector,{...overrides})
    }
}