import './RecordsChart.scss';
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { capitalize } from 'src/helpers/capitalize';
import { generateRandomDate, getCurrentDateFullString, getInputDateFormat, getMidnight, getMonday, getWeekNumber } from 'src/helpers/date';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import { MERIDIANS } from 'src/configs/constants';

export const RecordsChart: React.FC<IRecordsChart> = ({ }) => {
  const { t } = useTranslation();
  const [isPoint, setIsPoint] = useState<boolean>(true);
  const [showingTypeOption, setShowingTypeOption] = useState<number>(0);
  const [showingData, setShowingData] = useState<any>([]);
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const [fromDate, setFromDate] = useState<Date>(getMidnight(new Date()));
  const [toDate, setToDate] = useState<Date>(getMidnight(new Date()));
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  })

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const DATE_UNITS = [t("records.chart.time_units.day"),
  t("records.chart.time_units.week"),
  t("records.chart.time_units.month"),
  t("records.chart.time_units.year")]

  useEffect(() => {
    if (fromDate > toDate) {
      alert(t("records.chart.caution"))
      setFromDate(toDate)
    } else {
      getData();
    }
  }, [fromDate])

  useEffect(() => {
    if (fromDate > toDate) {
      alert(t("records.chart.caution"))
      setToDate(fromDate)
    } else {
      getData();
    }
  }, [toDate])

  useEffect(() => {
    getData();
  }, [showingTypeOption, isPoint])

  const getData = () => {
    const testData = generateTestLogData();
    const labels = generateLabels();

    const data = []
    labels.forEach(label => {
      data.push({
        time: label,
        count: 0
      })
    })

    let points = []
    let meridians = []
    let countResult = []
    for (let i = testData.length - 1; i >= 0; i--) {
      testData[i].result.points.forEach((point) => {
        if (!points.includes(point.code)) {
          points.push(point.code)
        }

        if (MERIDIANS.includes(point.meridian) && !meridians.includes(point.meridian)) {
          meridians.push(point.meridian)
        }
      })

      countResult.push({
        date: testData[i].date,
        point: points.length,
        meridian: meridians.length
      })
    }

    countResult.forEach((logItem) => {
      const index = findMatchingRangeIndex(logItem.date, data)
      if (index !== undefined) {
        switch (isPoint) {
          case true:
            data[index].count = Math.max(data[index].count, logItem.point)
            break;
          case false:
            data[index].count = Math.max(data[index].count, logItem.meridian)
            break;
        }

        for (let i = index + 1; i < data.length; i++) {
          data[i].count = Math.max(data[i].count, data[index].count)
        }
      }
    })

    // Handle the case none of the values in range has count
    if (!data.find(item => item.count > 0)) {
      for (let i = 0; i < data.length; i++) {
        data[i].count = !countResult.length ? 0 : isPoint ? countResult[countResult.length - 1].point : countResult[countResult.length - 1].meridian
      }
    }

    setChartData({
      labels: data.map(item => item.time.label),
      datasets: [{
        label: isPoint ? `${capitalize(t("records.chart.total"))} ${t("general.points")} ${t("records.chart.learnt")}` :
          `${capitalize(t("records.chart.total"))} ${t("general.meridians")} ${t("records.chart.learnt")}`,
        data: data.map(item => item.count),
        borderColor: isPoint ? 'rgb(255, 99, 132)' : 'rgb(53, 162, 235)',
        backgroundColor: isPoint ? 'rgba(255, 99, 132, 0.5)' : 'rgba(53, 162, 235, 0.5)'
      }]
    })
  }

  const findMatchingRangeIndex = (item, ranges) => {
    for (let i = 0; i < ranges.length; i++) {
      if (isInRange(item, ranges[i].time)) {
        return i
      }
    }
  }

  const isInRange = (dataItem, group) => {
    const getDate = getMidnight(dataItem);
    switch (showingTypeOption) {
      case 0:
        return getDate.getTime() === getMidnight(group.value).getTime()
      case 1:
        return getWeekNumber(getDate) === group.week && getDate.getFullYear() === group.year
      case 2:
        return getDate.getMonth() + 1 === group.month && getDate.getFullYear() === group.year
      case 3:
        return getDate.getFullYear() === group.year
    }
  }

  const generateLabels = () => {
    let labels = [];
    switch (showingTypeOption) {
      case 0:
        let iterator = new Date(fromDate);
        while (iterator <= toDate) {
          labels.push({
            value: new Date(iterator),
            label: getCurrentDateFullString(iterator)
          })
          iterator = new Date(moment(iterator).add(1, 'days').toDate())
        }
        return labels;
      case 1:
        let weekStart = getWeekNumber(fromDate)
        let weekEnd = getWeekNumber(toDate)
        let maxWeekYear = moment(fromDate).weeksInYear();

        let getStartYear = getMonday(new Date(fromDate.getTime())).getFullYear()
        let getEndYear = getMonday(new Date(toDate.getTime())).getFullYear()

        if (getStartYear !== getEndYear) {
          for (let i = getStartYear; i <= getEndYear; i++) {
            if (i === getStartYear) {
              for (let i = weekStart; i <= maxWeekYear; i++) {
                labels.push({
                  week: i,
                  year: getStartYear,
                  label: `W${i}/${getStartYear}`
                })
              }
            } else if (i === getEndYear) {
              for (let i = 1; i <= weekEnd; i++) {
                labels.push({
                  week: i,
                  year: getEndYear,
                  label: `W${i}/${getEndYear}`
                })
              }
            } else {
              for (let j = 1; j <= moment(new Date(i, 0, 1)).weeksInYear(); j++) {
                labels.push({
                  week: j,
                  year: i,
                  label: `W${j}/${i}`
                })
              }
            }
          }
        } else {
          for (let i = weekStart; i <= weekEnd; i++) {
            labels.push({
              week: i,
              year: getStartYear,
              label: `W${i}/${getStartYear}`
            })
          }
        }
        return labels
      case 2:
        let monthStart = fromDate.getMonth() + 1
        let monthEnd = toDate.getMonth() + 1

        if (fromDate.getFullYear() !== toDate.getFullYear()) {
          for (let i = fromDate.getFullYear(); i <= toDate.getFullYear(); i++) {
            if (i === fromDate.getFullYear()) {
              for (let i = monthStart; i <= 12; i++) {
                labels.push({
                  month: i,
                  year: fromDate.getFullYear(),
                  label: `${i}/${fromDate.getFullYear()}`
                })
              }
            } else if (i === toDate.getFullYear()) {
              for (let i = 1; i <= monthEnd; i++) {
                labels.push({
                  month: i,
                  year: toDate.getFullYear(),
                  label: `${i}/${toDate.getFullYear()}`
                })
              }
            } else {
              for (let j = 1; j <= 12; j++) {
                labels.push({
                  month: j,
                  year: i,
                  label: `${j}/${i}`
                })
              }
            }
          }
        } else {
          for (let i = monthStart; i <= monthEnd; i++) {
            labels.push({
              month: i,
              year: fromDate.getFullYear(),
              label: `${i}/${fromDate.getFullYear()}`
            })
          }
        }
        return labels
      case 3:
        let yearStart = fromDate.getFullYear()
        let yearEnd = toDate.getFullYear()
        for (let i = yearStart; i <= yearEnd; i++) {
          labels.push({
            year: i,
            label: i
          })
        }
        return labels
    }
  }

  const generateTestLogData = () => {
    let testData = []

    // Generate test data
    // This week
    let dates = [] as any
    for (let i = 0; i < 2; i++) {
      dates.push(generateRandomDate(moment().startOf('isoWeek').toDate(), moment().toDate()))
    }

    // This month
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

    dates.sort((a: Date, b: Date) => new Date(a.getTime()) < new Date(b.getTime()))

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
          points: correctPoints.concat(wrongPoints)
        }
      })
    })

    return testData
  }

  const setDatesToDefault = () => {
    setFromDate(getMidnight(new Date()))
    setToDate(getMidnight(new Date()))
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: isPoint ? `${capitalize(t("records.chart.total"))} ${t("general.points")} ${t("records.chart.learnt")}` :
          `${capitalize(t("records.chart.total"))} ${t("general.meridians")} ${t("records.chart.learnt")}`,
      },
    },
    // scales: {
    //   y: {
    //     beginAtZero: true
    //   }
    // }
  };


  return (
    <div
      role="div"
      aria-label="records-chart"
      className="records-chart p-2">

      <div className='w-full flex justify-between records-chart__title--container'>
        <span>
          {isPoint &&
            <>
              <h1
                onClick={() => setIsPoint(true)}
                className={`inline records-chart__title ${isPoint ? "records-chart__title--selected" : ""}`}>
                {capitalize(t('general.points'))}</h1>
              <h1
                onClick={() => setIsPoint(false)}
                className={`inline ml-2 records-chart__title ${!isPoint ? "records-chart__title--selected" : ""}`}>
                {capitalize(t('general.meridians'))}</h1>
            </>}
          {!isPoint &&
            <>
              <h1
                onClick={() => setIsPoint(false)}
                className={`inline records-chart__title ${!isPoint ? "records-chart__title--selected" : ""}`}>
                {capitalize(t('general.meridians'))}</h1>
              <h1
                onClick={() => setIsPoint(true)}
                className={`inline ml-2 records-chart__title ${isPoint ? "records-chart__title--selected" : ""}`}>
                {capitalize(t('general.points'))}</h1>
            </>}
        </span>

        <span>
          {t('records.chart.by')} {' '}
          <select
            className="records-chart__select"
            value={showingTypeOption}
            onChange={(e) => setShowingTypeOption(parseInt(e.target.value))}
          >
            {DATE_UNITS.map((option, index) => (
              <option
                className="records-progress__select--option"
                value={index}
                key={`records-progress-option-${index}`}
              >{option}</option>
            ))}
          </select>
        </span>

        <span>
          {t('records.chart.from')} {' '}
          <input
            className='records-chart__input--date'
            type="date"
            value={getInputDateFormat(fromDate)}
            onChange={(e) => setFromDate(getMidnight(moment(e.target.value, 'YYYY-MM-DD').toDate()))}></input>

          {' '} {t('records.chart.to')} {' '}
          <input
            className='records-chart__input--date'
            type="date"
            value={getInputDateFormat(toDate)}
            onChange={(e) => setToDate(getMidnight(moment(e.target.value, 'YYYY-MM-DD').toDate()))}></input>
        </span>
      </div>

      <div className='records-chart__chart flex justify-center items-center'>
        <Line
          options={options} data={chartData}></Line>
      </div>
    </div>
  );
};
