import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../store/auth-context";

function WelcomeScreen() {
  const [message, setMessage] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(
        `https://react-native-course-7f56c-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((response) => setMessage(response.data));
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{message}</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
