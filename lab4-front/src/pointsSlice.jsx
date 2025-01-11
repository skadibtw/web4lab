import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Асинхронный thunk для загрузки точек
export const fetchPoints = createAsyncThunk(
  "points/fetchPoints",
  async (page, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:8080/web4lab-1.0-SNAPSHOT/api/points?page=${page}&size=15`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Ошибка при загрузке точек"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронный thunk для создания точки
export const createPoint = createAsyncThunk(
  "points/createPoint",
  async ({ x, y, r }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
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

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Ошибка при создании точки"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pointsSlice = createSlice({
  name: "points",
  initialState: {
    rows: [],
    totalElements: 0,
    page: 0,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.rows = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.error = null;
      })
      .addCase(fetchPoints.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(createPoint.fulfilled, (state, action) => {
        state.rows.push(action.payload);
        state.totalElements += 1;
        state.error = null;
        toast.success("Точка успешно добавлена");
      })
      .addCase(createPoint.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setPage } = pointsSlice.actions;
export default pointsSlice.reducer;
