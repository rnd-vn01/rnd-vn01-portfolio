import './RecordsProgressLog.scss';
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import {
  MERIDIANS, SUMMARY_SHOWING_TIME_TYPES,
} from 'src/configs/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { RecordsLog } from '../RecordsLog/RecordsLog';
import { useMediaQuery } from 'react-responsive';
import { RecordsProgressDesktop } from './responsive/RecordsProgressDesktop';
import { getMeridiansProgress, getQuizzesLog } from 'src/helpers/statistics';

export const RecordsProgressLog: React.FC<IRecordsProgressLog> = ({
  quizzesList
}) => {
  const { t } = useTranslation();
  const [isProgress, setIsProgress] = useState<boolean>(true);
  const [showingTypeOption, setShowingTypeOption] = useState<number>(0);
  const [showingData, setShowingData] = useState<any>([]);
  const [render, setRender] = useState<number>(0);
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  const formatForDesktop = (items) => {
    const cloneItems = JSON.parse(JSON.stringify(items))

    cloneItems.forEach(item => {
      item.caption = currentLanguage === "EN" ? item.caption?.split(" ")[0] : item.caption?.split(" ")[2];
    })

    return cloneItems;
  }

  useEffect(() => {
    let testData = []

    if (isProgress) {
      let percentages = getMeridiansProgress(quizzesList)

      MERIDIANS.forEach(meridian => {
        testData.push({
          caption: currentLanguage === "EN" ? `${meridian} ${t('general.meridian')}` : `${t('general.meridian')} ${meridian}`,
          percentage: percentages[meridian]
        })
      })
    } else {
      testData = getQuizzesLog(quizzesList, showingTypeOption);
    }

    setShowingData(testData)
  }, [showingTypeOption, isProgress])

  useEffect(() => {
    setRender(render + 1);
  }, [showingData])

  return (
    <div
      role="div"
      aria-label="records-progress"
      key={render}
      className="records-progress p-2">

      <div className='w-full flex justify-between records-progress__title--container'>
        <span>
          {isProgress &&
            <>
              <h1
                role="h1"
                aria-label="title-progress"
                className={`inline records-progress__title records-progress__title--selected`}>
                {t('records.progress_log.options.progress')}</h1>
              <h1
                onClick={() => setIsProgress(false)}
                role="h1"
                aria-label="title-log"
                className={`inline ml-2 records-progress__title`}>
                {t('records.progress_log.options.log')}</h1>
            </>}
          {!isProgress &&
            <>
              <h1
                role="h1"
                aria-label="title-log"
                className={`inline records-progress__title records-progress__title--selected`}>
                {t('records.progress_log.options.log')}</h1>
              <h1
                onClick={() => setIsProgress(true)}
                role="h1"
                aria-label="title-progress"
                className={`inline ml-2 records-progress__title`}>
                {t('records.progress_log.options.progress')}</h1>
            </>}
        </span>

        {!isProgress && <span>
          {t('records.summary.showing')} {' '}
          <select
            className="records-progress__select"
            value={showingTypeOption}
            role="select"
            aria-label="records-progress-select"
            data-testid="records-progress-select"
            onChange={(e) => setShowingTypeOption(parseInt(e.target.value))}
          >
            {SUMMARY_SHOWING_TIME_TYPES.map(option => (
              <option
                className="records-progress__select--option"
                value={option.id}
                key={`records-progress-option-${option.id}`}
              >{t(`records.summary.options.${option.code}`)}</option>
            ))}
          </select>
        </span>}

      </div>

      {(isProgress && !isDesktop) && <div className='records-progress__progress'>
        {showingData.map((item, index) => (
          <div
            key={`records-progress-${index}`}
            className='records-progress__progress--item'>
            <div className='flex justify-between'>
              <p>{item.caption}</p>
              <p>{item.percentage}%</p>
            </div>

            <div className='records-progress__progress--percentage-bg'>
              <div className='records-progress__progress--percentage-cover' style={{
                width: `${item.percentage}%`
              }} />
            </div>
          </div>
        ))}
      </div>}

      {(isProgress && isDesktop) && <RecordsProgressDesktop data={formatForDesktop(showingData)} />}

      {!isProgress &&
        <div className='records-progress__progress'>
          {showingData.map((data: any, index: number) =>
            <RecordsLog
              logData={data}
              index={index} />
          )}
        </div>
      }
    </div>
  );
};
