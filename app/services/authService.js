import api from "../utils/api";

export const registerUser = async (userData) => {
  try {
    console.log("Attempting to register with data:", userData);
    const { data } = await api.post("/auth/register", userData);
    console.log("Registration response:", data);
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  console.log("entered login user")
  const {data} = await api.post("/auth/login", userData)
  console.log("logged in data is: ", data)
  return data;
}

export const testMyApi = async() => {
  const response = await api.get("/auth/testApi")
  console.log("response is: ", response)
}

export const saveExpenses = async(expenses, transactions) => {
  console.log("data are:", expenses)
  console.log("transactions are:", transactions)
  const response = await api.post("/expense/group", { expenses, transactions });
  return response.data;
}

export const getExpenses = async () => {
  console.log("entered get expenses")
  const response = await api.get("/expense/group");
  console.log("response is", response)
  return response.data;
};