import './QuizPage.scss'
import React, { useEffect, useState } from 'react';
import {
  QuizManager
} from 'src/components/common';
import DemoImage from "src/assets/images/Demo.png";
import { Canvas } from '@react-three/fiber'
import { Scene } from 'src/components/index';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from "react-i18next";
import { APP_NAME } from 'src/configs/constants';

export const QuizPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  document.title = `${APP_NAME} | ${t('quiz_page.title')}`

  return (
    <div
      role="div"
      aria-label="quiz-page"
      className="quiz-page grid grid-cols-7">
      <div
        className="quiz-page__section quiz-page__section--model col-span-5">
        {/* <Canvas shadows>
          <Scene />
        </Canvas> */}
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          src={DemoImage}></img>
      </div>

      <div className="quiz-page__section quiz-page__section--side-bar col-span-2">
        <QuizManager></QuizManager>
      </div>
    </div>
  );
};
