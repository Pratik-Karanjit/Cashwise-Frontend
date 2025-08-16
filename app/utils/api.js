import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // allow cookie to be sent
});


api.interceptors.request.use((config) => config);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default api;
