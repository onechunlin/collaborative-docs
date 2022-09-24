"use strict";

import { EggPlugin } from "egg";
const path = require("path");

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  // redis: {
  //   enable: true,
  //   package: "egg-redis",
  // },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  sharedb: {
    enable: true,
    path: path.join(__dirname, "../lib/plugin/egg-sharedb"),
  },
};

export default plugin;
