import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { authenticate } from "../api/auth";
import { useAuth } from "../store/auth-context";

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();

  const signupHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await authenticate(email, password);
      setToken(token);
    } catch (err) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your credentials and try again."
      );
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingOverlay message="Creating user..." />
  ) : (
    <AuthContent onAuthenticate={signupHandler} />
  );
}

export default SignupScreen;
