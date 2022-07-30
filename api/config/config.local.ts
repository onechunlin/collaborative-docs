import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    cors: {
      credentials: true,
      origin: 'http://localhost:8000',
    },
  };
  return config;
};
