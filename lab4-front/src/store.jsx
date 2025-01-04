import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: { name: null, authenticated: false } };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { name: action.payload, authenticated: true };
    },
    clearUser: (state) => {
      state.user = { name: null, authenticated: false };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
