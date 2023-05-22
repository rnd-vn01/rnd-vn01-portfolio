import './ModelViewModeControl.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from "react-i18next";

import skinMode from "src/assets/images/homeControls/modelMode/skinMode.svg";
import anatomyMode from "src/assets/images/homeControls/modelMode/anatomyMode.svg";

export const ModelViewModeControl: React.FC = ({ }) => {
  const [isSkinMode, setIsSkinMode] = useState<boolean>(true);

  return (
    <div
      role="div"
      aria-label="model-view-mode-control"
      className="model-view-mode-control"
      onClick={() => setIsSkinMode(!isSkinMode)}>
      <img
        role="img"
        aria-label="model-view-mode-control-icon"
        className="model-view-mode-control__icon" src={isSkinMode ? skinMode : anatomyMode} />
    </div>
  );
};
