import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllExpenses } from "./screens/AllExpenses/AllExpenses";
import { RecentExpenses } from "./screens/RecentExpenses/RecentExpenses";
import { ManageExpenses } from "./screens/ManageExpenses/ManageExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "./components/IconButton/IconButton";
import { ExpensesContextProvider } from "./store/context/expenses-context";

export type RootStackParamList = {
  ExpensesOverview: undefined;
  ManageExpenses: { expenseId?: string };
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "ManageExpenses"
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();

const ExpensesOverview = () => (
  <BottomTab.Navigator
    screenOptions={({ navigation }) => ({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => navigation.navigate("ManageExpenses")}
        />
      ),
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
    })}
  >
    <BottomTab.Screen
      name="RecentExpenses"
      component={RecentExpenses}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hourglass" color={color} size={size} />
        ),
      }}
    />
    <BottomTab.Screen
      options={{
        title: "All Expenses",
        tabBarLabel: "All",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        ),
      }}
      name="AllExpenses"
      component={AllExpenses}
    />
  </BottomTab.Navigator>
);

const App = () => (
  <ExpensesContextProvider>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpenses"
          component={ManageExpenses}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </ExpensesContextProvider>
);

export default App;
