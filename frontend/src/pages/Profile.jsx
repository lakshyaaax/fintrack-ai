import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {

        try {

            const response = await api.get("/transactions");

            setTransactions(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const income = transactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expense;

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="profile-page">

                    <div className="profile-card">

                        <div className="profile-header">

                            <div className="avatar">
                                👤
                            </div>

                            <div>

                                <h2>{user?.name}</h2>

                                <p>{user?.email}</p>

                                <small>
                                    Member Since: {user?.created_at || "Recently"}
                                </small>

                            </div>

                        </div>

                        <div className="profile-stats">

                            <div className="stat-box">

                                <h3>Current Balance</h3>

                                <p>₹ {balance.toFixed(2)}</p>

                            </div>

                            <div className="stat-box">

                                <h3>Total Income</h3>

                                <p>₹ {income.toFixed(2)}</p>

                            </div>

                            <div className="stat-box">

                                <h3>Total Expense</h3>

                                <p>₹ {expense.toFixed(2)}</p>

                            </div>

                            <div className="stat-box">

                                <h3>Transactions</h3>

                                <p>{transactions.length}</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;