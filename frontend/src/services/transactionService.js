import api from "../api/api";

// GET all transactions
export const getTransactions = async () => {
    const token = localStorage.getItem("access_token");

    const response = await api.get("/transactions/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// ADD transaction
export const addTransaction = async (transaction) => {
    const token = localStorage.getItem("access_token");

    const response = await api.post(
        "/transactions/",
        transaction,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// UPDATE transaction
export const updateTransaction = async (id, transaction) => {
    const token = localStorage.getItem("access_token");

    const response = await api.put(
        `/transactions/${id}`,
        transaction,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// DELETE transaction
export const deleteTransaction = async (id) => {
    const token = localStorage.getItem("access_token");

    const response = await api.delete(
        `/transactions/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};