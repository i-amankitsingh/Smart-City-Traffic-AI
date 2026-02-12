import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000",
    // timeout: 10000, // 10 seconds
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🚨 Response Interceptor (Handle 401 globally)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized - redirect to login");
            // window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
