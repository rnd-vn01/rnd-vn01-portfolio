import './AuthBar.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { logout } from 'src/configs/firebase';
import { resetToInitialStateAuthSlice, resetToInitialStateDataSlice, setStateLanguage } from 'src/redux/slice';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IconAdmin from 'src/assets/images/IconAdmin.svg';
import { DEFAULT_PROFILE_IMAGE_URL } from 'src/configs/constants';
import { debounce } from "lodash"

export const AuthBar: React.FC = ({ }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [isOpenDropdownLanguage, setisOpenDropdownLanguage] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const menuButtonRef = useRef();
  const menuDropdownRef = useRef();
  const menuLanguageDropdownRef = useRef();
  const mouseOverLanguage = useRef<boolean>(false);
  const {
    isLoggedIn,
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
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
      item: t('auth_bar.menu.manual'),
      onClick: () => {
        history.push("/manual")
      },
      selectable: true,
      divider: false
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
        localStorage.removeItem("accessToken")
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
      item: t('auth_bar.menu.manual'),
      onClick: () => {
        history.push("/manual")
      },
      selectable: true,
      divider: false
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

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const { target } = e

      if ((menuButtonRef as any).current && (menuDropdownRef as any).current) {
        if (!(menuButtonRef as any).current.contains(target)
          && !(menuDropdownRef as any).current.contains(target)) {
          setIsOpenDropdown(false);
        }
      }
    })
  }, []);

  useEffect(() => {
    setisOpenDropdownLanguage(false);
  }, [isOpenDropdown])

  const debounceMouseLeaveLanguage = useCallback(
    debounce(() => {
      if (!mouseOverLanguage.current) {
        setisOpenDropdownLanguage(false);
      }
    }, 100), []);

  const setLanguage = (language: string) => {
    dispatch(setStateLanguage({
      currentLanguage: language
    }))
    i18n.changeLanguage(language.toLowerCase())

    setTimeout(() => {
      dispatch(resetToInitialStateDataSlice(null));
      history.go(0);
    }, 50)
  }

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
            ref={menuButtonRef}
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
            {isLoggedIn ?
              <>
                <img referrerPolicy="no-referrer"
                  data-testid="auth-bar-profile-image"
                  src={user.profileImage || DEFAULT_PROFILE_IMAGE_URL} className="auth-bar__menu--image-logo"></img>
                {user.isAdmin && <img src={IconAdmin} className="auth-bar__menu--icon-gear"></img>}
              </>
              :
              <FontAwesomeIcon className="auth-bar__menu--icon" icon={faEllipsisVertical} />}
          </div>
        </span>

        <div
          ref={menuDropdownRef}
          className={`auth-bar__dropdown w-fit h-fit flex flex-col items-start justify-center
          p-1 ${!isOpenDropdown && "auth-bar__dropdown--hide"}`}
          role="div"
          aria-label="auth-bar-dropdown">
          <div
            className='w-full'
            role="menu-item"
            aria-label={`menu-item-language`}
            key={`menu-lanugage`}
            onMouseEnter={() => setisOpenDropdownLanguage(true)}
            onMouseLeave={() => debounceMouseLeaveLanguage()}>
            <div
              className="auth-bar__dropdown--item w-fit"
              role="menu-item-dropdown"
              aria-label={`menu-item-dropdown-language`}>
              <span className='w-100 flex justify-between'>
                {t('auth_bar.menu.language')}

                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='auth-bar__dropdown--item-icon'
                ></FontAwesomeIcon>
              </span>
            </div>

            <hr className='auth-bar__dropdown--divider w-100' />
          </div>
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

          <div
            className={`auth-bar__dropdown--language 
              ${!isOpenDropdownLanguage && "auth-bar__dropdown--language--hide"}`}
            ref={menuLanguageDropdownRef}
            onMouseEnter={() => mouseOverLanguage.current = true}
            onMouseLeave={() => {
              mouseOverLanguage.current = false;
              setisOpenDropdownLanguage(false);
            }}
            role="div"
            aria-label="dropdown-language"
          >
            <div
              className='w-full'
              role="menu-item"
              aria-label={`menu-item-language-en`}
              key={`menu-lanugage-en`}>
              <div
                className={`auth-bar__dropdown--language--item w-fit
                  ${currentLanguage === "EN" && "auth-bar__dropdown--language--selected"}
                `}
                role="menu-item-dropdown"
                aria-label={`menu-item-dropdown-language-en`}
                onClick={() => setLanguage("EN")}
              >
                English
              </div>
            </div>

            <div
              className='w-full'
              role="menu-item"
              aria-label={`menu-item-language-vi`}
              key={`menu-lanugage-vi`}>
              <div
                className={`auth-bar__dropdown--language--item w-fit
                  ${currentLanguage === "VI" && "auth-bar__dropdown--language--selected"}
                `}
                role="menu-item-dropdown"
                aria-label={`menu-item-dropdown-language-vi`}
                data-testid={`menu-item-language-vi`}
                onClick={() => setLanguage("VI")}>
                Tiếng Việt
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
