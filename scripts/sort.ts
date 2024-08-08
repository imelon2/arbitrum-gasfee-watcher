import fs from "fs"
import path from "path"
import { BATCH_POST_REPOST_PATH } from "../src/utils/path";

function main() {
    let transactions = JSON.parse(fs.readFileSync(BATCH_POST_REPOST_PATH, 'utf8'))

    console.log(transactions.length);
    
    transactions = transactions.sort((a:any, b:any) => a.blockNumber - b.blockNumber);
    fs.writeFileSync(BATCH_POST_REPOST_PATH, JSON.stringify(transactions, null, 2), 'utf8');
}

main()