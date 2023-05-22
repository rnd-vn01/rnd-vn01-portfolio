import './AboutPageSection.scss';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

export const AboutPageSection: React.FC<IAboutPageSection> = ({
  showContent,
  isCollapsable,
  sectionName,
  information,
  index
}) => {
  const history = useHistory();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showingLogResult, setShowingLogResult] = useState<any>({});

  useEffect(() => {
    if (isCollapsable) {
      var growDiv = document.querySelector(`#about-page-section__${index}`) as HTMLElement;
      if (!isCollapsed) {
        growDiv.style.height = "0px";
        growDiv.style.overflow = "hidden";
      } else {
        growDiv.style.height = Math.max(growDiv.scrollHeight, 300) + "px";
        growDiv.style.overflow = "auto";
      }
    }
  }, [isCollapsed])

  return (
    <div
      role="div"
      aria-label="about-page-section"
      className={`about-page-section`}
    >
      <div
        className={`about-page-section__header ${isCollapsable ? "about-page-section__header--collapsable" : ""}`}
        onClick={(e) => { setIsCollapsed(!isCollapsed) }}
        aria-label={`about-page-section-${sectionName}`}
        role="about-page-section">
        <div className="about-page-section__flex-block flex justify-between">
          <h1 className="about-page-section__header--section">
            {sectionName}
          </h1>

          <span className='about-page-section__header--info'>
            {information}
          </span>
        </div>
      </div>

      {isCollapsable &&
        <div className="about-page-section__information"
          role="div"
          aria-label="about-page-section-information"
          data-testid="about-page-section-information"
          id={`about-page-section__${index}`}>
          {showContent}
        </div>}
    </div >
  );
};
