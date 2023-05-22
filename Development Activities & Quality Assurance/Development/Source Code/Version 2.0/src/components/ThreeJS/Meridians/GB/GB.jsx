import './GB.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"
export const GB = ({ showLine }) => {
  const LABEL = 'GB'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[11]

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

  const debounceHover = useCallback(
    debounce((data) => dispatch(setLineHover(data)), 5), []);

  const points = []
  points.push(new Vector3(-1.425, 12.25, 2))
  points.push(new Vector3(-1.75, 11.75, 1.5))
  points.push(new Vector3(-1.825, 11.25, 0.45))
  points.push(new Vector3(-1.8, 11.75, 0.75))
  points.push(new Vector3(-1.875, 12.75, 0.8))
  points.push(new Vector3(-1.875, 13.25, 0.675))
  points.push(new Vector3(-1.9, 12.9, 0.625))
  points.push(new Vector3(-1.91, 12.75, 0.6))
  points.push(new Vector3(-1.9, 12.55, 0.575))
  points.push(new Vector3(-1.885, 12.2, 0.4))
  points.push(new Vector3(-1.95, 12.8, 0.125))
  points.push(new Vector3(-1.95, 12.775, -0.025))
  points.push(new Vector3(-1.925, 12.25, -0.35))
  points.push(new Vector3(-1.7, 11.6, -0.4))
  points.push(new Vector3(-1.6, 11.2, -0.385))
  points.push(new Vector3(-1.75, 11.6, -0.75))
  points.push(new Vector3(-1.9, 12.775, -0.75))
  points.push(new Vector3(-1.8, 13.75, 0))
  points.push(new Vector3(-1.8, 13.875, 0.925))
  points.push(new Vector3(-1.1, 14, 1.85))
  points.push(new Vector3(-1, 13.45, 2.35))
  points.push(new Vector3(-0.9, 12.875, 2.575))
  points.push(new Vector3(-0.9, 13.75, 2.25))
  points.push(new Vector3(-0.9, 14.05, 2))
  points.push(new Vector3(-0.9, 14.45, 1.45))
  points.push(new Vector3(-0.9, 14.65, 0.85))
  points.push(new Vector3(-0.9, 14.75, 0.525))
  points.push(new Vector3(-0.9, 14.65, -0.2))
  points.push(new Vector3(-1, 14.5, -1.075))
  points.push(new Vector3(-1, 13.25, -1.925))
  points.push(new Vector3(-1.1, 12.2, -1.8))
  points.push(new Vector3(-1.1, 11.45, -1.5))
  points.push(new Vector3(-1.1, 9.5, -1.6))
  points.push(new Vector3(-3, 8.425, -1.25))
  points.push(new Vector3(-3.5, 8, 0))
  points.push(new Vector3(-4, 6.25, 1.5))
  points.push(new Vector3(-4.5, 4, 1.75))
  points.push(new Vector3(-4.15, 3.1, 1.35))
  points.push(new Vector3(-4.15, 3.1, 1))
  points.push(new Vector3(-4, 2.9, 1.5))
  points.push(new Vector3(-2.5, 1, 2.6))
  points.push(new Vector3(-3.75, 0.125, 2))
  points.push(new Vector3(-3.75, -0.75, 0))
  points.push(new Vector3(-3.95, -1.375, 0.75))
  points.push(new Vector3(-3.65, -2, 1.5))
  points.push(new Vector3(-3.4, -3.25, 2.15))
  points.push(new Vector3(-2.7, -4.5, 2.5))
  points.push(new Vector3(-2.5, -4.75, 2.59))
  points.push(new Vector3(-2.3, -5, 2.65))
  points.push(new Vector3(-3.5, -5, 2.4))
  points.push(new Vector3(-4.3, -5, 1.25))
  points.push(new Vector3(-4.3, -5, 0.25))
  points.push(new Vector3(-4.325, -6, -0.375))
  points.push(new Vector3(-4.15, -7, -1))
  points.push(new Vector3(-4.45, -9, -1.6))
  points.push(new Vector3(-4.75, -10.5, -1.6))
  points.push(new Vector3(-5, -12, -0.7))
  points.push(new Vector3(-5, -12.5, -0.675))
  points.push(new Vector3(-4.975, -13, -0.625))
  points.push(new Vector3(-4.975, -14, -0.56))
  points.push(new Vector3(-4.725, -15, -0.5))
  points.push(new Vector3(-4.3, -18, -0.5))
  points.push(new Vector3(-4.425, -20, -0.3))
  points.push(new Vector3(-4.5, -21.5, -0.3))
  points.push(new Vector3(-4.525, -22.5, -0.5))
  points.push(new Vector3(-4.55, -23.67, -1.25))
  points.push(new Vector3(-4.6, -23.67, -1.45))
  points.push(new Vector3(-4.6, -23.67, -1.65))
  points.push(new Vector3(-4.425, -24.67, -1.25))
  points.push(new Vector3(-4.35, -25, -1.25))
  points.push(new Vector3(-4.275, -25.5, -1.25))
  points.push(new Vector3(-4.15, -26, -1.25))
  points.push(new Vector3(-4.2, -28, -0.8))
  points.push(new Vector3(-4.425, -28.275, -0.125))
  points.push(new Vector3(-4.6, -28.55, 0.65))
  points.push(new Vector3(-4.7, -28.7, 0.95))
  points.push(new Vector3(-5.2, -29.2, 2.4))
  points.push(new Vector3(-5.625, -29.4, 3.2))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-1.425, 12.25, 2]}
        label="GB-1"
        labelPosition={2}
      />

      <Point
        positionArray={[-1.825, 11.25, 0.45]}
        label="GB-2"
        labelPosition={2}
      />

      <Point
        positionArray={[-1.8, 11.75, 0.75]}
        label="GB-3"
        labelPosition={2}
      />

      <Point
        positionArray={[-1.875, 13.25, 0.675]}
        label="GB-4"
        labelPosition={2} />

      <Point
        positionArray={[-1.9, 12.9, 0.625]}
        label="GB-5"
        labelPosition={2} />

      <Point
        positionArray={[-1.9, 12.55, 0.575]}
        label="GB-6"
        labelPosition={2} />

      <Point
        positionArray={[-1.885, 12.2, 0.4]}
        label="GB-7"
        labelPosition={2} />

      <Point
        positionArray={[-1.95, 12.8, 0.125]}
        label="GB-8"
        labelPosition={2} />

      <Point
        positionArray={[-1.95, 12.775, -0.025]}
        label="GB-9"
        labelPosition={2} />

      <Point
        positionArray={[-1.9, 12.25, -0.35]}
        label="GB-10"
        labelPosition={2} />

      <Point
        positionArray={[-1.7, 11.6, -0.4]}
        label="GB-11"
        labelPosition={2} />

      <Point
        positionArray={[-1.6, 11.2, -0.385]}
        label="GB-12"
        labelPosition={2} />

      <Point
        positionArray={[-1.1, 14, 1.85]}
        label="GB-13"
        labelPosition={1} />

      <Point
        positionArray={[-0.9, 12.875, 2.575]}
        label="GB-14"
        labelPosition={2} />

      <Point
        positionArray={[-0.9, 14, 2]}
        label="GB-15"
        labelPosition={2} />

      <Point
        positionArray={[-0.9, 14.45, 1.45]}
        label="GB-16"
        labelPosition={2} />

      <Point
        positionArray={[-0.9, 14.65, 0.85]}
        label="GB-17"
        labelPosition={2} />

      <Point
        positionArray={[-0.9, 14.65, -0.2]}
        label="GB-18"
        labelPosition={2} />

      <Point
        positionArray={[-1.1, 12.2, -1.8]}
        label="GB-19"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-1.1, 11.45, -1.5]}
        label="GB-20"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-3, 8.425, -1.25]}
        label="GB-21"
        labelPosition={1} />

      <Point
        positionArray={[-4.15, 3.1, 1]}
        label="GB-22"
        labelPosition={2} />

      <Point
        positionArray={[-4, 2.9, 1.5]}
        label="GB-23"
        labelPosition={2} />

      <Point
        positionArray={[-2.5, 1, 2.6]}
        label="GB-24"
        labelPosition={2} />

      <Point
        positionArray={[-3.75, -0.75, 0]}
        label="GB-25"
        labelPosition={2} />

      <Point
        positionArray={[-3.65, -2, 1.5]}
        label="GB-26"
        labelPosition={2} />

      <Point
        positionArray={[-2.7, -4.5, 2.5]}
        label="GB-27"
        labelPosition={2} />

      <Point
        positionArray={[-2.3, -5, 2.65]}
        label="GB-28"
        labelPosition={2} />

      <Point
        positionArray={[-4.3, -5, 0.25]}
        label="GB-29"
        labelPosition={2} />

      <Point
        positionArray={[-4.15, -7, -1]}
        label="GB-30"
        labelPosition={2} />

      <Point
        positionArray={[-5, -12, -0.6875]}
        label="GB-31"
        labelPosition={2} />

      <Point
        positionArray={[-4.95, -13, -0.625]}
        label="GB-32"
        labelPosition={2} />

      <Point
        positionArray={[-4.7, -15, -0.5]}
        label="GB-33"
        labelPosition={2} />

      <Point
        positionArray={[-4.3, -18, -0.5]}
        label="GB-34"
        labelPosition={2} />

      <Point
        positionArray={[-4.55, -23.67, -1.25]}
        label="GB-35"
        labelPosition={2} />

      <Point
        positionArray={[-4.6, -23.67, -1.65]}
        label="GB-36"
        labelPosition={2} />

      <Point
        positionArray={[-4.425, -24.67, -1.25]}
        label="GB-37"
        labelPosition={2} />

      <Point
        positionArray={[-4.35, -25, -1.25]}
        label="GB-38"
        labelPosition={2} />

      <Point
        positionArray={[-4.15, -26, -1.25]}
        label="GB-39"
        labelPosition={2} />

      <Point
        positionArray={[-4.2, -28, -0.8]}
        label="GB-40"
        labelPosition={2} />

      <Point
        positionArray={[-4.6, -28.55, 0.65]}
        label="GB-41"
        labelPosition={2} />

      <Point
        positionArray={[-4.7, -28.7, 0.95]}
        label="GB-42"
        labelPosition={2} />

      <Point
        positionArray={[-5.2, -29.2, 2.4]}
        label="GB-43"
        labelPosition={1} />

      <Point
        positionArray={[-5.6, -29.4, 3.2]}
        label="GB-44"
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
