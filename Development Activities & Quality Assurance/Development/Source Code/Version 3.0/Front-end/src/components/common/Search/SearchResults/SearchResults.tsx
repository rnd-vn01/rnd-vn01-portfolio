import './SearchResults.scss';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { SearchResultItem } from '../SearchResultItem/SearchResultItem';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from 'react-i18next';
import { filterByAlphabet, passFilter, replaceVietnameseNotation, sortItems } from 'src/helpers/searchProcess';
import { ALPHABET_LISTS } from 'src/configs/constants';
import { SearchResultsAlphabetFilters } from './SearchResultsAlphabetFilters/SearchResultsAlphabetFilters';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SideCriteriaBox } from 'src/components/common/responsive';
import { useMediaQuery } from 'react-responsive';

export const SearchResults: React.FC<ISearchResults> = ({
  results,
  query,
  isLoading,
  callbackSetNumberOfMatchingResults,
  callbackSetChoosingAlphabet,
  callbackSetIsFilter,
  isFilter,
  passedFilterOptions
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
    show: 0,
    sort: 0
  });
  const [filters, setFilters] = useState<any>({});
  const [currentIsLoading, setCurrentIsLoading] = useState<boolean>(true);
  const [isChoosingAlphabet, setIsChoosingAlphabet] = useState<boolean>(false);
  const [choosingAlphabetOption, setChoosingAlphabetOption] = useState<number>(-1);
  const [allAlphabetFilteredResults, setAllAlphabetFilteredResults] = useState<Array<any>>([]);
  const [showingItems, setShowingItems] = useState<Array<any>>([]);

  // RESPONSIVE
  const [isShowingSideCriteria, setIsShowingSideCriteria] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  const FILTER_OPTIONS = {
    VI: {
      searchOn: ["tất cả", "kinh lạc", "huyệt đạo"],
      searchBy: ["tất cả", "mã", "tên", "mô tả", "vị trí", "chức năng", "phương pháp"],
      show: ["tất cả kinh lạc", "chỉ kinh lạc LU", "chỉ kinh lạc LI", "chỉ kinh lạc ST", "chỉ kinh lạc SP",
        "chỉ kinh lạc HT", "chỉ kinh lạc SI", "chỉ kinh lạc BL", "chỉ kinh lạc KI", "chỉ kinh lạc PC",
        "chỉ kinh lạc TE", "chỉ kinh lạc GB", "chỉ kinh lạc Liv", "chỉ kinh lạc Du", "chỉ kinh lạc Ren"],
      sort: ["tăng dần", "giảm dần"]
    },
    EN: {
      searchOn: ["all", "meridians", "points"],
      searchBy: ["all", "code", "name", "description", "location", "functionalities", "method"],
      show: ["all meridians", "LU meridian only", "LI meridian only", "ST meridian only", "SP meridian only",
        "HT meridian only", "SI meridian only", "BL meridian only", "KI meridian only", "PC meridian only",
        "TE meridian only", "GB meridian only", "Liv meridian only", "Du meridian only", "Ren meridian only"],
      sort: ["ascending", "descending"]
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
  }, [choosingAlphabetOption, allAlphabetFilteredResults])

  useEffect(() => {
    setChoosingAlphabetOption(-1);
  }, [query])

  useEffect(() => {
    if (isDesktop) {
      setCurrentFilterOptions({
        searchOn: 0,
        searchBy: 0,
        show: 0,
        sort: 0
      })
    }
  }, [isFilter])

  useEffect(() => {
    setShowingItems(filteredResults.slice(0, 30))
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }, 250)
  }, [filteredResults, allAlphabetFilteredResults])

  useEffect(() => {
    if (Object.keys(passedFilterOptions).length) {
      setCurrentFilterOptions(passedFilterOptions)
    }
  }, [passedFilterOptions])

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

    // Sort
    newResults = sortItems(newResults, parseInt(currentFilterOptions.sort));

    callbackSetNumberOfMatchingResults(newResults.length)
    setCurrentIsLoading(false)
    return newResults
  }

  const fetchNext = () => {
    {/* NOT TESTED */ }
    setTimeout(() => {
      let currentLength = showingItems.length;
      const endLength = Math.min(currentLength + 30, filteredResults.length)
      setShowingItems(filteredResults.slice(0, endLength))
    }, 500)
    {/* NOT TESTED */ }
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
          results={allAlphabetFilteredResults.length > 0 ? allAlphabetFilteredResults : filteredResults} /* NOT_TESTED */
          callbackSetAlphabetFilteringOption={setChoosingAlphabetOption}
        />
        :
        <>
          {!currentIsLoading && filteredResults?.length > 0 &&
            <>
              {filteredResults.length > 0 &&
                <h1
                  onClick={() => setIsChoosingAlphabet(true)}
                  role="h1"
                  aria-label="search-results-alphabet"
                  className="search-results__letter">
                  {choosingAlphabetOption !== -1 ?
                    ALPHABET_LISTS[currentLanguage][choosingAlphabetOption] :
                    currentLanguage === "EN" ? "All" : "Tất cả"
                  }
                </h1>
              }

              <div className="search-results__results">
                <InfiniteScroll
                  dataLength={showingItems.length}
                  loader={<div role="status" style={{
                    textAlign: "center",
                    width: "100%",
                  }} className="flex-center">
                    <svg aria-hidden="true" className="w-10 h-10 mt-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>}
                  hasMore={showingItems.length !== filteredResults.length}
                  next={() => fetchNext()} // NOT_TESTED
                  scrollThreshold={1}>
                  {showingItems.map((result, index) =>
                    <SearchResultItem
                      key={index}
                      item={result}
                      query={[query]}
                      usingLanguage={currentLanguage}
                      isPoint={result.diseases ? false : true}
                      filterOptions={currentFilterOptions}
                    />)}
                </InfiniteScroll>
              </div>
            </>}

          {!currentIsLoading && filteredResults?.length === 0 &&
            <h1
              role="h1"
              aria-label="no-results"
              className="search-results__no-results">
              {t('no_results')}
            </h1>}

          {currentIsLoading &&
            <div role="status" style={{
              textAlign: "center",
              width: "100%",
            }} className="flex-center">
              <svg aria-hidden="true" className="w-10 h-10 mt-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>}

          {isFilter && isDesktop && <div className="search-results__filters">
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
                role="select"
                aria-label="select-search-by"
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
                role="select"
                aria-label="select-search-on"
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
                role="select"
                aria-label="select-show"
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

            <h1 className="search-results__filters--category mt-3">{t('search_bar.filters.categories.sort')}</h1>

            <span
              className="search-results__option">
              {t('search_bar.filters.options.sort')}
              <select
                className="search-results__select"
                value={currentFilterOptions.sort}
                onChange={(e) => setCurrentFilterOptions({
                  ...currentFilterOptions,
                  sort: parseInt(e.target.value),
                })}
                role="select"
                aria-label="select-sort"
              >
                {filters["sort"] && filters["sort"].map((option, index) => (
                  <option
                    className="search-results__select--option"
                    value={index}
                    key={`sort-${index}`}
                  >{option}</option>
                ))}
              </select>
            </span>
          </div>}
        </>}

      {!isDesktop && <SideCriteriaBox
        isShowing={isFilter}
        filters={filters}
        currentFilterOptions={currentFilterOptions}
        callbackSetCurrentFilterOptions={(e) => {
          setCurrentFilterOptions(e)
          callbackSetIsFilter(false)
        }}
      />}
    </div>
  );
};
