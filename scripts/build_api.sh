#!/bin/bash
cd ../packages/api
# 安装 yarn 
npm install -g yarn
# 创建 output 目录
mkdir -p ./output/api
# 将源文件复制
cp -r ./api/ ./output/api
# 进入 api 项目
cd ./output/api
# 删除 node_modules
rm -rf node_modules
# 设置生产环境标识
EGG_SERVER_ENV=prod
# 安装依赖
yarn install
# 开启服务
yarn start