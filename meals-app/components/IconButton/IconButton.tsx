import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
};

export const IconButton = ({ icon, color, onPress }: IconButtonProps) => (
  <Pressable
    style={({ pressed }) => pressed && styles.pressed}
    onPress={onPress}
    android_ripple={{ color: "white" }}
  >
    <Ionicons name={icon} size={24} color={color} />
  </Pressable>
);

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
