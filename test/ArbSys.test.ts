import { init } from "../src/utils/common";
import { ArbSys } from "../src/precompiles/ArbSys";


/**
 * ts-node test/ArbSys.test.ts 
 */
async function main() {
    const { provider, wallet } = init("L3");

    const arbAggregator = new ArbSys(wallet)

    const arbBlockNum = await arbAggregator.arbBlockNumber()
    console.log(`arbBlockNum : ${arbBlockNum}`);
    
    
    const arbBlockHash = await arbAggregator.arbBlockHash(arbBlockNum.sub(1))
    console.log(`arbBlockHash : ${arbBlockHash}`);

    const arbChainID = await arbAggregator.arbChainID()
    console.log(`arbChainID : ${arbChainID}`);

    const arbOSVersion = await arbAggregator.arbOSVersion()
    console.log(`arbOSVersion : ${arbOSVersion}`);

    const getStorageGasAvailable = await arbAggregator.getStorageGasAvailable()
    console.log(`getStorageGasAvailable : ${getStorageGasAvailable}`);
    

}



(async () => {
    await main();
    process.exit(0);
  })();
