import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface InputProps {
  label: string;
  textInputConfig: TextInputProps;
  style?: StyleProp<ViewStyle>;
  isInvalid: boolean;
}

export const Input = ({
  label,
  textInputConfig,
  style,
  isInvalid,
}: InputProps) => (
  <View style={[styles.inputContainer, style]}>
    <Text style={[styles.label, isInvalid && styles.invalidLabel]}>
      {label}
    </Text>
    <TextInput
      style={[
        styles.input,
        textInputConfig?.multiline && styles.inputMultiline,
        isInvalid && styles.invalidInput,
      ]}
      {...textInputConfig}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: { marginHorizontal: 4, marginVertical: 16 },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: { minHeight: 100, textAlignVertical: "top" },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
