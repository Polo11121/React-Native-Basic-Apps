import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Props, RootStackParamList } from "../../App";
import { IconButton } from "../../components/IconButton/IconButton";
import uuid from "react-native-uuid";
import { GlobalStyles } from "../../constants/styles";
import { useExpenseContext } from "../../store/context/expenses-context";
import { ExpenseForm } from "../../components/ExpenseForm/ExpenseForm";

export const ManageExpenses = () => {
  const { params } = useRoute<Props["route"]>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { removeExpense, updateExpense, addExpense, expenses } =
    useExpenseContext();

  const isEdit = !!params?.expenseId;

  const removeExpenseHandler = () => {
    removeExpense(params?.expenseId!);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData: {
    amount: number;
    date: Date;
    description: string;
  }) => {
    if (isEdit) {
      updateExpense(params?.expenseId, {
        ...expenseData,
        id: params?.expenseId!,
      });
    } else {
      addExpense({ ...expenseData, id: uuid.v4().toString() });
    }

    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? "Edit Expense" : "Add Expense" });
  }, [navigation, isEdit]);

  const selectedExpense = expenses.find(({ id }) => id === params?.expenseId);

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        isEdit={isEdit}
        onSubmit={confirmHandler}
        selectedExpense={selectedExpense}
      />
      {isEdit && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={removeExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
