import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Doctor } from '../models/Doctor';

export interface DoctorState {
  list: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  list: [],
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setDoctors(state, action: PayloadAction<Doctor[]>) {
      state.list = action.payload;
    },
  },
});

export const { setLoading, setError, setDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;
