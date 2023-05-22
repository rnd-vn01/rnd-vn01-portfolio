import './SearchBar.scss';
import React, { useState, useRef, useEffect } from "react";
import SearchIconGray from "src/assets/images/SearchIconGray.svg"
import SearchIconBlack from "src/assets/images/SearchIconBlack.svg"
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchProcessor } from '../SearchProcessor/SearchProcessor';
import IconFilterOn from 'src/assets/images/IconFilterOn.svg';
import IconFilterOff from 'src/assets/images/IconFilterOff.svg';
import ReactTooltip from 'react-tooltip';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export const SearchBar: React.FC<ISearchBar> = ({
  callbackSetResults,
  callbackSetLoading,
  callbackSetQuery,
  numberOfMatchingResults,
  isChoosingAlphabet,
  passedQuery,
  callbackIsFilter,
  paramPassedIsFilter
}) => {
  const inputBoxRef = useRef()
  const location = useLocation() as any;

  const [usingQuickSearchIconImage, setUsingQuickSearchIconImage] = useState<any>(SearchIconGray)
  const [query, setQuery] = useState<string>("");
  const { t } = useTranslation();

  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const [isReadyForSearch, setIsReadyForSearch] = useState<boolean>(false);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    callbackSetResults(searchResults)

    if (location?.state?.fromDetailPage) {
      (inputBoxRef.current as HTMLInputElement)?.focus()
    }
  }, [searchResults])

  useEffect(() => {
    callbackSetLoading(isLoading || !isReadyForSearch)
  }, [isLoading, isReadyForSearch])

  useEffect(() => {
    callbackSetQuery(query)
  }, [query])

  useEffect(() => {
    if (isReadyForSearch) {
      if (passedQuery && passedQuery !== query) {
        setQuery(passedQuery)
      }
    }
  }, [isReadyForSearch])

  useEffect(() => {
    setIsFilter(paramPassedIsFilter)
  }, [paramPassedIsFilter])

  return (
    <div
      className="search-bar__container">

      <div
        role="div"
        aria-label="search-bar"
        className={`search-bar`}
        onClick={() => {
          (inputBoxRef.current as HTMLInputElement)?.focus()
        }}>
        <img
          role="img"
          aria-label="search-bar-icon"
          src={usingQuickSearchIconImage}
          className="search-bar__logo--search"></img>

        <span className="search-bar__input--span">
          <input
            ref={inputBoxRef}
            className={`search-bar__input ${!isReadyForSearch && "search-bar__input--loading"}`}
            onFocus={() => setUsingQuickSearchIconImage(SearchIconBlack)} // NOT_TESTED
            onBlur={() => setUsingQuickSearchIconImage(SearchIconGray)}
            value={query}
            disabled={isChoosingAlphabet || !isReadyForSearch}
            onChange={e => setQuery(e.target.value)}
            role="input"
            aria-label="search-input"
            placeholder={t('search_bar.placeholder')}
            data-tip
            data-for={`tooltip-search-bar`}></input>

          {!isLoading && query !== "" && <span className="search-bar__number-of-results"
            role="span"
            aria-label="number-of-results"
            onClick={(e) => e.stopPropagation()}> {/* NOT_TESTED */}
            {numberOfMatchingResults}
            {` `}
            {t('search_bar.matches')}
          </span>}

          <img className="search-bar__filter-icon"
            role="img"
            aria-label="filter-icon"
            src={isFilter ? IconFilterOn : IconFilterOff}
            onClick={(e) => {
              e.stopPropagation();
              setIsFilter(!isFilter)
              callbackIsFilter(!isFilter)
            }}
          >
          </img>
        </span >

        {!isReadyForSearch && <ReactTooltip id={`tooltip-search-bar`} place="right" effect="float">
          <p>{t('loading_data')}...</p>
        </ReactTooltip>}

        <SearchProcessor
          query={isReadyForSearch ? query : ""}
          callbackSetResults={setSearchResults}
          callbackSetLoading={setIsLoading}
          callbackIsReadyForSearch={setIsReadyForSearch}
        />
      </div>
    </div>
  );
};
