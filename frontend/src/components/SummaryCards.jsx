function SummaryCards({
    balance,
    income,
    expense,
    transactions,
}) {

    const cards = [

        {
            title: "Balance",
            value: balance,
            icon: "💰",
        },

        {
            title: "Income",
            value: income,
            icon: "📈",
        },

        {
            title: "Expense",
            value: expense,
            icon: "📉",
        },

        {
            title: "Transactions",
            value: transactions,
            icon: "💳",
        },

    ];

    return (

        <div className="summary-grid">

            {cards.map((card) => (

                <div
                    className="summary-card"
                    key={card.title}
                >

                    <h3>

                        {card.icon} {card.title}

                    </h3>

                    <h2>

                        {typeof card.value === "number"
                            ? `₹${card.value.toLocaleString()}`
                            : card.value}

                    </h2>

                </div>

            ))}

        </div>

    );
}

export default SummaryCards;