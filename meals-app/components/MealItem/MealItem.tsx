import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MealDetails } from "../MealDetails/MealDetails";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type MealItemProps = {
  title: string;
  id: string;
  imageUrl: string;
  duration: string;
  complexity: string;
  affordability: string;
};

export const MealItem = ({
  title,
  id,
  imageUrl,
  duration,
  complexity,
  affordability,
}: MealItemProps) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.mealItem}>
      <Pressable
        onPress={() => navigate("MealDetail", { mealId: id })}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [pressed && styles.buttonPressed]}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            affordability={affordability}
            complexity={complexity}
            duration={duration}
          />
        </View>
      </Pressable>
    </View>
  );
};
const { OS } = Platform;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  buttonPressed: { opacity: 0.5 },
  mealItem: {
    margin: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    overflow: OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
  },
  innerContainer: {
    overflow: "hidden",
    borderRadius: 8,
  },
});
