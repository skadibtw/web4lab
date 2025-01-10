import React, { useState, useEffect } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

function Header() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const isLoggedIn = Boolean(token);

  const onLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-info">
          <p>
            <strong>ФИО:</strong> Хачатрян Геворк Артурович
          </p>
          <p>
            <strong>Группа:</strong> P3217
          </p>
          <p>
            <strong>Вариант:</strong> 4477
          </p>
        </div>
        {isLoggedIn && (
          <IconButton onClick={onLogout}>
            <LogoutIcon style={{ color: "#fff" }} />
          </IconButton>
        )}
      </div>
    </header>
  );
}

export default Header;
