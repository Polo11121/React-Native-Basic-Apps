import { ExpensesOutput } from "../../components/ExpensesOutput/ExpensesOutput";
import { useExpenseContext } from "../../store/context/expenses-context";
import { getDateMinusDays } from "../../util/date";

export const RecentExpenses = () => {
  const { expenses } = useExpenseContext();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" />
  );
};
