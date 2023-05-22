import './SideCriteriaBox.scss';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useTranslation } from 'react-i18next';

export const SideCriteriaBox: React.FC<ISideCriteriaBox> = ({
  isShowing,
  filters,
  currentFilterOptions,
  callbackSetCurrentFilterOptions
}) => {
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="side-criteria-box"
      className={`side-criteria-box ${isShowing && "side-criteria-box--showing"}`}
    >
      <div className={`flex justify-between flex-col h-full side-criteria-box__main 
      ${isShowing && "side-criteria-box__main--showing"}`}>
        <h1 className="search-results__filters--category">{t('search_bar.filters.categories.search')}</h1>

        <span
          className="search-results__option">
          {t('search_bar.filters.options.search_by')}
          <select
            className="search-results__select"
            value={currentFilterOptions.searchBy}
            onChange={(e) => callbackSetCurrentFilterOptions({
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
            onChange={(e) => callbackSetCurrentFilterOptions({
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
            onChange={(e) => callbackSetCurrentFilterOptions({
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
            onChange={(e) => callbackSetCurrentFilterOptions({
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
      </div>
    </div>
  );
};
