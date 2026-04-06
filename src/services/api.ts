import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://example.com/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});
