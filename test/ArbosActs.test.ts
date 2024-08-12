import { init } from "../src/utils/common";
import { ArbitrumProvider } from "@arbitrum/sdk";
import { ARB_ACTS } from "../src/utils/constants";
import { TaskQueue } from "../src/utils/queue";
import fs from "fs"
import { BATCH_POST_REPORT_PATH } from "../src/utils/path";
/**
 * ts-node test/ArbosActs.test.ts
 */
async function main() {
  const { wsProviders, provider } = init("L2");
  const arbProvider = new ArbitrumProvider(provider);
  const functionSelector = "0xb6693771"; // batchPostingReport(uint256,address,uint64,uint64,uint256)

  console.log(BATCH_POST_REPORT_PATH);
  
  
  const taskQueue = new TaskQueue();

  wsProviders.on("block", async (a) => {
    const txs = await arbProvider.getBlockWithTransactions(a);
    txs.transactions.forEach((tx) => {
      if (tx.to?.toLocaleLowerCase() ==  ARB_ACTS.toLocaleLowerCase() && tx.data.includes(functionSelector)) {
            const data = JSON.parse(fs.readFileSync(BATCH_POST_REPORT_PATH, 'utf8'))
            data.push(tx);
            fs.writeFileSync(BATCH_POST_REPORT_PATH, JSON.stringify(data, null, 2), 'utf8');
            console.log(`Batch Posting Report - ${tx.hash} was appended to file!`);
      }
    });
  });
}

main();
