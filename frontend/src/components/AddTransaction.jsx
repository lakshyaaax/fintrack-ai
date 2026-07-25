import { useState, useEffect } from "react";

function AddTransaction({
    onAdd,
    onUpdate,
    editingTransaction,
    onCancel,
}) {

    const [form, setForm] = useState({
        amount: "",
        category: "",
        type: "expense",
        date: "",
        description: "",
    });

    // Fill form when editing
    useEffect(() => {

        if (editingTransaction) {

            setForm({
                amount: editingTransaction.amount,
                category: editingTransaction.category,
                type: editingTransaction.type,
                date: editingTransaction.date,
                description: editingTransaction.description || "",
            });

        } else {

            setForm({
                amount: "",
                category: "",
                type: "expense",
                date: "",
                description: "",
            });

        }

    }, [editingTransaction]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (editingTransaction) {

            onUpdate(editingTransaction.id, form);

        } else {

            onAdd(form);

        }

        setForm({
            amount: "",
            category: "",
            type: "expense",
            date: "",
            description: "",
        });

    };

    return (
        <div className="transaction-card">

            <h2>
                {editingTransaction
                    ? "✏ Edit Transaction"
                    : "Add Transaction"}
            </h2>

            <form
                className="transaction-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                />

                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingTransaction
                        ? "💾 Update Transaction"
                        : "+ Add Transaction"}
                </button>

                {editingTransaction && (
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )}

            </form>

        </div>
    );
}

export default AddTransaction;