import { BigNumber, Wallet, ethers } from "ethers";
import { init } from "../src/utils/common";

/**
 * ts-node scripts/transfer.ts
 */
async function main() {
  const { provider, wallet } = init("L1");

  const value = BigNumber.from(100).mul(BigNumber.from(10).pow(18)); // 0.01 ETH


  const result: ethers.providers.TransactionRequest = {
    type: 2,
    to:"0x10012d9D7365bD937d5c28f786045D7C93EDc7eC",
    value, // 0.01 ETH
  };

  // const _tx = await wallet.populateTransaction(result);
  const re = await wallet.sendTransaction(result);
  const tx = await re.wait();

}

(async () => {
  await main();
  process.exit(0);
})();
