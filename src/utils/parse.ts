import { ethers } from "ethers";
import fs from "fs";
import { ArbosActs } from "../precompiles/ArbosActs";
import { BATCH_POST_REPORT_PATH, BATCH_POST_REPORT_CALLDATA_PATH } from "./path";

export const parseBatchReport = async (provider:ethers.providers.JsonRpcProvider) => {

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

      return calldata
}