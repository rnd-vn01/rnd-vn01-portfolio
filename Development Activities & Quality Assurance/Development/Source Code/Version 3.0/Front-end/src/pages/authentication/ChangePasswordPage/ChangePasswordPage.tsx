import './ChangePasswordPage.scss'
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { sendPasswordReset, auth } from 'src/configs/firebase';
import { useHistory, useLocation } from 'react-router-dom';
import HomeIcon from "src/assets/images/HomeIcon.svg";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import { Button } from 'src/components/common';

// Assets
import DemoImage from "src/assets/images/DemoBackground.png";
import Logo from "src/assets/images/Logo.svg";
import { APP_NAME } from 'src/configs/constants';
import { validateEmail } from 'src/helpers/validate';
import { useAppDispatch } from 'src/redux/store';
import { useTranslation } from "react-i18next";
import { useMediaQuery } from 'react-responsive';

export const ChangePasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation() as any;
  const { t, i18n } = useTranslation();

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  document.title = `${APP_NAME} | ${t('password_reset_page.title')}`

  // Override Material UI class
  const style = {
    "& label.Mui-focused": {
      color: "#93895E"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#93895E"
    },
  }

  // Functions
  const validate = async () => {
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError(t('login_page.messages.invalid_email'));
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

    await sendPasswordReset(email)
      .then(async (result: any) => {
        MySwal.close();

        MySwal.fire({
          icon: 'success',
          title: 'Success...',
          text: t('password_reset_page.messages.reset_email_sent'),
        })
          .then(() => {
            history.push("/", { isRedirect: true });
            return;
          })
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

        MySwal.fire({
          icon: 'error',
          title: t('error'),
          text: error.message,
        })
        return;
      });
  }

  return (
    <div
      role="div"
      aria-label="password-reset-page"
      className={`password-reset-page grid ${isMobile ? "grid-cols-2" : "grid-cols-5"}`}>
      <div className="password-reset-page__section password-reset-page__section--main col-span-2 flex-center">
        <div className="password-reset-page__home-icon"
          onClick={() => history.push("/", { isRedirect: true })}>
          <img src={HomeIcon}></img>
        </div>

        <img className="password-reset-page__image--logo" src={Logo}
          onClick={() => history.push("/", { isRedirect: true })}></img>

        <h1 className="password-reset-page__title">{t('password_reset_page.title')}</h1>

        <div className="password-reset-page__subtitle">
          {t('password_reset_page.login')} <a href="/login">{t('login_page.click_here')}</a>
        </div>

        <TextField
          className="password-reset-page__input password-reset-page__input--email"
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
          helperText={emailError}
          inputProps={{
            "data-testid": "input-email",
          }} />

        <Button
          theme="filled"
          caption={t('password_reset_page.button_captions.reset_password')}
          name="change-password"
          onClick={() => {
            validate();
          }}
        />
      </div>

      {!isMobile && <div className="password-reset-page__section password-reset-page__section--image col-span-3">
        <img className="password-reset-page__image--demo" src={DemoImage}></img>
      </div>}
    </div>
  );
};
