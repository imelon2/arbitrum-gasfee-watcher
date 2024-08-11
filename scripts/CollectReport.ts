import { init } from "../src/utils/common";
import { ArbitrumProvider } from "@arbitrum/sdk";
import { ARB_ACTS } from "../src/utils/constants";
import fs from "fs";
import { BATCH_POST_REPORT_PATH } from "../src/utils/path";

/**
 * ts-node scripts/CollectReport.ts
 */
async function main() {
  const { wsProviders, provider } = init("L2");
  const arbProvider = new ArbitrumProvider(provider);
  const functionSelector = "0xb6693771"; // batchPostingReport(uint256,address,uint64,uint64,uint256)

  wsProviders.on("block", async (block) => {

    const txs = await arbProvider.getBlockWithTransactions(block);

    txs.transactions.forEach((tx) => {
      if (
        tx.to?.toLocaleLowerCase() == ARB_ACTS.toLocaleLowerCase() &&
        tx.data.includes(functionSelector)
      ) {
        
        const data = JSON.parse(
          fs.readFileSync(BATCH_POST_REPORT_PATH, "utf8")
        );

        data.push(tx);

        fs.writeFileSync(
          BATCH_POST_REPORT_PATH,
          JSON.stringify(data, null, 2),
          "utf8"
        );

        console.log(`Batch Posting Report - ${tx.hash} was appended to file!`);
      }
    });
  });
}

main();
