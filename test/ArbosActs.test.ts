import { BigNumber, ethers } from "ethers";
import { ArbGasInfo } from "../src/precompiles/GasInfo";
import { init } from "../src/utils/common";
import { ArbosActs } from "../src/precompiles/ArbosActs";
import { ArbitrumProvider } from "@arbitrum/sdk";
import { ARB_ACTS } from "../src/utils/constants";
import { TaskQueue } from "../src/utils/queue";
import fs from "fs"
import path from "path"
/**
 * ts-node test/ArbosActs.test.ts
 */
async function main() {
  const { wsProviders, provider } = init("L2");
  const arbProvider = new ArbitrumProvider(provider);
  const functionSelector = "0xb6693771"; // batchPostingReport(uint256,address,uint64,uint64,uint256)

  const taskQueue = new TaskQueue();

  const BATCH_POST_REPOST_PATH = path.join(__dirname,"../data/batchPostingRepost.json")

  wsProviders.on("block", async (a) => {
    const txs = await arbProvider.getBlockWithTransactions(a);
    txs.transactions.forEach((tx) => {
      if (tx.data.includes(functionSelector)) {
      // if (tx.from.toLocaleLowerCase() == ARB_ACTS) {
            const data = JSON.parse(fs.readFileSync(BATCH_POST_REPOST_PATH, 'utf8'))
            data.push(tx);
            fs.writeFileSync(BATCH_POST_REPOST_PATH, JSON.stringify(data, null, 2), 'utf8');
            console.log(`${tx.hash} was appended to file!`);
      }
    });
  });
}

main();
