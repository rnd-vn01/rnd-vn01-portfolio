import './QuizQuestion.scss';
import React, { useEffect, useState } from 'react';
import { QUIZ_QUESTION_TYPE } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';

export const QuizQuestion: React.FC<IQuizQuestion> = ({
  questionContent, type, optionsList, correctAnswer, onSubmitAnswer, isShowingAnswer,
  selectedAnswer, currentQuestion
}) => {
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="quiz-question"
      id={`quiz-question-${currentQuestion}`}
      className="quiz-question">
      <div className={`quiz-question__question flex-center
      ${type === QUIZ_QUESTION_TYPE.NAVIGATE ? "quiz-question__question--navigate" : ""}`}>
        <p>
          {questionContent}
        </p>
      </div>

      {type !== QUIZ_QUESTION_TYPE.NAVIGATE ?
        <div className={"quiz-question__answers grid grid-cols-2"}>
          {optionsList.map((option, index) => <div
            className={`quiz-question__answer col-span-1 
              flex justify-center items-center
              ${isShowingAnswer ? option.index === correctAnswer ? "quiz-question__answer--true quiz-question__answer--ended" : "quiz-question__answer--ended" : "quiz-question__answer--not-ended"}
              ${option.index !== correctAnswer && option.index === selectedAnswer ? "quiz-question__answer--false" : ""}`}
            key={`option-${index}`}
            id={`option-${index}`}
            role="quiz-options"
            onClick={() => {
              if (!isShowingAnswer)
                onSubmitAnswer(option.index)
            }}>
            {type === QUIZ_QUESTION_TYPE.CHOOSE_FROM_LOCATION ?
              `${option.answer.substring(option.answer.indexOf("(") + 1, option.answer.indexOf(")"))}`
              : type === QUIZ_QUESTION_TYPE.IDENTIFY_CORRECT_LOCATION ?
                `P${option.index + 1}` : `${option.answer}`
            }
          </div>
          )}
        </div> :
        <div>
          <div
            className={`quiz-question__answer 
              quiz-question__answer--navigate
              flex justify-center items-center
              ${isShowingAnswer ? "quiz-question__answer--ended" : "quiz-question__answer--not-ended"}`}
            onClick={() => {
              if (!isShowingAnswer)
                onSubmitAnswer(0)
            }}
            role="button"
            aria-label="quiz-confirmation">
            {t('quiz_page.buttons.confirmation')}
          </div>
        </div>}
    </div>
  );
};
