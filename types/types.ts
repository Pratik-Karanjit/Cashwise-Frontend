export interface Expense{
    id: number;
    description: string;
    amount: number;
    paidBy: string;
    participants: string[];
}

export interface GetExpensesResponse{
    message: string;
    success: boolean;
    result: Expense[];
}

export interface ExtendedUser {
  name?: string | null
  email?: string | null
  image?: string | null
  hasExpenses?: boolean
}