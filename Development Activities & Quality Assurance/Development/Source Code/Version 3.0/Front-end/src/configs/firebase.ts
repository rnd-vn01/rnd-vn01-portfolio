import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');

const logInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

const logout = () => {
  signOut(auth);
};

const storage = getStorage(app);

export {
  auth,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
  onAuthStateChanged,
  storage,
  googleProvider
};
