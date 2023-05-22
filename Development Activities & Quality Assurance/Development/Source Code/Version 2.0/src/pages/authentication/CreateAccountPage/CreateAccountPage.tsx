import './CreateAccountPage.scss'
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { logout, auth, googleProvider } from 'src/configs/firebase';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import HomeIcon from "src/assets/images/HomeIcon.svg";

import { Button } from 'src/components/common';
import DemoImage from "src/assets/images/DemoBackground.png";
import Logo from "src/assets/images/Logo.svg";
import GoogleLogo from "src/assets/images/GoogleLogo.svg";
import { ADMIN_EMAILS, APP_NAME } from 'src/configs/constants';
import { validateEmail } from 'src/helpers/validate';
import { useAppDispatch } from 'src/redux/store';
import { resetToInitialStateAuthSlice, setStateAuth } from 'src/redux/slice';
import { useTranslation } from "react-i18next";

export const CreateAccountPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  document.title = `${APP_NAME} | ${t('create_account_page.title')}`

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
  }, []);

  // Functions
  const validateAndRegister = async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (name.length === 0) {
      setNameError(t('create_account_page.messages.fill_name'));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t('create_account_page.messages.invalid_email'));
      return;
    }

    if (password.length < 6) {
      setPasswordError(t('create_account_page.messages.invalid_password'));
      return;
    }

    if (confirmPassword.length < 6) {
      setConfirmPasswordError(t('create_account_page.messages.invalid_confirmation'));
      return;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError(t('create_account_page.messages.invalid_confirmation'));
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

    await createUserWithEmailAndPassword(auth, email, password)
      .then((user: any) => {
        if (auth.currentUser) {
          sendEmailVerification(auth.currentUser)
            .then((result: any) => {
              MySwal.close();

              MySwal.fire({
                icon: 'success',
                title: 'Success...',
                text: t('create_account_page.messages.account_created'),
              })
                .then(() => {
                  logout();
                  dispatch(resetToInitialStateAuthSlice())
                  history.push("/", { isRedirect: true });
                  return;
                })
            })
            .catch((err: any) => {
              MySwal.fire({
                icon: 'error',
                title: t('error'),
                text: err.message,
              })
            });
        }
      })
      .catch((error: any) => {
        MySwal.close();

        if (error.code == "auth/missing-email") {
          MySwal.fire({
            icon: 'error',
            title: t('error'),
            text: t('create_account_page.messages.type_in_email'),
          })
          setEmailError(t('create_account_page.messages.type_in_email'));
          return;
        }
        if (error.code == "auth/invalid-email") {
          MySwal.fire({
            icon: 'error',
            title: t('error'),
            text: t('create_account_page.messages.invalid_email'),
          })
          setEmailError(t('create_account_page.messages.invalid_email'));
          return;
        }
        if (error.code == "auth/email-already-in-use") {
          MySwal.fire({
            icon: 'error',
            title: t('error'),
            text: t('create_account_page.messages.duplicated_email'),
          })
          setEmailError(t('create_account_page.messages.duplicated_email'));
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
          email: user.email,
          profileImage: user.photoURL,
          firebaseId: user.uid,
          isAdmin: ADMIN_EMAILS.includes(user.email),
        }
      }))

      history.push("/", { isRedirect: true })
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
      aria-label="create-account-page"
      className="create-account-page grid grid-cols-5">
      <div className="create-account-page__section create-account-page__section--main col-span-2 flex-center">
        <div className="create-account-page__home-icon"
          onClick={() => history.push("/", { isRedirect: true })}>
          <img src={HomeIcon}></img>
        </div>

        <img className="create-account-page__image--logo" src={Logo}
          onClick={() => history.push("/", { isRedirect: true })}></img>

        <h1 className="create-account-page__title">{t('create_account_page.title')}</h1>

        <div className="create-account-page__subtitle">
          {t('create_account_page.already_have_account')} <a href="/login">{t('create_account_page.click_here')}</a>
        </div>

        <TextField
          className="create-account-page__input create-account-page__input--name"
          name="name"
          label={t('create_account_page.fields.name')}
          margin="normal"
          variant="standard"
          sx={style}
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          type="text"
          fullWidth
          error={nameError !== ""}
          helperText={nameError} />

        <TextField
          className="create-account-page__input create-account-page__input--email"
          name="email"
          label={t('create_account_page.fields.email')}
          margin="normal"
          variant="standard"
          sx={style}
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          type="email"
          fullWidth
          error={emailError !== ""}
          helperText={emailError} />

        <div className="grid grid-cols-2 w-full gap-x-2">
          <div className="col-span-1">
            <TextField
              className="create-account-page__input create-account-page__input--password"
              name="password"
              label={t('create_account_page.fields.password')}
              margin="normal"
              variant="standard"
              sx={style}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              type="password"
              fullWidth
              error={passwordError !== ""}
              helperText={passwordError} />
          </div>

          <div className="col-span-1">
            <TextField
              className="create-account-page__input create-account-page__input--confirm-password"
              name="confirm-password"
              label={t('create_account_page.fields.confirm_password')}
              margin="normal"
              variant="standard"
              sx={style}
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              type="password"
              fullWidth
              error={confirmPasswordError !== ""}
              helperText={confirmPasswordError} />
          </div>
        </div>

        <Button
          theme="filled"
          caption={t('create_account_page.button_captions.create_account')}
          name="create-account"
          onClick={() => {
            validateAndRegister();
          }}
        />

        <Button
          theme="blank"
          logo={GoogleLogo}
          caption={t('create_account_page.button_captions.sign_up_with_google')}
          name="login"
          onClick={signInWithGoogle}
        />
      </div>

      <div className="create-account-page__section create-account-page__section--image col-span-3">
        <img className="create-account-page__image--demo" src={DemoImage}></img>
      </div>
    </div >
  );
};
