import { ChildToParentMessage, mapL2NetworkToArbitrumNetwork, registerCustomArbitrumNetwork, EventFetcher } from '@arbitrum/sdk';
import fs from 'fs';
import { NETWORK_INFO_PATH } from '../src/utils/path';
import { init } from '../src/utils/common';
import { SequencerInbox } from '../src/system/SequencerInbox';

async function main() {
  const { provider, wallet } = init('L1');
  const blockNumber = await provider.getBlockNumber();
  const network = JSON.parse(fs.readFileSync(NETWORK_INFO_PATH, 'utf8'));

  const l1l2Network = mapL2NetworkToArbitrumNetwork(network.l2Network);
  const l2Network = registerCustomArbitrumNetwork(l1l2Network);

  const fetcher = new EventFetcher(provider);

  const logs = await fetcher.getEvents(SequencerInbox.factory, (contract) => contract.filters['SequencerBatchDelivered'](3), {
    fromBlock: blockNumber-43200,
    toBlock: 'latest',
    address:l2Network.ethBridge.sequencerInbox
  });

  const {transactionHash} = logs[0]
  console.log(transactionHash);
  
}

(async () => {
    await main();
    process.exit(0);
  })();
  