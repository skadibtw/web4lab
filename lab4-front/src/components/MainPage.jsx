import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pages.css";
import Cookies from "js-cookie";
import CustomInput from "./CustomInput.jsx";
import CustomIconButton from "./CustomIconButton.jsx";
import Canvas from "./Canvas.jsx";
import ResultTable from "./ResultTable.jsx";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const MainPage = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState("");
  const [r, setR] = useState(3);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [columns] = useState([
    { id: "x", label: "X" },
    { id: "y", label: "Y" },
    { id: "r", label: "R" },
    { id: "insideArea", label: "Inside Area" },
    { id: "timestamp", label: "Timestamp" },
    { id: "executionTime", label: "Execution time(ns)" },
  ]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchPoints = async (p) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:8080/web4lab-1.0-SNAPSHOT/api/points?page=${p}&size=${15}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRows(data.content); // массив точек
        setTotalItems(data.totalElements); // общее кол-во элементов
      }
    } catch (e) {
      console.error("Ошибка при загрузке: ", e);
    }
  };

  useEffect(() => {
    fetchPoints(page);
  }, [page]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleSubmit = async () => {
    if (y && r) {
      const token = Cookies.get("token");
      console.log("token: ", token);
      try {
        const response = await fetch(
          "http://localhost:8080/web4lab-1.0-SNAPSHOT/api/points/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({ x, y, r }),
          }
        );
        if (response.ok) {
          toast.success("Точка успешно отправлена");
        } else if (response.status === 401) {
          toast.error("Необходимо авторизоваться для отправки точки");
        } else {
          toast.error("Ошибка при отправке точки");
        }
      } catch (e) {
        toast.error("Сетевая ошибка");
      }
    } else {
      toast.error("Заполните все поля");
    }
  };

  const handleXChange = (value) => {
    setX(value);
  };

  const handleYChange = (value) => {
    if (value >= -3 && value <= 5) {
      setY(value);
      setError("");
    } else {
      setError("Y должен быть в диапазоне от -3 до 5");
    }
  };

  const handleRChange = (value) => {
    if (value >= 0 && value <= 5) {
      setR(value);
    } else {
      toast.error("R должен быть в диапазоне от 0 до 5");
    }
  };

  return (
    <div className="layout">
      <div className="left-column">
        <ToastContainer />
        <Canvas r={r} />
        <div className="input-container">
          <div className="input-group">
            <span>X:</span>
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
              <CustomIconButton
                key={`${value}`}
                icon={value.toString()} // Преобразуем в строку
                color={x === value ? "primary" : "default"}
                onClick={() => handleXChange(value)}
              />
            ))}
          </div>
          <div className="input-group">
            <span>Y:</span>
            <CustomInput
              type="number"
              value={y}
              onChange={handleYChange}
              error={error} // Передаём текст ошибки
              label="Введите Y"
              style={{ color: "#fff" }}
            />
          </div>
          <div className="input-group">
            <span>R:</span>
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
              <CustomIconButton
                key={`${value}`}
                icon={value.toString()}
                color={r === value ? "primary" : "default"}
                onClick={() => handleRChange(value)}
              />
            ))}
            <IconButton
              key="submit-button"
              onClick={handleSubmit}
              style={{ marginLeft: "10px" }}
            >
              <SendIcon style={{ color: "#fff" }} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="right-column">
        <ResultTable
          rows={rows}
          columns={columns}
          page={page}
          totalItems={totalItems}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default MainPage;
