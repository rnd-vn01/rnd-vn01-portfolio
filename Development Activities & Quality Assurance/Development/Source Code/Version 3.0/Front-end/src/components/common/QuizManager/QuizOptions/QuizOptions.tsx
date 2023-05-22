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

      <span
        className="quiz-options__option--testing mt-5">
        {t('quiz_page.options.testing')}
        <select
          className="quiz-options__select"
          role="select"
          aria-label="quiz-field-select"
          onChange={(e) => setField(e.target.value)}
          value={field}
        >
          {fieldOptionsList?.map((option, index) => (
            <option
              className="quiz-options__select--option"
              value={option.value}
              key={`field-option-${index}`}
              role="select-option"
              aria-label={`quiz-field-select-option-${index}`}
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
          role="select"
          aria-label="quiz-number-of-quests-select"
        >
          {numberOfQuestionsOptionsList?.map((option, index) => (
            <option
              className="quiz-options__select--option"
              value={option}
              key={`number-of-quest-option-${index}`}
              role="select-option"
              aria-label="quiz-number-of-quests-select-option"
            >{option}</option>
          ))}
        </select>
        {t('quiz_page.options.questions')}
      </span>
    </div>
  );
};
