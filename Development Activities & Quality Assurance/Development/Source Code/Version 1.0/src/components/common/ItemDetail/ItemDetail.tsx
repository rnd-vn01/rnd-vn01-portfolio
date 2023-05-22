import './ItemDetail.scss';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { capitalizeAndMapInformationField } from 'src/helpers/capitalize';
import { useHistory } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

export const ItemDetail: React.FC<IItemDetail> = ({
  item,
  isPoint,
  usingLanguage,
  query
}) => {
  const history = useHistory();
  const {
    isLoggedIn,
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );

  return (
    <div
      role="div"
      aria-label="item-detail"
      className={`item-detail`}
    >
      <div
        className="item-detail__header">
        <div className="item-detail__flex-block flex justify-between">
          <h1 className="item-detail__header--code">
            {item?.code && <Highlighter
              highlightClassName='item-detail__highlighted'
              searchWords={[]}
              autoEscape={true}
              textToHighlight={item?.code || ""}
            >
            </Highlighter>}
          </h1>
          <h1 className="item-detail__header--name">
            {item?.name && <Highlighter
              highlightClassName='item-detail__highlighted'
              searchWords={[]}
              autoEscape={true}
              textToHighlight={item?.name || ""}
            >
            </Highlighter>}
          </h1>
        </div>

        <FontAwesomeIcon
          className="item-detail__header--back"
          icon={faChevronLeft}
          onClick={(e) => {
            e.stopPropagation();
            history.push(`${query ? `/advanced-search?query=${query}` : "/advanced-search"}`)
          }}></FontAwesomeIcon>

        {isLoggedIn && user?.isAdmin && <FontAwesomeIcon
          className="item-detail__header--edit"
          icon={faEdit}
          onClick={(e) => {
            e.stopPropagation();
            history.push(location.pathname + "?edit")
          }}></FontAwesomeIcon>}
      </div>

      <div className="item-detail__information">
        {Object.keys(item).map((field, index) => {
          if (field !== "name" && field !== "code") {
            return (
              <div key={`point-information-${index}`}>
                <div
                  className={`item-detail__category ${field === "caution" ? "item-detail__category--caution" : ""}`}>
                  <span>{capitalizeAndMapInformationField(isPoint, field, usingLanguage)}</span>
                </div>
                <div className="item-detail__info">
                  {isPoint && field === "functionalities" ?
                    <div className="pb-2 pt-1">
                      {item[field].map((functionality, itemIndex) =>
                      (
                        <p
                          key={`point-functionality-${itemIndex}`}
                        >
                          {functionality && <Highlighter
                            highlightClassName='item-detail__highlighted'
                            searchWords={[]}
                            autoEscape={true}
                            textToHighlight={`${itemIndex + 1}. ${functionality}` || ""}
                          >
                          </Highlighter>}
                        </p>
                      ))}
                    </div>
                    : <>
                      {
                        !isPoint && field === "points" ?
                          <div className="pb-2 pt-1">
                            {item[field].map((point, itemIndex) =>
                            (
                              <p
                                key={`meridian-points-${itemIndex}`}
                                className={"item-detail__meridian-point"}
                                onClick={() => location.pathname = `/detail/point/${point}`}
                              >
                                {point && <Highlighter
                                  highlightClassName='item-detail__highlighted'
                                  searchWords={[]}
                                  autoEscape={true}
                                  textToHighlight={`${point}` || ""}
                                >
                                </Highlighter>}
                              </p>
                            ))}
                          </div>
                          :
                          <p className={`item-detail__info--text pb-2 pt-1
                          ${field === "caution" ? "item-detail__info--text-caution" : ""}`}>
                            {item[field] && <Highlighter
                              highlightClassName='item-detail__highlighted'
                              searchWords={[]}
                              autoEscape={true}
                              textToHighlight={item[field] || ""}
                            >
                            </Highlighter>}
                          </p>
                      }
                    </>
                  }
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};
