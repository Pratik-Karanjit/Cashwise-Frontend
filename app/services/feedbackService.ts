import api from "../utils/api";

export const sendFeedback = async(values) => {
  const response = await api.post("/feedback/sendFeedback", values);
  console.log("data from server", response)
  return response;
};
