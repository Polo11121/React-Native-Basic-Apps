import { ExpenseData } from "./types";
import axios from "axios";

const backendUrl =
  "https://react-native-course-7f56c-default-rtdb.firebaseio.com";

export const storeExpense = async (expense: ExpenseData) => {
  const response = await axios.post(`${backendUrl}/expenses.json`, expense);

  return response.data.name;
};

export const getExpenses = async () => {
  const response = await axios.get(`${backendUrl}/expenses.json`);

  const expenses = Object.keys(response.data).map((key) => ({
    ...response.data[key],
    date: new Date(response.data[key].date),
    id: key,
  }));

  return expenses;
};

export const deleteExpense = async (id: string) => {
  await axios.delete(`${backendUrl}/expenses/${id}.json`);
};

export const patchExpense = async (id: string, expense: ExpenseData) => {
  await axios.put(`${backendUrl}/expenses/${id}.json`, expense);
};
