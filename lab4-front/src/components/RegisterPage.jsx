import React, { useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import checkLogin from "../utils/checkLogin.js";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const errors = checkLogin(username, password);
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }
    const response = await fetch(
      "http://localhost:8080/web4lab-1.0-SNAPSHOT/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          hashed_password: password,
        }),
      }
    );

    if (response.status === 201) {
      console.log("User registered successfully");
      console.log("response: ", response);
      const token = response.headers.get("Authorization");
      Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      toast.success("Пользователь зарегистрирован");
      navigate("/main");
    } else if (response.status === 409) {
      toast.error("Пользователь с таким логином уже существует");
    } else if (response.status === 404) {
      toast.error("URL не найден");
    } else {
      toast.error("Ошибка регистрации");
    }
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
