import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import { OutlinedButton } from "../OutlinedButton/OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { PermissionStatus } from "expo-modules-core/build/PermissionsInterface";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Location, SelectedLocation } from "../../types/types";
import { NavigationProps, RouteProps } from "../../App";

export const LocationPicker = ({
  onPickLocation,
}: {
  onPickLocation: (location: SelectedLocation) => void;
}) => {
  const [location, setLocation] = useState<null | Location>(null);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation<NavigationProps>();
  const isFocused = useIsFocused();
  const params = useRoute<RouteProps<"AddPlace">>().params;

  const verifyPermission = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Denied",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    const address = await getAddress(
      location.coords.latitude,
      location.coords.longitude
    );

    setLocation(location.coords);
    onPickLocation({ ...location.coords, address });
  };

  const pickOnMapHandler = () => navigation.navigate("Map");

  useEffect(() => {
    const locationHandler = async () => {
      if (params) {
        const address = await getAddress(
          params.pickedLocation.latitude,
          params.pickedLocation.longitude
        );

        setLocation(params.pickedLocation);
        onPickLocation({ ...params.pickedLocation, address });
      }
    };
    locationHandler();
  }, [params, isFocused]);

  return (
    <View>
      <View style={styles.mapPreview}>
        {location ? (
          <Image
            style={styles.image}
            source={{
              uri: getMapPreview(location.latitude, location.longitude),
            }}
          />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>
      <View>
        <View style={styles.actions}>
          <OutlinedButton icon="location" onClick={getLocationHandler}>
            Locate User
          </OutlinedButton>
          <OutlinedButton icon="map" onClick={pickOnMapHandler}>
            Pick on Map
          </OutlinedButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
