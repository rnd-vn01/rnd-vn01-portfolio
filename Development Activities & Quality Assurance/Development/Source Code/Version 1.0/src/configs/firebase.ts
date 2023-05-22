import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  onAuthStateChanged
}
  from "firebase/auth";
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

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
  } catch (err: any) {
    MySwal.fire({
      icon: 'error',
      title: 'Error...',
      text: err.message,
    })
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((user: any) => {
      if (auth.currentUser) {
        sendEmailVerification(auth.currentUser)
          .then((result: any) => {
          })
          .catch((err: any) => {
            MySwal.fire({
              icon: 'error',
              title: 'Error...',
              text: err.message,
            })
          });
      }
    });
};

const sendVerificationEmail = async (user: any) => {
  return sendEmailVerification(user);
}

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    MySwal.fire({
      icon: 'error',
      title: 'Error...',
      text: err.message,
    })
  }
};

const logout = () => {
  signOut(auth);
};

const storage = getStorage(app);

export {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendVerificationEmail,
  onAuthStateChanged,
  storage,
  googleProvider
};
