import './QuickSearchBar.scss';
import React, { useState, useRef, useEffect } from "react";
import SearchIconGray from "src/assets/images/SearchIconGray.svg"
import SearchIconBlack from "src/assets/images/SearchIconBlack.svg"
import { useHistory } from 'react-router-dom';
import { QuickSearchResults } from './QuickSearchResults/QuickSearchResults';
import { useAppDispatch } from 'src/redux/store';
import { setShowingQuickInformation } from 'src/redux/slice';
import { useTranslation } from 'react-i18next';

export const QuickSearchBar: React.FC = ({ }) => {
  const inputBoxRef = useRef()
  const history = useHistory();
  const dispatch = useAppDispatch();
  const wrapperRef = useRef()

  const [usingQuickSearchIconImage, setUsingQuickSearchIconImage] = useState<any>(SearchIconGray)
  const [query, setQuery] = useState<string>("");
  const [isInFocus, setIsInFocus] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setShowingQuickInformation({
      quickInformation: null
    }))
  }, [query]);

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
  }, [])

  return (
    <div
      role="div"
      aria-label="quick-search"
      className="quick-search"
      ref={wrapperRef}
      onClick={() => {
        (inputBoxRef.current as HTMLInputElement)?.focus()
      }}>

      <img
        role="img"
        aria-label="quick-search-icon"
        src={usingQuickSearchIconImage}
        className="quick-search__logo--search"></img>

      <input
        ref={inputBoxRef}
        className="quick-search__input"
        onFocus={() => setUsingQuickSearchIconImage(SearchIconBlack)}
        onBlur={() => setUsingQuickSearchIconImage(SearchIconGray)}
        value={query}
        onChange={e => setQuery(e.target.value)}
        role="input"
        aria-label="quick-search-input"
        placeholder={t('search_bar.placeholder')}></input>

      <QuickSearchResults
        query={query}
        isShowing={isInFocus}
      />
    </div>
  );
};
