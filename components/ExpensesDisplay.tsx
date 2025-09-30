"use client";

import useGetExpenses from '../hooks/useGetExpenses';
import { format } from 'date-fns';

const groupExpensesBySettlement = (expenses: any[]) => {
    const grouped = new Map();

    expenses?.forEach(expense => {
        const timestamp = new Date(expense.createdAt).setMilliseconds(0);
        if (!grouped.has(timestamp)) {
            grouped.set(timestamp, []);
        }
        grouped.get(timestamp).push(expense);
    });

    return Array.from(grouped.entries()).sort((a, b) => b[0] - a[0]);
};

export default function ExpensesDisplay() {
    const { expenses, error, isLoading } = useGetExpenses();
    console.log("expenses are", expenses)

    if (isLoading) {
        return <div className="p-4">Loading expenses...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error loading expenses</div>;
    }

    if (!expenses || expenses.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No expenses history found</p>
                <p className="text-sm mt-2">Start by creating your first expense group!</p>
            </div>
        );
    }

    const groupedExpenses = groupExpensesBySettlement(expenses);

    return (
        <div className='flex flex-col gap-8'>
            <h1 className="text-2xl font-semibold mt-5 mb-3">My Expenses</h1>

            {groupedExpenses.map(([timestamp, settlementExpenses]) => (
                <div key={timestamp} className='bg-white rounded-lg shadow-sm p-6'>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                        Settlement on {format(new Date(timestamp), 'PPP pp')}
                    </h2>

                    <div className='flex flex-col gap-4'>
                        {settlementExpenses.map((expense: any) => (
                            <div
                                key={expense.id}
                                className='p-4 border-[#e5e5e5] border-[0.5px] rounded-lg bg-gray-50'
                            >
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-col'>
                                        <h3 className="font-semibold">{expense.description}</h3>
                                        <p className='text-gray-700'>
                                            Participants: {expense.participants.join(", ")}
                                        </p>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <h3 className="font-semibold">Rs. {expense.amount}</h3>
                                        <p className='text-gray-700'>Paid by: {expense.paidBy}</p>
                                    </div>
                                </div>

                                <div className='mt-3 pt-3 border-t border-gray-200'>
                                    <p className='text-sm font-medium text-gray-700'>Settlements:</p>
                                    <ul className='list-disc pl-5 mt-1'>
                                        {expense.transactions.map((transaction: string, idx: number) => (
                                            <li key={idx} className='text-sm text-gray-600'>
                                                {transaction}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}