import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

interface GoalInputProps {
  onChangeGoal: (text: string) => void;
  onAddGoal: () => void;
  value: string;
  isModalVisible: boolean;
  toggleModalVisibility: () => void;
}

export const GoalInput = ({
  onChangeGoal,
  onAddGoal,
  value,
  isModalVisible,
  toggleModalVisibility,
}: GoalInputProps) => (
  <Modal visible={isModalVisible} animationType="slide">
    <View style={styles.inputContainer}>
      <Image
        style={styles.image}
        source={require("../../assets/images/goal.png")}
      />
      <TextInput
        cursorColor="#5e0acc"
        style={styles.textInput}
        placeholder="Your course goal!"
        onChangeText={onChangeGoal}
        value={value}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button onPress={onAddGoal} color="#5e0acc" title="ADD GOAL" />
        </View>
        <View style={styles.button}>
          <Button
            onPress={toggleModalVisibility}
            color="#f31282"
            title="Cancel"
          />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "",
    backgroundColor: "#311b6b",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  button: { width: "30%" },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    borderRadius: 6,
    padding: 16,
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    margin: 20,
  },
});
