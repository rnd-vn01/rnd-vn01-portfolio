import './FullPageTitleBar.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { logout } from 'src/configs/firebase';
import { resetToInitialStateAuthSlice } from 'src/redux/slice';
import { useTranslation } from "react-i18next";
import { DEFAULT_PROFILE_IMAGE_URL, HIGHLIGHT_PAGE_TITLES } from 'src/configs/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import IconAdmin from 'src/assets/images/IconAdmin.svg';

export const FullPageTitleBar: React.FC<IFullPageTitleBar> = ({
  translateCode
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const menuButtonRef = useRef();
  const menuDropdownRef = useRef();
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
      item: t('auth_bar.menu.home'),
      onClick: () => {
        history.push("/", { isRedirect: true })
      },
      selectable: true,
      divider: true,
      code: "home"
    },
    {
      item: t('auth_bar.menu.data_management'),
      onClick: () => {
        history.push("/data")
      },
      selectable: user && user?.isAdmin,
      divider: false,
      code: "data_management"
    },
    {
      item: t('auth_bar.menu.advanced_search'),
      onClick: () => {
        history.push("/advanced-search")
      },
      selectable: true,
      divider: true,
      code: "advanced_search"
    },
    {
      item: t('auth_bar.menu.start_quiz'),
      onClick: () => {
        history.push("/quiz")
      },
      selectable: user,
      divider: false,
      code: "quiz"
    },
    {
      item: t('auth_bar.menu.personal_records'),
      onClick: () => {
        history.push("/records")
      },
      selectable: true,
      divider: true,
      code: "personal_records"
    },
    {
      item: t('auth_bar.menu.manual'),
      onClick: () => {
        history.push("/manual")
      },
      selectable: true,
      divider: false,
      code: "manual"
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
      },
      selectable: true,
      divider: true,
      code: "about_us"
    },
    {
      item: t('auth_bar.menu.edit_profile'),
      onClick: () => {
        history.push("/edit-profile")
      },
      selectable: user,
      divider: false,
      code: "edit_profile"
    },
    {
      item: t('auth_bar.menu.log_out'),
      onClick: () => {
        history.push("/", { isRedirect: true })
        logout();
        dispatch(resetToInitialStateAuthSlice());
      },
      selectable: true,
      divider: false,
      code: "log_out"
    }
  ]

  const GUEST_MENU_ITEMS = [
    {
      item: t('auth_bar.menu.home'),
      onClick: () => {
        localStorage.removeItem("accessToken")
        history.push("/", { isRedirect: true })
      },
      selectable: true,
      divider: true,
      code: "home"
    },
    {
      item: t('auth_bar.sign_up'),
      onClick: () => {
        history.push("/signup")
      },
      selectable: true,
      divider: false,
      code: "sign_up"
    },
    {
      item: t('auth_bar.log_in'),
      onClick: () => {
        history.push("/login")
      },
      selectable: true,
      divider: true,
      code: "log_in"
    },
    {
      item: t('auth_bar.menu.advanced_search'),
      onClick: () => {
        history.push("/advanced-search")
      },
      selectable: true,
      divider: true,
      code: "advanced_search"
    },
    {
      item: t('auth_bar.menu.manual'),
      onClick: () => {
        history.push("/manual")
      },
      selectable: true,
      divider: false,
      code: "manual"
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
      },
      selectable: true,
      divider: false,
      code: "about_us"
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

  const highlightIndexes = HIGHLIGHT_PAGE_TITLES[translateCode || "default"][currentLanguage]

  return (
    <div
      role="div"
      aria-label="title-bar"
      className="title-bar">
      <span className="title-bar__menu">
        <div
          role="div"
          aria-label="title-bar-logo"
          ref={menuButtonRef}
          className="title-bar__menu--button-logo inline-flex w-fit h-full flex-center"
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
          {isLoggedIn ?
            <>
              <img referrerPolicy="no-referrer"
                data-testid="title-bar-profile-image"
                src={user.profileImage || DEFAULT_PROFILE_IMAGE_URL} className="title-bar__menu--image-logo"></img>
              {user.isAdmin && <img src={IconAdmin} className="title-bar__menu--icon-gear"></img>}
            </>
            :
            <FontAwesomeIcon className="title-bar__menu--icon" icon={faEllipsisVertical} />}
        </div>
      </span>

      <div className="w-full h-full inline-flex items-center justify-end">
        <h1 className="title-bar__page-title">
          {
            t(`title_bar.pages.${translateCode || "default"}`).split(" ").map((word, index) => {
              return <span>
                {index !== 0 && index === highlightIndexes[0] && " "}
                <h1
                  key={`word-${index}`}
                  role={"h1"}
                  aria-label={`word-${index}`}
                  className={`${highlightIndexes.includes(index) ? "title-bar__page-title--bg" : ""}`}>
                  {index !== 0 && index !== highlightIndexes[0] && " "} {word}
                </h1>
              </span>
            })
          }
        </h1>

        <div
          role="div"
          aria-label="title-bar-dropdown"
          ref={menuDropdownRef}
          className={`title-bar__dropdown w-fit h-fit flex flex-col items-end justify-center
                p-1 ${!isOpenDropdown && "title-bar__dropdown--hide"}`}>
          {isLoggedIn ? MENU_ITEMS.map((item, index) => {
            if (item.selectable) {
              return (
                <div
                  className='w-full'
                  role="menu-item"
                  aria-label={`menu-item-${item.item}`}
                  key={`menu-${index}`}>
                  <div
                    className={`title-bar__dropdown--item w-fit
                    ${item.code === translateCode ? "title-bar__dropdown--selected-item" : ""}`}
                    role="menu-item-dropdown"
                    aria-label={`menu-item-dropdown-${item.item}`}
                    onClick={item.onClick}>
                    {item.item}
                  </div>
                  {item.divider && <hr className='title-bar__dropdown--divider w-100' />}
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
                    className={`title-bar__dropdown--item w-fit
                    ${item.code === translateCode ? "title-bar__dropdown--selected-item" : ""}`}
                    role="menu-item-dropdown"
                    aria-label={`menu-item-dropdown-${item.item}`}
                    onClick={item.onClick}>
                    {item.item}
                  </div>
                  {item.divider && <hr className='title-bar__dropdown--divider w-100' />}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};
