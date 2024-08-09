import { BigNumber, Wallet, ethers } from "ethers";
import { init } from "../src/utils/common";
import { formatEther } from "ethers/lib/utils";

/**
 * ts-node scripts/getBalance.ts
 */
async function main() {
  const { provider : l1Provider, wallet : l1Wallet } = init("L1");
  const { provider : l2Provider, wallet : l2Wallet } = init("L2");

  console.log(`L1 : ${formatEther(await l1Wallet.getBalance())}`);
  console.log(`L2 : ${formatEther(await l2Wallet.getBalance())}`);
  
  

}

(async () => {
  await main();
  process.exit(0);
})();
