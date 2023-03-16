import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import { DrawerStackParamList } from "../../App";
import { CategoryGridTile } from "../../components/CategoryGridTile/CategoryGridTile";
import { CATEGORIES } from "../../data/dummy-data";

type CategoriesScreenProps = NativeStackScreenProps<
  DrawerStackParamList,
  "Categories"
>;

export const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => (
  <FlatList
    data={CATEGORIES}
    keyExtractor={({ id }) => id}
    renderItem={({ item }) => (
      <CategoryGridTile
        categoryTitle={item.title}
        color={item.color}
        onPress={() => {
          const params = {
            categoryId: `${item.id}`,
            categoryTitle: `${item.title}`,
          };
          navigation.navigate("MealsOverview", params);
        }}
      />
    )}
    numColumns={2}
  />
);
