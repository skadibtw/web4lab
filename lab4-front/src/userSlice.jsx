import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/web4lab-1.0-SNAPSHOT/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, hashed_password: password }),
        }
      );

      if (response.status === 201) {
        const token = response.headers.get("Authorization");
        Cookies.set("token", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        return { username };
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Ошибка регистрации");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/web4lab-1.0-SNAPSHOT/api/users/login",
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

      if (response.status === 200) {
        const authHeader = response.headers.get("Authorization");
        if (authHeader) {
          const token = authHeader;
          Cookies.set("token", token, {
            expires: 7,
            secure: true,
            sameSite: "Strict",
          });
          return { username };
        } else {
          return rejectWithValue("Токен не найден в заголовках");
        }
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Ошибка входа");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.username = "";
      state.isAuthenticated = false;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = null;
        toast.success("Пользователь успешно зарегистрирован");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = null;
        toast.success("Пользователь успешно вошёл в систему");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setUsername, setAuthenticated, logout } = userSlice.actions;
export default userSlice.reducer;
