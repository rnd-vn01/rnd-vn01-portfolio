import './MeridianControl.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from "react-i18next";
import ReactTooltip from 'react-tooltip';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { EXTRA_MERIDIAN_COLORS, MERIDIANS_COLOR } from 'src/configs/constants';
import { setLinePreSelectByLabel, setLineSelectedByLabel } from 'src/redux/slice';
import { useMediaQuery } from 'react-responsive';

export const MeridianControl: React.FC = ({ }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [selectedMeridian, setSelectedMeridian] = useState<string>("LU");
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

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
      color: MERIDIANS_COLOR[3]
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
      color: MERIDIANS_COLOR[5]
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

  return (
    <div
      role="div"
      aria-label="meridian-control"
      className="meridian-control">
      <div
        className="inline-flex meridian-control__selected--container"
        role="div"
        aria-label="meridian-control-icon"
        onClick={() => setIsDropdown(!isDropdown)}>
        <div
          style={{ background: OPTIONS[selectedMeridian].color }}
          className='meridian-control__selected'>
          <img
            className='meridian-control__selected--icon'
            src={OPTIONS[selectedMeridian].icon}></img>
        </div>
        <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
      </div>

      <div
        role="div"
        aria-label="meridian-control-dropdown"
        className={`meridian-control__dropdown ${isDropdown ? "meridian-control__dropdown--show" : ""}`}>
        {Object.keys(OPTIONS).map((meridian, index) => (
          <div
            key={index}
            className={`m-2 w-100 text-center meridian-control__dropdown--option
              ${meridian === selectedMeridian ? "meridian-control__dropdown--option-selected" : ""}
            `}
            role="div"
            aria-label={`meridian-control-item-${index}`}
            onClick={() => {
              setSelectedMeridian(meridian);
              setIsDropdown(false);
              if (isDesktop) {
                dispatch(setLinePreSelectByLabel({
                  line: meridian
                }))
              } else {
                dispatch(setLineSelectedByLabel({
                  selectedLine: meridian
                }))
              }
            }}>
            <div
              style={{ background: OPTIONS[meridian].color }}
              className='meridian-control__dropdown--item'
              data-tip
              data-for={`tooltip-${meridian}`}>
              <img
                className='meridian-control__selected--icon'
                src={OPTIONS[meridian].icon}></img>
              <ReactTooltip id={`tooltip-${meridian}`} place="left" effect="solid">
                <p>{OPTIONS[meridian].name}</p>
              </ReactTooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
