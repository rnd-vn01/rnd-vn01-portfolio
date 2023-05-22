import './RecordsProgressLog.scss';
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import {
  MERIDIANS, SUMMARY_SHOWING_TIME_TYPES,
  SUMMARY_SHOWING_TIME_TYPE_OPTIONS
} from 'src/configs/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import moment from 'moment';
import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import { RecordsLog } from '../RecordsLog/RecordsLog';
import { generateRandomDate, getMidnight } from 'src/helpers/date';

export const RecordsProgressLog: React.FC<IRecordsProgressLog> = ({ }) => {
  const { t } = useTranslation();
  const [isProgress, setIsProgress] = useState<boolean>(true);
  const [showingTypeOption, setShowingTypeOption] = useState<number>(0);
  const [showingData, setShowingData] = useState<any>([]);
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const filterDate = (dates: any, filterBy: any) => {
    let startDate = null;

    dates.sort((a: Date, b: Date) => new Date(a.getTime()) < new Date(b.getTime()))

    switch (filterBy) {
      case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.ALL_TIME:
        return dates;
      case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_YEAR:
        startDate = moment().startOf('year').toDate()
        break;
      case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_MONTH:
        startDate = moment().startOf('month').toDate()
        break;
      case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_WEEK:
        startDate = moment().startOf('isoWeek').toDate()
        break;
    }

    return dates.filter((item: Date) => getMidnight(new Date(item.getTime())) >= getMidnight(new Date(startDate.getTime())))
  }

  useEffect(() => {
    let testData = []

    if (isProgress) {
      MERIDIANS.forEach(meridian => {
        testData.push({
          caption: currentLanguage === "EN" ? `${meridian} ${t('general.meridian')}` : `${t('general.meridian')} ${meridian}`,
          percentage: Math.round(Math.random() * 100)
        })
      })
    } else {
      // Generate test data
      // This week
      let dates = []
      for (let i = 0; i < 2; i++) {
        dates.push(generateRandomDate(moment().startOf('isoWeek').toDate(), moment().toDate()))
      }

      // This month
      {/* NOT_TESTED */ }
      let maxDateMonth = moment().startOf('isoWeek').subtract(1, 'days').toDate() > moment().toDate() ?
        moment().startOf('isoWeek').subtract(1, 'days').toDate() : moment().toDate()
      for (let i = 0; i < 3; i++) {
        dates.push(generateRandomDate(moment().startOf('month').toDate(),
          maxDateMonth))
      }

      // This year
      for (let i = 0; i < 35; i++) {
        dates.push(generateRandomDate(moment().startOf('year').toDate(),
          moment().startOf('month').subtract(1, 'days').toDate()))
      }

      // All time
      for (let i = 0; i < 12; i++) {
        dates.push(generateRandomDate(moment().subtract(2, 'years').toDate(),
          moment().startOf('year').subtract(1, 'days').toDate()))
      }

      dates = filterDate(dates, showingTypeOption)
      dates.forEach((date) => {
        const numberOfQuestions = (Math.floor(Math.random() * 6) + 1) * 5;
        const correctAnswers = Math.floor(Math.random() * numberOfQuestions)

        const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI;
        const pointsLength = DEMO_DATA.length;
        let correctPoints = []
        while (correctPoints.length < correctAnswers) {
          const randomPoint = DEMO_DATA[Math.floor(Math.random() * pointsLength)]
          if (!correctPoints.find((point: any) => point.code === randomPoint.code)) {
            correctPoints.push({
              code: randomPoint.code,
              name: randomPoint.name,
              meridian: randomPoint.code.split("-")[0],
              isCorrect: true
            })
          }
        }

        let wrongPoints = []
        while (wrongPoints.length < numberOfQuestions - correctAnswers) {
          const randomPoint = DEMO_DATA[Math.floor(Math.random() * pointsLength)]
          if (!correctPoints.find((point: any) => point.code === randomPoint.code)
            && !wrongPoints.find((point: any) => point.code === randomPoint.code)) {
            wrongPoints.push({
              code: randomPoint.code,
              name: randomPoint.name,
              meridian: randomPoint.code.split("-")[0],
              isCorrect: false
            })
          }
        }

        testData.push({
          date: date,
          result: {
            numberOfQuestions: numberOfQuestions,
            correctAnswers: correctAnswers,
            correctPoints: correctPoints,
            wrongPoints: wrongPoints
          }
        })
      })
      {/* NOT_TESTED */ }
    }

    setShowingData(testData)
  }, [showingTypeOption, isProgress])

  return (
    <div
      role="div"
      aria-label="records-progress"
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

      {isProgress &&
        <div className='records-progress__progress'>
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
