import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
    : "http://localhost:8000/api/v1");

export const API = axios.create({
  baseURL,
  withCredentials: true,
});

export default API;
