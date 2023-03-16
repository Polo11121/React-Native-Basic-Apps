import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Subtitle = ({ children }: { children: ReactNode }) => (
  <View style={styles.subtitleContainer}>
    <Text style={styles.subtitle}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: "bold",
    color: "#e2b497",
    fontSize: 18,
    textAlign: "center",
  },
  subtitleContainer: {
    borderBottomColor: "#e2b497",
    borderBottomWidth: 1,
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 6,
  },
});
