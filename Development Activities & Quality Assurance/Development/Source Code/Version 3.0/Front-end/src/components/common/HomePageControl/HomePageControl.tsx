import './HomePageControl.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from "react-i18next";
import { ModelViewModeControl } from './ModelViewModeControl/ModelViewModeControl';
import { ModelInteractionControl } from './ModelInteractionControl/ModelInteractionControl';
import { MeridianControlResponsive } from '../responsive/index';
import { useMediaQuery } from 'react-responsive';
import { MeridianControl } from './MeridianControl/MeridianControl';

export const HomePageControl: React.FC<IHomePageControl> = ({
  callbackPanUp, callbackPanDown, callbackPanLeft, callbackPanRight,
  callbackPanCenter, callbackZoomIn, callbackZoomOut, isQuizPage
}) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  return (
    <div
      role="div"
      aria-label="home-page-control"
      className={`home-page-control ${isQuizPage ? "home-page-control--quiz" : ""}`}>
      {/* {!isQuizPage && <div className="home-page-control__control">
        <ModelViewModeControl />
      </div>} */}


      <div className={`home-page-control__control  ${isQuizPage ? "home-page-control__control--quiz" : ""}`}>
        <ModelInteractionControl
          callbackPanCenter={callbackPanCenter}
          callbackPanDown={callbackPanDown}
          callbackPanLeft={callbackPanLeft}
          callbackPanRight={callbackPanRight}
          callbackPanUp={callbackPanUp}
          callbackZoomIn={callbackZoomIn}
          callbackZoomOut={callbackZoomOut}
        />
      </div>

      {!isQuizPage &&
        <div className="home-page-control__control">
          {!isDesktop && <MeridianControlResponsive />}
          {isDesktop && <MeridianControl
            callbackResetViewMode={() => callbackPanCenter()} //NOT_TESTED
          />}
        </div>
      }
    </div>
  );
};
