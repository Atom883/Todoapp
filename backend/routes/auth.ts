import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise"; // Promise対応のmysql2
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ 環境変数のバリデーション
const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "JWT_SECRET"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ 環境変数 ${key} が設定されていません！`);
    process.exit(1);
  }
});

// **MySQL接続**
const db = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// **ログイン処理**
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "ユーザー名とパスワードは必須です" });
    }

    const [users]: any[] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    if (users.length === 0) {
      return res.status(401).json({ message: "ユーザーが見つかりません" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "パスワードが間違っています" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.json({ message: "ログイン成功", token, username: user.username });
  } catch (err) {
    console.error("エラー:", err);
    res.status(500).json({ message: "エラーが発生しました" });
  }
});

export default router;
