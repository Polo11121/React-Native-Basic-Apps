import { useState, useEffect } from "react";
import { ErrorOverlay } from "../../components/ErrorOverlay/ErrorOverlay";
import { ExpensesOutput } from "../../components/ExpensesOutput/ExpensesOutput";
import { LoaderOverlay } from "../../components/LoaderOverlay/LoaderOverlay";
import { useExpenseContext } from "../../store/context/expenses-context";
import { getDateMinusDays } from "../../util/date";
import { getExpenses } from "../../util/https";

export const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { expenses, setExpenses } = useExpenseContext();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);

      try {
        const expenses = await getExpenses();
        setExpenses(expenses);
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchExpenses();
  }, []);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  } else if (isLoading) {
    <LoaderOverlay />;
  }
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" />
  );
};
