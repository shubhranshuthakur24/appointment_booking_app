import { AppDispatch, RootState } from '../store';
import { addAppointment, cancelAppointment, setError, setLoading } from '../store/appointmentSlice';
import { mockBookAppointment } from '../services/mockApi';
import { Appointment } from '../models/Appointment';

export const bookAppointment = (payload: Omit<Appointment, 'id' | 'status'>) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const appointment: Appointment = {
        ...payload,
        id: `a_${Date.now()}`,
        status: 'Booked',
      };
      const saved = await mockBookAppointment(appointment);
      dispatch(addAppointment(saved));
    } catch (error) {
      dispatch(setError('Unable to book appointment.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const cancelAppointmentById = (appointmentId: string) => (dispatch: AppDispatch) => {
  dispatch(cancelAppointment(appointmentId));
};
