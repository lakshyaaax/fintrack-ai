import { useEffect, useState } from "react";

function BudgetTracker({ totalExpense }) {

    const [budget, setBudget] = useState(
        Number(localStorage.getItem("monthly_budget")) || 50000
    );

    const [editing, setEditing] = useState(false);

    const [newBudget, setNewBudget] = useState(budget);

    useEffect(() => {

        localStorage.setItem(
            "monthly_budget",
            budget
        );

    }, [budget]);

    const remaining = budget - totalExpense;

    const percentage = Math.min(
        (totalExpense / budget) * 100,
        100
    );

    const saveBudget = () => {

        if (newBudget <= 0) return;

        setBudget(Number(newBudget));

        setEditing(false);

    };

    return (

        <div className="budget-card">

            <div className="budget-header">

                <h2>💰 Monthly Budget</h2>

                {!editing ? (

                    <button
                        className="budget-edit-btn"
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </button>

                ) : (

                    <button
                        className="budget-save-btn"
                        onClick={saveBudget}
                    >
                        Save
                    </button>

                )}

            </div>

            {editing && (

                <input
                    type="number"
                    value={newBudget}
                    onChange={(e) =>
                        setNewBudget(e.target.value)
                    }
                    className="budget-input"
                />

            )}

            <div className="budget-info">

                <div>

                    <h4>Budget</h4>

                    <p>₹{budget.toLocaleString()}</p>

                </div>

                <div>

                    <h4>Spent</h4>

                    <p>₹{totalExpense.toLocaleString()}</p>

                </div>

                <div>

                    <h4>Remaining</h4>

                    <p
                        className={
                            remaining < 0
                                ? "negative"
                                : "positive"
                        }
                    >
                        ₹{remaining.toLocaleString()}
                    </p>

                </div>

            </div>

            <div className="progress-container">

                <div
                    className="progress-bar"
                    style={{
                        width: `${percentage}%`,
                        background:
                            percentage >= 100
                                ? "#ef4444"
                                : "#22c55e",
                    }}
                />

            </div>

            <p className="progress-text">

                {percentage.toFixed(1)}% of your monthly budget used

            </p>

        </div>

    );

}

export default BudgetTracker;