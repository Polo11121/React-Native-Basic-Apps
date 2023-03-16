import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";

type MealDetailsProps = {
  duration: string;
  complexity: string;
  affordability: string;
  style?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
};
export const MealDetails = ({
  duration,
  complexity,
  affordability,
  style,
  textStyle,
}: MealDetailsProps) => (
  <View style={[styles.details, style]}>
    <Text style={[styles.detail, textStyle]}>{duration}m</Text>
    <Text style={[styles.detail, textStyle]}>{complexity.toUpperCase()}</Text>
    <Text style={[styles.detail, textStyle]}>
      {affordability.toUpperCase()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 4,
  },
  detail: {
    fontSize: 12,
  },
});
