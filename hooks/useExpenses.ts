"use client";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import api from "../app/utils/api";
import { saveExpenses as saveExpensesApi } from "../app/services/authService";
import { useState } from "react";

type Expense = {
    id: number;
    description: string;
    amount: number;
    paidBy: string;
    participants: string[];
};

type SaveExpensesParams = {
    expenses: Expense[];
    transactions: string[];
};

export function useExpenses() {
    const [queryClient] = useState(() => new QueryClient());
    
    // For fetching existing expenses
    const {
        data: expenses,
        isLoading,
        error
    } = useQuery({
        queryKey: ["expenses"],
        queryFn: () => api.get("/expense/group").then(res => res.data)
    });

    // For saving expenses
    const mutation = useMutation({
        mutationFn: (params: SaveExpensesParams) => 
            saveExpensesApi(params.expenses, params.transactions),
        onSuccess: (data) => {
            // Update cache with new data
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
        saveData: mutation.data // Add this to access the response data
    };
}