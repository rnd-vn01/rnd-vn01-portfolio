import './EditProfilePage.scss'
import React, { useEffect, useState } from 'react';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FullPageTitleBar } from 'src/components/common';
import { TextField } from '@mui/material';
import { Button } from 'src/components/common';
import { setStateAuth } from 'src/redux/slice';

export const EditProfilePage: React.FC = ({

}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  /*
  const { user, isUpdateProfile, updateProfileSuccess } = useSelector(
    (state: RootState) => state.loginSlice,
  );
  */
  const {
    isLoggedIn,
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );


  const MySwal = withReactContent(Swal);
  document.title = `${APP_NAME} | ${t('edit_profile_page.title')}`

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (user?.email) {
      setEmail(user?.email || "");
      setName(user?.name || "");
    }
  }, [user]);

  // Override Material UI class
  const style = {
    "& label.Mui-focused": {
      color: "#93895E"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#93895E"
    },
  }

  //Values
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [calledUpdated, setCalledUpdated] = useState<boolean>(false);

  //Errors
  const [emailError, setEmailError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const validateAndSave = () => {
    if (name === "") {
      setNameError(t("create_account_page.messages.invalid"));
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


    //Valid
    setCalledUpdated(true);

    // Handle updates
    dispatch(setStateAuth({
      isLoggedIn: true,
      user: {
        ...user,
        name: name
      }
    }))

    // TODO: CALL API

    MySwal.close();
    history.push("/", { isRedirect: true })
  }


  return (
    <div
      role="div"
      aria-label="edit-profile-page"
      className="edit-profile-page">
      <div className="edit-profile-page__content">
        <FullPageTitleBar
          pageCode={"edit-profile"}
          translateCode={"edit_profile"}
        />

        <TextField
          className="edit-profile-page__input edit-profile-page__input--email"
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
          disabled />

        <TextField
          className="edit-profile-page__input edit-profile-page__input--name"
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

        <Button
          theme="filled"
          caption={t('edit_profile_page.button_captions.update_profile')}
          name="update-profile"
          onClick={() => {
            validateAndSave();
          }}
        />
      </div>
    </div>
  );
};
