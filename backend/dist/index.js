"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth", auth_1.default);
// ✅ 環境変数のバリデーション
const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT"];
requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ 環境変数 ${key} が設定されていません！`);
        process.exit(1);
    }
});
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
};
let db;
function connectToDatabase(retries = 5) {
    db = mysql2_1.default.createConnection(dbConfig);
    db.connect(err => {
        if (err) {
            console.error(`❌ DB接続エラー: ${err.message}`);
            if (retries > 0) {
                console.log(`⏳ リトライ中... (${retries}回残り)`);
                setTimeout(() => connectToDatabase(retries - 1), 5000);
            }
            else {
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
app.get("/", (req, res) => {
    res.send("Hello from Express");
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
