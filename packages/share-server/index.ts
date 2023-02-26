// 加载环境变量，需要尽可能早的执行
import { config } from "dotenv";
config();

import { initServer } from "./lib/server";
initServer();
