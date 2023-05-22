import React, { useEffect, useState } from 'react';
import './FullLayout.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';

export const FullLayout: React.FC<ILayout> = ({ header, children }) => {
  const dispatch = useAppDispatch();
  const [isPageWithTabletTitle,] = useState<boolean>(false);

  useEffect(() => {

  }, [window.location.pathname]);

  return (
    <div className="full-layout" role="div" aria-label="full-layout">
      <div className="full-layout__header">
        <div className="full-layout__container">{header}</div>
      </div>
      <div
        role="div"
        aria-label="full-layout-center"
        className={`full-layout__center ${isPageWithTabletTitle ? "full-layout__center--title" : ""}`}>{children}</div>
    </div>
  );
};
