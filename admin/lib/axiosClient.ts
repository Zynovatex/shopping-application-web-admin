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
      "/api/auth/register",
    ];

    // Safely resolve full path
    let path = "";
    try {
      const fullUrl = new URL(config.url ?? "", axiosClient.defaults.baseURL);
      path = fullUrl.pathname;
    } catch (e) {
      console.warn("Invalid request URL:", config.url);
      return Promise.reject(e);
    }

    const isPublic = publicPaths.some((p) => path === p);

    if (!isPublic) {
      const token = localStorage.getItem("token");

      // ⛔ Prevent "Bearer null" or "Bearer undefined"
      const isValidToken = token && token !== "null" && token !== "undefined" && token.split(".").length === 3;

      if (isValidToken) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("🚫 Invalid or missing token:", token);
        localStorage.removeItem("token"); // Optional cleanup
        window.location.href = "/";
        return Promise.reject(new Error("Invalid or missing token"));
      }
    } else {
      // Don’t attach token for public endpoints
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
