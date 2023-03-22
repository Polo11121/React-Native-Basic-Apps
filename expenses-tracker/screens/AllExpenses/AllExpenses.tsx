import { ExpensesOutput } from "../../components/ExpensesOutput/ExpensesOutput";
import { useExpenseContext } from "../../store/context/expenses-context";

export const AllExpenses = () => {
  const { expenses } = useExpenseContext();

  return <ExpensesOutput expenses={expenses} expensesPeriod="Total" />;
};
