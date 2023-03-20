import { FlatList, StyleSheet, View } from "react-native";
import { MealItem } from "../MealItem/MealItem";
import Meal from "../../models/meal";

export const MealsList = ({ meals }: { meals: Meal[] }) => (
  <View style={styles.container}>
    <FlatList
      data={meals}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <MealItem {...item} />}
    />
  </View>
);

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
