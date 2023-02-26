#!/bin/bash
cd ../packages/web
# 安装 yarn 
npm install -g yarn
# 创建 output 目录
mkdir -p ./output/web
# 进入 web 项目
cd web
# 删除 node_modules
rm -rf node_modules
# 设置生产环境标识
NODE_ENV=production
# 安装依赖
yarn install
# 构建
yarn build
# 构建产物移动到 output 目录下
cp -r dist/ ../output/web