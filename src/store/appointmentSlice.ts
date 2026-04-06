import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from '../models/Appointment';

export interface AppointmentState {
  items: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  items: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      state.items = action.payload;
    },
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.items.unshift(action.payload);
    },
    cancelAppointment(state, action: PayloadAction<string>) {
      state.items = state.items.map((item) =>
        item.id === action.payload ? { ...item, status: 'Cancelled' } : item
      );
    },
  },
});

export const { setLoading, setError, setAppointments, addAppointment, cancelAppointment } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
