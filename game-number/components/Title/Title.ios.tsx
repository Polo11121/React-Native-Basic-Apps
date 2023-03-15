import React from "react";
import { StyleSheet, Text } from "react-native";

export const Title = ({ children }: { children: string }) => (
  <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
