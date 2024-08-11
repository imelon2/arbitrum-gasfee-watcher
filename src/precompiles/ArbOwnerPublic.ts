import { ArbOwnerPublic__factory } from "@arbitrum/sdk/dist/lib/abi/factories/ArbOwnerPublic__factory";
import { ArbOwnerPublic as IArbOwnerPublic } from "@arbitrum/sdk/dist/lib/abi/ArbOwnerPublic";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";
import { ARB_ACTS } from "../utils/constants";
import { ansi } from "../utils/logStyle";
import { ARB_OWNER_PUBLIC } from "@arbitrum/sdk/dist/lib/dataEntities/constants";

export class ArbOwnerPublic {
    public ArbOwnerPublic: IArbOwnerPublic;
    constructor(provider: SignerOrProvider) {
      const arbOwnerPublic = ArbOwnerPublic__factory.connect(ARB_OWNER_PUBLIC, provider);
      this.ArbOwnerPublic = arbOwnerPublic;
    }

    static factory = ArbOwnerPublic__factory

    async getNetworkFeeAccount() {
        return await this.ArbOwnerPublic.getNetworkFeeAccount()
    }

    async getInfraFeeAccount() {
        return await this.ArbOwnerPublic.getInfraFeeAccount()
    }

    async getAllChainOwners() {
        return await this.ArbOwnerPublic.getAllChainOwners()
    }

    async getBrotliCompressionLevel() {
        return await this.ArbOwnerPublic.getBrotliCompressionLevel()
    }

  
}