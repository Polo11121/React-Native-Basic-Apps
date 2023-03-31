import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import { RootStackParamList } from "../../App";
import { OutlinedButton } from "../../components/OutlinedButton/OutlinedButton";
import { Colors } from "../../constants/colors";
import { Place } from "../../types/types";
import { fetchPlaceDetails } from "../../util/database";

type Props = NativeStackScreenProps<RootStackParamList, "PlaceDetails">;

export const PlaceDetails = ({ route, navigation }: Props) => {
  const [placeDetails, setPlaceDetails] = useState<Place | null>(null);
  const { placeId } = route.params;

  useEffect(() => {
    const loadDetails = async () => {
      const place = await fetchPlaceDetails(placeId);
      setPlaceDetails(place);
      navigation.setOptions({ title: place.title });
    };

    loadDetails();
  }, [placeId]);

  const showOnMapHandler = () => {
    if (placeDetails) {
      navigation.navigate("Map", {
        initialLocation: {
          latitude: placeDetails.lat,
          longitude: placeDetails.lng,
        },
      });
    }
  };

  return placeDetails ? (
    <ScrollView>
      <Image source={{ uri: placeDetails.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>
        <OutlinedButton icon="map" onClick={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  ) : (
    <Text style={styles.fallback}>Loading place details...</Text>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
