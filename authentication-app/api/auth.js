import { API_KEY, API_URL } from "@env";
import axios from "axios";

export const authenticate = async (email, password, isLogin) => {
  const url = `${API_URL}:${
    isLogin ? "signInWithPassword" : "signUp"
  }?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
};
