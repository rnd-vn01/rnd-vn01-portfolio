import './RecordsLog.scss';
import React, { useEffect, useState } from "react";
import { getCurrentDateFullString, getTimeText } from 'src/helpers/date';
import { MERIDIANS } from 'src/configs/constants';
import { useHistory } from 'react-router-dom';

export const RecordsLog: React.FC<IRecordsLog> = ({
  logData,
  index
}) => {
  const history = useHistory();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showingLogResult, setShowingLogResult] = useState<any>({});

  useEffect(() => {
    var growDiv = document.querySelector(`#records-log-${index}`) as HTMLElement;
    if (growDiv) {
      if (growDiv.clientHeight) {
        growDiv.style.height = "0px";
        growDiv.style.overflow = "hidden";
      } else {
        growDiv.style.height = growDiv.scrollHeight + "px";
        growDiv.style.overflow = "auto";
      }
    }
  }, [isCollapsed])

  useEffect(() => {
    let points = {}

    MERIDIANS.forEach(meridian => points[meridian] = [])

    logData?.result?.correctPoints?.forEach((point) => {
      if (!points[point.meridian]) {
        if (points["Others"])
          points["Others"].push(point)
        else
          points["Others"] = [point]
      } else {
        points[point.meridian].push(point)
      }
    })

    logData?.result?.wrongPoints?.forEach((point) => {
      if (!points[point.meridian]) {
        if (points["Others"])
          points["Others"].push(point)
        else
          points["Others"] = [point]
      } else {
        points[point.meridian].push(point)
      }
    })

    Object.keys(points).forEach((meridian) => {
      points[meridian].sort((pointA: any, pointB: any) => {
        return parseInt(pointA.code.split("-")[1]) > parseInt(pointB.code.split("-")[1])
      })
    })

    MERIDIANS.forEach(meridian => {
      if (points[meridian].length === 0)
        delete points[meridian]
    })

    setShowingLogResult({
      numberOfQuestions: logData?.result?.numberOfQuestions,
      correctAnswers: logData?.result?.correctAnswers,
      points: points
    })
  }, [logData])

  return (
    <div
      role="div"
      aria-label="records-log"
      className={`records-log`}

    >
      <div
        className="records-log__header"
        role="div"
        aria-label="records-log-header"
        onClick={(e) => { setIsCollapsed(!isCollapsed) }}>
        <div className="records-log__flex-block flex justify-between">
          <h1 className="records-log__header--timestamp">
            {logData ?
              `${getCurrentDateFullString(logData.date)} · ${getTimeText(logData.date)}`
              : ""}
          </h1>

          <h1 className='records-log__header--result'>
            <span className='records-log__header--correct-answers'>{showingLogResult?.correctAnswers}</span>
            {`/${showingLogResult?.numberOfQuestions}`}
          </h1>
        </div>
      </div>

      {showingLogResult?.points &&
        <div className="records-log__information"
          role="div"
          aria-label="records-log-information"
          data-testid="records-log-information"
          id={`records-log-${index}`}>
          {Object.keys(showingLogResult.points).map(meridian =>
            <div
              className='records-log__meridian mb-3'
              key={`records-log-meridian-${meridian}`}>
              <h3
                onClick={() => {
                  window.open(`/detail/meridian/${meridian}`, "_blank").focus()
                }}
                className='records-log__meridian--title'>
                {meridian}
              </h3>
              <span className='records-log__meridian--points'>
                {showingLogResult.points[meridian].map((point, index) => (
                  <span
                    onClick={() => {
                      window.open(`/detail/point/${point.code}`, "_blank").focus()
                    }}
                    className={`inline-block mr-3 
                    ${point.isCorrect ? "records-log__meridian--correct" : "records-log__meridian--wrong"}`}
                    style={{ display: "inline-block" }}>{point.code}</span>
                ))}
              </span>
            </div>)}
        </div>}
    </div>
  );
};
