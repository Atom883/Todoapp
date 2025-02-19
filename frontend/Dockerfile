FROM node:18

WORKDIR /app

# 環境変数を設定（OpenSSLのエラーを回避）
ENV NODE_OPTIONS=--openssl-legacy-provider

# パッケージのインストール
COPY package.json package-lock.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# TypeScript のビルド
RUN npm run build

# ポートを公開
EXPOSE 3000

# 本番環境と開発環境を切り替え
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm start; else npx serve -s build; fi"]
