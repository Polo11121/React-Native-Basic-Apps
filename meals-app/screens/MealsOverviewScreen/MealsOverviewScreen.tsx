import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { RootStackParamList } from "../../App";
import { MealsList } from "../../components/MealsList/MealsList";
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

  return <MealsList meals={displayedMeals} />;
};
