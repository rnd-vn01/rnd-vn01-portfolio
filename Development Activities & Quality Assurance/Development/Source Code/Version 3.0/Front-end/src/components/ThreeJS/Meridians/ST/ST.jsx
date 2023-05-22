import './ST.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"

export const ST = ({ showLine }) => {
  const LABEL = 'ST'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[5]

  const [color, setColor] = useState(LINE_BASE_COLOR)
  const dispatch = useAppDispatch();
  const [isOnHover, setIsOnHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isInCheckingRange, setIsInCheckingRange] = useState(false);

  const {
    selectedLabel,
    selectedType,
    isHoveringPoint,
    hoveringLineLabel
  } = useSelector(
    (state) => state.selectionSlice,
  );

  useEffect(() => {
    setIsSelected(LABEL === selectedLabel && selectedType === 'line')
  }, [selectedLabel])

  useEffect(() => {
    if (isSelected) {
      setColor('#FF0000')
    } else if (isOnHover) {
      setColor('#000000')
    } else {
      setColor(LINE_BASE_COLOR)
    }

    dispatch(setIsHoveringLine({
      isHoveringLine: isOnHover
    }))
  }, [isOnHover, isSelected])

  useEffect(() => {
    if (hoveringLineLabel) {
      setIsOnHover(LABEL === hoveringLineLabel)
    } else {
      setIsOnHover(false);
    }
  }, [hoveringLineLabel])

  const debounceClick = useCallback(
    debounce((data) => dispatch(setLineSelected(data)), 100), []);

  const points = []
  points.push(new Vector3(-0.8, 12, 2.425))
  points.push(new Vector3(-0.795, 11.71, 2.45))
  points.push(new Vector3(-0.79, 11.5, 2.485))
  points.push(new Vector3(-0.785, 11.13, 2.5))
  points.push(new Vector3(-0.78, 10.6, 2.45))
  points.push(new Vector3(-0.775, 10.55, 2.425))
  points.push(new Vector3(-1, 10, 2.2))
  points.push(new Vector3(-1.2, 9.8, 1.5))
  points.push(new Vector3(-1.5, 10.085, 1.25))
  points.push(new Vector3(-1.675, 10.4, 0.75))
  points.push(new Vector3(-1.76, 10.9, 0.725))
  points.push(new Vector3(-1.8, 11.4, 0.675))
  points.push(new Vector3(-1.91, 13, 0.7))
  points.push(new Vector3(-1.75, 13.75, 0.675))
  points.push(new Vector3(-1.91, 13, 0.7))
  points.push(new Vector3(-1.8, 11.4, 0.675))
  points.push(new Vector3(-1.76, 10.9, 0.725))
  points.push(new Vector3(-1.675, 10.4, 0.75))
  points.push(new Vector3(-1.5, 10.085, 1.25))
  points.push(new Vector3(-1.2, 9.8, 1.5))
  points.push(new Vector3(-1.125, 9.6, 0.9))
  points.push(new Vector3(-1.05, 9, 0.9))
  points.push(new Vector3(-0.95, 8.175, 1.125))
  points.push(new Vector3(-0.75, 7.35, 1.35))
  points.push(new Vector3(-2.025, 7.2, 1.125))
  points.push(new Vector3(-3.3, 7.3, 0.8))
  points.push(new Vector3(-3.3, 6.814, 1.15))
  points.push(new Vector3(-3.3, 5.842, 1.7))
  points.push(new Vector3(-3.3, 5.1, 2.25))
  points.push(new Vector3(-3.3, 4.87, 2.4))
  points.push(new Vector3(-3.3, 3.898, 2.7))
  points.push(new Vector3(-3.25, 2.925, 2.8))
  points.push(new Vector3(-3.15, 2.6, 2.6))
  points.push(new Vector3(-3.05, 2.3, 2.4))
  points.push(new Vector3(-1.4, 2, 3))
  points.push(new Vector3(-1.45, 1.4227, 3.1))
  points.push(new Vector3(-1.45, 0.8455, 3.1))
  points.push(new Vector3(-1.45, 0.2682, 3.2))
  points.push(new Vector3(-1.45, -0.3091, 3.15))
  points.push(new Vector3(-1.45, -0.8864, 3.25))
  points.push(new Vector3(-1.45, -1.4636, 3.25))
  points.push(new Vector3(-1.45, -2.041, 3.25))
  points.push(new Vector3(-1.45, -2.6182, 3.275))
  points.push(new Vector3(-1.45, -3.1955, 3.3))
  points.push(new Vector3(-1.45, -3.7727, 3.3))
  points.push(new Vector3(-1.45, -4.35, 3.25))
  points.push(new Vector3(-3, -4.5, 2.4))
  points.push(new Vector3(-3.45, -5.35, 2.25))
  points.push(new Vector3(-3.375, -7, 2.5))
  points.push(new Vector3(-3.375, -8.5, 2.6))
  points.push(new Vector3(-3.3, -10.8846, 2.45))
  points.push(new Vector3(-3.25, -11.8, 2.4))
  points.push(new Vector3(-3.25, -12.8462, 2.15))
  points.push(new Vector3(-3.2, -13.5, 1.95))
  points.push(new Vector3(-3.2, -14.5, 1.525))
  points.push(new Vector3(-3.475, -15.75, 1.1))
  points.push(new Vector3(-3.75, -16.5, 1))
  points.push(new Vector3(-3.75, -17, 0.6))
  points.push(new Vector3(-3.75, -18, 0.35))
  points.push(new Vector3(-3.75, -19.45, 0.05))
  points.push(new Vector3(-3.75, -20.875, 0.05))
  points.push(new Vector3(-3.65, -22.125, -0.05))
  points.push(new Vector3(-3.55, -22.75, -0.11))
  points.push(new Vector3(-3.9, -22.35, -0.05))
  points.push(new Vector3(-3.55, -22.75, -0.11))
  points.push(new Vector3(-3.625, -25.25, -0.2))
  points.push(new Vector3(-3.7, -27.075, 0.1))
  points.push(new Vector3(-3.825, -27.425, 0.2))
  points.push(new Vector3(-3.95, -27.85, 0.8))
  points.push(new Vector3(-4.2, -28.4, 1.75))
  points.push(new Vector3(-4.55, -29.05, 3.05))
  points.push(new Vector3(-4.8, -29.35, 3.9))
  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-0.8, 12, 2.425]}
        label="ST-1"
        labelPosition={2} />

      <Point
        positionArray={[-0.795, 11.71, 2.45]}
        label="ST-2"
        labelPosition={2} />

      <Point
        positionArray={[-0.785, 11.13, 2.5]}
        label="ST-3"
        labelPosition={2} />

      <Point
        positionArray={[-0.775, 10.55, 2.425]}
        label="ST-4"
        labelPosition={2} />

      <Point
        positionArray={[-1.2, 9.8, 1.5]}
        label="ST-5"
        labelPosition={2} />

      <Point
        positionArray={[-1.675, 10.4, 0.75]}
        label="ST-6"
        labelPosition={2} />

      <Point
        positionArray={[-1.8, 11.4, 0.675]}
        label="ST-7"
        labelPosition={2} />

      <Point
        positionArray={[-1.75, 13.75, 0.675]}
        label="ST-8"
        labelPosition={2} />

      <Point
        positionArray={[-1.05, 9, 0.9]}
        label="ST-9"
        labelPosition={2} />

      <Point
        positionArray={[-0.95, 8.175, 1.125]}
        label="ST-10"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 7.35, 1.35]}
        label="ST-11"
        labelPosition={2} />

      <Point
        positionArray={[-3.3, 7.3, 0.8]}
        label="ST-12"
        labelPosition={1} />

      <Point
        positionArray={[-3.3, 6.814, 1.15]}
        label="ST-13"
        labelPosition={1} />

      <Point
        positionArray={[-3.3, 5.842, 1.7]}
        label="ST-14"
        labelPosition={1} />

      <Point
        positionArray={[-3.3, 4.87, 2.4]}
        label="ST-15"
        labelPosition={1} />

      <Point
        positionArray={[-3.3, 3.898, 2.7]}
        label="ST-16"
        labelPosition={2} />

      <Point
        positionArray={[-3.25, 2.925, 2.8]}
        label="ST-17"
        labelPosition={3} />

      <Point
        positionArray={[-3.05, 2.3, 2.4]}
        label="ST-18"
        labelPosition={2} />

      <Point
        positionArray={[-1.4, 2, 3]}
        label="ST-19"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, 1.4227, 3.1]}
        label="ST-20"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, 0.8455, 3.1]}
        label="ST-21"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, 0.2682, 3.2]}
        label="ST-22"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, -0.3091, 3.15]}
        label="ST-23"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, -0.8864, 3.25]}
        label="ST-24"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, -1.4636, 3.25]}
        label="ST-25"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, -2.041, 3.25]}
        label="ST-26"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, -2.6182, 3.275]}
        label="ST-27"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, -3.1955, 3.3]}
        label="ST-28"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, -3.7727, 3.3]}
        label="ST-29"
        labelPosition={2} />

      <Point
        positionArray={[-1.45, -4.35, 3.25]}
        label="ST-30"
        labelPosition={2} />

      <Point
        positionArray={[-3.45, -5.35, 2.25]}
        label="ST-31"
        labelPosition={2} />

      <Point
        positionArray={[-3.3, -10.8846, 2.45]}
        label="ST-32"
        labelPosition={2} />

      <Point
        positionArray={[-3.25, -12.8462, 2.15]}
        label="ST-33"
        labelPosition={2} />

      <Point
        positionArray={[-3.2, -13.5, 1.95]}
        label="ST-34"
        labelPosition={2} />

      <Point
        positionArray={[-3.75, -16.5, 1]}
        label="ST-35"
        labelPosition={2} />

      <Point
        positionArray={[-3.75, -18, 0.35]}
        label="ST-36"
        labelPosition={2} />

      <Point
        positionArray={[-3.75, -20.875, 0.05]}
        label="ST-37"
        labelPosition={2} />

      <Point
        positionArray={[-3.65, -22.125, -0.05]}
        label="ST-38"
        labelPosition={1} />

      <Point
        positionArray={[-3.55, -22.75, -0.11]}
        label="ST-39"
        labelPosition={2} />

      <Point
        positionArray={[-3.9, -22.35, -0.05]}
        label="ST-40"
        labelPosition={2} />

      <Point
        positionArray={[-3.7, -27.075, 0.1]}
        label="ST-41"
        labelPosition={2} />

      <Point
        positionArray={[-3.95, -27.85, 0.8]}
        label="ST-42"
        labelPosition={1} />

      <Point
        positionArray={[-4.2, -28.4, 1.75]}
        label="ST-43"
        labelPosition={1} />

      <Point
        positionArray={[-4.55, -29.05, 3.05]}
        label="ST-44"
        labelPosition={1} />

      <Point
        positionArray={[-4.8, -29.35, 3.9]}
        label="ST-45"
        labelPosition={2} />

      {showLine && <line
        onClick={(e) => {
          if (!isHoveringPoint && selectedType !== "line") {
            debounceClick({})
          } else {
            if (selectedType === "line") {
              dispatch(resetToInitialStatePointSelectionSlice())
            }
          }
        }}
        geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={color} linewidth={1} linecap={'round'} linejoin={'round'} />
      </line>}
    </>
  );
};
