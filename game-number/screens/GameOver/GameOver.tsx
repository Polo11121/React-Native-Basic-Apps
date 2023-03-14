import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button/Button";
import { Title } from "../../components/Title/Title";
import { Colors } from "../../constants/colors";

interface GameOverProps {
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}

export const GameOver = ({
  roundsNumber,
  userNumber,
  onRestart,
}: GameOverProps) => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <Button title="Start New Game" onPress={onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignContent: "center",
    justifyContent: "center",
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 2,
    borderColor: Colors.primary800,
    width: 300,
    height: 300,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
