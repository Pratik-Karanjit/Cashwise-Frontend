import { FeedbackFormValues } from "../feedback/page";
import api from "../utils/api";

export const sendFeedback = async (values: FeedbackFormValues) => {
  const response = await api.post("/feedback/sendFeedback", values);
  console.log("data from server", response)
  return response;
};
