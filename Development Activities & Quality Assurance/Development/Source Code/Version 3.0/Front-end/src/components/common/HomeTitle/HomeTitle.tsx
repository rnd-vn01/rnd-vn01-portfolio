import './HomeTitle.scss';
import React from 'react';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation, Trans } from 'react-i18next';
import Logo from "src/assets/images/Logo.svg";

export const HomeTitle: React.FC = ({ }) => {
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="home-title"
      className="home-title flex flex-col justify-center items-center">

      <p className="home-title__title--sub">
        {t('hometitle.sub')}
      </p>

      <h1 className="home-title__title--main text-center">
        <img src={Logo} className="home-title__title--logo mr-3"></img>
        <p>{APP_NAME.toUpperCase()}</p>
        <img src={Logo} className="home-title__title--logo ml-3"></img>
      </h1>

      <p className="home-title__title--instruction">{t('hometitle.instruction')}</p>
    </div>
  );
};
