import dotenv from 'dotenv';
dotenv.config();
import { Contract, ethers } from 'ethers';
import { SequencerInbox__factory } from '@arbitrum/sdk/dist/lib/abi/factories/SequencerInbox__factory';
import { init } from '../src/utils/common';
import { ansi } from '../src/utils/logStyle';

/**
 * ts-node scripts/CollectBatchPosting.ts
 */
async function main() {
  try {
    const wsProvider = new ethers.providers.WebSocketProvider(process.env.L1_WS_URL!);
    const sequencerInbox = SequencerInbox__factory.connect('0xb930653aD9b65E168882F4f2A2f8bFc4B8771d34', wsProvider);

    console.log(`${ansi.BrightWhite}[Run] Start Monitoring at SequencerInbox Contract 0xb930653aD9b65E168882F4f2A2f8bFc4B8771d34 \n ${ansi.reset}`);
    sequencerInbox.on('*', async (data) => {
      const finishTime = new Date();
      console.log(
        `${ansi.Yellow}[MONITOR LOG] Emit event ${ansi.BrightMagenta}${data.event} ${ansi.reset}${
          ansi.Yellow
        } on SequencerInbox contract at ${finishTime.toLocaleString()}${ansi.reset}`
      );
      console.log(`Transaction Hash : ${data.transactionHash}`);
    });
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await main();
})();
