import { init } from "../src/utils/common";
import { ArbAggregator } from "../src/precompiles/ArbAggregator";

async function main() {
    const { provider, wallet } = init("L2");

    const arbAggregator = new ArbAggregator(wallet)

    const batchPosters = await arbAggregator.getBatchPosters()
    console.log(`batchPosters :`);
    batchPosters.map((batchPoster,index) => {
        console.log(`[${index}] : ${batchPoster}`); 
    })
    
    console.log(`feeCollector : If No feeCollector, Retrun BatchPoster own self`);
    for(let i=0; i < batchPosters.length; i++) {
        const feeCollector = await arbAggregator.getFeeCollector(batchPosters[i])
        console.log(`[${i}] : ${feeCollector}`); 
    }
}


main()