import './QuizTitleBar.scss';
import React, { useState } from 'react';

export const QuizTitleBar: React.FC<IQuizTitleBar> = ({
  title
}) => {
  return (
    <div
      role="div"
      aria-label="quiz-title-bar"
      className="quiz-title-bar flex items-center justify-center">
      <h1 className='quiz-title-bar__title'>
        {title}
      </h1>
    </div>
  );
};
