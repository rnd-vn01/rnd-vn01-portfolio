import './QuickSearchBar.scss';
import React, { useState, useRef, useEffect } from "react";
import SearchIconGray from "src/assets/images/SearchIconGray.svg"
import SearchIconBlack from "src/assets/images/SearchIconBlack.svg"
import { QuickSearchResults } from './QuickSearchResults/QuickSearchResults';
import { RootState, useAppDispatch } from 'src/redux/store';
import {
  resetToInitialStatePointSelectionSlice,
  resetToInitialStateQuickSearchBack,
  setBackFromInformationBlock,
  setHomeQueryPersistThroughNavigation,
  setQuickSearchPersistQuery,
  setShowingQuickInformation
} from 'src/redux/slice';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const QuickSearchBar: React.FC = ({ }) => {
  const inputBoxRef = useRef()
  const dispatch = useAppDispatch();
  const wrapperRef = useRef()

  const [usingQuickSearchIconImage, setUsingQuickSearchIconImage] = useState<any>(SearchIconGray)
  const [query, setQuery] = useState<string>("");
  const [isInFocus, setIsInFocus] = useState<boolean>(false);
  const [isReadyForSearch, setIsReadyForSearch] = useState<boolean>(false);
  const location = useLocation();
  const { t } = useTranslation();

  const {
    backFromInformationBlock,
    quickSearchPersistQuery,
    homeQueryPersistThroughNavigation
  } = useSelector(
    (state: RootState) => state.navigationSlice,
  );

  useEffect(() => {
    if (homeQueryPersistThroughNavigation !== null) {
      setQuery(homeQueryPersistThroughNavigation);
      dispatch(resetToInitialStateQuickSearchBack())
    }

    dispatch(setHomeQueryPersistThroughNavigation(null))
  }, [homeQueryPersistThroughNavigation])

  useEffect(() => {
    dispatch(setShowingQuickInformation({
      quickInformation: null
    }))

    if (query === "") {
      dispatch(resetToInitialStateQuickSearchBack())
    } else {
      dispatch(setQuickSearchPersistQuery(query))
    }
  }, [query]);

  useEffect(() => {
    if (backFromInformationBlock) {
      forceReSearchWithSameQuery(quickSearchPersistQuery)
      dispatch(setBackFromInformationBlock(false))
    }
  }, [backFromInformationBlock])

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const { target } = e

      if ((wrapperRef as any).current) {
        if (!(wrapperRef as any).current.contains(target)) {
          setIsInFocus(false)
          setQuery("");
        } else {
          setIsInFocus(true)
        }
      }
    })

    setTimeout(() => {
      if (location?.search?.includes("type")) {
        dispatch(resetToInitialStateQuickSearchBack())
      }
    }, 50)
  }, [])

  const forceReSearchWithSameQuery = (query: string) => {
    setQuery(query + " ");
    setTimeout(() => {
      setQuery(query);
      dispatch(resetToInitialStatePointSelectionSlice());
    }, 25);
  }

  return (
    <div
      role="div"
      aria-label="quick-search"
      className="quick-search"
      ref={wrapperRef}
      onClick={(e) => {
        (inputBoxRef.current as HTMLInputElement)?.focus()
      }}>

      <img
        role="img"
        aria-label="quick-search-icon"
        src={usingQuickSearchIconImage}
        className="quick-search__logo--search"></img>

      <input
        ref={inputBoxRef}
        className={`quick-search__input ${!isReadyForSearch && "quick-search__input--loading"}`}
        onFocus={() => {
          setUsingQuickSearchIconImage(SearchIconBlack);

          if (query !== "") {
            forceReSearchWithSameQuery(query)
          }
        }}
        onBlur={() => setUsingQuickSearchIconImage(SearchIconGray)}
        value={query}
        onChange={e => setQuery(e.target.value)}
        role="input"
        aria-label="quick-search-input"
        placeholder={t('search_bar.placeholder')}
        disabled={!isReadyForSearch}
        data-tip
        data-for={`tooltip-quick-search`}
      ></input>

      {!isReadyForSearch && <ReactTooltip id={`tooltip-quick-search`} place="bottom" effect="float">
        <p>{t('loading_data')}...</p>
      </ReactTooltip>}

      <QuickSearchResults
        query={query}
        isShowing={isInFocus}
        callbackIsReadyForSearch={setIsReadyForSearch}
      />
    </div>
  );
};
