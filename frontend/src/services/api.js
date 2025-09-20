import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URI || "http://localhost:5000",
    withCredentials: true, // Important for HTTP-only cookies
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;