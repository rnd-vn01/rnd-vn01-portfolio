import './QuickSearchResults.scss';
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { capitalize } from 'src/helpers/capitalize';
import { debounce } from "lodash"

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { passFilter, SEARCH_BY } from 'src/helpers/searchProcess';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
  setLineSelectedByLabel,
  setPointSelectedByLabel
} from 'src/redux/slice';
import {
  getAcupuncturePoints,
  getMeridians
} from 'src/helpers/api/items';

export const QuickSearchResults: React.FC<IQuickSearchResults> = ({
  query, isShowing, callbackIsReadyForSearch }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const {
    acupuncturePoints,
    meridians
  } = useSelector(
    (state: RootState) => state.dataSlice,
  );
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<any>(false)
  const [results, setResults] = useState<any>({})
  const cloneAcupuncturePoints = useRef<Array<any>>([]);
  const cloneMeridians = useRef<Array<any>>([]);

  const fetchResults = async (query: string) => {
    setResults({});
    setIsLoading(true);

    let EXAMPLE_RESULT = {
      meridians: [],
      points: []
    }

    const ACUPUNCTURE_POINTS = cloneAcupuncturePoints.current;
    const MERIDIANS = cloneMeridians.current;

    ACUPUNCTURE_POINTS.forEach((point) => {
      if (passFilter(point, query, true, SEARCH_BY.NAME)
        || passFilter(point, query, true, SEARCH_BY.CODE)) {
        EXAMPLE_RESULT.points.push({
          "name": `${point.name} (${point.code})`,
          "url": `/detail/point/${point.code}`
        })
      }
    })

    MERIDIANS.forEach((meridian) => {
      if (passFilter(meridian, query, false, SEARCH_BY.NAME)
        || passFilter(meridian, query, false, SEARCH_BY.CODE)) {
        EXAMPLE_RESULT.meridians.push({
          "name": `${meridian.name} (${meridian.code})`,
          "url": `/detail/meridian/${meridian.code}`
        })
      }
    })

    setResults(EXAMPLE_RESULT);
    setIsLoading(false);
  }

  const debounceFetchResult = useCallback(
    debounce((newQuery) => fetchResults(newQuery), 500), []);

  useEffect(() => {
    if (query !== "") {
      setIsLoading(true);
      debounceFetchResult(query)
    } else {
      setResults({});
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const updateInitial = async () => {
      let isLoadNew = true;

      if (!acupuncturePoints.length || !meridians.length) {
        callbackIsReadyForSearch(false);
        isLoadNew = true;
      } else {
        callbackIsReadyForSearch(true);
      }

      await getAcupuncturePoints(currentLanguage);
      await getMeridians(currentLanguage);

      callbackIsReadyForSearch(true);
    }

    updateInitial();
  }, [])

  useEffect(() => {
    cloneAcupuncturePoints.current = acupuncturePoints
  }, [acupuncturePoints])

  useEffect(() => {
    cloneMeridians.current = meridians
  }, [meridians])

  return (
    <div
      role="div"
      aria-label="quick-search-results"
      className={`quick-search-results w-full 
      ${!isLoading && isShowing && Object.keys(results).length > 0 ? "quick-search-results--showing" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      {query !== "" && <div
        className={`quick-search-results__block--advanced-search flex justify-between`}
        role="div"
        aria-label="quick-search-advanced-search"
        onClick={() => {
          history.push(`/advanced-search?query=${query}`)
        }}
      >
        <span>
          {t('advanced_search_page.title')}{` "${query}"`}
        </span>

        <div className='inline-flex items-center justify-center' style={{ transform: "rotate(45deg)" }}>
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
      </div>}

      {!isLoading && Object.keys(results).length > 0 &&
        Object.keys(results).map((category: any, index: number) => {
          if (results[category].length > 0) {
            return (
              <div
                className={`quick-search-results__block`}
                key={`quick-search-category-${index}`}
                role="div"
                aria-label="quick-search-results-block"
              >
                <div className="quick-search-results__block--category">
                  <span className="quick-search-results__result-block">
                    {capitalize(t(`general.${category}`))}
                  </span>
                </div>
                {results[category].map((item: any, subIndex: number) => (
                  <div
                    className="quick-search-results__item"
                    role="quick-search-result-item"
                    aria-label={`quick-search-result-item-${item}`}
                    onClick={() => {
                      const getCode = item.name.substring(item.name.indexOf("(") + 1, item.name.indexOf(")"))
                      if (category === "meridians") {
                        {/* NOT_TESTED */ }
                        dispatch(setLineSelectedByLabel({
                          selectedLine: getCode
                        }))
                        setResults({});
                        {/* NOT_TESTED */ }
                      } else {
                        dispatch(setPointSelectedByLabel({
                          selectedPoint: getCode
                        }))
                        setResults({});
                      }
                    }}
                    key={`quick-search-result-item-${index}-${subIndex}`}>
                    <span className="quick-search-results__result-block">
                      <Highlighter
                        highlightClassName='quick-search-results__highlighted'
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={capitalize(item.name)}>
                      </Highlighter>
                    </span>
                  </div>
                ))}
              </div>
            )
          }
        })
      }

      {!isLoading && results["points"]?.length === 0 && results["meridians"]?.length === 0 &&
        <h1
          className='quick-search-results__no-results'
        >{t('no_results')}</h1>
      }
    </div>
  );
};
