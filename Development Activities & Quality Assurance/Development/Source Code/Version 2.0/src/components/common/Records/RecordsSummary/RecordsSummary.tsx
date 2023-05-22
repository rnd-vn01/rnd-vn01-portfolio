import './RecordsSummary.scss';
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { SUMMARY_SHOWING_TIME_TYPES, SUMMARY_SHOWING_TIME_TYPE_OPTIONS } from 'src/configs/constants';

export const RecordsSummary: React.FC<IRecordsSummary> = ({
  data
}) => {
  const { t } = useTranslation();
  const [showingTypeOption, setShowingTypeOption] = useState<number>(0);
  const [showingData, setShowingData] = useState<any>({
    points: 0,
    meridians: 0,
    quizzes: 0,
    accuracy: 0
  });

  useEffect(() => {
    let testData = {}

    switch (showingTypeOption) {
      case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.ALL_TIME:
        testData = {
          points: 215,
          meridians: 11,
          quizzes: 52,
          accuracy: 76
        }
        break;
      case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_YEAR:
        testData = {
          points: 150,
          meridians: 9,
          quizzes: 40,
          accuracy: 80
        }
        break;
      case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_MONTH:
        testData = {
          points: 15,
          meridians: 2,
          quizzes: 5,
          accuracy: 68
        }
        break;
      case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_WEEK:
        testData = {
          points: 2,
          meridians: 1,
          quizzes: 2,
          accuracy: 79
        }
        break;
    }

    setShowingData(testData)
  }, [showingTypeOption])

  return (
    <div
      role="div"
      aria-label="records-summary"
      className="records-summary">

      <div className='w-full flex justify-between records-summary__title--container'>
        <h1 className='records-summary__title'>{t('records.summary.summary')}</h1>

        <span>
          {t('records.summary.showing')} {' '}
          <select
            className="records-summary__select"
            value={showingTypeOption}
            onChange={(e) => setShowingTypeOption(parseInt(e.target.value))}
            role="select"
            aria-label="records-summary-type-select"
          >
            {SUMMARY_SHOWING_TIME_TYPES.map(option => (
              <option
                className="records-summary__select--option"
                value={option.id}
                key={`record-summary-option-${option.id}`}
              >{t(`records.summary.options.${option.code}`)}</option>
            ))}
          </select>
        </span>
      </div>

      <div className='flex justify-between pt-3 pb-2'>
        <div className='records-summary__item'>
          <h1 data-testid="record-summary-points">{showingData?.points}</h1>
          <h3>{t('general.points')} {' '} {t('records.summary.caption.learnt')}</h3>
        </div>

        <div className='records-summary__item'>
          <h1 data-testid="record-summary-meridians">{showingData?.meridians}</h1>
          <h3>{t('general.meridians')} {' '} {t('records.summary.caption.learnt')}</h3>
        </div>

        <div className='records-summary__item'>
          <h1 data-testid="record-summary-quizzes">{showingData?.quizzes}</h1>
          <h3>{t('records.summary.caption.quiz_attempted')}</h3>
        </div>

        <div className='records-summary__item'>
          <h1 data-testid="record-summary-accuracy">{showingData?.accuracy}%</h1>
          <h3>{t('records.summary.caption.accuracy_rate')}</h3>
        </div>
      </div>
    </div>
  );
};
