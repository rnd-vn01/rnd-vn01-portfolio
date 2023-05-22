import './RecordsChart.scss';
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { capitalize } from 'src/helpers/capitalize';
import { getCurrentDateFullString, getInputDateFormat, getMidnight, getMonday, getWeekNumber } from 'src/helpers/date';
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
import { MERIDIANS } from 'src/configs/constants';
import { useMediaQuery } from 'react-responsive';
import { getLogsForChart } from 'src/helpers/statistics';

export const RecordsChart: React.FC<IRecordsChart> = ({
  quizzesList
}) => {
  const { t } = useTranslation();
  const [isPoint, setIsPoint] = useState<boolean>(true);
  const [showingTypeOption, setShowingTypeOption] = useState<number>(0);
  const [fromDate, setFromDate] = useState<Date>(getMidnight(getMonday(new Date())));
  const [toDate, setToDate] = useState<Date>(getMidnight(new Date()));
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  })
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
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
    const testData = generateLogData();
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
        while (getMidnight(iterator) <= toDate) {
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

  const generateLogData = () => {
    return getLogsForChart(quizzesList, showingTypeOption)
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

      <div className={`w-full flex justify-between records-chart__title--container
       ${!isDesktop && "flex-col"}
      `}>
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
