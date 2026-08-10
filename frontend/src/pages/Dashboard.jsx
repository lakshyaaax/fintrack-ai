import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getTransactions,
    addTransaction,
} from "../services/transactionService";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [transactions, setTransactions] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async () => {
        if (!title || !amount) return;

        await addTransaction({
            title,
            amount: Number(amount),
            type: "expense",
        });

        setTitle("");
        setAmount("");
        fetchData();
    };

    // calculations
    const total = transactions.reduce((acc, t) => acc + Number(t.amount), 0);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>FinTrack AI 💰</h1>

            <h2 style={styles.subtitle}>
                Welcome, {user?.name || "User"} 👋
            </h2>

            {/* NAVIGATION */}
            <div style={styles.nav}>
                <Link to="/analytics">📊 Analytics</Link>
                <Link to="/profile">👤 Profile</Link>
                <Link to="/settings">⚙️ Settings</Link>
            </div>

            {/* CARDS */}
            <div style={styles.card}>
                <h3>💸 Total Balance</h3>
                <p>₹{total}</p>
            </div>

            <div style={styles.card}>
                <h3>📊 Monthly Spending</h3>
                <p>₹{total}</p>
            </div>

            <div style={styles.card}>
                <h3>🎯 Savings Goal</h3>
                <p>Not set</p>
            </div>

            {/* ADD TRANSACTION */}
            <div style={styles.card}>
                <h3>Add Transaction</h3>

                <input
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button style={styles.button} onClick={handleAdd}>
                    Add
                </button>
            </div>

            {/* TRANSACTIONS */}
            <div style={styles.card}>
                <h3>📜 Transactions</h3>

                {transactions.length === 0 ? (
                    <p>No transactions yet</p>
                ) : (
                    transactions.map((t) => (
                        <p key={t.id}>
                            {t.title} - ₹{t.amount}
                        </p>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "30px",
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
    },
    subtitle: {
        color: "#cbd5f5",
    },
    nav: {
        display: "flex",
        gap: "15px",
    },
    card: {
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        width: "280px",
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "5px 0",
        borderRadius: "6px",
        border: "none",
    },
    button: {
        marginTop: "10px",
        padding: "10px",
        width: "100%",
        borderRadius: "6px",
        border: "none",
        background: "#38bdf8",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default Dashboard;