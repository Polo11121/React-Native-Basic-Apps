import { createContext, ReactNode, useState, useContext } from "react";

interface Expense {
  description: string;
  amount: number;
  date: Date;
  id: string;
}
const ExpensesContext = createContext({
  expenses: [] as Expense[],
  addExpense: ({ date, description, id, amount }: Expense) => {},
  setExpenses: (expenses: Expense[]) => {},
  removeExpense: (id: string) => {},
  updateExpense: (id: string, expense: Expense) => {},
});

export const ExpensesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

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
      value={{
        expenses,
        updateExpense,
        removeExpense,
        addExpense,
        setExpenses: (expenses) => setExpenses(expenses.reverse()),
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpensesContext);
