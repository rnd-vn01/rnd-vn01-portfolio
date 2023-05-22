import './QuizPage.scss'
import React, { useEffect, useRef, useState } from 'react';
import {
  AuthBar,
  HomePageControl,
  QuizManager
} from 'src/components/common';
import DemoImage from "src/assets/images/Demo.png";
import { Canvas } from '@react-three/fiber'
import { SceneQuiz } from 'src/components/index';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from "react-i18next";
import { APP_NAME, QUIZ_QUESTION_TYPE } from 'src/configs/constants';
import { CursorControlMiddleware } from 'src/components/middleware';

export const QuizPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sceneRef = useRef();
  const [questionType, setQuestionType] = useState<number>(QUIZ_QUESTION_TYPE.DESCRIPTION);

  document.title = `${APP_NAME} | ${t('quiz_page.title')}`

  useEffect(() => {
    {/* NOT_TESTED */ }
    if (questionType !== QUIZ_QUESTION_TYPE.CHOOSE_FROM_LOCATION
      && questionType !== QUIZ_QUESTION_TYPE.NAVIGATE
      && questionType !== QUIZ_QUESTION_TYPE.IDENTIFY_CORRECT_LOCATION && sceneRef.current) {
      (sceneRef.current as any)?.panCenter();
    } else if (questionType === QUIZ_QUESTION_TYPE.NAVIGATE) {
      (sceneRef.current as any)?.focusForNavigateQuestion();
    }
    {/* NOT_TESTED */ }
  }, [questionType]);

  return (
    <div
      role="div"
      aria-label="quiz-page"
      className="quiz-page grid grid-cols-7">
      <div
        className="quiz-page__section quiz-page__section--model col-span-5">
        <Canvas shadows>
          <SceneQuiz
            ref={sceneRef}
          />
        </Canvas>
        {/* {!isModelQuestion && <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 201,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          src={DemoImage}></img>} */}
      </div>

      <div className="quiz-page__section quiz-page__section--side-bar col-span-2">
        <QuizManager
          callbackSetQuestionType={setQuestionType}
        ></QuizManager>
      </div>

      <div
        style={{
          zIndex: 202
        }}
        className="quiz-page__section--menu">
        <AuthBar />
      </div>

      <div className="quiz-page__section--controls">
        <HomePageControl
          isQuizPage={true}
          callbackPanCenter={() => (sceneRef.current as any)?.panCenter()}
          callbackPanDown={() => (sceneRef.current as any)?.panDown()}
          callbackPanLeft={() => (sceneRef.current as any)?.panLeft()}
          callbackPanRight={() => (sceneRef.current as any)?.panRight()}
          callbackPanUp={() => (sceneRef.current as any)?.panUp()}
          callbackZoomIn={() => (sceneRef.current as any)?.zoomIn()}
          callbackZoomOut={() => (sceneRef.current as any)?.zoomOut()}
        />
      </div>

      {/* Middleware */}
      <CursorControlMiddleware />
    </div>
  );
};
