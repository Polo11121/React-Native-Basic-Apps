import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StartGame } from "./screens/StartGame/StartGame";
import { LinearGradient } from "expo-linear-gradient";
import { Game } from "./screens/Game/Game";
import { Colors } from "./constants/colors";
import { GameOver } from "./screens/GameOver/GameOver";
import AppLoading from "expo-app-loading";

export const App = () => {
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [guessRounds, setGuessRounds] = useState<number>(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const startGameHandler = (chosenNumber: number) =>
    setUserNumber(chosenNumber);

  const gameIsOverHandler = () => setIsGameOver(true);

  const increaseRoundsHandler = () => setGuessRounds((prev) => prev + 1);

  const restartGameHandler = () => {
    setUserNumber(null);
    setIsGameOver(false);
    setGuessRounds(0);
  };

  let screen = <StartGame onGameStart={startGameHandler} />;

  if (userNumber) {
    screen = (
      <Game
        userNumber={userNumber}
        onGameOver={gameIsOverHandler}
        onNextGuess={increaseRoundsHandler}
      />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOver
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onRestart={restartGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      {fontsLoaded ? (
        <LinearGradient
          colors={[Colors.primary700, Colors.accent500]}
          style={styles.rootScreen}
        >
          <ImageBackground
            source={require("./assets/images/background.png")}
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
            <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
          </ImageBackground>
        </LinearGradient>
      ) : (
        <AppLoading />
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  rootScreen: { flex: 1 },
  backgroundImage: { opacity: 0.25, resizeMode: "cover" },
});
