import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NavigationProps } from "../../App";
import { Colors } from "../../constants/colors";
import { Place } from "../../types/types";
import { PlaceItem } from "./PlaceItem";

export const PlacesList = ({ places }: { places: Place[] }) => {
  const navigation = useNavigation<NavigationProps>();

  return places?.length ? (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={() =>
            navigation.navigate("PlaceDetails", { placeId: item.id })
          }
        />
      )}
    />
  ) : (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        No places found. Maybe start adding some?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    color: Colors.primary200,
  },
});
