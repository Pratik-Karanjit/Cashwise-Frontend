import api from "../utils/api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  console.log("data is: ", data)
  return data;
};
