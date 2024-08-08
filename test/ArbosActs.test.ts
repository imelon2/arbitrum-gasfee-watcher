import { BigNumber, ethers } from "ethers";
import { ArbGasInfo } from "../src/precompiles/GasInfo";
import { init } from "../src/utils/common";
import { ArbosActs } from "../src/precompiles/ArbosActs";

async function main() {
    const { wsProviders } = init("L1");
    // const gasInfo = new ArbosActs(wsProviders)
    // gasInfo.monmitor()

    console.log((await wsProviders.getCode("0x00000000000000000000000000000000000a4b05")));
    
    // wsProviders.on("block",(a) => {
    //     console.log(a);
        
    // })



}


main()