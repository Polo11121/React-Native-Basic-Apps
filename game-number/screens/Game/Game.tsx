import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { InstructionText } from "../../components/InstructionText/InstructionText";
import { NumberContainer } from "../../components/NumberContainer/NumberContainer";
import { Title } from "../../components/Title/Title";
import { GuessLogItem } from "../../components/GuessLogItem/GuessLogItem";

interface GameProps {
  userNumber: number;
  onGameOver: () => void;
  onNextGuess: () => void;
}

const generateRandomNumber = (
  min: number,
  max: number,
  exclude: number
): number => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  }

  return randomNumber;
};

export const Game = ({ userNumber, onGameOver, onNextGuess }: GameProps) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  const nextGuessHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    const nextGuess =
      direction === "lower"
        ? generateRandomNumber(1, currentGuess, currentGuess)
        : generateRandomNumber(currentGuess + 1, 100, currentGuess);

    onNextGuess();
    setCurrentGuess(nextGuess);
    setGuessRounds((prev) => [nextGuess, ...prev]);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title={<Ionicons size={24} name="md-remove" color="white" />}
              onPress={() => nextGuessHandler("lower")}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={<Ionicons size={24} name="md-add" color="white" />}
              onPress={() => nextGuessHandler("greater")}
            />
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRounds.length - index}
              guess={item}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 32,
  },
  buttonsContainer: { flexDirection: "row" },
  buttonContainer: { flex: 1 },
  instructionText: { marginBottom: 12 },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
