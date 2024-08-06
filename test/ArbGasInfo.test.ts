import { BigNumber } from "ethers";
import { ArbGasInfo } from "../src/precompiles/GasInfo";
import { init } from "../src/utils/common";

async function main() {
    const { provider, wallet } = init("L2");

    const gasInfo = new ArbGasInfo(wallet)

    let l1FeesAvailable = await gasInfo.getL1FeesAvailable()
    let UnitsSinceUpdate = await gasInfo.getL1PricingUnitsSinceUpdate()
    let fundsDueForRewards = await gasInfo.getL1PricingFundsDueForRewards()
    let LastUpdateTime = await gasInfo.getLastL1PricingUpdateTime()
    let amortizedCostCapBips = await gasInfo.getAmortizedCostCapBips()
    let perBatchGas = await gasInfo.getPerBatchGasCharge()
    let perUnitReward = await gasInfo.getL1RewardRate()
    let _payRewardsTo = await gasInfo.getL1RewardRecipient()
    console.log(`payRewardsTo : ${_payRewardsTo}`);

    console.log(`L1FeesAvailable : ${l1FeesAvailable}`);
    console.log(`UnitsSinceUpdate : ${UnitsSinceUpdate}`);
    console.log(`FundsDueForRewards : ${fundsDueForRewards}`);
    console.log(`LastUpdateTime : ${LastUpdateTime}`);
    console.log(`amortizedCostCapBips : ${amortizedCostCapBips}`);
    console.log(`perBatchGasCharge : ${perBatchGas}`);
    console.log(`perUnitReward : ${perUnitReward}`);
    return

    // perBatchGas, err := l1p.PerBatchGasCost()
    // gasSpent := arbmath.SaturatingAdd(perBatchGas, arbmath.SaturatingCast[int64](batchDataGas))
    // weiSpent := arbmath.BigMulByUint(l1BaseFeeWei, arbmath.SaturatingUCast[uint64](gasSpent))

    let batchPoster = "" // batchPostReport
    let batchDataGas = BigNumber.from(0) // batchPostReport
    let l1BaseFeeWei = BigNumber.from(0) // batchPostReport
    let gasSpent = perBatchGas.add(batchDataGas)
    let weiSpent = l1BaseFeeWei.mul(gasSpent)

    const updateTime = BigNumber.from(1)
    const currentTime = BigNumber.from(1)
    const allocationNumerator = updateTime.sub(LastUpdateTime)
	const allocationDenominator = currentTime.sub(LastUpdateTime)

    const unitsAllocated = UnitsSinceUpdate.mul(allocationNumerator).div(allocationDenominator)

    // newUnitsSinceUpdate = UnitsSinceUpdate - unitsAllocated
    // ✅ SetUnitsSinceUpdate(newUnitsSinceUpdate)

    const OneInBips = BigNumber.from(10000)

    let weiSpentCap = amortizedCostCapBips.mul(l1BaseFeeWei.mul(unitsAllocated)).sub(OneInBips)

    if ( weiSpentCap < weiSpent) {
        // weiSpent : BatchData를 L1에 롤업하기 위해 사용한 비용
        weiSpent = weiSpentCap
    }


    // @description 지금까지 batchPoster가 사용한 롤업 수수료를 저장(SetFundsDue) 합니다.
    // batchPosterTable := ps.BatchPosterTable()
	// posterState, err := batchPosterTable.OpenPoster(batchPoster, true)
    // dueToPoster, err := posterState.FundsDue() // batchPoster가 지금까지 사용한 롤업 수수료
	// ✅ posterState.SetFundsDue(am.BigAdd(dueToPoster, weiSpent)) // 최신화


    fundsDueForRewards =  fundsDueForRewards.add(unitsAllocated.mul(perUnitReward))
    // ✅ SetFundsDueForRewards(fundsDueForRewards)


    let paymentForRewards = unitsAllocated.mul(perUnitReward)
    if(l1FeesAvailable < paymentForRewards) {
        paymentForRewards = l1FeesAvailable
    }

    fundsDueForRewards = fundsDueForRewards.sub(paymentForRewards)
    // ✅ SetFundsDueForRewards(fundsDueForRewards)

    let payRewardsTo = await gasInfo.getL1RewardRecipient()
    console.log(`payRewardsTo : ${payRewardsTo}`);

    console.log(`${payRewardsTo}에게 ${fundsDueForRewards}를 Reward로 전송합니다.`);
    // l1FeesAvailable, err = ps.TransferFromL1FeesAvailable(
	// 	payRewardsTo, paymentForRewards, evm, scenario, "batchPosterReward",
	// )


}


main()