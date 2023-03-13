import { View, Text, StyleSheet, Pressable } from "react-native";

export const GoalItem = ({
  goal,
  onDeleteGoal,
}: {
  goal: { text: string; id: string };
  onDeleteGoal: (goalId: string) => void;
}) => (
  <View style={styles.goalItem}>
    <Pressable
      android_ripple={{ color: "#ddd" }}
      onPress={() => onDeleteGoal(goal.id)}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
    >
      <Text style={{ color: "white", padding: 8 }} key={goal.text}>
        {goal.text}
      </Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    color: "white",
  },
});
