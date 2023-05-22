import './SearchProcessor.scss';
import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash"
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { passFilter, SEARCH_BY } from 'src/helpers/searchProcess';
import { setAcupuncturePoints, setMeridians } from 'src/redux/slice';
import { getAcupuncturePoints, getMeridians } from 'src/helpers/api/items';

export const SearchProcessor: React.FC<ISearchProcessor> = ({
  query,
  callbackSetResults,
  callbackSetLoading,
  callbackIsReadyForSearch
}) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState<any>(true)
  const [results, setResults] = useState<any>([])

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
  const dispatch = useAppDispatch();

  const fetchResults = (query: string) => {
    const ACUPUNCTURE_POINTS = acupuncturePoints || [];
    const MERIDIANS = meridians || [];

    let results = []
    if (query !== "") {
      ACUPUNCTURE_POINTS.forEach((point) => {
        if (passFilter(point, query, true, SEARCH_BY.ALL)) {
          results.push(point)
        }
      })

      MERIDIANS.forEach((meridian) => {
        if (passFilter(meridian, query, false, SEARCH_BY.ALL)) {
          results.push(meridian)
        }
      })
    } else {
      ACUPUNCTURE_POINTS.forEach((point) => {
        results.push(point)
      })

      MERIDIANS.forEach((meridian) => {
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

  useEffect(() => {
    const updateInitial = async () => {
      let isLoadNew = false;

      if (!acupuncturePoints || !meridians) {
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

  return (
    <div
      role="div"
      aria-label="search-processor"
      className={`search-processor`}>

    </div>
  );
};
