import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pages.css'
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      const response = await fetch('http://localhost:8080/web4lab-1.0-SNAPSHOT/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          hashed_password: password
        })
      }); 
      if (response.status === 200) {
        const token = response.headers.get('Authorization').split(' ')[1]; // Получаем токен из заголовка
        if (token) {
          Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
        }
        console.log('User logged in successfully');
        toast.success('Пользователь вошел в систему');
        navigate('/main');
      } else {
        console.log('Error logging in');
        toast.error('Ошибка входа');
      }     
    } else {
      alert('Введите логин и пароль');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  }
  
  return (
    
    <div className="login-page">
      <ToastContainer />
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
