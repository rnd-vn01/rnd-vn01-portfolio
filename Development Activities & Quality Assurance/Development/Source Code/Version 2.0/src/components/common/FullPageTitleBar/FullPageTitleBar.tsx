import './FullPageTitleBar.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Logo from "src/assets/images/Logo.svg";
import { logout } from 'src/configs/firebase';
import { resetToInitialStateAuthSlice } from 'src/redux/slice';
import { useTranslation } from "react-i18next";
import HomeIcon from "src/assets/images/HomeIcon.svg";

export const FullPageTitleBar: React.FC<IFullPageTitleBar> = ({
  translateCode
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );
  const { t, i18n } = useTranslation();

  const MENU_ITEMS = [
    {
      item: t('title_bar.menu.personal_records'),
      onClick: () => {
        history.push("/records")
      },
      selectable: isLoggedIn,
      code: "personal_records"
    },
    {
      item: t('title_bar.menu.data_management'),
      onClick: () => {
        history.push("/data")
      },
      selectable: user && user?.isAdmin,
      code: "data_management"
    },
    {
      item: t('auth_bar.menu.edit_profile'),
      onClick: () => {
        history.push("/edit-profile")
      },
      selectable: isLoggedIn,
      code: "edit_profile"
    },
    {
      item: t('title_bar.menu.log_out'),
      onClick: () => {
        logout();
        dispatch(resetToInitialStateAuthSlice());
        history.push("/", { isRedirect: true })
      },
      selectable: isLoggedIn,
      code: "log_out"
    },
    {
      item: t('title_bar.menu.sign_up'),
      onClick: () => {
        history.push("/signup")
      },
      selectable: !isLoggedIn,
      code: "sign_up"
    },
    {
      item: t('title_bar.menu.log_in'),
      onClick: () => {
        history.push("/login")
      },
      selectable: !isLoggedIn,
      code: "log_in"
    },
  ]

  return (
    <div
      role="div"
      aria-label="title-bar"
      className="title-bar">
      <div
        role="div"
        aria-label="title-bar-home-icon"
        className="title-bar__home-icon"
        onClick={() => history.push("/", { isRedirect: true })}>
        <img src={HomeIcon}></img>
      </div>

      <div className="w-full h-full inline-flex items-center justify-end">
        <h1 className="title-bar__page-title">
          {
            t(`title_bar.pages.${translateCode || "default"}`).split(" ").map((word, index) => {
              return <h1
                key={`word-${index}`}
                role={"h1"}
                aria-label={`word-${index}`}
                className={`${index === 0 ? "title-bar__page-title--bg" : ""}`}>{index !== 0 && " "} {word}</h1>
            })
          }
        </h1>
        <span className="title-bar__menu">
          <div
            role="div"
            aria-label="title-bar-logo"
            className="title-bar__menu--button-logo inline-flex w-fit h-full flex-center"
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
            <img src={Logo} className="title-bar__menu--image-logo"></img>
          </div>
        </span>

        <div
          role="div"
          aria-label="title-bar-dropdown"
          className={`title-bar__dropdown w-fit h-fit flex flex-col items-end justify-center
                p-1 ${!isOpenDropdown && "title-bar__dropdown--hide"}`}>
          {MENU_ITEMS.map((item, index) => {
            if (item.selectable) {
              return (
                <div
                  className={`title-bar__dropdown--item w-fit 
                  ${item.code === translateCode ? "title-bar__dropdown--selected-item" : ""}`}
                  onClick={item.onClick}
                  role="menu-item"
                  aria-label={`menu-item-${item.item}`}
                  key={`menu - ${index} `}>
                  {item.item}
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  );
};
