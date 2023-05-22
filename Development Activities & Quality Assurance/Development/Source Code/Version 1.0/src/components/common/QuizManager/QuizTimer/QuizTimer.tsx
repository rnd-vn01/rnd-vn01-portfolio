import './QuizTimer.scss';
import React, { useState } from 'react';
import QuizBackground from "src/assets/images/ButtonQuizBackground.png";

export const QuizTimer: React.FC<IQuizTimer> = ({ currentTime, totalTime }) => {
  return (
    <div
      role="div"
      aria-label="quiz-timer"
      className="quiz-timer">
      <div
        className="quiz-timer__count-down">
        <div className="quiz-timer__count-down--background-container">
          <img
            className="quiz-timer__count-down--background"
            src={QuizBackground}
            style={{ width: `calc(${100 * currentTime / totalTime}%)` }}></img>
        </div>
        <p className="quiz-timer__count-down--text">{currentTime}s</p>
      </div>
    </div>
  );
};
