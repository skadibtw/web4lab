import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  const onLogout = () => {
    dispatch(logout());
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
