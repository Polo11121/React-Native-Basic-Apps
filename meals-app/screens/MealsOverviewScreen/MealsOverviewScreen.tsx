import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../App";
import { MealItem } from "../../components/MealItem/MealItem";
import { MEALS } from "../../data/dummy-data";

type MealsOverviewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MealsOverview"
>;

export const MealsOverviewScreen = ({
  route,
  navigation,
}: MealsOverviewScreenProps) => {
  const { categoryId, categoryTitle } = route.params;

  const displayedMeals = MEALS.filter(({ categoryIds }) =>
    categoryIds.includes(categoryId)
  );

  useLayoutEffect(
    () => navigation.setOptions({ title: categoryTitle }),
    [categoryTitle]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <MealItem {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
