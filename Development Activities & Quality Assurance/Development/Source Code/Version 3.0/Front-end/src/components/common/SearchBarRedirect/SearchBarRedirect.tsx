import './SearchBarRedirect.scss';
import React, { useState, useRef, useEffect } from "react";
import SearchIconGray from "src/assets/images/SearchIconGray.svg"
import SearchIconBlack from "src/assets/images/SearchIconBlack.svg"
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SearchBarRedirect: React.FC = ({ }) => {
  const inputBoxRef = useRef()
  const history = useHistory();
  const { t } = useTranslation();
  const [usingQuickSearchIconImage, setUsingQuickSearchIconImage] = useState<any>(SearchIconGray)
  const [query, setQuery] = useState<string>("");

  return (
    <div
      role="div"
      aria-label="search-bar-redirect"
      className="search-bar-redirect"
      onClick={() => {
        (inputBoxRef.current as HTMLInputElement)?.focus()
      }}>

      <img
        src={usingQuickSearchIconImage}
        className="search-bar-redirect__logo--search"
        role="img"
        aria-label="search-bar-icon"></img>

      <span className="search-bar-redirect__input--span">
        <input
          ref={inputBoxRef}
          className="search-bar-redirect__input"
          onFocus={() => setUsingQuickSearchIconImage(SearchIconBlack)}
          onBlur={() => setUsingQuickSearchIconImage(SearchIconGray)}
          value={query}
          onChange={e => {
            history.push(`/advanced-search?query=${e.target.value}`, {
              fromDetailPage: true
            })
          }}
          placeholder={t('search_bar.placeholder')}
          role="input"
          aria-label="search-input"></input>

      </span>
    </div>
  );
};
