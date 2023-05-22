import './QuizSummary.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const QuizSummary: React.FC<IQuizSummary> = ({
  data
}) => {
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="quiz-summary"
      className="quiz-summary flex flex-col items-center justify-center">
      <h1
        className="quiz-summary__title">{t('quiz_page.captions.result')}</h1>

      <div className="quiz-summary__options">
        <h1
          className="quiz-summary__sub-title">{t('quiz_page.captions.options')}</h1>
        <p>{t('quiz_page.options.testing')} <b>{data?.options?.field?.[0].caption}</b></p>
        <p><b>{data?.options?.numberOfQuestions}</b> {t('quiz_page.options.questions')}</p>
      </div>

      <div className="quiz-summary__details">
        <h1
          className="quiz-summary__sub-title">{t('quiz_page.captions.details')}</h1>
        {data?.questions?.map((question, index) => (
          <p className="quiz-summary__detail">
            <b>{t('quiz_page.captions.question')} {index + 1}: </b>
            {question.options[question.correctAnswer].answer}
            {` - `}
            <span className={`${question.answer === question.correctAnswer ? "quiz-summary__correct" : "quiz-summary__wrong"}`}>
              {question.answer === question.correctAnswer ? t('quiz_page.captions.correct') : t('quiz_page.captions.wrong')}
            </span>
            {` (${question.time} ${t('quiz_page.captions.seconds')})`}
          </p>
        ))}
      </div>
    </div >
  );
};
