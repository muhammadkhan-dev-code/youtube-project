import axios from "axios";

const USER_API_URL =
  import.meta.env.VITE_USER_baseURL ||
  (import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/users`
    : "http://localhost:8000/users");

const API = axios.create({
  baseURL: USER_API_URL,
  withCredentials: true,
});

// ============ AUTHENTICATION ENDPOINTS ============

export const registerUser = async (formData) => {
  return await API.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const loginUser = async (credentials) => {
  return await API.post("/login", credentials);
};

export const logoutUser = async () => {
  return await API.post("/logout");
};

export const refreshAccessToken = async () => {
  return await API.post("/refresh-token");
};

export const getCurrentUser = async () => {
  return await API.get("/current-user");
};

export const changePassword = async (data) => {
  return await API.post("/change-password", data);
};

export const forgotPassword = async (email) => {
  return await API.post("/forgot-password", { email });
};

// ============ PROFILE ENDPOINTS ============

export const getUserProfile = async () => {
  return await API.get("/current-user");
};

export const getChannelProfile = async (username) => {
  return await API.get(`/channel/${username}`);
};

export const getWatchHistory = async () => {
  return await API.get("/watch-history");
};

export const updateAccount = async (data) => {
  return await API.patch("/update-account", data);
};

export const updateAvatar = async (formData) => {
  return await API.patch("/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateCoverImage = async (formData) => {
  return await API.patch("/cover-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};