import { View, Text, StyleSheet } from "react-native";

export const List = ({ items }: { items: string[] }) => (
  <>
    {items?.map((item) => (
      <View style={styles.listItem} key={item}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
