import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setAuth(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
