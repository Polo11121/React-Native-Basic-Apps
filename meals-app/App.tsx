import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CategoriesScreen } from "./screens/CategoriesScreen/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MealsOverviewScreen } from "./screens/MealsOverviewScreen/MealsOverviewScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MealDetailScreen } from "./screens/MealDetailScreen/MealDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FavoritesScreen } from "./screens/FavoritesScreen/FavoritesScreen";
import { FavoritesContextProvider } from "./store/context/favorites-context";
import { store } from "./store/redux/store";
import { Provider } from "react-redux";

export type RootStackParamList = {
  Drawer: undefined;
  MealDetail: { mealId: string };
  MealsOverview: { categoryId: string; categoryTitle: string };
};

export type DrawerStackParamList = {
  Categories: undefined;
  MealsOverview: { categoryId: string; categoryTitle: string };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<DrawerStackParamList>();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "#fff",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#3f2f25" },
        drawerInactiveTintColor: "#fff",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#fff",
      }}
    >
      <Drawer.Screen
        options={{ title: "All Categories", drawerIcon: () => <Text>🍔</Text> }}
        name="Categories"
        component={CategoriesScreen}
      />
      <Drawer.Screen
        options={{ drawerIcon: () => <Text>⭐</Text> }}
        name="Favorites"
        component={FavoritesScreen}
      />
    </Drawer.Navigator>
  );
};

const App = () => (
  // <FavoritesContextProvider>
  <Provider store={store}>
    <StatusBar style="light" />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#351401" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#3f2f25" },
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Drawer"
          component={DrawerNavigator}
        />
        <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
        <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  // </FavoritesContextProvider>
);

export default App;
