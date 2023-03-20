import { StyleSheet, Text, View } from "react-native";
import { MealsList } from "../../components/MealsList/MealsList";
import { MEALS } from "../../data/dummy-data";
import { useFavoritesContext } from "../../store/context/favorites-context";
import { selectFavorites } from "../../store/redux/favortiesSlice";
import { useAppSelector } from "../../store/redux/hooks";

export const FavoritesScreen = () => {
  // const { ids } = useFavoritesContext();
  const ids = useAppSelector(selectFavorites);

  const favoritesMeals = MEALS.filter(({ id }) => ids.includes(id));

  return favoritesMeals.length ? (
    <MealsList meals={favoritesMeals} />
  ) : (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>
        No favorite meals found. Start adding some!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
