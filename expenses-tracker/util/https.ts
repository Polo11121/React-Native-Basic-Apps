import axios from "axios";
import { ExpenseData } from "./types";
import { API_URL } from "@env";

export const storeExpense = async (expense: ExpenseData) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expense);

  return response.data.name;
};

export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses.json`);

  const expenses = Object.keys(response.data).map((key) => ({
    ...response.data[key],
    date: new Date(response.data[key].date),
    id: key,
  }));

  return expenses;
};

export const deleteExpense = async (id: string) => {
  await axios.delete(`${API_URL}/expenses/${id}.json`);
};

export const patchExpense = async (id: string, expense: ExpenseData) => {
  await axios.put(`${API_URL}/expenses/${id}.json`, expense);
};
