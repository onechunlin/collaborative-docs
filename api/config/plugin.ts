"use strict";

import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  io: {
    enable: true,
    package: "egg-socket.io",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
};

export default plugin;
