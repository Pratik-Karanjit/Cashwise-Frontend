"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../app/utils/api";
import { saveExpenses as saveExpensesApi } from "../app/services/expenseService";

export type Expense = {
    id: number;
    description: string;
    amount: number;
    paidBy: string;
    participants: string[];
};

export type SaveExpensesParams = {
    expenses: Expense[];
    transactions: string[];
};

export function useExpenses() {
    const queryClient = useQueryClient();
    
    const {
        data: expenses,
        isLoading,
        error
    } = useQuery({
        queryKey: ["expenses"],
        queryFn: () => api.get("/expense/group").then(res => res.data),
        staleTime: 0, // Always consider data stale
        refetchOnWindowFocus: true, // Refetch when window regains focus
        refetchOnMount: true, // Always refetch on component mount
    });

    // For saving expenses
    const mutation = useMutation({
        mutationFn: (params: SaveExpensesParams) => 
            saveExpensesApi(params.expenses, params.transactions),
        onSuccess: (data) => {
            // Invalidate and refetch expenses data
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
            console.log("Save successful:", data);
        },
        onError: (error) => {
            console.error("Save failed:", error);
        }
    });

    return {
        expenses,
        isLoading,
        error,
        saveExpenses: (expenses: Expense[], transactions: string[]) => 
            mutation.mutate({ expenses, transactions }),
        isSaving: mutation.isPending,
        saveError: mutation.error,
        saveData: mutation.data
    };
}