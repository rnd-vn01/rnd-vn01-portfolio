import './SearchResultsAlphabetFilters.scss';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { ALPHABET_LISTS } from 'src/configs/constants';
import { replaceVietnameseNotation } from 'src/helpers/searchProcess';

export const SearchResultsAlphabetFilters: React.FC<ISearchResultsAlphabetFilters> = ({
  results,
  callbackSetAlphabetFilteringOption
}) => {
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const [currentAlphabetState, setCurrentAlphabetState] = useState<Array<any>>([]);

  useEffect(() => {
    const ALPHABET_LIST = ALPHABET_LISTS[currentLanguage]
    let alphabetStates = []
    const alphabetsIncluded = getListOfAvailableAlphabets()

    ALPHABET_LIST.forEach((alphabet, index) => {
      alphabetStates.push({
        index: index,
        letter: alphabet,
        isAvailable: alphabetsIncluded.includes(alphabet)
      })
    })

    alphabetStates.push({
      index: -1,
      letter: currentLanguage === "EN" ? "All" : "Tất cả",
      isAvailable: true
    })
    setCurrentAlphabetState(alphabetStates)
  }, [currentLanguage])

  const getListOfAvailableAlphabets = () => {
    let alphabetsIncluded = []

    results?.forEach((item) => {
      const letter = replaceVietnameseNotation(item.name.toUpperCase()[0])

      if (!alphabetsIncluded.includes(letter)) {
        alphabetsIncluded.push(letter)
      }
    })

    return alphabetsIncluded
  }

  return (
    <div
      role="div"
      aria-label="search-results-alphabet-filters"
      className={`search-results-alphabet-filters grid grid-cols-5`}
    >
      {currentAlphabetState.map((alphabet, index) => <h1
        key={`alphabet-${index}`}
        className={`search-results-alphabet-filters__alphabet col-span-1 text-center
          ${alphabet.isAvailable ? "search-results-alphabet-filters__alphabet--available" : ""}`}
        onClick={() => callbackSetAlphabetFilteringOption(alphabet.index)}
        role="h1"
        aria-label={`search-results-alphabet-${alphabet.letter}`}
        data-testid={`search-results-alphabet-${alphabet.index}`}
      >
        {alphabet.letter}
      </h1>)}
    </div >
  );
};
