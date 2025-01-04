import React from 'react';
import './header.css';

function Header() {
    const onLogout = () => {
        console.log("логаут");
    }

return (
  <header className="header">
    <div className="header-content">
      <div className="header-info">
        <p><strong>ФИО:</strong> Хачатрян Геворк Артурович</p>
        <p><strong>Группа:</strong> P3217</p>
        <p><strong>Вариант:</strong> 4477</p>
      </div>
        <button className="logout-button" onClick={onLogout}>
          Выход
        </button>
    </div>
  </header>
)
};

export default Header;
