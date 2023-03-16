import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RootStackParamList } from "../../App";
import { IconButton } from "../../components/IconButton/IconButton";
import { List } from "../../components/List/List";
import { MealDetails } from "../../components/MealDetails/MealDetails";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { MEALS } from "../../data/dummy-data";

type MealDetailScreenScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MealDetail"
>;

export const MealDetailScreen = ({
  route,
  navigation,
}: MealDetailScreenScreenProps) => {
  const { mealId } = route.params;

  const mealInfo = MEALS.find(({ id }) => id === mealId);

  const headerButtonHandler = () => {};

  useLayoutEffect(
    () =>
      navigation.setOptions({
        title: mealInfo?.title,
        headerRight: () => (
          <IconButton icon="star" color="white" onPress={headerButtonHandler} />
        ),
      }),
    [navigation, headerButtonHandler]
  );

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: mealInfo?.imageUrl }} />
      <Text style={styles.title}>{mealInfo?.title}</Text>
      <MealDetails
        textStyle={{ color: "white" }}
        affordability={mealInfo?.affordability}
        complexity={mealInfo?.complexity}
        duration={mealInfo?.duration}
      />
      <View style={styles.outerListContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredient</Subtitle>
          <List items={mealInfo?.ingredients as unknown as string[]} />
          <Subtitle>Steps</Subtitle>
          <List items={mealInfo?.steps as unknown as string[]} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: { width: "100%", height: 350 },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    margin: 8,
    color: "white",
  },
  listContainer: {
    width: "80%",
  },
  outerListContainer: {
    alignItems: "center",
  },
});
