import { useState } from "react";
import { authenticate } from "../api/auth";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuth } from "../store/auth-context";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();

  const loginHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await authenticate(email, password, true);
      setToken(token);
    } catch (err) {
      Alert.alert(
        "Authentication failed",
        "Please check your entered credentials."
      );
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingOverlay message="Logging you in..." />
  ) : (
    <AuthContent isLogin onAuthenticate={loginHandler} />
  );
}

export default LoginScreen;
