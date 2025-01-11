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
import { useSelector, useDispatch } from "react-redux";
import { fetchPoints, createPoint, setPage } from "../pointsSlice";

const MainPage = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState("");
  const [r, setR] = useState(3);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {
    rows,
    totalElements,
    page,
    error: pointsError,
  } = useSelector((state) => state.points);
  const [columns] = useState([
    { id: "x", label: "X" },
    { id: "y", label: "Y" },
    { id: "r", label: "R" },
    { id: "insideArea", label: "Inside Area" },
    { id: "timestamp", label: "Timestamp" },
    { id: "executionTime", label: "Execution time(ms)" },
  ]);

  useEffect(() => {
    dispatch(fetchPoints(page));
  }, [page]);

  const handleChangePage = (_, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSubmit = async () => {
    if (y && r) {
      dispatch(createPoint({ x, y: parseFloat(y), r }))
        .unwrap()
        .catch((error) => toast.error(error));
    } else {
      toast.error("Заполните все поля");
    }
  };

  const handleXChange = (value) => {
    setX(value);
  };

  const handleYChange = (value) => {
    if (value === "") {
      setY("");
      setError("");
      return;
    }
    const regex = /^-?\d*\.?\d*$/;
    if (regex.test(value)) {
      if (value.length <= 12) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= -3 && numValue <= 5) {
          setY(value);
          setError("");
        } else {
          setError("Y должен быть в диапазоне от -3 до 5");
        }
      }
    } else {
      setError("Некорректный ввод");
    }
  };

  const handleRChange = (value) => {
    if (value >= 0 && value <= 5) {
      setR(value);
    } else {
      toast.error("R должен быть в диапазоне от 0 до 5");
    }
  };

  const handleCanvasPointAdd = (pointData) => {
    dispatch(createPoint(pointData))
      .unwrap()
      .catch((error) => toast.error(error));
  };

  return (
    <div className="layout">
      <div className="left-column">
        <ToastContainer />
        <Canvas r={r} rows={rows} onPointAdd={handleCanvasPointAdd} />
        <div className="input-container">
          <div className="input-group">
            <span>X:</span>
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
              <CustomIconButton
                key={`${value}`}
                icon={value.toString()}
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
              onChange={(e) => handleYChange(e.target.value)}
              error={error}
              label="Введите Y"
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
          </div>
          <div className="submit-button-container">
            <IconButton
              key="submit-button"
              onClick={handleSubmit}
              style={{ marginLeft: "10px" }}
              className="submit-button"
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
          totalItems={totalElements}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default MainPage;
