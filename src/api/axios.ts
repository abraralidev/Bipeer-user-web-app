import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://listing-backend-z4i5.onrender.com",
  headers: {
    'Content-Type': 'application/json',
  },
});
