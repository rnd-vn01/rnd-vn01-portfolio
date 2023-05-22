import './MeridianControl.scss';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import TE from "src/assets/images/homeControls/meridianIcons/TE.svg";
import Du from "src/assets/images/homeControls/meridianIcons/Du.svg";
import ST from "src/assets/images/homeControls/meridianIcons/ST.svg";
import Ren from "src/assets/images/homeControls/meridianIcons/Ren.svg";
import BL from "src/assets/images/homeControls/meridianIcons/BL.svg";
import PC from "src/assets/images/homeControls/meridianIcons/PC.svg";
import HT from "src/assets/images/homeControls/meridianIcons/HT.svg";
import Liv from "src/assets/images/homeControls/meridianIcons/Liv.svg";
import LU from "src/assets/images/homeControls/meridianIcons/LU.svg";
import SP from "src/assets/images/homeControls/meridianIcons/SP.svg";
import LI from "src/assets/images/homeControls/meridianIcons/LI.svg";
import SI from "src/assets/images/homeControls/meridianIcons/SI.svg";
import GB from "src/assets/images/homeControls/meridianIcons/GB.svg";
import KI from "src/assets/images/homeControls/meridianIcons/KI.svg";
import controlLeft from "src/assets/images/homeControls/controlIcons/controlLeft.svg";
import controlRight from "src/assets/images/homeControls/controlIcons/controlRight.svg";

import { EXTRA_MERIDIAN_COLORS, MERIDIANS_COLOR } from 'src/configs/constants';
import { resetToInitialStatePointSelectionSlice, setLinePreSelectByLabel } from 'src/redux/slice';
import { hexToRgb } from '@mui/material';
import ReactTooltip from 'react-tooltip';

export const MeridianControl: React.FC<{
  callbackResetViewMode: () => void
}> = ({ callbackResetViewMode }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [selectedMeridian, setSelectedMeridian] = useState<string>(null);
  const scrollableDiv = useRef<any>(null);

  const OPTIONS = {
    "LU": {
      code: "LU",
      name: t('meridian_tooltips.LU'),
      icon: LU,
      color: MERIDIANS_COLOR[1]
    },
    "LI": {
      code: "LI",
      name: t('meridian_tooltips.LI'),
      icon: LI,
      color: MERIDIANS_COLOR[2]
    },
    "ST": {
      code: "ST",
      name: t('meridian_tooltips.ST'),
      icon: ST,
      color: MERIDIANS_COLOR[5]
    },
    "SP": {
      code: "SP",
      name: t('meridian_tooltips.SP'),
      icon: SP,
      color: MERIDIANS_COLOR[4]
    },
    "HT": {
      code: "HT",
      name: t('meridian_tooltips.HT'),
      icon: HT,
      color: MERIDIANS_COLOR[3]
    },
    "SI": {
      code: "SI",
      name: t('meridian_tooltips.SI'),
      icon: SI,
      color: MERIDIANS_COLOR[6]
    },
    "BL": {
      code: "BL",
      name: t('meridian_tooltips.BL'),
      icon: BL,
      color: MERIDIANS_COLOR[7]
    },
    "KI": {
      code: "KI",
      name: t('meridian_tooltips.KI'),
      icon: KI,
      color: MERIDIANS_COLOR[8]
    },
    "PC": {
      code: "PC",
      name: t('meridian_tooltips.PC'),
      icon: PC,
      color: MERIDIANS_COLOR[9]
    },
    "TE": {
      code: "TE",
      name: t('meridian_tooltips.TE'),
      icon: TE,
      color: MERIDIANS_COLOR[10]
    },
    "GB": {
      code: "GB",
      name: t('meridian_tooltips.GB'),
      icon: GB,
      color: MERIDIANS_COLOR[11]
    },
    "Liv": {
      code: "Liv",
      name: t('meridian_tooltips.Liv'),
      icon: Liv,
      color: MERIDIANS_COLOR[12]
    },
    "Du": {
      code: "Du",
      name: t('meridian_tooltips.Du'),
      icon: Du,
      color: EXTRA_MERIDIAN_COLORS[1]
    },
    "Ren": {
      code: "Ren",
      name: t('meridian_tooltips.Ren'),
      icon: Ren,
      color: EXTRA_MERIDIAN_COLORS[2]
    },
  }

  const handleScrollLeft = (e: any) => {
    scrollableDiv.current.scrollBy(-145, 0);
  }

  const handleScrollRight = (e: any) => {
    scrollableDiv.current.scrollBy(145, 0);
  }

  return (
    <div
      role="div"
      aria-label="meridian-control-desktop"
      className="meridian-control-desktop">
      <div
        className='meridian-control-desktop__control flex-center meridian-control-desktop__control--left'
        onClick={handleScrollLeft}
        role="button"
        aria-label="meridian-control-scroll-left">
        <img className='' src={controlLeft} />
      </div>
      <div className='meridian-control-desktop__mask'
        aria-label="meridian-control-desktop-mask"
        role="div"
        ref={scrollableDiv}>
        <div className='meridian-control-desktop__scrollable'
        >
          {Object.keys(OPTIONS).map((meridian, index) => {
            const rgb = hexToRgb(OPTIONS[meridian].color).replace("rgb", "rgba").replace(")", ", 0.6)");

            return (
              <div
                className={`meridian-control-desktop__item 
              ${selectedMeridian === meridian && "meridian-control-desktop__item--selected"}
            `}
                style={{
                  border: `1px solid ${OPTIONS[meridian].color}`,
                  background: rgb
                }}
                onClick={() => {
                  if (selectedMeridian === meridian) {
                    setSelectedMeridian(null);
                    dispatch(resetToInitialStatePointSelectionSlice());
                    callbackResetViewMode();
                  } else {
                    setSelectedMeridian(meridian);
                    dispatch(resetToInitialStatePointSelectionSlice());
                    dispatch(setLinePreSelectByLabel({
                      line: meridian
                    }))
                  }
                }}
                key={index}
                aria-label={`meridian-control-item-${index}`}
                role="div"
                data-tip
                data-for={`tooltip-${meridian}`}
              >
                <div className={`meridian-control-desktop__item-icon-container flex-center`}
                  style={{ background: OPTIONS[meridian].color }}>
                  <img
                    className={`meridian-control-desktop__item-icon 
                    ${(index === 4 || index === 9) && `meridian-control-desktop__item-icon--black`}`}
                    src={OPTIONS[meridian].icon}></img>
                </div>
                <div className={`meridian-control-desktop__item-name`}>
                  <p>{OPTIONS[meridian].name}</p>
                </div>

                {selectedMeridian === meridian && <ReactTooltip id={`tooltip-${meridian}`} place="top" effect="solid">
                  <p>{t('click_to_deselect')}</p>
                </ReactTooltip>}
              </div>
            )
          })}
        </div>
      </div>
      <div
        className='meridian-control-desktop__control flex-center meridian-control-desktop__control--right'
        role="button"
        aria-label="meridian-control-scroll-right"
        onClick={handleScrollRight}>
        <img className='' src={controlRight} />
      </div>
    </div >
  );
};
