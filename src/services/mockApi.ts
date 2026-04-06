import { Appointment } from '../models/Appointment';
import { Doctor } from '../models/Doctor';
import { User } from '../models/User';
import { DOCTORS } from '../utils/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockLogin = async (phone: string): Promise<{ token: string; user: User }> => {
  await delay(500);
  return {
    token: `token_${phone}`,
    user: { id: `u_${phone}`, fullName: 'Guest User', phone },
  };
};

export const mockSignup = async (
  fullName: string,
  phone: string
): Promise<{ token: string; user: User }> => {
  await delay(500);
  return {
    token: `token_${phone}`,
    user: { id: `u_${phone}`, fullName, phone },
  };
};

export const mockFetchDoctors = async (): Promise<Doctor[]> => {
  await delay(300);
  return DOCTORS;
};

export const mockBookAppointment = async (
  appointment: Appointment
): Promise<Appointment> => {
  await delay(400);
  return appointment;
};
