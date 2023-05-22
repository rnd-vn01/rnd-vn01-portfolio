import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  onAuthStateChanged
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyRlZGGJrwMswL8n68yAMkItWDhoOSBrI",
  authDomain: "vn01-staging.firebaseapp.com",
  projectId: "vn01-staging",
  storageBucket: "vn01-staging.appspot.com",
  messagingSenderId: "935886942779",
  appId: "1:935886942779:web:d53b2a6f21010f94fee21e"
};

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const app = initializeApp(firebaseConfig);
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
