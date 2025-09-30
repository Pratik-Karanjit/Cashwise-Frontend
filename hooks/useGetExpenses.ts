"use client";

import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getExpenses } from '../app/services/expenseService';

function useGetExpenses() {

   const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["expenses"], // Changed from "My Expenses"
    queryFn: getExpenses,
    staleTime: 1000 * 60 * 5,
    retry: 2
})

  return {
      expenses: data?.result || [],
        error,
        isLoading,
        refetch
  }
}

export default useGetExpenses