import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const IconButton = ({
  onClick,
  icon,
  size,
  color,
}: {
  onClick: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
}) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    onPress={onClick}
  >
    <Ionicons color={color} size={size} name={icon} />
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
