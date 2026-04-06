export type AppointmentStatus = 'Booked' | 'Cancelled';

export interface Appointment {
  id: string;
  userId: string;
  department: string;
  doctorId: string;
  doctorName: string;
  date: string; // ISO date
  time: string; // HH:mm
  status: AppointmentStatus;
}
