"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const promise_1 = __importDefault(require("mysql2/promise")); // Promise対応のmysql2
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// ✅ 環境変数のバリデーション
const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "JWT_SECRET"];
requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ 環境変数 ${key} が設定されていません！`);
        process.exit(1);
    }
});
// **MySQL接続**
const db = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// **ログイン処理**
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "ユーザー名とパスワードは必須です" });
        }
        const [users] = yield db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length === 0) {
            return res.status(401).json({ message: "ユーザーが見つかりません" });
        }
        const user = users[0];
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "パスワードが間違っています" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "ログイン成功", token, username: user.username });
    }
    catch (err) {
        console.error("エラー:", err);
        res.status(500).json({ message: "エラーが発生しました" });
    }
}));
exports.default = router;
