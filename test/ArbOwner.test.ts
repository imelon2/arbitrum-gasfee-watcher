import { BigNumber } from "ethers";
import { ArbOwner } from "../src/precompiles/ArbOwner";
import { init } from "../src/utils/common";

/**
 * ts-node test/ArbOwner.test.ts
 */
async function main() {
  const { wsProviders, provider,wallet } = init("L2");
  const arbProvider = new ArbOwner(wallet);

  const res = await arbProvider.setL1PricePerUnit(BigNumber.from(100000000),{})
  const receipt = await res.wait()
  console.log(receipt);
  
}

(async () => {
    await main();
    process.exit(0);
  })();
