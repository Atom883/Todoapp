FROM node:18

WORKDIR /app

# パッケージのインストール（TypeScript対応）
COPY package.json package-lock.json ./
RUN npm install

# ソースコードをコピー（ビルドに必要なソースコードを先にコピー）
COPY . .

# TypeScript のビルド（コンパイル）
RUN npm run build

# wait-for-it.sh をコンテナにコピー
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# MySQL が起動するまで待機してからアプリを起動
CMD ["/wait-for-it.sh", "mysql:3306", "--", "sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else node dist/index.js; fi"]
