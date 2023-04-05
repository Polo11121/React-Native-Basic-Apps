import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import Config from "react-native-config";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const configurePushNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("No notification permissions!");
          return;
        }
      }
      const pushTokenData = Notifications.getExpoPushTokenAsync().then(
        (token) => {
          console.log(token);
        }
      );
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    configurePushNotifications();
  }, []);

  const sendPushNotificationHandler = async () => {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `ExponentPushToken[${Config.NOTIFCATION_TOKEN}}]`,
        data: { extraData: "Some data" },
        title: "Sent via the app",
        body: "This push notification was sent via the app!",
      }),
    });
  };

  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        const userName = response.notification.request.content.data?.userName;
        console.log(userName);
      });

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
        const userName = notification.request.content.data?.userName;
        console.log(userName);
      });

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const showNotificationHandler = () =>
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the first local notification we are sending!",
        data: {
          userName: "Max",
        },
      },
      trigger: {
        seconds: 5,
      },
    });

  return (
    <View style={styles.container}>
      <Button title="Show Notification" onPress={showNotificationHandler} />
      <Button title="Send Notification" onPress={sendPushNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
