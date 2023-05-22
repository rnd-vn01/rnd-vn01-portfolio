import './SearchProcessor.scss';
import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash"
import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { passFilter, SEARCH_BY } from 'src/helpers/searchProcess';

export const SearchProcessor: React.FC<ISearchProcessor> = ({
  query,
  callbackSetResults,
  callbackSetLoading
}) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState<any>(false)
  const [results, setResults] = useState<any>([])
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const fetchResults = (query: string) => {
    const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI
    const DEMO_DATA_MERIDIAN = currentLanguage === "EN" ? DEMO_DATA_MERIDIAN_EN : DEMO_DATA_MERIDIAN_VI

    let results = []
    if (query !== "") {
      DEMO_DATA.forEach((point) => {
        if (passFilter(point, query, true, SEARCH_BY.ALL)) {
          results.push(point)
        }
      })

      DEMO_DATA_MERIDIAN.forEach((meridian) => {
        if (passFilter(meridian, query, false, SEARCH_BY.ALL)) {
          results.push(meridian)
        }
      })
    } else {
      DEMO_DATA.forEach((point) => {
        results.push(point)
      })

      DEMO_DATA_MERIDIAN.forEach((meridian) => {
        results.push(meridian)
      })
    }

    setResults(results);
    setIsLoading(false);
  }

  const debounceFetchResult = useCallback(
    debounce((newQuery) => fetchResults(newQuery), 500), []);

  useEffect(() => {
    if (query !== "") {
      setIsLoading(true);
      debounceFetchResult(query)
    } else {
      fetchResults("")
      setIsLoading(false);
    }
  }, [query])

  useEffect(() => {
    callbackSetResults(results)
  }, [results])

  useEffect(() => {
    callbackSetLoading(isLoading)
  }, [isLoading])

  return (
    <div
      role="div"
      aria-label="search-processor"
      className={`search-processor`}>

    </div>
  );
};
