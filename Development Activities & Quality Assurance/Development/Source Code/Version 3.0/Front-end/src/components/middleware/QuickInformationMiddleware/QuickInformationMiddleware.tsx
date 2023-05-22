import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';

import { setLoadingQuickInformation, setShowingQuickInformation } from 'src/redux/slice';
import { getAcupuncturePointByCode, getMeridianByCode } from 'src/helpers/api/items';

export const QuickInformationMiddleware: React.FC = ({ }) => {
  const {
    selectedLabel,
    selectedType,
    loadingQuickInformation
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
    const getItemInformation = async () => {
      if (selectedLabel != undefined) {
        if (selectedType === "point") {
          dispatch(setLoadingQuickInformation(true))
          const item = await getAcupuncturePointByCode(currentLanguage, selectedLabel)
          dispatch(setLoadingQuickInformation(false))

          dispatch(setShowingQuickInformation({
            quickInformation: {
              type: "point",
              content: item
            }
          }))
        } else {
          dispatch(setLoadingQuickInformation(true))
          const item = await getMeridianByCode(currentLanguage, selectedLabel)
          dispatch(setLoadingQuickInformation(false))

          dispatch(setShowingQuickInformation({
            quickInformation: {
              type: "line",
              content: item
            }
          }))
        }
      } else {
        dispatch(setShowingQuickInformation({
          quickInformation: null
        }))
      }
    }

    getItemInformation();
  }, [selectedLabel, selectedType])

  return (
    <div
      role="div"
      aria-label="quick-information-middleware"
      className="quick-information-middleware">

    </div>
  );
};
