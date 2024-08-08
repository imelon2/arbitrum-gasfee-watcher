import { ArbosActs__factory } from "@arbitrum/sdk/dist/lib/abi/factories/ArbosActs__factory";
import { ArbosActs as IArbosActs } from "@arbitrum/sdk/dist/lib/abi/ArbosActs";
import { SignerOrProvider } from "@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider";
import { ARB_ACTS } from "../utils/constants";
import { ansi } from "../utils/logStyle";

export class ArbosActs {
    public ArbosActs: IArbosActs;
    constructor(provider: SignerOrProvider) {
      const arbosActs = ArbosActs__factory.connect(ARB_ACTS, provider);
      this.ArbosActs = arbosActs;
    }

    monmitor() {
        console.log("RUN!");
        this.ArbosActs.on("*",async (data) => {
            
            const finishTime = new Date();
            console.log(
              `${ansi.Yellow}[MONITOR LOG] Emit event ${ansi.BrightMagenta}${
                data.event
              } ${ansi.reset}${ansi.Yellow} on ${this.ArbosActs.address} contract at ${finishTime.toLocaleString()}${ansi.reset}`
            );

            // console.log(`Transaction Hash : ${data}`);
            console.log(data);
            
            
        })
    }
}