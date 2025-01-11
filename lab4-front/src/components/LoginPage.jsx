import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pages.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setUsername } from "../userSlice";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRedux = useSelector((state) => state.user.username);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loginError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    if (usernameRedux && password) {
      dispatch(loginUser({ username: usernameRedux, password }));
    } else {
      toast.error("Введите логин и пароль");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <h2>Вход</h2>

      <div className="form">
        <input
          type="text"
          placeholder="Логин"
          value={usernameRedux}
          onChange={handleUsernameChange}
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
