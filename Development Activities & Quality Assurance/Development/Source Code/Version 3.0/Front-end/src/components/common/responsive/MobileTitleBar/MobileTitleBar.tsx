import './MobileTitleBar.scss';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMultiply, faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import HomeIcon from "src/assets/images/HomeIcon.svg";
import { QuizStatusBar } from 'src/components/common/QuizManager/QuizStatusBar/QuizStatusBar';

export const MobileTitleBar: React.FC<IMobileTitleBar> = ({
  translateCode,
  isShowingSideMenu,
  callbackSetIsShowingSideMenu,
  isEdit,
  isViewingDetail,
  callbackTriggerEditDetail,
  isQuiz,
  currentQuest,
  totalQuest,
  totalCorrect
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

  return (
    <div
      role="div"
      aria-label="mobile-title-bar"
      className={`mobile-title-bar `}
    >
      <div className={`p-4 mobile-title-bar__item--small flex-center`}
        onClick={() => history.push("/", { isRedirect: true })}
        data-testid="home-icon"
      >
        <img src={HomeIcon}></img>
      </div>

      {!isQuiz && (!isEdit ? <div className={`mobile-title-bar__item--large flex-center`}>
        <h1 className="mobile-title-bar__page-title">
          {
            isViewingDetail ? translateCode :
              t(`title_bar.pages.${translateCode || "default"}`).split(" ").map((word, index) => {
                return <h1
                  key={`word-${index}`}
                  role={"h1"}
                  aria-label={`word-${index}`}
                  className={`${index === 0 ? "title-bar__page-title--bg" : ""}`}>{index !== 0 && " "} {word}</h1>
              })
          }
        </h1>
      </div> :
        <div className={`mobile-title-bar__item--edit flex row`}>
          <div className={`mobile-title-bar__item--edit-option flex-center`}
            role="div"
            aria-label="button-submit"
            onClick={callbackTriggerEditDetail}>
            <FontAwesomeIcon
              icon={faCheck}
            />
          </div>

          <div className={`mobile-title-bar__item--edit-option flex-center`}
            onClick={() => { history.push(location.pathname.replace("?edit", "")) }}
            data-testid="button-cancel">
            <FontAwesomeIcon
              icon={faMultiply}
            />
          </div>
        </div>)}

      {isQuiz && <div className={`mobile-title-bar__item--quiz flex row`}>
        <QuizStatusBar
          currentQuest={currentQuest}
          totalCorrect={totalCorrect}
          totalQuest={totalQuest} />
      </div>}

      <div className={`mobile-title-bar__item--small flex-center`}
        data-testid="hamburger-icon"
        onClick={() => {
          callbackSetIsShowingSideMenu(!isShowingSideMenu)
        }}
      >
        <FontAwesomeIcon className="menu-bar__menu--icon-hamburger" icon={faBars} />
      </div>
    </div>
  );
};
