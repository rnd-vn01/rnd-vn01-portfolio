import { login } from "src/helpers/api/auth";
import store from "src/redux/store"

export const getAccessToken = () => {
  return localStorage.getItem("accessToken") || ""
}

export const refreshAccessToken = async () => {
  const user = store.getState().authSlice;

  if (user.isLoggedIn) {
    await login(user.user.firebaseId)
  }
}
