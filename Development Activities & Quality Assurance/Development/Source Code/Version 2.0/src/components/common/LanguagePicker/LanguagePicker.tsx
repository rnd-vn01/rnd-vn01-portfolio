import './LanguagePicker.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { LANGUAGES_LIST, setStateLanguage } from 'src/redux/slice';
import { useTranslation } from 'react-i18next';

export const LanguagePicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isShowingDropdown, setIsShowingDropdown] = useState<boolean>(false);
  const { i18n } = useTranslation();

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const setLanguage = (option: string) => {
    dispatch(setStateLanguage({
      currentLanguage: option
    }))
    i18n.changeLanguage(option.toLowerCase())
    setIsShowingDropdown(false);
  }

  return (
    <div
      role="div"
      aria-label="language-picker"
      className="language-picker flex flex-col items-start justify-center">
      <div
        role="div"
        aria-label="language-picker-dropdown"
        className={`language-picker__dropdown w-fit h-fit flex flex-col items-end justify-center
        ${!isShowingDropdown ? "language-picker__dropdown--hide" : ""}`}>
        {LANGUAGES_LIST.map((language, index) => (
          <div
            className={`language-picker__dropdown--item w-full 
              ${language === currentLanguage ? "language-picker__dropdown--selected" : ""}`}
            role="language-picker-dropdown-item"
            onClick={() => {
              setLanguage(language);
              history.go(0)
            }}
            key={`language-${index}`}>
            {language}
          </div>
        ))}
      </div>
      <div
        role="div"
        aria-label="language-picker-icon"
        className="language-picker__current flex items-center justify-center cursor-pointer"
        onClick={() => setIsShowingDropdown(!isShowingDropdown)}>
        {currentLanguage}
      </div>
    </div>
  );
};
