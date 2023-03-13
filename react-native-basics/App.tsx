import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Keyboard,
  Button,
} from "react-native";
import { GoalInput } from "./components/GoalInput/GoalInput";
import { GoalItem } from "./components/GoalItem/GoalItem";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [enteredGoal, setEnteredGoal] = useState<string>("");
  const [enteredGoals, setEnteredGoals] = useState<
    { text: string; id: string }[]
  >([]);

  const typeGoalHandler = (enteredText: string) => setEnteredGoal(enteredText);

  const deleteGoalHandler = (goalId: string) =>
    setEnteredGoals((prevState) => prevState.filter(({ id }) => id !== goalId));

  const toggleModalVisibilityHandler = () =>
    setIsModalVisible((prevState) => !prevState);

  const addGoalHandler = () => {
    if (enteredGoal) {
      setEnteredGoals((prevState) => [
        ...prevState,
        { text: enteredGoal, id: Math.random().toString() },
      ]);
      setEnteredGoal("");
      Keyboard.dismiss();
      toggleModalVisibilityHandler();
    }
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={toggleModalVisibilityHandler}
        />

        <GoalInput
          isModalVisible={isModalVisible}
          toggleModalVisibility={toggleModalVisibilityHandler}
          value={enteredGoal}
          onAddGoal={addGoalHandler}
          onChangeGoal={typeGoalHandler}
        />

        <View style={styles.goalsContainer}>
          <Text style={{ color: "white" }}>List of goals...</Text>
          <FlatList
            data={enteredGoals}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <GoalItem onDeleteGoal={deleteGoalHandler} goal={item} />
            )}
          ></FlatList>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 4,
  },
});

export default App;
