import React, { useEffect, useState } from "react";
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

        try {
            await addTransaction({
                title,
                amount: Number(amount),
                type: "expense",
            });

            setTitle("");
            setAmount("");

            fetchData(); // refresh
        } catch (err) {
            console.error(err);
        }
    };

    const total = transactions.reduce(
        (acc, t) => acc + Number(t.amount),
        0
    );

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>FinTrack AI 💰</h1>

            <h2 style={styles.subtitle}>
                Welcome, {user?.name || "User"} 👋
            </h2>

            {/* ADD TRANSACTION */}
            <div style={styles.card}>
                <h3>Add Transaction</h3>

                <input
                    style={styles.input}
                    type="text"
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

            {/* TOTAL */}
            <div style={styles.card}>
                <h3>💸 Total Balance</h3>
                <p>₹{total}</p>
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
        justifyContent: "flex-start",
        paddingTop: "40px",
        gap: "20px",
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: "1.2rem",
        color: "#cbd5f5",
    },
    card: {
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        width: "280px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
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
        border: "none",
        borderRadius: "6px",
        background: "#38bdf8",
        color: "#000",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default Dashboard;