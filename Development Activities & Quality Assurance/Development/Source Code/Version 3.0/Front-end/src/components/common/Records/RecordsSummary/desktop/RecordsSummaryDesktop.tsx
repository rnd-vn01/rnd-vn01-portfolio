import './RecordsSummaryDesktop.scss';
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useTranslation } from 'react-i18next';
import { SUMMARY_SHOWING_TIME_TYPES } from 'src/configs/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import IconStreak from "src/assets/images/IconStreak.svg";
import IconStreakGray from "src/assets/images/IconStreakGray.svg";
import IconActivityTracker1 from "src/assets/images/IconActivityTracker1.svg"
import IconActivityTracker2 from "src/assets/images/IconActivityTracker2.svg"
import IconActivityTracker3 from "src/assets/images/IconActivityTracker3.svg"
import { getSummary } from 'src/helpers/statistics';

export const RecordsSummaryDesktop: React.FC<IRecordsSummary> = ({
  data
}) => {
  const { t } = useTranslation();
  const [showingTypeOption, setShowingTypeOption] = useState<number>(0);
  const [showingData, setShowingData] = useState<any>({
    points: 0,
    meridians: 0,
    quizzes: 0,
    accuracy: 0,
    dates: 0,
  });
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const refStreakDiv = useRef<any>(null);
  const refActivityDiv = useRef<any>(null);
  const refSVG = useRef<any>(null);
  const refCircle1 = useRef<any>(null);
  const refCircle2 = useRef<any>(null);
  const refCircle3 = useRef<any>(null);

  useEffect(() => {
    setShowingData(getSummary(data, showingTypeOption))
  }, [data, showingTypeOption])

  useLayoutEffect(() => {
    const streakDiv = refStreakDiv.current as HTMLDivElement;
    streakDiv.style.width = `${streakDiv.clientHeight}px`;

    const activityDiv = refActivityDiv.current as HTMLDivElement;
    activityDiv.style.width = `${activityDiv.clientHeight}px`;
    activityDiv.style.height = `${activityDiv.clientHeight}px`;

    const svgDiv = refSVG.current as HTMLElement;
    const svgRadius = svgDiv.clientHeight;

    const circle = refCircle1.current as HTMLElement;
    circle.style.width = `${svgRadius}px`;
    circle.style.height = `${svgRadius}px`;

    const circle2 = refCircle2.current as HTMLElement;
    circle2.style.width = `${svgRadius}px`;
    circle2.style.height = `${svgRadius}px`;

    const circle3 = refCircle3.current as HTMLElement;
    circle3.style.width = `${svgRadius}px`;
    circle3.style.height = `${svgRadius}px`;
  }, [])

  const setPercentage = (percentage: number, circleIndex: number) => {
    const CIRCLE_RADIUS = circleIndex === 1 ? 605 : circleIndex === 2 ? 450 : 300;
    return (100 - percentage) / 100 * CIRCLE_RADIUS;
  }

  return (
    <div
      role="div"
      aria-label="records-summary-desktop"
      className="records-summary-desktop">

      <div className='w-full flex justify-between records-summary-desktop__title--container'>
        <h1 className='records-summary-desktop__title'>{t('records.summary.summary')}</h1>

        <span>
          {t('records.summary.showing')} {' '}
          <select
            className="records-summary-desktop__select"
            value={showingTypeOption}
            onChange={(e) => setShowingTypeOption(parseInt(e.target.value))}
            role="select"
            aria-label="records-summary-desktop-type-select"
          >
            {SUMMARY_SHOWING_TIME_TYPES.map(option => (
              <option
                className="records-summary-desktop__select--option"
                value={option.id}
                key={`record-summary-option-${option.id}`}
              >{t(`records.summary.options.${option.code}`)}</option>
            ))}
          </select>
        </span>
      </div>

      <div className='records-summary-desktop__main grid grid-cols-7'>
        <div className='records-summary-desktop__graph col-span-5 flex-center'>
          <div className='records-summary-desktop__attempts flex-center'>
            {currentLanguage === "EN" ? <span className='text-center'>
              <h1 className='records-summary-desktop__attempts--count' data-testid="record-summary-quizzes">{showingData.quizzes}</h1>
              <h3
                data-testid="h3-quizzes-attempts"
                className='records-summary-desktop__attempts--quizzes-attempts'>quizzes attempts</h3>
            </span> : <span className='text-center'>
              <h3
                data-testid="h3-quizzes-attempts"
                className='records-summary-desktop__attempts--quizzes-attempts'>đã tham gia</h3>
              <h1 className='records-summary-desktop__attempts--count' data-testid="record-summary-quizzes">{showingData.quizzes}</h1>
              <h3
                data-testid="h3-quizzes-attempts"
                className='records-summary-desktop__attempts--quizzes-attempts'>bài kiểm tra</h3>
            </span>}

            <div ref={refStreakDiv} className='records-summary-desktop__streak'>
              <img src={showingData.days > 0 ? IconStreak : IconStreakGray}
                className='records-summary-desktop__streak--image'></img>

              <div className='records-summary-desktop__streak--text flex-center flex-col'>
                <h1>{showingData.days}</h1>
                <h3>{t('new_personal_records.days_streak')}</h3>
              </div>
            </div>

            <div ref={refActivityDiv} className='records-summary-desktop__activity-tracker'>
              <div className='records-summary-desktop__activity-tracker--first'>
                <img src={IconActivityTracker1}></img>

                <div className='outer'>
                  <div className='inner'>

                  </div>
                </div>

                <svg className='svg-1' ref={refSVG} xmlns="http://www.w3.org/2000/svg"
                  version="1.1">
                  <circle cx="50.5%" cy="50%" r="45%" ref={refCircle1} strokeLinecap='round'
                    style={{
                      strokeDashoffset: setPercentage(100 * showingData.points / 362, 1)
                    }}
                  />
                </svg>
              </div>

              <div className='records-summary-desktop__activity-tracker--second'>
                <img src={IconActivityTracker2}></img>

                <div className='outer'>
                  <div className='inner'>

                  </div>
                </div>

                <svg className='svg-2' ref={refSVG} xmlns="http://www.w3.org/2000/svg"
                  version="1.1">
                  <circle cx="50.5%" cy="49.5%" r="44%" ref={refCircle2} strokeLinecap='round'
                    style={{
                      strokeDashoffset: setPercentage(100 * showingData.meridians / 14, 2)
                    }} />
                </svg>
              </div>

              <div className='records-summary-desktop__activity-tracker--third'>
                <img src={IconActivityTracker3}></img>

                <div className='outer'>
                  <div className='inner'>

                  </div>
                </div>

                <svg className='svg-3' ref={refSVG} xmlns="http://www.w3.org/2000/svg"
                  version="1.1">
                  <circle cx="50.5%" cy="49.5%" r="41.75%" ref={refCircle3} strokeLinecap='round'
                    style={{
                      strokeDashoffset: setPercentage(showingData.accuracy, 3)
                    }} />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className='records-summary-desktop__total col-span-2'>
          <span className='records-summary-desktop__total--points'>
            <h1 data-testid="record-summary-points">{showingData.points}</h1>
            <h3>/362 {t('general.points')} {' '} {t('records.summary.caption.learnt')}</h3>
          </span>

          <span className='records-summary-desktop__total--meridians'>
            <h1 data-testid="record-summary-meridians">{showingData.meridians}</h1>
            <h3>/14 {t('general.meridians')} {' '} {t('records.summary.caption.learnt')}</h3>
          </span>

          <span className='records-summary-desktop__total--accuracy'>
            <h1 data-testid="record-summary-accuracy">{showingData.accuracy}%</h1>
            <h3>{' '} {t('records.summary.caption.accuracy_rate')}</h3>
          </span>
        </div>
      </div>
    </div>
  );
};
