import { ReactNode } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

export const Card = ({ children }: { children: ReactNode }) => (
  <View style={styles.cardContainer}>{children}</View>
);

const { width: deviceWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 8,
    marginTop: deviceWidth < 380 ? 18 : 36,
    backgroundColor: Colors.primary700,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
