import './QuizButton.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const QuizButton: React.FC<IQuizButton> = ({
  fallbackCaption, isDisabled, onClick, translateKey
}) => {
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="quiz-button"
      className={`quiz-button flex items-center justify-center ${isDisabled ? "quiz-button__disabled" : ""}`}
      onClick={() => {
        if (!isDisabled) {
          onClick()
        }
      }}>
      <p
        className="quiz-button__caption">{translateKey ? t(translateKey) : fallbackCaption}
      </p>
    </div>
  );
};
