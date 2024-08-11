import { SequencerInbox__factory } from "@arbitrum/sdk/dist/lib/abi/factories/SequencerInbox__factory";
import { SequencerInbox as ISequencerInbox } from "@arbitrum/sdk/dist/lib/abi/SequencerInbox";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";


export class SequencerInbox {
    public SequencerInbox: ISequencerInbox;
    constructor(provider: SignerOrProvider,address:string) {
      const sequencerInbox = SequencerInbox__factory.connect(address, provider);
      this.SequencerInbox = sequencerInbox;
    }

    static factory = SequencerInbox__factory

}