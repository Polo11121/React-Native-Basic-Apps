import axios from "axios";

const API_KEY = "AIzaSyB5DxUfWdiJLNKj9kdQVcJZr5DQNCGkKDM";

export const authenticate = async (email, password, isLogin) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
    isLogin ? "signInWithPassword" : "signUp"
  }?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
};
