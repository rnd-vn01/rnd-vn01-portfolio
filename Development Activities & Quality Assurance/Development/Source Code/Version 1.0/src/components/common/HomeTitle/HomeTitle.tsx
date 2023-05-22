import './HomeTitle.scss';
import React from 'react';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation, Trans } from 'react-i18next';

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

      <h1 className="home-title__title--main text-center">{APP_NAME.toUpperCase()}</h1>

      <p className="home-title__title--project-name text-center">
        {t('hometitle.project_name')}
      </p>

      <p className="home-title__title--instruction">{t('hometitle.instruction')}</p>
    </div>
  );
};
