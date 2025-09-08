import { Expense, GetExpensesResponse } from "../../types/types";
import api from "../utils/api";

export const saveExpenses = async(expenses: Expense[], transactions: string[]) => {
  const response = await api.post("/expense/group", { expenses, transactions });
  return response.data;
};

export const getExpenses = async (): Promise<GetExpensesResponse> => {
  console.log("entered get expenses")
  const response = await api.get("/expense/group");
  return response.data;
};