# 指定运行环境
FROM node:14
MAINTAINER 865106110@qq.com

# 设置容器启动后的默认运行目录
WORKDIR /app

# 暴露端口
EXPOSE 7001

# 复制代码
COPY . .

# 运行命令，安装依赖
# RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
# 例如 RUN npm install && cd /app && mkdir logs
RUN npm install --registry=https://registry.npm.taobao.org

# CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
# 如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。
# 例如 CMD cd /app && ./start.sh
CMD npm run dev