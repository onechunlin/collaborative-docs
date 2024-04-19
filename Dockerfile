# 指定node镜像
FROM node:18 as builder

# 指定工作目录
WORKDIR /app

# 代码复制到容器中
ADD . /app

ENV NODE_ENV=production

# 安装 pnpm
RUN npm install pnpm -g

# 安装依赖
RUN pnpm install

# 打包
RUN pnpm run build

# 指定nginx镜像
FROM nginx:latest

# 复制nginx配置文件到容器中
COPY nginx.conf /etc/nginx/conf.d/

# 复制打包后的代码到nginx容器中
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80
