import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Button } from "../Button/Button";

export const ErrorOverlay = ({
  message,
  onConfirm,
}: {
  message: string;
  onConfirm: () => void;
}) => (
  <View style={styles.container}>
    <Text style={[styles.text, styles.title]}>An error occurred!</Text>
    <Text style={styles.title}>{message}</Text>
    <Button onPress={onConfirm}>Okay</Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
