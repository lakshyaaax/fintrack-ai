import api from "../api/api";

// GET all transactions
export const getTransactions = async () => {
    const response = await api.get("/transactions/");
    return response.data;
};

// ADD transaction
export const addTransaction = async (transaction) => {
    const response = await api.post("/transactions/", transaction);
    return response.data;
};

// UPDATE transaction
export const updateTransaction = async (id, transaction) => {
    const response = await api.put(`/transactions/${id}`, transaction);
    return response.data;
};

// DELETE transaction
export const deleteTransaction = async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
};