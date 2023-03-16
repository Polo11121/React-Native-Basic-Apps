import { Pressable, StyleSheet, Text, View, Platform } from "react-native";

export const CategoryGridTile = ({
  categoryTitle,
  color,
  onPress,
}: {
  categoryTitle: string;
  color: string;
  onPress: () => void;
}) => (
  <View style={styles.gridItem}>
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}
    >
      <View style={[styles.innerContainer, { backgroundColor: color }]}>
        <Text style={styles.title}>{categoryTitle}</Text>
      </View>
    </Pressable>
  </View>
);

const { OS } = Platform;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: OS === "android" ? "hidden" : "visible",
  },
  buttonPressed: { opacity: 0.5 },
  button: { flex: 1 },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
