import './LoginPage.scss'
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, logout, onAuthStateChanged, auth, googleProvider } from 'src/configs/firebase';
import { useHistory, useLocation } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import { Button } from 'src/components/common';

// Assets
import DemoImage from "src/assets/images/Demo.png";
import Logo from "src/assets/images/Logo.svg";
import GoogleLogo from "src/assets/images/GoogleLogo.svg";
import { APP_NAME } from 'src/configs/constants';
import { validateEmail } from 'src/helpers/validate';
import { resetToInitialStateAuthSlice, setStateAuth } from 'src/redux/slice';
import { useAppDispatch } from 'src/redux/store';
import { useTranslation } from "react-i18next";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation() as any;
  const { t, i18n } = useTranslation();

  document.title = `${APP_NAME} | ${t('login_page.title')}`

  // Override Material UI class
  const style = {
    "& label.Mui-focused": {
      color: "#93895E"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#93895E"
    },
  }

  // Hooks
  useEffect(() => {
    logout();
    dispatch(resetToInitialStateAuthSlice())

    if (location?.state?.isRedirect) {
      MySwal.fire({
        icon: 'error',
        title: t('error'),
        text: t('login_page.messages.login_to_continue'),
      })
    }
  }, []);

  // Functions
  const validateLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError(t('login_page.messages.invalid_email'));
      return;
    }

    if (password.length < 6) {
      setPasswordError(t('login_page.messages.invalid_password'));
      return;
    }

    MySwal.fire({
      didOpen: () => {
        MySwal.showLoading(null);
      },
      didClose: () => {
        MySwal.hideLoading();
      },
      allowOutsideClick: false,
    })

    await logInWithEmailAndPassword(email, password)
      .then(async (result: any) => {
        MySwal.close();

        if (!result.user?.emailVerified) {
          MySwal.fire({
            icon: 'error',
            title: t('error'),
            text: t('login_page.messages.not_verified'),
          })
            .then(() => {
              logout();
              dispatch(resetToInitialStateAuthSlice())
              return;
            })
        } else {
          // Valid login
          const user = result.user;
          dispatch(setStateAuth({
            isLoggedIn: true,
            user: {
              email: user.email,
              profileImage: "https://firebasestorage.googleapis.com/v0/b/cs204finalproj.appspot.com/o/istockphoto-1223671392-612x612.jpg?alt=media&token=e9312c19-c34e-4a87-9a72-552532766cde",
              firebaseId: user.uid
            }
          }))
          history.push("/")
        }
      })
      .catch((error: any) => {
        MySwal.close();

        if (error.code === "auth/user-not-found") {
          setEmailError(t('login_page.messages.not_found'))
          MySwal.fire({
            icon: 'error',
            title: t('error'),
            text: t('login_page.messages.not_found'),
          })
          return;
        }

        if (error.code === "auth/invalid-email") {
          setEmailError(t('login_page.messages.invalid_email'));
          MySwal.fire({
            icon: 'error',
            title: t('error'),
            text: t('login_page.messages.invalid_email'),
          })
          return;
        }
        if (error.code === "auth/wrong-password") {
          setPasswordError(t('login_page.messages.invalid_password'));
          MySwal.fire({
            icon: 'error',
            title: t('error'),
            text: t('login_page.messages.invalid_password'),
          })
          return;
        }

        MySwal.fire({
          icon: 'error',
          title: t('error'),
          text: error.message,
        })
        return;
      });
  }

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user as any;

      dispatch(setStateAuth({
        isLoggedIn: true,
        user: {
          name: user.displayName,
          email: user?.reloadUserInfo?.providerUserInfo?.[0].email,
          profileImage: user?.reloadUserInfo?.providerUserInfo?.[0].photoUrl,
          firebaseId: user.uid,
          isAdmin: true,
        }
      }))

      history.push("/")
    } catch (err: any) {
      MySwal.fire({
        icon: 'error',
        title: t('error'),
        text: err.message,
      })
    }
  }

  return (
    <div
      role="div"
      aria-label="login-page"
      className="login-page grid grid-cols-5">
      <div className="login-page__section login-page__section--main col-span-2 flex-center">
        <img className="login-page__image--logo" src={Logo}
          onClick={() => history.push("/")}></img>

        <h1 className="login-page__title">{t('login_page.title')}</h1>

        <div className="login-page__subtitle">
          {t('login_page.dont_have_account')} <a href="/signup">{t('login_page.click_here')}</a>
        </div>

        <TextField
          className="login-page__input login-page__input--email"
          name="email"
          label="Email"
          margin="normal"
          variant="standard"
          sx={style}
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          type="email"
          fullWidth
          error={emailError !== ""}
          helperText={emailError} />

        <TextField
          className="login-page__input login-page__input--password"
          name="password"
          label={t('login_page.fields.password')}
          margin="normal"
          variant="standard"
          sx={style}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          type="password"
          fullWidth
          error={passwordError !== ""}
          helperText={passwordError} />

        <Button
          theme="filled"
          caption={t('login_page.button_captions.login')}
          name="login"
          onClick={() => {
            validateLogin();
          }}
        />

        <Button
          theme="blank"
          logo={GoogleLogo}
          caption={t('login_page.button_captions.sign_in_with_google')}
          name="login"
          onClick={signInWithGoogle}
        />
      </div>

      <div className="login-page__section login-page__section--image col-span-3">
        <img className="login-page__image--demo" src={DemoImage}></img>
      </div>
    </div>
  );
};
