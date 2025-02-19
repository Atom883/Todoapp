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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>{isRegistering ? '新規登録' : 'ログイン'}</h2>

      {isRegistering && (
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          style={{ display: 'block', margin: '10px auto', padding: '5px' }}
        />
      )}

      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        style={{ display: 'block', margin: '10px auto', padding: '5px' }}
      />
      
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        style={{ display: 'block', margin: '10px auto', padding: '5px' }}
      />

      {isRegistering ? (
        <button onClick={handleRegister} style={{ margin: '10px', padding: '5px' }}>登録</button>
      ) : (
        <button onClick={handleLogin} style={{ margin: '10px', padding: '5px' }}>ログイン</button>
      )}

      <p 
        onClick={() => setIsRegistering(!isRegistering)} 
        style={{ color: 'blue', cursor: 'pointer', marginTop: '10px' }}
      >
        {isRegistering ? 'ログインはこちら' : '新規登録はこちら'}
      </p>
    </div>
  );
};

export default Login;
