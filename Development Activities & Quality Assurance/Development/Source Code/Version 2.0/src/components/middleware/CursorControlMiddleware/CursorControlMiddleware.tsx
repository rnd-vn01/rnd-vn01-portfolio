import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';

export const CursorControlMiddleware: React.FC = ({ }) => {
  const {
    isHoveringPoint,
    isHoveringLine,
  } = useSelector(
    (state: RootState) => state.selectionSlice,
  );

  useEffect(() => {
    if (isHoveringLine || isHoveringPoint) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [isHoveringPoint, isHoveringLine])

  return (
    <div
      role="div"
      aria-label="cursor-control-middleware"
      className="cursor-control-middleware">

    </div>
  );
};
