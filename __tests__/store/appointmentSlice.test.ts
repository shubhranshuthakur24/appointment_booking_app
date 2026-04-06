import appointmentReducer, {
  addAppointment,
  cancelAppointment,
  setAppointments,
} from '../../src/store/appointmentSlice';
import { Appointment } from '../../src/models/Appointment';

const appointment: Appointment = {
  id: 'a1',
  userId: 'u1',
  department: 'ENT',
  doctorId: 'd1',
  doctorName: 'Dr Shyam',
  date: '2026-04-05',
  time: '10:30',
  status: 'Booked',
};

describe('appointmentSlice', () => {
  it('sets appointments', () => {
    const state = appointmentReducer(undefined, setAppointments([appointment]));
    expect(state.items).toHaveLength(1);
  });

  it('adds appointment to top', () => {
    const state = appointmentReducer(undefined, addAppointment(appointment));
    expect(state.items[0]).toEqual(appointment);
  });

  it('cancels appointment', () => {
    const seeded = appointmentReducer(undefined, addAppointment(appointment));
    const state = appointmentReducer(seeded, cancelAppointment('a1'));
    expect(state.items[0].status).toBe('Cancelled');
  });
});
