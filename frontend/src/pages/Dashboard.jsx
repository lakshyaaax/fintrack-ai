import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>FinTrack AI 💰</h1>

      <h2 style={styles.subtitle}>
        Welcome, {user?.name || "User"} 👋
      </h2>

      <div style={styles.card}>
        <h3>💸 Total Balance</h3>
        <p>₹0</p>
      </div>

      <div style={styles.card}>
        <h3>📊 Monthly Spending</h3>
        <p>₹0</p>
      </div>

      <div style={styles.card}>
        <h3>🎯 Savings Goal</h3>
        <p>Not set</p>
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
    justifyContent: "center",
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
    width: "250px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
};

export default Dashboard;