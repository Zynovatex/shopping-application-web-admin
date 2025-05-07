import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Optional: Redirect to login if no token
    window.location.href = "/";
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
