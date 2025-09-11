import api from "../utils/api";

export const registerUser = async (userData) => {
  try {
    const { data } = await api.post("/auth/register", userData);
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  const {data} = await api.post("/auth/login", userData)
  return data;
}

// export const testMyApi = async() => {
//   const response = await api.get("/auth/testApi")
// }
