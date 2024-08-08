import { ArbAggregator__factory } from "@arbitrum/sdk/dist/lib/abi/factories/ArbAggregator__factory";
import { ArbAggregator as IArbAggregator } from "@arbitrum/sdk/dist/lib/abi/ArbAggregator";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";
import { ARB_AGGREGATOR } from "../utils/constants";
import { Overrides } from "ethers";
export class ArbAggregator {
    public ArbAggregator: IArbAggregator;
    constructor(provider: SignerOrProvider) {
      const arbAggregator = ArbAggregator__factory.connect(ARB_AGGREGATOR, provider);
      this.ArbAggregator = arbAggregator;
    }

    async getBatchPosters() {
        return await this.ArbAggregator.getBatchPosters()
    }

    async getFeeCollector(batchPoster:string) {
        return await this.ArbAggregator.getFeeCollector(batchPoster)
    }
    
    async setFeeCollector(batchPoster:string,newFeeCollector:string,overrides:Overrides) {
        return await this.ArbAggregator.setFeeCollector(batchPoster,newFeeCollector,{...overrides})
    }
}