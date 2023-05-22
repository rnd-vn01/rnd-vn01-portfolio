import './AuthBar.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Logo from "src/assets/images/Logo.svg";
import { logout } from 'src/configs/firebase';
import { resetToInitialStateAuthSlice } from 'src/redux/slice';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import IconAdmin from 'src/assets/images/IconAdmin.svg';

export const AuthBar: React.FC = ({ }) => {
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
      item: t('auth_bar.menu.data_management'),
      onClick: () => {
        history.push("/data")
      },
      selectable: user && user?.isAdmin,
      divider: false,
    },
    {
      item: t('auth_bar.menu.advanced_search'),
      onClick: () => {
        history.push("/advanced-search")
      },
      selectable: true,
      divider: true,
    },
    {
      item: t('auth_bar.menu.start_quiz'),
      onClick: () => {
        history.push("/quiz")
      },
      selectable: user,
      divider: false,
    },
    {
      item: t('auth_bar.menu.personal_records'),
      onClick: () => {
        history.push("/records")
      },
      selectable: true,
      divider: true,
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
      },
      selectable: true,
      divider: true,
    },
    {
      item: t('auth_bar.menu.edit_profile'),
      onClick: () => {
        history.push("/edit-profile")
      },
      selectable: user,
      divider: false,
    },
    {
      item: t('auth_bar.menu.log_out'),
      onClick: () => {
        history.push("/", { isRedirect: true })
        logout();
        dispatch(resetToInitialStateAuthSlice());
      },
      selectable: true,
      divider: false
    }
  ]

  const GUEST_MENU_ITEMS = [
    {
      item: t('auth_bar.sign_up'),
      onClick: () => {
        history.push("/signup")
      },
      selectable: true,
      divider: false
    },
    {
      item: t('auth_bar.log_in'),
      onClick: () => {
        history.push("/login")
      },
      selectable: true,
      divider: true
    },
    {
      item: t('auth_bar.menu.advanced_search'),
      onClick: () => {
        history.push("/advanced-search")
      },
      selectable: true,
      divider: true,
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
      },
      selectable: true,
      divider: false
    },
  ]

  return (
    <div
      role="div"
      aria-label="auth-bar"
      className="auth-bar">
      <div className="auth-bar__logged-in w-full h-full inline-flex items-center justify-start">
        <span className="auth-bar__menu pr-2">
          <div
            className="auth-bar__menu--button-logo inline-flex w-fit h-full flex-center"
            role="menu-button"
            aria-label="auth-bar-menu-button"
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
            {isLoggedIn ?
              <>
                <img src={Logo} className="auth-bar__menu--image-logo"></img>
                {user.isAdmin && <img src={IconAdmin} className="auth-bar__menu--icon-gear"></img>}
              </>
              :
              <FontAwesomeIcon className="auth-bar__menu--icon" icon={faEllipsisVertical} />}
          </div>
        </span>

        <div className={`auth-bar__dropdown w-fit h-fit flex flex-col items-start justify-center
          p-1 ${!isOpenDropdown && "auth-bar__dropdown--hide"}`}
          role="div"
          aria-label="auth-bar-dropdown">
          {isLoggedIn ? MENU_ITEMS.map((item, index) => {
            if (item.selectable) {
              return (
                <div
                  className='w-full'
                  role="menu-item"
                  aria-label={`menu-item-${item.item}`}
                  key={`menu-${index}`}>
                  <div
                    className="auth-bar__dropdown--item w-fit"
                    role="menu-item-dropdown"
                    aria-label={`menu-item-dropdown-${item.item}`}
                    onClick={item.onClick}>
                    {item.item}
                  </div>
                  {item.divider && <hr className='auth-bar__dropdown--divider w-100' />}
                </div>
              )
            }
          }) :
            GUEST_MENU_ITEMS.map((item, index) => {
              return (
                <div
                  className='w-full'
                  role="menu-item"
                  aria-label={`menu-item-${item.item}`}
                  key={`menu-${index}`}>
                  <div
                    className="auth-bar__dropdown--item w-fit"
                    role="menu-item-dropdown"
                    aria-label={`menu-item-dropdown-${item.item}`}
                    onClick={item.onClick}>
                    {item.item}
                  </div>
                  {item.divider && <hr className='auth-bar__dropdown--divider w-100' />}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};
