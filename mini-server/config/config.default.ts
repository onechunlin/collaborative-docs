import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631334350186_1296';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    mongoose: {
      client: {
        url: 'mongodb+srv://admin:admin@cluster0.er3fd.mongodb.net/BasicDataBase?retryWrites=true&w=majority',
        options: {},
        plugins: [],
      },
    },
    session: {
      maxAge: 30 * 24 * 3600 * 1000, // ms
      key: 'sid',
      httpOnly: true,
      encrypt: true,
      renew: true,
      logValue: true,
    },
    cors: {
      credentials: true,
      origin: 'http://localhost:8000'
    },
    security: {
      csrf: {
        ignore: ['/api/user/login', '/api/user/register'],
      },
    }
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
