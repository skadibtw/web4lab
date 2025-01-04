import React from "react";
import Header from './Header'
function RegisterPage() {

<div className="register-page">
<Header />
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
</div>
</div>
};

export default RegisterPage;