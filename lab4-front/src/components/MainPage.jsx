import React, { useState } from 'react';
import Canvas from './Canvas.jsx';
import { IconButton, TextField, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pages.css';
import Cookies from 'js-cookie';


const MainPage = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [r, setR] = useState(3);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (y && r) {
      const token = Cookies.get('token');
      console.log('token: ', token);
      try {
        const response = await fetch('http://localhost:8080/web4lab-1.0-SNAPSHOT/api/points/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // "Bearer <токен>"
          },
          body: JSON.stringify({ x, y, r })
        });
        if (response.ok) {
          toast.success('Точка успешно отправлена');

        }
        else if (response.status === 401) {
          toast.error('Необходимо авторизоваться для отправки точки');
        }
        else {
          toast.error('Ошибка при отправке точки');
        }
      } catch (e) {
        toast.error('Сетевая ошибка');
      }
    } else {
      toast.error('Заполните все поля');
    }
  };

  const handleXChange = (value) => {
    setX(value);
  };

  const handleYChange = (event) => {
    const value = event.target.value;
    if (value === '' || (value >= -3 && value <= 5)) {
      setY(value);
      setError('');
    } else {
      setError('Y должен быть в диапазоне от -3 до 5');
    }
  };

  const handleRChange = (value) => {
    setR(value);
  };

  return (
    <div className="main-page">
            <ToastContainer />
            <Canvas />
      <div className="input-container">
        <div className="input-group">
          <span>X:</span>
          {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
            <IconButton
              key={value}
              color={x === value ? 'primary' : 'default'}
              onClick={() => handleXChange(value)}
            >
              {value}
            </IconButton>
          ))}
        </div>
        <div className="input-group">
          <span>Y:</span>
          <TextField
            type="number"
            value={y}
            onChange={handleYChange}
            error={!!error}
            helperText={error}

          />
        </div>
        <div className="input-group">
          <span>R:</span>
          {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
            <IconButton
              key={value}
              color={r === value ? 'primary' : 'default'}
              onClick={() => handleRChange(value)}
            >
              {value}
            </IconButton>
          ))}
          <Button variant="contained" color="primary" onClick={handleSubmit}>Отправить</Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;