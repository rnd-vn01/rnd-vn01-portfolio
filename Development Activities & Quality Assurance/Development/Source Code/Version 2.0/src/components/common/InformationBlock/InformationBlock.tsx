import './InformationBlock.scss';
import React, { useEffect, useState } from 'react';
import { capitalize, capitalizeAndMapInformationField, capitalizeEachWord } from 'src/helpers/capitalize';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import IconShow from "src/assets/images/IconShow.svg"
import IconHide from "src/assets/images/IconHide.svg"
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

export const InformationBlock: React.FC<IInformationBlock> = ({ isPoint, itemInformation, usingLanguage }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const {
    isShowingQuickInformation
  } = useSelector(
    (state: RootState) => state.selectionSlice,
  );

  useEffect(() => {
    if (isShowingQuickInformation) {
      setIsShowing(true)
    } else {
      setIsShowing(false)
    }
  }, [isShowingQuickInformation])

  return (
    <div
      role="div"
      aria-label="information-block"
      className="information-block">

      {isShowingQuickInformation && <div
        className={`information-block__menu--button-logo inline-flex w-fit h-full flex-center
          ${!isShowing && `information-block__menu--faded`}
        `}
        onClick={(e) => {
          e.stopPropagation()
          setIsShowing(!isShowing)
        }}
        role="div"
        aria-label="information-block-hide-icon"
      >
        <img src={isShowing ? IconShow : IconHide} className="information-block__menu--image-logo"></img>
      </div>}

      {itemInformation && isShowing &&
        <>
          <div className="information-block__title flex flex-col items-center justify-center"
            data-testid={"information-block-title"}>
            <span className="px-2 text-center">
              <h1 className="information-block__title--code">{itemInformation.code}</h1>
              <h1 className="information-block__title--name">{capitalizeEachWord(itemInformation.name)}</h1>
            </span>
          </div>

          {Object.keys(itemInformation).map((field, index) => {
            if (field === "description") {
              return (
                <div key={`point-information-${index}`}>
                  <div
                    className={`information-block__category`}>
                    {capitalizeAndMapInformationField(isPoint, field, usingLanguage)}
                  </div>
                  <div className="information-block__info">
                    <p className={`information-block__info--text p-2`}>
                      {itemInformation[field]}
                    </p>
                  </div>
                </div>
              )
            }
          })}

          <div
            className={`information-block__view-details flex justify-between`}
            role="div"
            aria-label="information-block-view-details"
            onClick={() => {
              history.push(`/detail/${isPoint ? "point" : "meridian"}/${itemInformation.code}`)
            }}
          >
            <span>
              {t('view_details')}
            </span>

            <div className='inline-flex items-center justify-center' style={{ transform: "rotate(45deg)" }}>
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </div>
        </>}
    </div>
  );
};
