"use client";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import api from "../app/utils/api";
import { saveExpenses } from "../app/services/authService";
import { useState } from "react";

export function useExpenses() {

    const [queryClient] = useState(() => new QueryClient());
    
    // For fetching expenses
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
        mutationFn: saveExpenses,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
    });

    return {
        expenses,
        isLoading,
        error,
        saveExpenses: mutation.mutate,
        isSaving: mutation.isPending
    };
}