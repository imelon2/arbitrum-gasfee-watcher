import { ArbGasInfo__factory } from "@arbitrum/sdk/dist/lib/abi/factories/ArbGasInfo__factory";
import { ArbGasInfo as IArbGasInfo } from "@arbitrum/sdk/dist/lib/abi/ArbGasInfo";
import { ARB_GAS_INFO } from "@arbitrum/sdk/dist/lib/dataEntities/constants";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";
import { BigNumber, ethers } from "ethers";
import { getFunctionSelector } from "../utils/common";

export class ArbGasInfo {
  public IArbGasInfo: IArbGasInfo;
  constructor(provider: SignerOrProvider) {
    const arbGasInfo = ArbGasInfo__factory.connect(ARB_GAS_INFO, provider);
    this.IArbGasInfo = arbGasInfo;
  }

  async getL1FeesAvailable() {
    return await this.IArbGasInfo.getL1FeesAvailable();
  }

  async getAmortizedCostCapBips() {
    return await this.IArbGasInfo.getAmortizedCostCapBips();
  }

  async getPerBatchGasCharge() {
    return await this.IArbGasInfo.getPerBatchGasCharge();
  }

  async getL1RewardRate() {
    return await this.IArbGasInfo.getL1RewardRate();
  }

  async getL1RewardRecipient() {
    return await this.IArbGasInfo.getL1RewardRecipient();
  }

  async getL1PricingUnitsSinceUpdate() {
      const _UnitsSinceUpdate = await this.IArbGasInfo.provider.call({
        to: ARB_GAS_INFO,
        data: getFunctionSelector("getL1PricingUnitsSinceUpdate()"),
      });
    return BigNumber.from(_UnitsSinceUpdate)
  }

  async getL1PricingFundsDueForRewards() {
      const _FundsDueForRewards = await this.IArbGasInfo.provider.call({
        to: ARB_GAS_INFO,
        data: getFunctionSelector("getL1PricingFundsDueForRewards()"),
      });
    return BigNumber.from(_FundsDueForRewards)
  }

  async getLastL1PricingUpdateTime() {
    const _LastUpdateTime = await this.IArbGasInfo.provider.call({
        to: ARB_GAS_INFO,
        data: getFunctionSelector("getLastL1PricingUpdateTime()"),
      });
    return BigNumber.from(_LastUpdateTime)
  }
}
