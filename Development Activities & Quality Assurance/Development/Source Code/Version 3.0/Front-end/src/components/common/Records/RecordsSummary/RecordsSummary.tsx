import './RecordsSummary.scss';
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { SUMMARY_SHOWING_TIME_TYPES } from 'src/configs/constants';
import { useMediaQuery } from 'react-responsive';
import { getSummary } from 'src/helpers/statistics';

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
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    setShowingData(getSummary(data, showingTypeOption))
  }, [data, showingTypeOption])

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

      <div className={`
        pt-3 pb-2 grid ${isMobile ? "grid-cols-2" : "grid-cols-4"}
      `}>
        <div className={`records-summary__item ${!isDesktop && "col-span-1 mb-2"}`}>
          <h1 data-testid="record-summary-points">{showingData?.points}</h1>
          <h3>{t('general.points')} {' '} {t('records.summary.caption.learnt')}</h3>
        </div>

        <div className={`records-summary__item ${!isDesktop && "col-span-1 mb-2"}`}>
          <h1 data-testid="record-summary-meridians">{showingData?.meridians}</h1>
          <h3>{t('general.meridians')} {' '} {t('records.summary.caption.learnt')}</h3>
        </div>

        <div className={`records-summary__item ${!isDesktop && "col-span-1"}`}>
          <h1 data-testid="record-summary-quizzes">{showingData?.quizzes}</h1>
          <h3>{t('records.summary.caption.quiz_attempted')}</h3>
        </div>

        <div className={`records-summary__item ${!isDesktop && "col-span-1"}`}>
          <h1 data-testid="record-summary-accuracy">{showingData?.accuracy}%</h1>
          <h3>{t('records.summary.caption.accuracy_rate')}</h3>
        </div>
      </div>
    </div>
  );
};
