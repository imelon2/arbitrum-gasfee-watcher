import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const BATCH_POST_REPORT_PATH = path.join(__dirname,"../../",`${process.env.BATCH_POSTING_REPORT_PATH}`)
export const BATCH_POST_REPORT_CALLDATA_PATH = path.join(__dirname,"../../",`${process.env.BATCH_POSTING_REPORT_CALLDATA_PATH}`)

export const NETWORK_INFO_PATH = path.join(__dirname,"../../",`${process.env.NETWORK_INFO_PATH}`)