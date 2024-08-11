import { BigNumber, Wallet, ethers } from "ethers";
import { init } from "../src/utils/common";
import { ArbitrumProvider } from "@arbitrum/sdk";
import { formatEther, formatUnits } from "ethers/lib/utils";

/**
 * ts-node scripts/transfer.ts
 */
async function main() {
  const { provider, wallet } = init("L2");

  const value = BigNumber.from(1).mul(BigNumber.from(10).pow(16)); // 0.01 ETH
  const to = "0x10012d9D7365bD937d5c28f786045D7C93EDc7eC"
  const NetworkFeeAccount = "0xd7464B89f726EcE721B4fcB7a90732387b23E6fc";
  const L1PricerFundsPool =
  "0xA4B00000000000000000000000000000000000f6".toLowerCase();
  

  const Sbefore = await wallet.getBalance();
  const RBefore = await provider.getBalance(to);
  const NBefore = await provider.getBalance(NetworkFeeAccount);
  const PBefore = await provider.getBalance(L1PricerFundsPool);

  
  const tx: ethers.providers.TransactionRequest = {
    type: 1,
    to,
    value // 0.01 ETH
  }

  const populateTx = await wallet.populateTransaction(tx)
  const signed = await wallet.signTransaction(populateTx)
  console.log(`signed tx : ${signed}`);
  console.log(`signed tx length : ${signed.length}`);
  
  const re = await provider.sendTransaction(signed);
  const receipt = await re.wait();
  
  

  const arbProvider = new ArbitrumProvider(provider)
  const l2Tx = await arbProvider.getTransactionReceipt(receipt.transactionHash)

  const SAfter = await wallet.getBalance();
  const RAfter = await provider.getBalance(to);
  const NAfter = await provider.getBalance(NetworkFeeAccount);
  const PAfter = await provider.getBalance(L1PricerFundsPool);

  const cumulativeGasUsed = BigNumber.from(l2Tx.cumulativeGasUsed);
  const effectiveGasPrice = BigNumber.from(l2Tx.effectiveGasPrice);
  const GasUsedForL1 = BigNumber.from(l2Tx.gasUsedForL1);
  const GasUsedForL2 = cumulativeGasUsed.sub(GasUsedForL1);

  console.log("\n");
  console.log(`# Transaction Result`);
  console.log(`Send Value: ${formatEther(value)} ETH`);
  console.log(`Gas Price : ${formatEther(effectiveGasPrice)} ETH (${formatUnits(effectiveGasPrice,"gwei")} gwei)`);
  console.log(`----`);
  console.log(`Gas Use For L1 :  ${GasUsedForL1.toString()} gas`);
  console.log(`Gas Use For L2 : ${GasUsedForL2.toString()} gas`);
  console.log(`--------------------------------------------`);
  console.log(`Gas Used       : ${cumulativeGasUsed.toString()} gas`);
  console.log(`\n`);
  console.log(
    `Transaction Fee For L1 : ${formatEther(
      GasUsedForL1.mul(effectiveGasPrice)
    )} ETH`
  );
  console.log(
    `Transaction Fee For L2 : ${formatEther(
      GasUsedForL2.mul(effectiveGasPrice)
    )} ETH`
  );
  console.log(`--------------------------------------------`);
  console.log(
    `Total Transaction Fee  : ${formatEther(
      cumulativeGasUsed.mul(effectiveGasPrice)
    )} ETH`
  );
  console.log("\n");
  console.log(`🧑 Sender Balance (${wallet.address})`);
  console.log(`Before Balance : ${formatEther(Sbefore)} ETH`);
  console.log(`After Balance  : ${formatEther(SAfter)} ETH `);
  console.log(`--------------------------------------------`);
  console.log(`Gap            :    - ${formatEther(Sbefore.sub(SAfter))} ETH`);
  console.log("\n");
  console.log(`👩 Recipient Balance (${to})`);
  console.log(`Before Balance : ${formatEther(RBefore)} ETH`);
  console.log(`After Balance  : ${formatEther(RAfter)} ETH `);
  console.log(`--------------------------------------------`);
  console.log(`Gap            : + ${formatEther(RAfter.sub(RBefore))} ETH`);
  console.log("\n");
  console.log(`🛠️  Network Fee Account Balance (${NetworkFeeAccount})`);
  console.log(`Before Balance : ${formatEther(NBefore)} ETH`);
  console.log(`After Balance  : ${formatEther(NAfter)} ETH `);
  console.log(`--------------------------------------------`);
  console.log(`Gap            :    + ${formatEther(NAfter.sub(NBefore))} ETH`);
  console.log("\n");
  console.log(`🛠️  L1 Pricer Funds Pool Balance (${L1PricerFundsPool})`);
  console.log(`Before Balance : ${formatEther(PBefore)} ETH`);
  console.log(`After Balance  : ${formatEther(PAfter)} ETH `);
  console.log(`--------------------------------------------`);
  console.log(`Gap            : + ${formatEther(PAfter.sub(PBefore))} ETH`);
  console.log("\n");
}

(async () => {
  await main();
  process.exit(0);
})();
