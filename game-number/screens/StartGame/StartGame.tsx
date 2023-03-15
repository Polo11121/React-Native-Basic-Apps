import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { InstructionText } from "../../components/InstructionText/InstructionText";
import { Title } from "../../components/Title/Title";
import { Colors } from "../../constants/colors";

export const StartGame = ({
  onGameStart,
}: {
  onGameStart: (chosenNumber: number) => void;
}) => {
  const [guessedNumber, setGuessedNumber] = useState<string>("");

  const { height: deviceHeight } = useWindowDimensions();

  const guessedNumberHandler = (text: string) => setGuessedNumber(text);

  const resetHandler = () => guessedNumberHandler("");

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(guessedNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetHandler,
          },
        ]
      );
      return;
    }

    onGameStart(chosenNumber);
  };

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View
          style={[
            styles.rootContainer,
            { marginTop: deviceHeight < 380 ? 30 : 100 },
          ]}
        >
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              onChangeText={guessedNumberHandler}
              maxLength={2}
              style={styles.numberInput}
              keyboardType="number-pad"
              autoCapitalize="none"
              value={guessedNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <Button title="Reset" onPress={resetHandler} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Confirm" onPress={confirmInputHandler} />
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  rootContainer: { flex: 1, alignItems: "center", marginTop: 100 },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    borderBottomWidth: 2,
    marginVertical: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: { flex: 1 },
});
