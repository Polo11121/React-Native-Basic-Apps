import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

export const Card = ({ children }: { children: ReactNode }) => (
  <View style={styles.cardContainer}>{children}</View>
);

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 8,
    marginTop: 36,
    backgroundColor: Colors.primary700,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
