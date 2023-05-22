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
import { useTranslation } from "react-i18next";
import { APP_NAME, QUIZ_QUESTION_TYPE } from 'src/configs/constants';
import { CursorControlMiddleware } from 'src/components/middleware';
import { useMediaQuery } from 'react-responsive';
import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import { QUIZ_STATE } from 'src/components/common/QuizManager/QuizManager';

export const QuizPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sceneRef = useRef();
  const [questionType, setQuestionType] = useState<number>(QUIZ_QUESTION_TYPE.DESCRIPTION);
  const [quizState, setQuizState] = useState<number>(QUIZ_STATE.SELECT_OPTIONS)

  // RESPONSIVE
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const [quizStatus, setQuizStatus] = useState<any>({
    currentQuest: 0,
    totalQuest: 0,
    totalCorrect: 0
  })

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
      className={`quiz-page grid ${isDesktop ? "grid-cols-7" : isMobile ? "grid-rows-8" : "grid-rows-3"}`}>
      <div
        className={`quiz-page__section quiz-page__section--model ${isDesktop ? "col-span-5" :
          isMobile ? "row-span-5" : "row-span-2"}`}>
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

      <div className={`quiz-page__section quiz-page__section--side-bar ${isDesktop ? "col-span-2" :
        isMobile ? "row-span-3" : "row-span-1"}`}>
        <QuizManager
          callbackSetQuestionType={setQuestionType}
          callbackSetQuizStatus={setQuizStatus}
          callbackSetQuizState={setQuizState}
        ></QuizManager>
      </div>

      {isDesktop && quizState !== QUIZ_STATE.IN_PROGRESS && < div
        style={{
          zIndex: 202
        }}
        className="quiz-page__section--menu">
        <AuthBar />
      </div>}

      {
        !isDesktop && <MobileTitleBar
          translateCode={"quiz_page"}
          isQuiz={true}
          isShowingSideMenu={isShowingSideMenu}
          callbackSetIsShowingSideMenu={setIsShowingSideMenu}
          currentQuest={quizStatus.currentQuest}
          totalQuest={quizStatus.totalQuest}
          totalCorrect={quizStatus.totalCorrect}
        />
      }

      {
        !isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>
      }

      {
        isDesktop && <div className="quiz-page__section--controls">
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
      }

      {/* Middleware */}
      <CursorControlMiddleware />
    </div >
  );
};
