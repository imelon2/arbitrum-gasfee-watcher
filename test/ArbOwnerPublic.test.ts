import { ArbOwnerPublic } from "../src/precompiles/ArbOwnerPublic";
import { init } from "../src/utils/common";

/**
 * ts-node test/ArbOwnerPublic.test.ts
 */
async function main() {
  const { wsProviders, provider, wallet } = init("L2");
  const arbProvider = new ArbOwnerPublic(wallet);

  const NetworkFeeAccount = await arbProvider.getNetworkFeeAccount()
  console.log(`NetworkFeeAccount : ${NetworkFeeAccount}`);

  const InfraFeeAccount = await arbProvider.getInfraFeeAccount()
  console.log(`InfraFeeAccount : ${InfraFeeAccount}`);

  const AllChainOwners = await arbProvider.getAllChainOwners()
  console.log(`AllChainOwners : ${AllChainOwners}`);

  // @deprecated
  // const BrotliCompressionLevel = await arbProvider.getBrotliCompressionLevel()
  // console.log(`BrotliCompressionLevel : ${BrotliCompressionLevel}`);
  
}

(async () => {
    await main();
    process.exit(0);
  })();
