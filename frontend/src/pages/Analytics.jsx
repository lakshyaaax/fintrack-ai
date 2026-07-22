import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import SummaryCards from "../components/SummaryCards";

import { getTransactions } from "../services/transactionService";

import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";

function Analytics() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    // Summary Data
    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpense;

    // Pie Chart Data
    const categoryData = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
            return acc;
        }, {});

    // Line Chart Data
    const monthlyData = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
            const month = new Date(t.date).toLocaleString("default", {
                month: "short",
            });

            acc[month] = (acc[month] || 0) + Number(t.amount);

            return acc;
        }, {});

    return (
        <DashboardLayout>
            <div className="analytics-page">

                <h1>📊 Analytics Dashboard</h1>

                <SummaryCards
                    balance={balance}
                    income={totalIncome}
                    expense={totalExpense}
                    transactions={transactions.length}
                />

                <div className="analytics-grid">

                    <div className="chart-container">
                        <BarChart
                            income={totalIncome}
                            expense={totalExpense}
                        />
                    </div>

                    <div className="chart-container">
                        <PieChart
                            categoryData={categoryData}
                        />
                    </div>

                </div>

                <div className="chart-container full-width">

                    <LineChart
                        monthlyData={monthlyData}
                    />

                </div>

                <div className="ai-card">

                    <h2>🤖 AI Spending Insight</h2>

                    <p>

                        Your current balance is
                        <strong> ₹{balance.toLocaleString()}</strong>.

                    </p>

                    <p>

                        You spent
                        <strong> ₹{totalExpense.toLocaleString()}</strong>
                        against an income of
                        <strong> ₹{totalIncome.toLocaleString()}</strong>.

                    </p>

                    <p>

                        Keep your expenses below your income to
                        improve your monthly savings.

                    </p>

                </div>

            </div>
        </DashboardLayout>
    );
}

export default Analytics;