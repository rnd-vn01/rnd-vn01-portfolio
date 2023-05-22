import './SearchResults.scss';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { SearchResultItem } from '../SearchResultItem/SearchResultItem';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from 'react-i18next';
import { filterByAlphabet, passFilter, replaceVietnameseNotation } from 'src/helpers/searchProcess';
import { ALPHABET_LISTS } from 'src/configs/constants';
import { SearchResultsAlphabetFilters } from './SearchResultsAlphabetFilters/SearchResultsAlphabetFilters';

export const SearchResults: React.FC<ISearchResults> = ({
  results,
  query,
  isLoading,
  callbackSetNumberOfMatchingResults,
  callbackSetChoosingAlphabet
}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const [filteredResults, setFilteredResults] = useState<Array<any>>([]);
  const [currentFilterOptions, setCurrentFilterOptions] = useState<any>({
    searchOn: 0,
    searchBy: 0,
    show: 0
  });
  const [filters, setFilters] = useState<any>({});
  const [currentIsLoading, setCurrentIsLoading] = useState<boolean>(false);
  const [isChoosingAlphabet, setIsChoosingAlphabet] = useState<boolean>(false);
  const [choosingAlphabetOption, setChoosingAlphabetOption] = useState<number>(-1);
  const [allAlphabetFilteredResults, setAllAlphabetFilteredResults] = useState<Array<any>>([]);

  const FILTER_OPTIONS = {
    VI: {
      searchOn: ["tất cả", "kinh lạc", "huyệt đạo"],
      searchBy: ["tất cả", "mã", "tên", "mô tả", "vị trí", "chức năng", "phương pháp"],
      show: ["tất cả kinh lạc", "chỉ kinh lạc LU", "chỉ kinh lạc LI", "chỉ kinh lạc ST", "chỉ kinh lạc SP",
        "chỉ kinh lạc HT", "chỉ kinh lạc SI", "chỉ kinh lạc BL", "chỉ kinh lạc KI", "chỉ kinh lạc PC",
        "chỉ kinh lạc TE", "chỉ kinh lạc GB", "chỉ kinh lạc Liv", "chỉ kinh lạc Du", "chỉ kinh lạc Ren"]
    },
    EN: {
      searchOn: ["all", "meridians", "points"],
      searchBy: ["all", "code", "name", "description", "location", "functionalities", "method"],
      show: ["all meridians", "LU meridian only", "LI meridian only", "ST meridian only", "SP meridian only",
        "HT meridian only", "SI meridian only", "BL meridian only", "KI meridian only", "PC meridian only",
        "TE meridian only", "GB meridian only", "Liv meridian only", "Du meridian only", "Ren meridian only"]
    }
  }

  useEffect(() => {
    setFilters(FILTER_OPTIONS[currentLanguage])
  }, [currentLanguage])

  useEffect(() => {
    setCurrentIsLoading(true);
    setFilteredResults(processShowingItems())
    setAllAlphabetFilteredResults(processShowingItems())
  }, [currentFilterOptions, results])

  useEffect(() => {
    setCurrentIsLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    callbackSetChoosingAlphabet(isChoosingAlphabet)
  }, [isChoosingAlphabet])

  useEffect(() => {
    const getFullLists = allAlphabetFilteredResults.length > 0 ? allAlphabetFilteredResults : filteredResults;
    const filteredResult = filterByAlphabet(getFullLists, choosingAlphabetOption, currentLanguage)
    callbackSetNumberOfMatchingResults(filteredResult.length)
    setFilteredResults(filteredResult)

    if (isChoosingAlphabet) {
      setIsChoosingAlphabet(false);
    }
  }, [choosingAlphabetOption])

  useEffect(() => {
    setChoosingAlphabetOption(-1);
  }, [query])

  const processShowingItems = () => {
    let newResults = results.filter(
      item => passFilter(item, query, item.diseases ? false : true, currentFilterOptions.searchBy)
    )

    if (currentFilterOptions.searchOn !== 0) {
      if (currentFilterOptions.searchOn === 1) {
        newResults = newResults.filter(item => item.diseases)
      } else {
        newResults = newResults.filter(item => !item.diseases)
      }
    }

    if (currentFilterOptions.show !== 0) {
      const meridian_name = FILTER_OPTIONS[currentLanguage]["show"][currentFilterOptions.show]
        .replace(" meridian only", "").replace("chỉ kinh lạc ", "")

      newResults = newResults.filter(
        item => replaceVietnameseNotation(item.code.substring(0, meridian_name.length).toUpperCase())
          === meridian_name.toUpperCase()
      )
    }

    callbackSetNumberOfMatchingResults(newResults.length)
    setCurrentIsLoading(false)
    return newResults
  }

  return (
    <div
      role="div"
      aria-label="search-results"
      className={`search-results`}
      onClick={(e) => e.stopPropagation()}
    >
      {isChoosingAlphabet ?
        <SearchResultsAlphabetFilters
          results={allAlphabetFilteredResults.length > 0 ? allAlphabetFilteredResults : filteredResults}
          callbackSetAlphabetFilteringOption={setChoosingAlphabetOption}
        />
        :
        <>
          {!currentIsLoading && filteredResults?.length > 0 &&
            <>
              {filteredResults.length > 0 &&
                <h1
                  onClick={() => setIsChoosingAlphabet(true)}
                  className="search-results__letter">
                  {choosingAlphabetOption !== -1 ?
                    ALPHABET_LISTS[currentLanguage][choosingAlphabetOption] :
                    currentLanguage === "EN" ? "All" : "Tất cả"
                  }
                </h1>
              }

              <div className="search-results__results">
                {filteredResults.map((result) =>
                  <SearchResultItem
                    item={result}
                    query={[query]}
                    usingLanguage={currentLanguage}
                    isPoint={result.diseases ? false : true}
                  />)}
              </div>
            </>}

          <div className="search-results__filters">
            <h1 className="search-results__filters--category">{t('search_bar.filters.categories.search')}</h1>

            <span
              className="search-results__option">
              {t('search_bar.filters.options.search_by')}
              <select
                className="search-results__select"
                value={currentFilterOptions.searchBy}
                onChange={(e) => setCurrentFilterOptions({
                  ...currentFilterOptions,
                  searchBy: parseInt(e.target.value),
                })}
              >
                {filters["searchBy"] && filters["searchBy"].map((option, index) => (
                  <option
                    className="search-results__select--option"
                    value={index}
                    key={`search-by-${index}`}
                  >{option}</option>
                ))}
              </select>
            </span>

            <span
              className="search-results__option mt-1">
              {t('search_bar.filters.options.search_on')}
              <select
                className="search-results__select"
                value={currentFilterOptions.searchOn}
                onChange={(e) => setCurrentFilterOptions({
                  ...currentFilterOptions,
                  searchOn: parseInt(e.target.value),
                })}
              >
                {filters["searchOn"] && filters["searchOn"].map((option, index) => (
                  <option
                    className="search-results__select--option"
                    value={index}
                    key={`search-on-${index}`}
                  >{option}</option>
                ))}
              </select>
            </span>

            <h1 className="search-results__filters--category mt-3">{t('search_bar.filters.categories.show')}</h1>

            <span
              className="search-results__option">
              {t('search_bar.filters.options.show')}
              <select
                className="search-results__select"
                value={currentFilterOptions.show}
                onChange={(e) => setCurrentFilterOptions({
                  ...currentFilterOptions,
                  show: parseInt(e.target.value),
                })}
              >
                {filters["show"] && filters["show"].map((option, index) => (
                  <option
                    className="search-results__select--option"
                    value={index}
                    key={`show-${index}`}
                  >{option}</option>
                ))}
              </select>
            </span>
          </div>
        </>}
    </div>
  );
};
