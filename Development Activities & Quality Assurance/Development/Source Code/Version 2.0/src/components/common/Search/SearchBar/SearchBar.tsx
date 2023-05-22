import './SearchBar.scss';
import React, { useState, useRef, useEffect } from "react";
import SearchIconGray from "src/assets/images/SearchIconGray.svg"
import SearchIconBlack from "src/assets/images/SearchIconBlack.svg"
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchProcessor } from '../SearchProcessor/SearchProcessor';

export const SearchBar: React.FC<ISearchBar> = ({
  callbackSetResults,
  callbackSetLoading,
  callbackSetQuery,
  numberOfMatchingResults,
  isChoosingAlphabet,
  passedQuery
}) => {
  const inputBoxRef = useRef()
  const history = useHistory();

  const [usingQuickSearchIconImage, setUsingQuickSearchIconImage] = useState<any>(SearchIconGray)
  const [query, setQuery] = useState<string>("");
  const { t } = useTranslation();

  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    callbackSetResults(searchResults)
  }, [searchResults])

  useEffect(() => {
    callbackSetLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    callbackSetQuery(query)
  }, [query])

  useEffect(() => {
    if (passedQuery && passedQuery !== query) {
      setQuery(passedQuery)
    }
  }, [passedQuery])

  return (
    <div
      role="div"
      aria-label="search-bar"
      className="search-bar"
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
          className="search-bar__input"
          onFocus={() => setUsingQuickSearchIconImage(SearchIconBlack)}
          onBlur={() => setUsingQuickSearchIconImage(SearchIconGray)}
          value={query}
          disabled={isChoosingAlphabet}
          onChange={e => setQuery(e.target.value)}
          onClick={() => setQuery("")}
          role="input"
          aria-label="search-input"
          placeholder={t('search_bar.placeholder')}></input>

        {!isLoading && query !== "" && <span className="search-bar__number-of-results"
          role="span"
          aria-label="number-of-results"
          onClick={(e) => e.stopPropagation()}> {/* NOT_TESTED */}
          {numberOfMatchingResults}
          {` `}
          {t('search_bar.matches')}
        </span>}
      </span>

      <SearchProcessor
        query={query}
        callbackSetResults={setSearchResults}
        callbackSetLoading={setIsLoading}
      />
    </div>
  );
};
