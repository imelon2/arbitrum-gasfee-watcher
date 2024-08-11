import { init } from "../src/utils/common";
import { BATCH_POST_REPORT_CALLDATA_PATH, BATCH_POST_REPORT_PATH } from "../src/utils/path";
import { ArbosActs } from "../src/precompiles/ArbosActs";
import fs from "fs";


/**
 *  ts-node scripts/Calculate.ts 
 */
async function main() {
    const { provider, wallet } = init("L2");
    const inter = ArbosActs.factory.createInterface()

    const data = JSON.parse(
        fs.readFileSync(BATCH_POST_REPORT_PATH, "utf8")
      );

      const calldata:any = {}
      for (let i = 0; i < data.length; i++) {
          const tx = await provider.getTransaction(data[i].hash)
          const funcFragment = inter.getFunction(tx.data.substring(0, 10))
          const {batchTimestamp,batchPosterAddress,batchNumber,batchDataGas,l1BaseFeeWei} = inter.decodeFunctionData(funcFragment,tx.data)
          calldata[tx.hash] = {batchTimestamp,batchPosterAddress,batchNumber,batchDataGas,l1BaseFeeWei}
      }
      
      fs.writeFileSync(
        BATCH_POST_REPORT_CALLDATA_PATH,
        JSON.stringify(calldata, null, 2),
        "utf8"
      );
}

(async () => {
  await main();
  process.exit(0);
})();
