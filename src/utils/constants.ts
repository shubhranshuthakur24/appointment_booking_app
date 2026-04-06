import { Department } from '../models/Department';
import { Doctor } from '../models/Doctor';

export const DEPARTMENTS: Department[] = ['ENT', 'ORTHO', 'SURGERY', 'GYN'];

export const DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr Shyam', department: 'ENT', availability: ['Mon', 'Wed', 'Fri'] },
  { id: 'd2', name: 'Dr Rahul', department: 'ENT', availability: ['Tue', 'Thu', 'Sat'] },
  { id: 'd3', name: 'Dr Meera', department: 'ORTHO', availability: ['Mon', 'Thu', 'Sat'] },
  { id: 'd4', name: 'Dr Arjun', department: 'ORTHO', availability: ['Tue', 'Wed', 'Fri'] },
  { id: 'd5', name: 'Dr Asha', department: 'SURGERY', availability: ['Mon', 'Wed', 'Sat'] },
  { id: 'd6', name: 'Dr Vikram', department: 'SURGERY', availability: ['Tue', 'Thu', 'Fri'] },
  { id: 'd7', name: 'Dr Nisha', department: 'GYN', availability: ['Mon', 'Wed', 'Fri'] },
  { id: 'd8', name: 'Dr Karan', department: 'GYN', availability: ['Tue', 'Thu', 'Sat'] },
];

export const STORAGE_KEYS = {
  PERSIST: 'persist:root',
};
