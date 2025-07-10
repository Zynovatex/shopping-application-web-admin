import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});

axiosClient.interceptors.request.use(
  (config) => {
    const publicPaths = [
      "/api/auth/send-otp",
      "/api/auth/set-password",
      "/api/auth/check-password-status",
      "/api/auth/reset-password-otp",
      "/api/auth/login",
      "/api/auth/register"
    ];

    // ✅ Normalize path from full URL
    const fullUrl = new URL(config.url ?? "", axiosClient.defaults.baseURL);
    const path = fullUrl.pathname;

    const isPublic = publicPaths.some((p) => path === p);

    if (!isPublic) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        window.location.href = "/";
      }
    } else {
      // ✅ Ensure token is NOT sent for public routes
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
