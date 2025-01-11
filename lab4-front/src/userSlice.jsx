import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/web4lab-1.0-SNAPSHOT/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
        return rejectWithValue("Ошибка регистрации");
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
    setUsername(state, action) {
      state.username = action.payload;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUsername, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;
