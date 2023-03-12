import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
import { FE_ORIGIN } from "../app/constants";
// 加载 .env 环境变量
import { config } from "dotenv";
config();

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1631334350186_1296";

  // add your egg config in here
  config.middleware = ["auth", "errorHandler"];

  const {
    // REDIS_HOST = "127.0.0.1",
    // REDIS_PORT = 6379,
    // REDIS_PASSWORD = "redis_password",
    MONGO_URL,
    OSS_ACCESS_SECRET = "",
  } = process.env;

  // add your special config in here
  const bizConfig = {
    mongoose: {
      client: {
        url: MONGO_URL,
        options: {},
        plugins: [],
      },
    },
    // redis: {
    //   client: {
    //     port: REDIS_PORT,
    //     host: REDIS_HOST,
    //     password: REDIS_PASSWORD,
    //     db: 0,
    //   },
    // },
    jwt: {
      // secret 级别的密码从安全性来说应该放在环境变量里，如果是线上项目可以注意一下
      secret: "jhduawsda23jd43",
    },
    cors: {
      credentials: true,
      origin: FE_ORIGIN,
    },
    security: {
      csrf: {
        headerName: "x-csrf-token", // 自定义请求头
        ignore: ["/api/user/login", "/api/user/register"],
      },
    },
    auth: {
      ignore(ctx) {
        return (
          ctx.url.startsWith("/api/user/login") ||
          ctx.url.startsWith("/api/user/register") ||
          ctx.url.startsWith("/api/user/userInfo")
        );
      },
    },
    oss: {
      AccessKey: "LTAI5t93sYzZcH7WRyD1jY3J",
      AccessSecret: OSS_ACCESS_SECRET,
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
