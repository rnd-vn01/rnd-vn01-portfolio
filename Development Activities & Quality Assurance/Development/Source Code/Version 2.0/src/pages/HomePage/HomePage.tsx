import './HomePage.scss'
import React, { useEffect, useRef, useState } from 'react';
import {
  AuthBar, HomePageControl, HomeTitle, InformationBlock, QuickSearchBar
} from 'src/components/common';
import DemoImage from "src/assets/images/Demo.png";
import { Canvas } from '@react-three/fiber'
import { Scene } from 'src/components/index';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { APP_NAME } from 'src/configs/constants';
import { LanguagePicker } from 'src/components/common';
import { QuickInformationMiddleware } from 'src/components/middleware';
import { CursorControlMiddleware } from 'src/components/middleware';
import { useLocation } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [isShowingLanding, setIsShowingLanding] = useState<boolean>(true);
  const location = useLocation() as any;

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const {
    isShowingQuickInformation
  } = useSelector(
    (state: RootState) => state.selectionSlice,
  );
  const {
    modelLoaded
  } = useSelector(
    (state: RootState) => state.globalSlice,
  );

  const sceneRef = useRef();

  document.title = `${APP_NAME}`

  useEffect(() => {
    if (location?.state?.isRedirect) {
      setIsShowingLanding(false);
    }
  }, [])

  useEffect(() => {
    if (modelLoaded) {
      setTimeout(() => {
        setIsShowingLanding(false)
      }, 2000);
    }
  }, [modelLoaded])

  return (
    <div
      role="div"
      aria-label="home-page"
      className="home-page grid">
      <div
        className="home-page__section home-page__section--model">
        <Canvas shadows>
          <Scene
            ref={sceneRef}
          />
        </Canvas>
        {/* <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          src={DemoImage}></img> */}
      </div>

      <div className="home-page__section--side-bar">
        <QuickSearchBar />
      </div>

      <div className="home-page__section--menu">
        <AuthBar />
      </div>

      <div className="home-page__section--language">
        <LanguagePicker />
      </div>

      <div className="home-page__section--controls">
        <HomePageControl
          isQuizPage={false}
          callbackPanCenter={() => (sceneRef.current as any)?.panCenter()}
          callbackPanDown={() => (sceneRef.current as any)?.panDown()}
          callbackPanLeft={() => (sceneRef.current as any)?.panLeft()}
          callbackPanRight={() => (sceneRef.current as any)?.panRight()}
          callbackPanUp={() => (sceneRef.current as any)?.panUp()}
          callbackZoomIn={() => (sceneRef.current as any)?.zoomIn()}
          callbackZoomOut={() => (sceneRef.current as any)?.zoomOut()}
        />
      </div>

      {(isShowingQuickInformation != null) &&
        <div
          role="div"
          aria-label="home-page-information"
          className="home-page__section--information">
          <InformationBlock
            isPoint={isShowingQuickInformation?.type === "point"}
            itemInformation={isShowingQuickInformation?.content}
            usingLanguage={currentLanguage}
          />
        </div>}

      {/* Middleware */}
      <QuickInformationMiddleware />
      <CursorControlMiddleware />

      {/* Landing page */}
      <div
        role="div"
        aria-label="home-page-landing"
        className={`home-page__landing ${!isShowingLanding ? "home-page__landing--hidden" : ""}`}
        onClick={() => {
          if (modelLoaded)
            setIsShowingLanding(false)
        }}
      >
        <div className='home-page__landing--container'>
          {modelLoaded && <HomeTitle />}
        </div>
      </div>
    </div>
  );
};
