import { createContext, ReactNode, useState, useContext } from "react";
import uuid from "react-native-uuid";

interface Expense {
  description: string;
  amount: number;
  date: Date;
  id: string;
}
const ExpensesContext = createContext({
  expenses: [] as Expense[],
  addExpense: ({ date, description, id, amount }: Expense) => {},
  removeExpense: (id: string) => {},
  updateExpense: (id: string, expense: Expense) => {},
});

export const ExpensesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: uuid.v4().toString(),
      description: "Test",
      amount: 100,
      date: new Date("2021-12-19"),
    },
    {
      id: uuid.v4().toString(),
      description: "Test",
      amount: 100,
      date: new Date("2021-12-19"),
    },
    {
      id: uuid.v4().toString(),
      description: "Test",
      amount: 100,
      date: new Date("2021-12-19"),
    },
  ]);

  const addExpense = ({ date, description, id, amount }: Expense) =>
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { date, description, id, amount },
    ]);

  const removeExpense = (id: string) =>
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );

  const updateExpense = (id: string, expense: Expense) =>
    setExpenses((currentExpense) =>
      currentExpense.map((oldExpense) =>
        oldExpense.id === id ? expense : oldExpense
      )
    );

  return (
    <ExpensesContext.Provider
      value={{ expenses, updateExpense, removeExpense, addExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpensesContext);
