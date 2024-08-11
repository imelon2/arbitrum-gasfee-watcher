import { NodeInterface__factory } from "@arbitrum/sdk/dist/lib/abi/factories/NodeInterface__factory";
import { NodeInterface as INodeInterface } from "@arbitrum/sdk/dist/lib/abi/NodeInterface";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";
import { NODE_INTERFACE_ADDRESS } from "@arbitrum/sdk/dist/lib/dataEntities/constants";
import { BigNumberish, CallOverrides, Overrides } from "ethers";

export class NodeInterface {
    public NodeInterface: INodeInterface;
    constructor(provider: SignerOrProvider) {
      const nodeInterface = NodeInterface__factory.connect(NODE_INTERFACE_ADDRESS, provider);
      this.NodeInterface = nodeInterface;
    }

    async arbBlockNumber() {
        // return await this.NodeInterface.findBatchContainingBlock()
    }

    async gasEstimateComponents(to:string, contractCreation:boolean, calldata:string,overrides:CallOverrides) {
        return await this.NodeInterface.callStatic.gasEstimateComponents(to,contractCreation,calldata,{...overrides})
    }
}