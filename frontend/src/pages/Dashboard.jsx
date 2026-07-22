import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import AddTransaction from "../components/AddTransaction";
import SearchFilter from "../components/SearchFilter";
import ExportButtons from "../components/ExportButtons";
import BudgetTracker from "../components/BudgetTracker";
import FinancialAdvisor from "../components/FinancialAdvisor";

import {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} from "../services/transactionService";

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    // Search & Filters
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [type, setType] = useState("All");

    // ===========================
    // Fetch Transactions
    // ===========================

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // ===========================
    // Add Transaction
    // ===========================

    const handleAddTransaction = async (transaction) => {
        try {
            await addTransaction(transaction);
            fetchTransactions();
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================
    // Update Transaction
    // ===========================

    const handleUpdateTransaction = async (id, transaction) => {
        try {
            await updateTransaction(id, transaction);

            setEditingTransaction(null);

            fetchTransactions();
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================
    // Delete Transaction
    // ===========================

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this transaction?")) return;

        try {
            await deleteTransaction(id);

            fetchTransactions();
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================
    // Filter Transactions
    // ===========================

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.category
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            transaction.description
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            transaction.category === category;

        const matchesType =
            type === "All" ||
            transaction.type === type;

        return matchesSearch && matchesCategory && matchesType;
    });

    // ===========================
    // Dashboard Summary
    // ===========================

    const totalIncome = filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalBalance = totalIncome - totalExpense;

    return (
        <DashboardLayout>
            <h1>Dashboard</h1>

            <p>Welcome to FinTrack AI 🚀</p>

            <div className="summary-cards">
                <div className="summary-card">
                    <h3>💰 Balance</h3>
                    <h2>₹{totalBalance}</h2>
                </div>

                <div className="summary-card income">
                    <h3>📈 Income</h3>
                    <h2>₹{totalIncome}</h2>
                </div>

                <div className="summary-card expense">
                    <h3>📉 Expense</h3>
                    <h2>₹{totalExpense}</h2>
                </div>

                <div className="summary-card">
                    <h3>📋 Transactions</h3>
                    <h2>{filteredTransactions.length}</h2>
                </div>
            </div>

            <BudgetTracker
                totalExpense={totalExpense}
            />
            
            <FinancialAdvisor
                transactions={filteredTransactions}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
            />

            <hr />

            <AddTransaction
                onAdd={handleAddTransaction}
                onUpdate={handleUpdateTransaction}
                editingTransaction={editingTransaction}
                onCancel={() => setEditingTransaction(null)}
            />

            <hr />

            <h2>Search & Filter</h2>

            <SearchFilter
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                type={type}
                setType={setType}
                transactions={transactions}
            />

            <ExportButtons
                transactions={filteredTransactions}
            />

            <h2>Recent Transactions</h2>

            {filteredTransactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.category}</td>

                                <td>₹{transaction.amount}</td>

                                <td>{transaction.type}</td>

                                <td>{transaction.date}</td>

                                <td>{transaction.description}</td>

                               <td>
                                    <div className="action-buttons">

                                        <button
                                            className="edit-btn"
                                            onClick={() => setEditingTransaction(transaction)}
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(transaction.id)}
                                        >
                                            🗑️ Delete
                                        </button>

                                     </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </DashboardLayout>
    );
}

export default Dashboard;