import './QuizStatusBar.scss';
import React, { useState } from 'react';
import Logo from "src/assets/images/Logo.svg";

export const QuizStatusBar: React.FC<IQuizStatusBar> = ({
  currentQuest, totalQuest, isPlus, totalCorrect
}) => {
  return (
    <div
      role="div"
      aria-label="quiz-status-bar"
      className="quiz-status-bar w-full h-full inline-flex items-center justify-end">
      <span className="quiz-status-bar__menu pr-2 flex items-center justify-center">
        <p className="quiz-status-bar__menu--point inline-block">
          <span style={{ color: "black", marginRight: "5px" }}> Point:</span>
          {totalCorrect}
        </p>
        {isPlus && <p className="quiz-status-bar__menu--plus inline-block">
          +1
        </p>}
        <p className="quiz-status-bar__menu--count inline-block">
          <span className="quiz-status-bar__menu--current">{currentQuest}</span>
          /
          <span className="quiz-status-bar__menu--total">{totalQuest}</span>
        </p>
        <div
          className="quiz-status-bar__menu--button-logo inline-flex w-fit h-full flex-center">
          <img src={Logo} className="quiz-status-bar__menu--image-logo"></img>
        </div>
      </span>
    </div>
  );
};
