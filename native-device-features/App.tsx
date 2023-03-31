import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AllPlaces } from "./screens/AllPlaces/AllPlaces";
import { AddPlace } from "./screens/AddPlace/AddPlace";
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { IconButton } from "./components/IconButton/IconButton";
import { Colors } from "./constants/colors";
import { Map } from "./screens/Map/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";
import { PlaceDetails } from "./screens/PlaceDetails/PlaceDetails";
import { SelectedLocation } from "./types/types";

export type RootStackParamList = {
  AllPlaces: undefined;
  Map?: {
    initialLocation: {
      latitude: number;
      longitude: number;
    };
  };
  PlaceDetails: { placeId: string };
  AddPlace?: {
    pickedLocation: {
      latitude: number;
      longitude: number;
    };
  };
};

export type NavigationProps = NavigationProp<RootStackParamList>;

export type RouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

export default function App() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    init()
      .then(() => setIsDbInitialized(true))
      .catch((error) => console.log(error));
  }, []);

  return isDbInitialized ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.gray700,
          contentStyle: {
            backgroundColor: Colors.gray700,
          },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: "Your Favorite Places",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                color={tintColor}
                size={24}
                onClick={() => navigation.navigate("AddPlace")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          options={{ title: "Add a new Place" }}
          component={AddPlace}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            title: "Loading...",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
}

const styles = StyleSheet.create({});
