import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ✅ レスポンスデータの型を定義
interface AuthResponse {
  token: string;
  message: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();

  // **🔹 ログイン処理**
  const handleLogin = async () => {
    try {
      const res = await axios.post<AuthResponse>('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token); // ✅ 型があるのでエラーなし
      alert(`ログイン成功: ${res.data.message}`);
      navigate('/home');
    } catch (err: any) { // ✅ エラーの型を `any` にして対応
      console.error('❌ ログインエラー:', err.response?.data || err.message);
      alert('ログイン失敗: ' + (err.response?.data?.message || '不明なエラー'));
    }
  };

  // **🔹 ユーザー登録処理**
  const handleRegister = async () => {
    try {
      const res = await axios.post<AuthResponse>('http://localhost:5000/api/auth/register', { username, password, email });
      alert(`登録成功: ${res.data.message}`);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err: any) { // ✅ エラーの型を `any` にして対応
      console.error('❌ 登録エラー:', err.response?.data || err.message);
      alert('登録失敗: ' + (err.response?.data?.message || '不明なエラー'));
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      fontFamily: "'Press Start 2P', cursive",
      background: "linear-gradient(45deg, #2d3436, #00b894)", // ログイン後と同じ色に変更
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      color: "#ecf0f1"
    }}>
      <h2 style={{
        color: "#00e5ff", // ネオンシアン色に変更
        fontSize: "48px",
        fontWeight: "700",
        marginBottom: "30px",
        textShadow: "2px 2px 15px rgba(0, 0, 0, 0.7)"
      }}>
        {isRegistering ? '新規登録' : 'ログイン'}
      </h2>

      {isRegistering && (
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          style={{
            display: 'block', 
            margin: '10px auto', 
            padding: '12px', 
            width: '300px',
            fontSize: '16px',
            borderRadius: '8px', 
            border: '2px solid #ffffff', // ログイン後と同じ色
            backgroundColor: '#2c3e50', 
            color: '#ffffff', 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
            transition: 'all 0.3s ease-in-out',
            outline: 'none'
          }}
        />
      )}

      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        style={{
          display: 'block', 
          margin: '10px auto', 
          padding: '12px', 
          width: '300px',
          fontSize: '16px',
          borderRadius: '8px', 
          border: '2px solid #ffffff', // ログイン後と同じ色
          backgroundColor: '#2c3e50', 
          color: '#ffffff', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
          transition: 'all 0.3s ease-in-out',
          outline: 'none'
        }}
      />

      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        style={{
          display: 'block', 
          margin: '10px auto', 
          padding: '12px', 
          width: '300px',
          fontSize: '16px',
          borderRadius: '8px', 
          border: '2px solid #ffffff', // ログイン後と同じ色
          backgroundColor: '#2c3e50', 
          color: '#ffffff', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
          transition: 'all 0.3s ease-in-out',
          outline: 'none'
        }}
      />

      {isRegistering ? (
        <button 
          onClick={handleRegister} 
          style={{
            padding: '12px 30px', 
            fontSize: '18px', 
            backgroundColor: '#1abc9c', // ログイン後と同じ色
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: '700', 
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)', 
            transition: 'transform 0.3s ease-in-out',
            transform: 'scale(1.1)',
            margin: '15px 0'
          }}
        >
          <span role="img" aria-label="rocket" style={{ marginRight: '8px' }}>🚀</span> 登録 {/* ロケットアイコン追加 */}
        </button>
      ) : (
        <button 
          onClick={handleLogin} 
          style={{
            padding: '12px 30px', 
            fontSize: '18px', 
            backgroundColor: '#1abc9c', // ログイン後と同じ色
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: '700', 
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)', 
            transition: 'transform 0.3s ease-in-out',
            transform: 'scale(1.1)',
            margin: '15px 0'
          }}
        >
          <span role="img" aria-label="sword" style={{ marginRight: '8px' }}>🗡️</span> ログイン {/* 剣アイコン追加 */}
        </button>
      )}

      <p 
        onClick={() => setIsRegistering(!isRegistering)} 
        style={{
          color: '#ffffff', // ログイン後と同じ色
          cursor: 'pointer', 
          marginTop: '10px',
          fontSize: '16px',
          textDecoration: 'underline'
        }}
      >
        {isRegistering ? 'ログインはこちら' : '新規登録はこちら'}
      </p>
    </div>
  );
};

export default Login;
