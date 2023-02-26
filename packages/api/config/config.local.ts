import { EggAppConfig, PowerPartial } from "egg";

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    cors: {
      credentials: true,
      origin: "*",
    },
  };
  return config;
};
