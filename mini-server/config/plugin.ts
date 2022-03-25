import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  session: true,
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
