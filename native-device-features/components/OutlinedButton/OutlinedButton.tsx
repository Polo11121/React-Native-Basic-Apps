import { StyleSheet, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export const OutlinedButton = ({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  children: string;
}) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    onPress={onClick}
  >
    <Ionicons
      style={styles.icon}
      name={icon}
      size={18}
      color={Colors.primary500}
    />
    <Text style={styles.text}>{children}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: Colors.primary500,
  },
});
