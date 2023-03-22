import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../util/types";
import { ExpensesList } from "./ExpensesList";
import { ExpensesSummary } from "./ExpensesSummary";

interface ExpensesOutputProps {
  expenses: Expense[];
  expensesPeriod: string;
}

export const ExpensesOutput = ({
  expenses,
  expensesPeriod,
}: ExpensesOutputProps) => (
  <View style={styles.container}>
    <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
    {expenses.length ? (
      <ExpensesList expenses={expenses} />
    ) : (
      <Text style={styles.infoText}>No expenses found</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
