import './FooterBar.scss';
import React, { useState } from 'react';
import Logo from "src/assets/images/Logo.svg";
import QuizIcon from "src/assets/images/QuizIcon.svg";
import QuizBackground from "src/assets/images/ButtonQuizBackground.png";
import { useHistory } from 'react-router-dom';
import { LanguagePicker } from './LanguagePicker/LanguagePicker';
import { useTranslation } from "react-i18next";

export const FooterBar: React.FC = ({ }) => {
  const history = useHistory();
  const [isHoverQuizButton, setIsHoverQuizButton] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  return (
    <div
      role="div"
      aria-label="footer-bar"
      className="footer-bar grid grid-cols-2">
      <div
        className="footer-bar__option flex items-center justify-center col-span-1"
        onMouseEnter={() => setIsHoverQuizButton(true)}
        onMouseLeave={() => setIsHoverQuizButton(false)}
        onClick={() => history.push("/quiz")}>
        {!isHoverQuizButton ?
          <img className="footer-bar__icon--quiz" src={QuizIcon}></img>
          :
          <div className="footer-bar__button-quiz">
            <img className="footer-bar__button-quiz--background" src={QuizBackground}></img>
            <p className="footer-bar__button-quiz--caption flex items-center justify-center">
              {t('footer_bar.start_quiz')}
            </p>
          </div>}

      </div>

      <div
        className="footer-bar__option flex items-center justify-center col-span-1">
        <img className="footer-bar__icon--logo" src={Logo}></img>
      </div>

      <LanguagePicker />
    </div>
  );
};
