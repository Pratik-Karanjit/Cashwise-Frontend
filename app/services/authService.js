import api from "../utils/api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  console.log("data is: ", data)
  return data;
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

export const saveExpenses = async(data)=>{
  const response = await api.post("/expense/group", data)
  return response.data;
}

export const getExpenses = async () => {
  const response = await api.get("/expense/group");
  return response.data;
};