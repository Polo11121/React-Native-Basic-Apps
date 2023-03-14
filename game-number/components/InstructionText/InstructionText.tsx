import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Colors } from "../../constants/colors";

export const InstructionText = ({
  children,
  style,
}: {
  children: string;
  style?: StyleProp<TextStyle>;
}) => <Text style={[style, styles.instructionText]}>{children}</Text>;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
    textAlign: "center",
  },
});
