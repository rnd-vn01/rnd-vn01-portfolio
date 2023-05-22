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
      className="quiz-status-bar inline-flex">
      <div className='quiz-status-bar__section quiz-status-bar__section--border-right'>
        <p className="quiz-status-bar__menu--point inline-block">
          {totalCorrect} pts
        </p>
      </div>
      <div className='quiz-status-bar__section quiz-status-bar__section--border-left'>
        <p className="quiz-status-bar__menu--count inline-block">
          <span className="quiz-status-bar__menu--current">{currentQuest}</span>
          /
          <span className="quiz-status-bar__menu--total">{totalQuest}</span>
        </p>
      </div>
    </div>
  );
};
