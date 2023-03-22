import { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Props, RootStackParamList } from "../../App";
import { IconButton } from "../../components/IconButton/IconButton";
import { GlobalStyles } from "../../constants/styles";
import { useExpenseContext } from "../../store/context/expenses-context";
import { ExpenseForm } from "../../components/ExpenseForm/ExpenseForm";
import { deleteExpense, storeExpense, patchExpense } from "../../util/https";
import { ExpenseData } from "../../util/types";
import { LoaderOverlay } from "../../components/LoaderOverlay/LoaderOverlay";
import { ErrorOverlay } from "../../components/ErrorOverlay/ErrorOverlay";

export const ManageExpenses = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useRoute<Props["route"]>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { removeExpense, updateExpense, addExpense, expenses } =
    useExpenseContext();

  const isEdit = !!params?.expenseId;

  const removeExpenseHandler = async () => {
    setIsLoading(true);

    try {
      await deleteExpense(params?.expenseId!);
      removeExpense(params?.expenseId!);
      navigation.goBack();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: ExpenseData) => {
    setIsLoading(true);

    try {
      if (isEdit) {
        await patchExpense(params?.expenseId!, expenseData);

        updateExpense(params?.expenseId, {
          ...expenseData,
          id: params?.expenseId!,
        });
      } else {
        const id = await storeExpense(expenseData);

        addExpense({ ...expenseData, id });
      }

      navigation.goBack();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? "Edit Expense" : "Add Expense" });
  }, [navigation, isEdit]);

  const selectedExpense = expenses.find(({ id }) => id === params?.expenseId);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  } else if (isLoading) {
    return <LoaderOverlay />;
  }
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
