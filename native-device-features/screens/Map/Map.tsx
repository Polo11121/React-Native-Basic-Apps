import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MapPressEvent } from "react-native-maps/lib/MapView.types";
import { RootStackParamList } from "../../App";
import { IconButton } from "../../components/IconButton/IconButton";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

export const Map = ({ navigation, route }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const initialLocation = route.params?.initialLocation;

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    if (initialLocation) {
      return;
    }

    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location selected",
        "Please select a location on the map"
      );

      return;
    }

    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    if (selectedLocation) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="save"
            onClick={savePickedLocationHandler}
            size={24}
            color={tintColor}
          />
        ),
      });
    }
  }, [
    selectedLocation,
    navigation,
    savePickedLocationHandler,
    initialLocation,
  ]);

  const location = initialLocation || selectedLocation;

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {location && <Marker title="Picked Location" coordinate={location} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
