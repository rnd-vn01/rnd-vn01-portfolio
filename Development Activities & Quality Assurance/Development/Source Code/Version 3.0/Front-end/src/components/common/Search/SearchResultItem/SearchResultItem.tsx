import './SearchResultItem.scss';
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { capitalizeAndMapInformationField } from 'src/helpers/capitalize';
import { useHistory, useLocation } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch } from 'src/redux/store';
import { setViewDetailsPersistLastPage } from 'src/redux/slice';

export const SearchResultItem: React.FC<ISearchResultItem> = ({
  item,
  isPoint,
  usingLanguage,
  query,
  filterOptions
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const firstTriggered = useRef<boolean>(false);
  const history = useHistory();
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (firstTriggered.current) {
      var growDiv = document.querySelector(`#search-result-${item?.code}`) as HTMLElement;

      if (growDiv) {
        if (growDiv.clientHeight) {
          growDiv.style.height = "0px";
          growDiv.style.overflow = "hidden";
        } else {
          growDiv.style.height = growDiv.scrollHeight + "px";
          growDiv.style.overflow = "auto";
        }
      }
    }
  }, [isCollapsed])

  return (
    <div
      role="div"
      aria-label="search-result"
      className={`search-result`}
    >
      <div
        className="search-result__header"
        onClick={(e) => {
          if (isDesktop) {
            if (!firstTriggered.current)
              firstTriggered.current = true
            setIsCollapsed(!isCollapsed)
          } else {
            history.push(`/detail/${isPoint ? "point" : "meridian"}/${item.code}?query=${query}`)
          }
        }}>


        <div
          className="search-result__header--view-left"
          data-tip
          data-for={`tooltip-${item.code}`}>
          <div
            role="img"
            aria-label="view-on-model"
            style={{
              cursor: "pointer",
              transform: "translateY(-3.5px)"
            }}
            onClick={(e) => {
              history.push(`/?type=${isPoint ? "point" : "line"}&code=${item["code"]}`, {
                isRedirect: true
              })
            }}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className='search-result__icon--map-pin'
            />
          </div>
          <ReactTooltip id={`tooltip-${item.code}`} place="bottom" effect="solid">
            <p>{t('view_on_model')}</p>
          </ReactTooltip>
        </div>

        <div className="search-result__flex-block flex justify-between">
          <h1 className="search-result__header--code">
            <Highlighter
              highlightClassName='search-result__highlighted'
              searchWords={query || []}
              autoEscape={true}
              textToHighlight={item?.code}
            >
            </Highlighter>
          </h1>
          <h1 className="search-result__header--name">
            <Highlighter
              highlightClassName='search-result__highlighted'
              searchWords={query || []}
              autoEscape={true}
              textToHighlight={item?.name}
            >
            </Highlighter>
          </h1>
        </div>

        <FontAwesomeIcon
          className="search-result__header--view"
          icon={faChevronRight}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setViewDetailsPersistLastPage({
              path: `${location.pathname}?query=${query}`,
              isRedirect: true,
              query: item["code"],
              filterOptions
            }));
            history.push(`/detail/${isPoint ? "point" : "meridian"}/${item.code}?query=${query}`)
          }}></FontAwesomeIcon>
      </div>

      {item &&
        <div className="search-result__information"
          id={`search-result-${item?.code}`}>
          {Object.keys(item).map((field, index) => {
            if (field !== "name" && field !== "code") {
              return (
                <div key={`point-information-${index}`}>
                  <div
                    className={`search-result__category ${field === "caution" ? "search-result__category--caution" : ""}`}>
                    <span>{capitalizeAndMapInformationField(isPoint, field, usingLanguage)}</span>
                  </div>
                  <div className="search-result__info">
                    {isPoint && field === "functionalities" ?
                      <div className="pb-2 pt-1">
                        {item[field].map((functionality, itemIndex) =>
                        (
                          <p
                            key={`point-functionality-${itemIndex}`}
                          >
                            <Highlighter
                              highlightClassName='search-result__highlighted'
                              searchWords={query || []}
                              autoEscape={true}
                              textToHighlight={`${itemIndex + 1}. ${functionality}`}
                            >
                            </Highlighter>
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
                                >
                                  <Highlighter
                                    highlightClassName='search-result__highlighted'
                                    searchWords={query || []}
                                    autoEscape={true}
                                    textToHighlight={`${point}`}
                                  >
                                  </Highlighter>
                                </p>
                              ))}
                            </div>
                            :
                            <p className={`search-result__info--text pb-2 pt-1
                          ${field === "caution" ? "search-result__info--text-caution" : ""}`}>
                              <Highlighter
                                highlightClassName='search-result__highlighted'
                                searchWords={query || []}
                                autoEscape={true}
                                textToHighlight={item[field]}
                              >
                              </Highlighter>
                            </p>
                        }
                      </>
                    }
                  </div>
                </div>
              )
            }
          })}
        </div>}
    </div>
  );
};
