import './SideMenu.scss';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowUp, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useTranslation } from 'react-i18next';
import { resetToInitialStateAuthSlice, resetToInitialStateDataSlice, setStateLanguage } from 'src/redux/slice';
import { useHistory } from 'react-router-dom';
import { logout } from 'src/configs/firebase';

export const SideMenu: React.FC<ISideMenu> = ({
  isShowing,
  callbackSetIsShowing
}) => {
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const {
    isLoggedIn,
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );

  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const [isShowingLanguagePick, setIsShowingLandingPick] = useState<boolean>(false);

  const setLanguage = (option: string) => {
    dispatch(setStateLanguage({
      currentLanguage: option
    }))
    i18n.changeLanguage(option.toLowerCase())
  }

  const MENU_ITEMS = [
    {
      item: t('auth_bar.menu.data_management'),
      onClick: () => {
        history.push("/data")
        callbackSetIsShowing(false);
      },
      selectable: user && user?.isAdmin,
      divider: false,
    },
    {
      item: t('auth_bar.menu.advanced_search'),
      onClick: () => {
        history.push("/advanced-search")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: true,
    },
    {
      item: t('auth_bar.menu.start_quiz'),
      onClick: () => {
        history.push("/quiz")
        callbackSetIsShowing(false);
      },
      selectable: user,
      divider: false,
    },
    {
      item: t('auth_bar.menu.personal_records'),
      onClick: () => {
        history.push("/records")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: true,
    },
    {
      item: t('auth_bar.menu.manual'),
      onClick: () => {
        history.push("/manual")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: false
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: true,
    },
    {
      item: t('auth_bar.menu.edit_profile'),
      onClick: () => {
        history.push("/edit-profile")
        callbackSetIsShowing(false);
      },
      selectable: user,
      divider: false,
    },
  ]

  const GUEST_MENU_ITEMS = [
    {
      item: t('auth_bar.sign_up'),
      onClick: () => {
        history.push("/signup")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: false
    },
    {
      item: t('auth_bar.log_in'),
      onClick: () => {
        history.push("/login")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: true
    },
    {
      item: t('auth_bar.menu.advanced_search'),
      onClick: () => {
        history.push("/advanced-search")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: true,
    },
    {
      item: t('auth_bar.menu.manual'),
      onClick: () => {
        history.push("/manual")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: false
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
        callbackSetIsShowing(false);
      },
      selectable: true,
      divider: false
    },
  ]

  const logOut = () => {
    history.push("/", { isRedirect: true })
    logout();
    dispatch(resetToInitialStateAuthSlice());
    callbackSetIsShowing(false);
  }

  return (
    <div
      role="div"
      aria-label="side-menu"
      className={`side-menu ${isShowing && "side-menu--showing"}`}
    >
      <div className='flex justify-between flex-col h-full'>
        <div>
          <div className="side-menu__language">
            <div className='relative w-full'>
              <div className='side-menu__menu-item flex items-center justify-between'
                data-testid="side-menu-language"
                onClick={() => setIsShowingLandingPick(!isShowingLanguagePick)}>
                <p
                  className='side-menu__menu-item--text'
                >{currentLanguage === "EN" ? "English" : "Tiếng Việt"}</p>

                <FontAwesomeIcon
                  icon={faAngleDown}
                  className='side-menu__menu-item--icon'
                ></FontAwesomeIcon>

              </div>

              <hr className='side-menu__divider w-100' />

              <div className={`side-menu__language-pick ${isShowingLanguagePick && "side-menu__language-pick--showing"}`}>
                <p
                  className={`side-menu__language-pick-item 
                  ${currentLanguage === "EN" && "side-menu__language-pick-item--selected"}`}
                  onClick={() => {
                    setLanguage("EN");

                    setTimeout(() => {
                      dispatch(resetToInitialStateDataSlice(null));
                      history.go(0);
                    }, 50)
                  }}
                  data-testid="side-menu-language__EN"
                >
                  English
                </p>
                <p
                  className={`side-menu__language-pick-item 
                  ${currentLanguage === "VI" && "side-menu__language-pick-item--selected"}`}
                  onClick={() => {
                    setLanguage("VI");

                    setTimeout(() => {
                      dispatch(resetToInitialStateDataSlice(null));
                      history.go(0);
                    }, 50)
                  }}
                  data-testid="side-menu-language__VI"
                >
                  Tiếng Việt
                </p>
              </div>
            </div>
          </div>

          {isLoggedIn ? MENU_ITEMS.map((item, index) => {
            if (item.selectable) {
              return (
                <>
                  <div className='relative w-full'>
                    <div className='side-menu__menu-item side-menu__menu-item--selectable 
                    flex items-center justify-between'
                      role="menu-item-dropdown"
                      aria-label={`menu-item-dropdown-${item.item}`}
                      onClick={item.onClick}>
                      <p
                        className='side-menu__menu-item--text'
                      >{item.item}</p>

                      <div style={{ transform: "rotate(45deg)" }}>
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className='side-menu__menu-item--icon'
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>

                  {item.divider && <hr className='side-menu__divider w-100' />}
                </>
              )
            }
          }) :
            GUEST_MENU_ITEMS.map((item, index) => {
              return (
                <>
                  <div className='relative w-full'>
                    <div className='side-menu__menu-item side-menu__menu-item--selectable 
                    flex items-center justify-between'
                      role="menu-item-dropdown"
                      aria-label={`menu-item-dropdown-${item.item}`}
                      onClick={item.onClick}>
                      <p
                        className='side-menu__menu-item--text'
                      >{item.item}</p>

                      <div style={{ transform: "rotate(45deg)" }}>
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className='side-menu__menu-item--icon'
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>

                  {item.divider && <hr className='side-menu__divider w-100' />}
                </>
              )
            })
          }
        </div>

        {isLoggedIn && <>
          <div className='relative w-full'>
            <div className='side-menu__menu-item side-menu__menu-item--selectable 
                    flex items-center justify-between'
              onClick={logOut}
              role="menu-item-dropdown"
              aria-label={`menu-item-dropdown-logout`}
            >
              <p
                className='side-menu__menu-item--text'
              >{t('auth_bar.menu.log_out')}</p>

              <FontAwesomeIcon
                icon={faArrowRight}
                className='side-menu__menu-item--icon'
              ></FontAwesomeIcon>
            </div>
          </div>
        </>}
      </div>
    </div>
  );
};
