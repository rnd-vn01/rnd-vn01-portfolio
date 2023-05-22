import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';

import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';
import { setShowingQuickInformation } from 'src/redux/slice';

export const QuickInformationMiddleware: React.FC = ({ }) => {
  const {
    selectedLabel,
    selectedType,
  } = useSelector(
    (state: RootState) => state.selectionSlice,
  );

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedLabel != undefined) {
      if (selectedType === "point") {
        const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI

        DEMO_DATA.forEach((item) => {
          if (item.code.toUpperCase() === selectedLabel.toUpperCase()) {
            dispatch(setShowingQuickInformation({
              quickInformation: {
                type: "point",
                content: item
              }
            }))
          }
        })
      } else {
        const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_MERIDIAN_EN : DEMO_DATA_MERIDIAN_VI

        DEMO_DATA.forEach((item) => {
          if (item.code.toUpperCase() === selectedLabel.toUpperCase()) {
            dispatch(setShowingQuickInformation({
              quickInformation: {
                type: "line",
                content: item
              }
            }))
          }
        })
      }
    } else {
      dispatch(setShowingQuickInformation({
        quickInformation: null
      }))
    }
  }, [selectedLabel, selectedType])

  return (
    <div
      role="div"
      aria-label="quick-information-middleware"
      className="quick-information-middleware">

    </div>
  );
};
