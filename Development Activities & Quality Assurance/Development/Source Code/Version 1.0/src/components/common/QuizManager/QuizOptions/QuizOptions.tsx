import './QuizOptions.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const QuizOptions: React.FC<IQuizOptions> = ({
  fieldOptionsList, numberOfQuestionsOptionsList, field, setField, numberOfQuestions, setNumberOfQuestion
}) => {
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="quiz-options"
      className="quiz-options flex flex-col items-center justify-center">
      <h1
        className="quiz-options__title">{t('quiz_page.title')}</h1>

      <span
        className="quiz-options__option--testing mt-5">
        {t('quiz_page.options.testing')}
        <select
          className="quiz-options__select"
          onChange={(e) => setField(e.target.value)}
          value={field}
        >
          {fieldOptionsList?.map((option, index) => (
            <option
              className="quiz-options__select--option"
              value={option.value}
              key={`field-option-${index}`}
            >{option.caption}</option>
          ))}
        </select>
      </span>

      <span
        className="quiz-options__option--testing mt-2">
        <select
          className="quiz-options__select quiz-options__select--quest-count"
          onChange={(e) => {
            setNumberOfQuestion(parseInt(e.target.value))
          }}
          value={numberOfQuestions}
        >
          {numberOfQuestionsOptionsList?.map((option, index) => (
            <option
              className="quiz-options__select--option"
              value={option}
              key={`number-of-quest-option-${index}`}
            >{option}</option>
          ))}
        </select>
        {t('quiz_page.options.questions')}
      </span>
    </div>
  );
};
