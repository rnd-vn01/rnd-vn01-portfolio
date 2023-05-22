import './QuizQuestion.scss';
import React, { useEffect, useState } from 'react';
import { QUIZ_QUESTION_TYPE } from 'src/configs/constants';

export const QuizQuestion: React.FC<IQuizQuestion> = ({
  questionContent, type, optionsList, correctAnswer, onSubmitAnswer, isShowingAnswer,
  selectedAnswer, currentQuestion
}) => {
  return (
    <div
      role="div"
      aria-label="quiz-question"
      id={`quiz-question-${currentQuestion}`}
      className="quiz-question">
      <div className={`quiz-question__question 
      ${type !== QUIZ_QUESTION_TYPE["MULTIPLE_CHOICE"] ? "quiz-question__full" : ""}`}>
        {questionContent}
      </div>

      {type === QUIZ_QUESTION_TYPE["MULTIPLE_CHOICE"] &&
        <div className={"quiz-question__answers grid grid-cols-2"}>
          {optionsList.map((option, index) => <div
            className={`quiz-question__answer col-span-1 
              flex justify-center items-center
              ${isShowingAnswer ? option.index === correctAnswer ? "quiz-question__answer--true quiz-question__answer--ended" : "quiz-question__answer--ended" : "quiz-question__answer--not-ended"}
              ${option.index !== correctAnswer && option.index === selectedAnswer ? "quiz-question__answer--false" : ""}`}
            key={`option-${index}`}
            id={`option-${index}`}
            onClick={() => {
              if (!isShowingAnswer)
                onSubmitAnswer(option.index)
            }}>
            {option.answer}
          </div>
          )}
        </div>}
    </div>
  );
};
