import { BigNumber } from "ethers";
import { NodeInterface } from "../src/precompiles/NodeInterface";
import { init } from "../src/utils/common";

/**
 * ts-node test/NodeInterface.test.ts 
 */
async function main() {
    const { provider, wallet } = init("L2");

    const nodeInterface = new NodeInterface(wallet)
    const to = "0x1001150aE8Ec8843BDcA3c7dE86A291B43a7F835"
    const contractCreation = false
    const calldata = "0x"
    const value = BigNumber.from(1).mul(BigNumber.from(10).pow(16)); // 0.01 ETH
    
    const {gasEstimate,gasEstimateForL1,baseFee,l1BaseFeeEstimate} = await nodeInterface.gasEstimateComponents(to,contractCreation,calldata,{value})
    console.log(`gasEstimate : ${gasEstimate}`);
    console.log(`gasEstimateForL1 : ${gasEstimateForL1}`);
    console.log(`baseFee : ${baseFee}`);
    console.log(`l1BaseFeeEstimate : ${l1BaseFeeEstimate}`);
    
}



(async () => {
    await main();
    process.exit(0);
  })();
