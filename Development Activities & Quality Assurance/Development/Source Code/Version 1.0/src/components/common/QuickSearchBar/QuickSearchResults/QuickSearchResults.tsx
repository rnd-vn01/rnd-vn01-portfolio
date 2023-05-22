import './QuickSearchResults.scss';
import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { capitalize } from 'src/helpers/capitalize';
import { debounce } from "lodash"

import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { passFilter, SEARCH_BY } from 'src/helpers/searchProcess';
import Highlighter from 'react-highlight-words';

export const QuickSearchResults: React.FC<IQuickSearchResults> = ({ query }) => {
  const history = useHistory();
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const [isLoading, setIsLoading] = useState<any>(false)
  const [results, setResults] = useState<any>({})

  const fetchResults = async (query: string) => {
    const MERIDIANS = ["LU", "LI", "ST", "SP", "HT", "SI", "BL", "KI", "PC", "TE", "GB", "Liv", "Du", "Ren"]

    let EXAMPLE_RESULT = {
      meridians: [],
      points: []
    }

    const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI
    const DEMO_DATA_MERIDIAN = currentLanguage === "EN" ? DEMO_DATA_MERIDIAN_EN : DEMO_DATA_MERIDIAN_VI

    DEMO_DATA.forEach((point) => {
      if (passFilter(point, query, true, SEARCH_BY.NAME)
        || passFilter(point, query, true, SEARCH_BY.CODE)) {
        EXAMPLE_RESULT.points.push({
          "name": `${point.name} (${point.code})`,
          "url": `/detail/point/${point.code}`
        })
      }
    })

    DEMO_DATA_MERIDIAN.forEach((meridian) => {
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

  return (
    <div
      role="div"
      aria-label="quick-search-results"
      className={`quick-search-results w-full 
      ${!isLoading && Object.keys(results).length > 0 ? "quick-search-results--showing" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      {!isLoading && Object.keys(results).length > 0 &&
        Object.keys(results).map((category: any, index: number) => {
          if (results[category].length > 0) {
            return (
              <div
                className={`quick-search-results__block`}
                key={`quick-search-category-${index}`}
              >
                <div className="quick-search-results__block--category">
                  <span className="quick-search-results__result-block">
                    <Highlighter
                      highlightClassName='quick-search-results__highlighted'
                      searchWords={[query]}
                      autoEscape={true}
                      textToHighlight={capitalize(category)}>
                    </Highlighter>
                  </span>
                </div>
                {results[category].map((item: any, subIndex: number) => (
                  <div
                    className="quick-search-results__item"
                    onClick={() => history.push(item.url)}
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
    </div>
  );
};
