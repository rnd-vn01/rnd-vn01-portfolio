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
import { useMediaQuery } from 'react-responsive';
import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'src/configs/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { updateProfile } from 'src/helpers/api/auth';

export const EditProfilePage: React.FC = ({

}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

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
      setImage(user?.profileImage || "");
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
  const [image, setImage] = useState<string>("");
  const [calledUpdated, setCalledUpdated] = useState<boolean>(false);

  //Errors
  const [emailError, setEmailError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  const handleInputChange = async (e: any) => {
    //Upload images to firebase
    Array.from(e.target.files).forEach(async (file: any) => {
      let uploadPromise = upload(file).then((url: any) => {
        setImage(url.default);
        setImageError("");
      })

      toast.promise(
        uploadPromise,
        {
          pending: t('toast.pending'),
          success: t('toast.success'),
          error: t('toast.error'),
        },
        {
          success: {
            duration: 5000,
            icon: '🔥',
          },
        } as any
      );
    })
  }

  const upload = async (file: any) => {
    return new Promise((resolve, reject) => {
      setIsUploadingImage(true);
      const storageRef = ref(storage, `/accounts/${file.name}-${Date.now()}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        function (snapshot) {
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        },
        function (error) {
          setIsUploadingImage(false);
          setImageError("Error occured");
          switch (error.code) {
            case "storage/unauthorized":
              reject("User doesn't have permission to access the object");
              break;

            case "storage/canceled":
              reject("User canceled the upload");
              break;

            case "storage/unknown":
              reject("Unknown error occurred, inspect error.serverResponse");
              break;
          }
        },
        function () {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setIsUploadingImage(false);
            resolve({
              default: downloadURL
            });
          })
        }
      );
    })
  }

  const uploadImage = () => {
    document?.getElementById('uploadImage')?.click();
  }

  const validateAndSave = async () => {
    if (name === "") {
      setNameError(t("create_account_page.messages.invalid"));
      return;
    }

    if (image === "" || imageError !== "") {
      setImageError(t("create_account_page.messages.invalid"));
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

    let result = false;
    result = await updateProfile({
      firebase_id: user?.firebaseId,
      email: email,
      image: image,
      name: name,
    })

    if (result) {
      // Handle Update
      dispatch(setStateAuth({
        isLoggedIn: true,
        user: {
          ...user,
          name: name,
          profileImage: image
        }
      }))

      MySwal.fire({
        icon: 'success',
        title: 'Success...',
        text: t('edit_page.update_result.success'),
      })
        .then(() => {
          history.push("/", { isRedirect: true })
          return;
        })
    } else {
      MySwal.fire({
        icon: 'error',
        title: t('error'),
        text: t('edit_page.update_result.failed'),
      })
    }
  }

  return (
    <div
      role="div"
      aria-label="edit-profile-page"
      className="edit-profile-page">
      <div className="edit-profile-page__content">
        {isDesktop ? <FullPageTitleBar
          pageCode="edit-profile"
          translateCode="edit_profile"
        /> :
          <MobileTitleBar
            translateCode={"edit_profile"}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu} />}

        {!isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>}

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

        <div className="edit-profile-page__image--block">
          <img className="edit-profile-page__image"
            src={image}
            onClick={() => uploadImage()}
          >

          </img>
          <p className="edit-profile-page__image--error">{imageError}</p>
        </div>

        <input style={{ display: "none" }} type='file' id="uploadImage" name="uploadImage"
          accept="image/png, image/jpeg"
          onChange={handleInputChange} />

        <Button
          theme="filled"
          caption={t('edit_profile_page.button_captions.update_profile')}
          name="update-profile"
          isDisabled={isUploadingImage}
          onClick={() => {
            if (!isUploadingImage) {
              validateAndSave();
            }
          }}
        />
      </div>

      <ToastContainer />
    </div>
  );
};
