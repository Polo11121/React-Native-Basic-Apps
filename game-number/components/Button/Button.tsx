import { ReactNode } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";

export const Button = ({
  title,
  onPress,
}: {
  title: string | ReactNode;
  onPress: () => void;
}) => (
  <View style={styles.buttonOuterContainer}>
    <Pressable
      style={(status) => ({
        ...styles.buttonInnerContainer,
        ...(status.pressed && styles.pressed),
      })}
      onPress={onPress}
      android_ripple={{
        color: Colors.primary600,
      }}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
