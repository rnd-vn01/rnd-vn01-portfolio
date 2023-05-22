import './AdvancedSearchPage.scss'
import React, { useEffect, useState } from 'react';
import {
  FullPageTitleBar,
  SearchBar,
  SearchResults
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'src/helpers/hooks/useQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { MobileTitleBar, SideCriteriaBox, SideMenu } from 'src/components/common/responsive';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { result } from 'lodash';
import { useLocation } from 'react-router-dom';

export const AdvancedSearchPage: React.FC<IAdvancedSearchPage> = ({ }) => {
  const { t } = useTranslation();
  let hookQuery = useQuery();
  document.title = `${APP_NAME} | ${t('advanced_search_page.title')}`
  const location = useLocation() as any;

  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [numberOfMatchingResults, setNumberOfMatchingResults] = useState<number>(0);
  const [isChoosingAlphabet, setIsChoosingAlphabet] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const [showingScrollToTop, setShowingScrollToTop] = useState<boolean>(false);
  const [passedFilterOptions, setPassedFilterOptions] = useState<any>({});

  const MySwal = withReactContent(Swal);

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowingScrollToTop(true);
      } else {
        setShowingScrollToTop(false);
      }
    })

    if (location?.state?.filterOptions) {
      setPassedFilterOptions(location?.state?.filterOptions)
    }
  }, [])

  return (
    <div
      role="div"
      aria-label="advanced-search-page"
      className="advanced-search-page grid grid-cols-7">
      <div className="advanced-search-page__content">
        {isDesktop ? <FullPageTitleBar
          pageCode="advanced-search"
          translateCode="advanced_search"
        /> :
          <MobileTitleBar
            translateCode={"advanced_search"}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu} />}

        {!isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>}

        <SearchBar
          callbackSetResults={setSearchResults}
          callbackSetLoading={setIsLoading}
          callbackSetQuery={setQuery}
          numberOfMatchingResults={numberOfMatchingResults}
          isChoosingAlphabet={isChoosingAlphabet}
          passedQuery={hookQuery.get('query')}
          callbackIsFilter={setIsFilter}
          paramPassedIsFilter={isFilter}
        />

        <SearchResults
          results={searchResults}
          isLoading={isLoading}
          query={query}
          callbackSetNumberOfMatchingResults={setNumberOfMatchingResults}
          callbackSetChoosingAlphabet={setIsChoosingAlphabet}
          isFilter={isFilter}
          callbackSetIsFilter={setIsFilter}
          passedFilterOptions={passedFilterOptions}
        />
      </div>

      <div
        className={`advanced-search-page__scroll-to-top 
      ${showingScrollToTop && "advanced-search-page__scroll-to-top--showing"}`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }}
        role="div"
        aria-label="scroll-to-top">
        <FontAwesomeIcon
          className="advanced-search-page__scroll-to-top--icon"
          icon={faArrowUp}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};
