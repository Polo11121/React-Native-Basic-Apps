import { FlatList } from "react-native";
import { Expense } from "../../util/types";
import { ExpenseItem } from "./ExpenseItem";

export const ExpensesList = ({ expenses }: { expenses: Expense[] }) => (
  <FlatList
    data={expenses}
    renderItem={({ item }) => <ExpenseItem {...item} />}
    keyExtractor={({ id }) => id}
  />
);
