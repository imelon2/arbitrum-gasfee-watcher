import { BigNumber } from 'ethers';
import { ArbGasInfo } from '../src/precompiles/GasInfo';
import { getBatchTransactionByNumber, init } from '../src/utils/common';
import { BATCH_POST_REPORT_CALLDATA_PATH, BATCH_POST_REPORT_PATH } from '../src/utils/path';
import fs from 'fs';
import { formatEther } from 'ethers/lib/utils';
import { parseBatchReport } from '../src/utils/parse';

/**
 *  ts-node scripts/report.ts
 */
async function main() {
  const { provider:l1Provider, wallet:l1Wallet } = init('L1');
  const { provider:l2Provider, wallet:l2Wallet } = init('L2');

  const gasInfo = new ArbGasInfo(l2Wallet);
  const reportCalldata = await parseBatchReport(l2Provider)

  const reports = Object.keys(reportCalldata);
  let perBatchGas = await gasInfo.getPerBatchGasCharge();
  //   console.log(`perBatchGasCharge : ${perBatchGas}`);

  for (let i = 1; i < reports.length; i++) {
    const beforeReportHash = reports[i - 1];
    const currentReportHash = reports[i];

    const { batchTimestamp: _LastUpdateTime } = reportCalldata[beforeReportHash];
    const {
      batchPosterAddress,
      batchNumber,
      batchDataGas: _batchDataGas,
      l1BaseFeeWei,
      batchTimestamp: _updateTime,
    } = reportCalldata[currentReportHash];

    console.log(`\n\n############# ${BigNumber.from(batchNumber)} Betah Posting Report #############\n`);
    console.log(`beforeReportHash : ${beforeReportHash}`);
    console.log(`currentReportHash : ${currentReportHash}\n`);

    let batchPoster = batchPosterAddress;
    let batchDataGas = BigNumber.from(_batchDataGas);
    let l1Basefee = BigNumber.from(l1BaseFeeWei);

    console.log(`batchPoster : ${batchPoster}`);
    console.log(`batchDataGas : ${batchDataGas}`);
    console.log(`l1Basefee : ${l1Basefee}\n`);

    let gasSpent = perBatchGas.add(batchDataGas);
    let weiSpent = l1Basefee.mul(gasSpent);
    console.log(`gasSpent : ${gasSpent}`);
    console.log(`weiSpent : ${weiSpent}\n`);

    const { blockHash } = await l2Provider.getTransactionReceipt(currentReportHash);
    const { timestamp: _currentTime } = await l2Provider.getBlock(blockHash);

    const LastUpdateTime = BigNumber.from(_LastUpdateTime);
    const updateTime = BigNumber.from(_updateTime);
    const currentTime = BigNumber.from(_currentTime);

    console.log(`LastUpdateTime : ${LastUpdateTime}`);
    console.log(`updateTime : ${updateTime}`);
    console.log(`currentTime : ${currentTime}\n`);

    // let UnitsSinceUpdate = await gasInfo.getL1PricingUnitsSinceUpdate()
    const allocationNumerator = updateTime.sub(LastUpdateTime);
    const allocationDenominator = currentTime.sub(LastUpdateTime);
    // const unitsAllocated = UnitsSinceUpdate.mul(allocationNumerator).div(allocationDenominator)

    console.log(`allocationNumerator : ${allocationNumerator}`);
    console.log(`allocationDenominator : ${allocationDenominator}`);
    // console.log(`unitsAllocated : ${unitsAllocated}`);

    const { calls } = await l2Provider.send('debug_traceTransaction', [currentReportHash, { tracer: 'callTracer' }]);
    console.log(calls);

    // let perUnitReward = await gasInfo.getL1RewardRate()
    // console.log("perUnitReward : "+perUnitReward);
    
    const batchTx = await getBatchTransactionByNumber(batchNumber,l1Provider,1)
    const {gasUsed, effectiveGasPrice} = await l1Provider.getTransactionReceipt(batchTx)
    console.log(`Batch Transaction Tx Fee : ${formatEther(gasUsed.mul(effectiveGasPrice))} ETH`);
    

  }
}

(async () => {
  await main();
  process.exit(0);
})();
