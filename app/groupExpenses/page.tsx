'use client'

import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useExpenses } from "../../hooks/useExpenses";
import Swal from "sweetalert2";
import { Expense } from "../../types/types";

export default function GroupExpenses() {
    const [people, setPeople] = useState<{ id: number; name: string }[]>([{ id: 1, name: "" }]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expandedExpenses, setExpandedExpenses] = useState<Set<number>>(new Set());

    const { saveExpenses, isSaving, saveData, saveError } = useExpenses();

    useEffect(() => {
        if (saveData?.success) {
            Swal.fire({
                title: 'Success!',
                text: saveData.message,
                icon: 'success',
                confirmButtonColor: '#3563d9'
            }).then(() => {
                setExpenses([]);
                setPeople([{ id: 1, name: "" }]);
                setExpandedExpenses(new Set());
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }, [saveData]);

    useEffect(() => {
        if (saveError) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to save expenses. Please try again.',
                icon: 'error',
                confirmButtonColor: '#3563d9'
            });
        }
    }, [saveError]);

    const addPerson = () => {
        const newPerson = { id: Date.now(), name: "" };
        setPeople([...people, newPerson]);
    };

    const removePerson = (id: number) => {
        if (people.length > 1) {
            setPeople(people.filter(p => p.id !== id));
            setExpenses(expenses.map(exp => ({
                ...exp,
                participants: exp.participants.filter(name => name !== getPersonName(id)),
                paidBy: exp.paidBy === getPersonName(id) ? "" : exp.paidBy
            })));
        }
    };

    const updatePersonName = (id: number, name: string) => {
        setPeople(people.map(p => p.id === id ? { ...p, name } : p));
    };

    const getPersonName = (id: number) => {
        const person = people.find(p => p.id === id);
        return person ? person.name : "";
    };

    const addExpense = () => {
        const validPeople = people.filter(p => p.name.trim() !== "");
        if (validPeople.length === 0) return;
        const newExpense = {
            id: Date.now(),
            description: "",
            amount: 0,
            paidBy: "",
            participants: validPeople.map(p => p.name),
        };
        setExpenses([...expenses, newExpense]);
        // Auto-expand the newly added expense
        setExpandedExpenses(prev => new Set([...prev, newExpense.id]));
    };

    const toggleExpenseAccordion = (expenseId: number) => {
        setExpandedExpenses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(expenseId)) {
                newSet.delete(expenseId);
            } else {
                newSet.add(expenseId);
            }
            return newSet;
        });
    };

    const removeExpense = (expenseId: number) => {
        setExpenses(expenses.filter(exp => exp.id !== expenseId));
        setExpandedExpenses(prev => {
            const newSet = new Set(prev);
            newSet.delete(expenseId);
            return newSet;
        });
    };

    const updateExpense = (id: number, field: keyof Expense, value: any) => {
        setExpenses(expenses.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    const toggleParticipant = (id: number, person: string) => {
        setExpenses(expenses.map(exp => {
            if (exp.id === id) {
                return exp.participants.includes(person)
                    ? { ...exp, participants: exp.participants.filter(p => p !== person) }
                    : { ...exp, participants: [...exp.participants, person] };
            }
            return exp;
        }));
    };

    const calculateBalances = () => {
        const balances: Record<string, number> = {};
        people.forEach(p => {
            if (p.name) balances[p.name] = 0;
        });

        expenses.forEach(exp => {
            if (exp.amount > 0 && exp.paidBy && exp.participants.length > 0) {
                const share = exp.amount / exp.participants.length;
                balances[exp.paidBy] -= exp.amount;
                exp.participants.forEach(person => {
                    balances[person] += share;
                });
            }
        });

        return balances;
    };

    const balances = calculateBalances();

    const settleDebts = (balances: Record<string, number>) => {
        const debtors: { name: string; amount: number }[] = [];
        const creditors: { name: string; amount: number }[] = [];

        for (const [name, balance] of Object.entries(balances)) {
            if (balance > 0.01) debtors.push({ name, amount: balance });
            if (balance < -0.01) creditors.push({ name, amount: -balance });
        }

        const transactions: string[] = [];
        let i = 0, j = 0;

        while (i < debtors.length && j < creditors.length) {
            const debtor = debtors[i];
            const creditor = creditors[j];
            const amount = Math.min(debtor.amount, creditor.amount);

            transactions.push(`${debtor.name} pays ${creditor.name} Rs.${amount.toFixed(2)}`);

            debtor.amount -= amount;
            creditor.amount -= amount;

            if (debtor.amount <= 0.01) i++;
            if (creditor.amount <= 0.01) j++;
        }

        return transactions;
    };

    const transactions = settleDebts(balances);

    return (
        <div className="w-full flex bg-white min-h-[90vh]">
            <div className="w-1/2 flex flex-col items-center pt-20 gap-5 pb-10">
                <div className="flex flex-col items-start w-full max-w-md gap-5">
                    <span className="text-primary text-3xl">
                        Group <span className="text-secondary">Expenses</span>
                    </span>
                    <p className='text-[#5E6282] text-justify'>
                        Add the names of your group members and click on the Add Expenses button to calculate the split with settlements!
                    </p>
                </div>

                <div className="flex flex-col gap-5 w-full max-w-md">
                    <span className="text-lg font-semibold text-primary">Add People</span>
                    {people.map(person => (
                        <div key={person.id} className="flex flex-row gap-4 items-center">
                            <input
                                type="text"
                                value={person.name}
                                onChange={(e) => updatePersonName(person.id, e.target.value)}
                                placeholder="Full Name"
                                className="flex-1 rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                            {people.length > 1 && (
                                <div
                                    onClick={() => removePerson(person.id)}
                                    className="px-4 py-3 bg-primary text-white rounded-md cursor-pointer hover:bg-secondary transition-colors"
                                >
                                    -
                                </div>
                            )}
                        </div>
                    ))}
                    <div>
                        <Button text="Add Person" onClick={addPerson} />
                    </div>
                </div>

                {expenses.length > 0 && (
                    <div className="mt-4 w-full max-w-md">
                        <div className="bg-white border-[#e5e5e5] border-[0.5px] rounded-xl shadow-sm p-6 flex flex-col gap-2">
                            <h2 className="text-xl font-bold mb-2 text-primary">Balances</h2>
                            <div className="divide-y divide-[#e5e5e5]">
                                {Object.entries(balances).map(([person, balance]) => (
                                    <div key={person} className="flex justify-between items-center py-2">
                                        <span className="text-primary font-medium">{person}</span>
                                        <span className={`font-semibold ${balance < 0 ? "text-green-600" : "text-red-500"}`}>
                                            {balance < 0 ? "Gets" : "Owes"} Rs.{Math.abs(balance).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {transactions.length > 0 && (
                    <div className="flex flex-col gap-5 mt-4 w-full max-w-md">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-[#e5e5e5] border-[0.5px] rounded-xl shadow-sm p-6 flex flex-col gap-2">
                            <h2 className="text-lg font-bold mb-2 text-primary">Settlements</h2>
                            <ul className="list-disc pl-5">
                                {transactions.map((t, idx) => (
                                    <li key={idx} className="text-primary py-1">{t}</li>
                                ))}
                            </ul>
                            {transactions.length === 0 && (
                                <p className="text-gray-500">All balances are settled!</p>
                            )}
                        </div>
                        <Button
                            text={isSaving ? "Saving..." : "Save Expense"}
                            onClick={() => saveExpenses(expenses, transactions)}
                            disabled={isSaving}
                        />
                    </div>
                )}
            </div>

            <div className="w-1/2 flex flex-col gap-6 mt-4 pt-20 pr-10 pb-10">
                <div className="flex flex-col gap-4">
                    {people.some(person => person.name.trim() !== "") && (
                        <Button text="Add Expense" onClick={addExpense} />
                    )}
                    <div className="flex flex-col gap-6 mt-4">
                        {expenses.map(exp => (
                            <div
                                key={exp.id}
                                className="border-[#e5e5e5] border-[0.5px] rounded-lg shadow-sm bg-white overflow-hidden"
                            >
                                {/* Accordion Header */}
                                <div
                                    className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex justify-between items-center"
                                    onClick={() => toggleExpenseAccordion(exp.id)}
                                >
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-primary">
                                            {exp.description || "New Expense"}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {exp.amount > 0 ? `Rs.${exp.amount}` : "Amount not set"}
                                            {exp.paidBy && ` • Paid by ${exp.paidBy}`}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeExpense(exp.id);
                                            }}
                                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                        <svg
                                            className={`w-5 h-5 transition-transform ${expandedExpenses.has(exp.id) ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Accordion Content */}
                                {expandedExpenses.has(exp.id) && (
                                    <div className="p-4">
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={exp.description}
                                            onChange={(e) => updateExpense(exp.id, "description", e.target.value)}
                                            className="w-full mb-3 rounded-md border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                                        />
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            pattern="[0-9]*"
                                            min="0"
                                            placeholder="Amount"
                                            value={exp.amount === 0 ? "" : exp.amount}
                                            onChange={(e) => updateExpense(exp.id, "amount", e.target.value === "" ? 0 : parseFloat(e.target.value))}
                                            className="w-full mb-3 rounded-md border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                                            style={{ MozAppearance: 'textfield' }}
                                        />

                                        <label className="block mb-2 text-primary">Paid by:</label>
                                        <select
                                            value={exp.paidBy}
                                            onChange={(e) => updateExpense(exp.id, "paidBy", e.target.value)}
                                            className="w-full mb-3 rounded-md border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                                        >
                                            <option value="">Select person</option>
                                            {people.map(person => (
                                                person.name && <option key={person.id} value={person.name}>{person.name}</option>
                                            ))}
                                        </select>

                                        <label className="block mb-2 text-primary">Participants:</label>
                                        <div className="flex flex-wrap gap-3">
                                            {people.map(person => (
                                                person.name && (
                                                    <label key={person.id} className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={exp.participants.includes(person.name)}
                                                            onChange={() => toggleParticipant(exp.id, person.name)}
                                                        />
                                                        {person.name}
                                                    </label>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}