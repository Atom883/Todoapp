import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import mysql from "mysql2";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

// ✅ 環境変数のバリデーション
const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ 環境変数 ${key} が設定されていません！`);
    process.exit(1);
  }
});

const dbConfig: mysql.ConnectionOptions = {
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: Number(process.env.DB_PORT)
};

let db: mysql.Connection;
function connectToDatabase(retries = 5) {
  db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error(`❌ DB接続エラー: ${err.message}`);
      if (retries > 0) {
        console.log(`⏳ リトライ中... (${retries}回残り)`);
        setTimeout(() => connectToDatabase(retries - 1), 5000);
      } else {
        console.error("❌ DB接続に失敗しました。");
        process.exit(1);
      }
      return;
    }
    console.log("✅ MySQLに接続されました");
  });
}

connectToDatabase();

// サンプルルート
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
