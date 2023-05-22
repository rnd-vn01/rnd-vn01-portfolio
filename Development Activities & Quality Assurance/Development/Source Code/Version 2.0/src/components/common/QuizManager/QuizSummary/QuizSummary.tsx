import './QuizSummary.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export const QuizSummary: React.FC<IQuizSummary> = ({
  data
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div
      role="div"
      aria-label="quiz-summary"
      className="quiz-summary flex flex-col items-center justify-center">
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
          <p
            key={index}
            className="quiz-summary__detail">
            <b>{t('quiz_page.captions.question')} {index + 1}: </b>
            {typeof question.correctAnswer === "number" ?
              question.options[question.correctAnswer].answer : question.correctAnswer}
            {` - `}
            <span className={`${question.answer === question.correctAnswer ? "quiz-summary__correct" : "quiz-summary__wrong"}`}>
              {question.answer === question.correctAnswer ? t('quiz_page.captions.correct') : t('quiz_page.captions.wrong')}
            </span>
            {question.time !== -1 ? ` (${question.time} ${t('quiz_page.captions.seconds')})` : ` (${t('quiz_page.captions.time_over')})`}
          </p>
        ))}
      </div>

      <p
        role="p"
        aria-label="view-personal-records"
        className='quiz-summary__view-stats'
        onClick={() => history.push("/records")}
      >{t('quiz_page.captions.view_stats')}</p>
    </div >
  );
};
