import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "./Input";
import { Button } from "../Button/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { Expense, ExpenseData } from "../../util/types";

interface ExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseData) => void;
  isEdit: boolean;
  selectedExpense?: Expense;
}

interface Inputs {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
}

export const ExpenseForm = ({
  onCancel,
  onSubmit,
  isEdit,
  selectedExpense,
}: ExpenseFormProps) => {
  const [inputs, setInputs] = useState<Inputs>({
    amount: { value: selectedExpense?.amount.toString() || "", isValid: true },
    date: {
      value: selectedExpense?.date
        ? getFormattedDate(selectedExpense?.date)
        : "",
      isValid: true,
    },
    description: { value: selectedExpense?.description || "", isValid: true },
  });

  const inputChangeHandler = (inputName: string, inputValue: string) =>
    setInputs((prevState) => ({
      ...prevState,
      [inputName]: { value: inputValue, isValid: true },
    }));

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevState) => ({
        ...prevState,
        amount: { ...prevState.amount, isValid: amountIsValid },
        date: { ...prevState.date, isValid: dateIsValid },
        description: { ...prevState.description, isValid: descriptionIsValid },
      }));

      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          isInvalid={!inputs.amount.isValid}
          style={{ flex: 1 }}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          isInvalid={!inputs.date.isValid}
          style={styles.inputFlex}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        isInvalid={!inputs.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {isEdit ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputFlex: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
