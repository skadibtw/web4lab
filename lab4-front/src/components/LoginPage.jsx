import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      // Dummy API call simulation
      alert('Логин успешно выполнен');
      navigate('/main');
    } else {
      alert('Введите логин и пароль');
    }
  };
  const handleRegister = () => {
    navigate('/register');
  }
  return (
    
    <div className="login-page">
      <h2>Вход</h2>
      
      <div className="form">
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Войти</button>
        <button onClick={handleRegister}>Регистрация</button>
      </div>
    </div>
  );
};

export default LoginPage;
