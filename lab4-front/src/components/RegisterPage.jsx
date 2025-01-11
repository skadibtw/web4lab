import React, { useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import checkLogin from "../utils/checkLogin.js";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, registerUser } from "../userSlice";

function RegisterPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const usernameRedux = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    const errors = checkLogin(usernameRedux, password);
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }
    dispatch(registerUser({ username: usernameRedux, password }))
      .unwrap()
      .then(() => {
        toast.success("Пользователь зарегистрирован");
        navigate("/main");
      })
      .catch((e) => toast.error(e));
  };

  return (
    <div className="register-page">
      <Header />
      <ToastContainer />
      <h2>Регистрация</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Логин"
          value={usernameRedux}
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Зарегистрироваться</button>
      </div>
    </div>
  );
}

export default RegisterPage;
