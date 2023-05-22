import './QuickSearchBar.scss';
import React, { useState, useRef } from "react";
import SearchIconGray from "src/assets/images/SearchIconGray.svg"
import SearchIconBlack from "src/assets/images/SearchIconBlack.svg"
import AdvancedSearchIcon from "src/assets/images/AdvancedSearchIcon.svg"
import { useHistory } from 'react-router-dom';
import { QuickSearchResults } from './QuickSearchResults/QuickSearchResults';

export const QuickSearchBar: React.FC = ({ }) => {
  const inputBoxRef = useRef()
  const history = useHistory();

  const [usingQuickSearchIconImage, setUsingQuickSearchIconImage] = useState<any>(SearchIconGray)
  const [query, setQuery] = useState<string>("");

  return (
    <div
      role="div"
      aria-label="quick-search"
      className="quick-search"
      onClick={() => {
        if (inputBoxRef.current) {
          (inputBoxRef.current as HTMLInputElement).focus()
        }
      }}>

      <img
        src={usingQuickSearchIconImage}
        className="quick-search__logo--search"></img>

      <input
        ref={inputBoxRef}
        className="quick-search__input"
        onFocus={() => setUsingQuickSearchIconImage(SearchIconBlack)}
        onBlur={() => setUsingQuickSearchIconImage(SearchIconGray)}
        value={query}
        onChange={e => setQuery(e.target.value)}></input>

      <div
        className="quick-search__logo--advanced-search"
        onClick={() => history.push("/advanced-search")}>
        <img src={AdvancedSearchIcon}></img>
      </div>

      <QuickSearchResults
        query={query}
      />
    </div>
  );
};
