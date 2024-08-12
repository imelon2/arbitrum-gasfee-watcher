import { BigNumber } from "ethers";
import { ArbOwner } from "../src/precompiles/ArbOwner";
import { init } from "../src/utils/common";

/**
 * ts-node test/ArbOwner.test.ts
 */
async function main() {
  const { wsProviders, provider,wallet } = init("L2");
  const arbProvider = new ArbOwner(wallet);

  // const res = await arbProvider.setL1PricePerUnit(BigNumber.from(100000000),{})
  // const receipt = await res.wait()
  // console.log(receipt);

  const time = Math.floor(Date.now() / 1000);
  console.log(time);
  
  // const res = await arbProvider.scheduleArbOSUpgrade(BigNumber.from(20),BigNumber.from(time+10),{})
  // const receipt = await res.wait()
  // console.log(receipt);
  
}

(async () => {
    await main();
    process.exit(0);
  })();
  1723465034
  1723465007