import { ArbOwner__factory } from "@arbitrum/sdk/dist/lib/abi/factories/ArbOwner__factory";
import { ArbOwner as IArbOwner } from "@arbitrum/sdk/dist/lib/abi/ArbOwner";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";
import { BigNumber, Overrides } from "ethers";
import { ARB_OWNER } from "../utils/constants";

export class ArbOwner {
    public ArbOwner: IArbOwner;
    constructor(provider: SignerOrProvider) {
      const arbOwner = ArbOwner__factory.connect(ARB_OWNER, provider);
      this.ArbOwner = arbOwner;
    }

    static factory = ArbOwner__factory

    async setL1PricePerUnit(newPricePerUnit:BigNumber,overrides:Overrides) {
        return await this.ArbOwner.setL1PricePerUnit(newPricePerUnit,{...overrides})
    }

    async scheduleArbOSUpgrade(newVersion:BigNumber,timestamp:BigNumber,overrides:Overrides) {
        return await this.ArbOwner.scheduleArbOSUpgrade(newVersion,timestamp,{...overrides})
    }


  
}