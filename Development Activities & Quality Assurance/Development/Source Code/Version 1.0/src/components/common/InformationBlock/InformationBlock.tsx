import './InformationBlock.scss';
import React, { useState } from 'react';
import { capitalize, capitalizeAndMapInformationField, capitalizeEachWord } from 'src/helpers/capitalize';

export const InformationBlock: React.FC<IInformationBlock> = ({ isPoint, itemInformation, usingLanguage }) => {
  return (
    <div
      role="div"
      aria-label="information-block"
      className="information-block">
      {itemInformation &&
        <>
          <div className="information-block__title flex flex-col items-center justify-center">
            <span className="px-2">
              <h1 className="information-block__title--code">{itemInformation.code.toUpperCase()}</h1>
              <h1 className="information-block__title--name">{capitalizeEachWord(itemInformation.name)}</h1>
            </span>
          </div>
          {Object.keys(itemInformation).map((field, index) => {
            if (field !== "name" && field !== "code") {
              return (
                <div key={`point-information-${index}`}>
                  <div
                    className={`information-block__category ${field === "caution" ? "information-block__category--caution" : ""}`}>
                    {capitalizeAndMapInformationField(isPoint, field, usingLanguage)}
                  </div>
                  <div className="information-block__info">
                    {isPoint && field === "functionalities" ?
                      <div className="p-2">
                        {itemInformation[field].map((functionality, itemIndex) =>
                        (
                          <p
                            key={`point-functionality-${itemIndex}`}
                          >{`${itemIndex + 1}. ${functionality}`}</p>
                        ))}
                      </div>
                      : <>
                        {
                          !isPoint && field === "points" ?
                            <div className="p-2">
                              {itemInformation[field].map((point, itemIndex) =>
                              (
                                <p
                                  key={`meridian-points-${itemIndex}`}
                                >{`${point.code.toUpperCase()} - ${point.name}`}</p>
                              ))}
                            </div>
                            :
                            <p className={`information-block__info--text p-2 
                          ${field === "caution" ? "information-block__info--text-caution" : ""}`}>
                              {itemInformation[field]}
                            </p>
                        }
                      </>
                    }
                  </div>
                </div>
              )
            }
          })}
        </>}
    </div>
  );
};
