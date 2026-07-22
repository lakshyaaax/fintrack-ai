function FinancialAdvisor({ transactions, totalIncome, totalExpense }) {

    const balance = totalIncome - totalExpense;

    const savingsRate =
        totalIncome > 0
            ? ((balance / totalIncome) * 100).toFixed(1)
            : 0;

    // Calculate highest expense category
    const categoryTotals = {};

    transactions
        .filter((t) => t.type.toLowerCase() === "expense")
        .forEach((t) => {
            categoryTotals[t.category] =
                (categoryTotals[t.category] || 0) + Number(t.amount);
        });

    const highestCategory =
        Object.keys(categoryTotals).length > 0
            ? Object.entries(categoryTotals).sort(
                  (a, b) => b[1] - a[1]
              )[0]
            : null;

    return (

        <div className="advisor-card">

            <h2>🤖 AI Financial Advisor</h2>

            <div className="advisor-grid">

                <div className="advisor-item">
                    <h4>💰 Savings Rate</h4>
                    <p>{savingsRate}%</p>
                </div>

                <div className="advisor-item">
                    <h4>🍔 Highest Expense</h4>

                    {highestCategory ? (

                        <p>
                            {highestCategory[0]}
                            <br />
                            ₹{highestCategory[1]}
                        </p>

                    ) : (

                        <p>No Expenses</p>

                    )}

                </div>

                <div className="advisor-item">
                    <h4>📈 Financial Health</h4>

                    <p>
                        {balance >= 0
                            ? "Healthy ✅"
                            : "Needs Attention ⚠"}
                    </p>

                </div>

                <div className="advisor-item">
                    <h4>🎯 Recommendation</h4>

                    {highestCategory ? (

                        <p>
                            Reduce{" "}
                            <b>{highestCategory[0]}</b>
                            {" "}spending by 10%
                            to save approximately
                            {" "}
                            ₹
                            {(
                                highestCategory[1] * 0.1
                            ).toFixed(0)}
                            .
                        </p>

                    ) : (

                        <p>
                            Start adding transactions.
                        </p>

                    )}

                </div>

            </div>

        </div>

    );

}

export default FinancialAdvisor;