import ExpensesDisplay from '../../components/ExpensesDisplay';

export default function MyExpenses() {
    return (
        <div className='p-4 m-10'>
            <h1 className="text-2xl font-semibold mb-6">My Expenses</h1>
            <ExpensesDisplay />
        </div>
    );
}