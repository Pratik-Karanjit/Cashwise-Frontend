import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});

api.interceptors.request.use(async (config) => {
  try {
    const session = await getSession(); // get NextAuth session
    const token = session?.user?.token; // sending backend's stored JWT in session
    console.log("token to be sent: ", token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error getting session in interceptor:", error);
    // Don't fail the request if session retrieval fails
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default api;
