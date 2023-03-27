import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,

  setToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isFetchingToken, setIsFetchingToken] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setUserToken(token);
      }
      setIsFetchingToken(false);
    };

    getToken();
  }, []);

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem("token");
  };

  const setToken = (token) => {
    setUserToken(token);
    AsyncStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{
        token: userToken,
        isAuthenticated: Boolean(userToken),
        setToken,
        logout,
        isFetchingToken,
      }}
    >
      {isFetchingToken ? <AppLoading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
