import './KI.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"

export const KI = ({ showLine }) => {
  const LABEL = 'KI'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[8]

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
  points.push(new Vector3(-4, -29.8, 1.25))
  points.push(new Vector3(-3, -29.65, 1.25))
  points.push(new Vector3(-2.45, -29, 0.25))
  points.push(new Vector3(-2.35, -28.8, -0.2))
  points.push(new Vector3(-2.325, -28.225, -0.4))
  points.push(new Vector3(-2.3, -27.65, -1.2))
  points.push(new Vector3(-2.375, -28, -1.5))
  points.push(new Vector3(-2.34, -28.175, -1.35))
  points.push(new Vector3(-2.35, -28.35, -1.2))
  points.push(new Vector3(-2.35, -28.35, -0.7))
  points.push(new Vector3(-2.25, -27.5, -1))
  points.push(new Vector3(-2.4, -25.75, -1.75))
  points.push(new Vector3(-2.35, -25.75, -1.45))
  points.push(new Vector3(-2.4, -25.75, -1.15))
  points.push(new Vector3(-2.2, -24.6, -1.5125))
  points.push(new Vector3(-1.825, -23.65, -1.875))
  points.push(new Vector3(-1.365, -22.55, -1.875))
  points.push(new Vector3(-1.5, -21, -1.875))
  points.push(new Vector3(-1.8, -19, -2.1))
  points.push(new Vector3(-2.3, -17.5, -2.3))
  points.push(new Vector3(-0.75, -14, -1.6))
  points.push(new Vector3(-0.35, -12, -0.5))
  points.push(new Vector3(-0.5, -11, 1.3))
  points.push(new Vector3(-1.5, -10, 2.4))
  points.push(new Vector3(-1.5, -8, 2.8))
  points.push(new Vector3(-1.5, -7, 2.75))
  points.push(new Vector3(-1.5, -5.9, 3.1))
  points.push(new Vector3(-1.4, -5.5, 3.1))
  points.push(new Vector3(-0.75, -4.325, 3.55))
  points.push(new Vector3(-0.75, -3.7527, 3.575))
  points.push(new Vector3(-0.75, -3.1755, 3.575))
  points.push(new Vector3(-0.75, -2.6182, 3.525))
  points.push(new Vector3(-0.75, -2.041, 3.45))
  points.push(new Vector3(-0.75, -1.4636, 3.45))
  points.push(new Vector3(-0.75, -0.85, 3.46))
  points.push(new Vector3(-0.75, -0.3091, 3.315))
  points.push(new Vector3(-0.75, 0.2682, 3.325))
  points.push(new Vector3(-0.75, 0.555, 3.325))
  points.push(new Vector3(-0.75, 0.8455, 3.25))
  points.push(new Vector3(-0.75, 1.4227, 3.05))
  points.push(new Vector3(-0.75, 2, 3.1))
  points.push(new Vector3(-1.4, 2.5, 3))
  points.push(new Vector3(-1.4, 3.125, 3.3))
  points.push(new Vector3(-1.4, 3.625, 3.3))
  points.push(new Vector3(-1.4, 4.098, 3.2))
  points.push(new Vector3(-1.4, 4.5, 3.05))
  points.push(new Vector3(-1.4, 5.07, 2.75))
  points.push(new Vector3(-1.4, 5.5, 2.5))
  points.push(new Vector3(-1.4, 6.042, 2.075))
  points.push(new Vector3(-1.4, 6.864, 1.5))
  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-4, -29.8, 1.25]}
        label="KI-1"
        labelPosition={3}
        viewFromBottom={true} />

      <Point
        positionArray={[-2.35, -28.8, -0.2]}
        label="KI-2"
        labelPosition={0} />

      <Point
        positionArray={[-2.3, -27.65, -1.2]}
        label="KI-3"
        labelPosition={0} />

      <Point
        positionArray={[-2.375, -28, -1.5]}
        label="KI-4"
        labelPosition={0} />

      <Point
        positionArray={[-2.35, -28.35, -1.2]}
        label="KI-5"
        labelPosition={0} />

      <Point
        positionArray={[-2.35, -28.35, -0.7]}
        label="KI-6"
        labelPosition={0} />

      <Point
        positionArray={[-2.4, -25.75, -1.75]}
        label="KI-7"
        labelPosition={0} />

      <Point
        positionArray={[-2.4, -25.75, -1.15]}
        label="KI-8"
        labelPosition={0} />

      <Point
        positionArray={[-1.825, -23.65, -1.875]}
        label="KI-9"
        labelPosition={0} />

      <Point
        positionArray={[-2.3, -17.5, -2.3]}
        label="KI-10"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[-0.75, -4.325, 3.55]}
        label="KI-11"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -3.7527, 3.575]}
        label="KI-12"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -3.1755, 3.575]}
        label="KI-13"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -2.6182, 3.525]}
        label="KI-14"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -2.041, 3.45]}
        label="KI-15"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -1.4636, 3.45]}
        label="KI-16"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -0.3091, 3.315]}
        label="KI-17"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 0.2682, 3.325]}
        label="KI-18"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 0.8455, 3.25]}
        label="KI-19"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 1.4227, 3.05]}
        label="KI-20"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 2, 3.1]}
        label="KI-21"
        labelPosition={2} />

      <Point
        positionArray={[-1.4, 2.5, 3]}
        label="KI-22"
        labelPosition={2} />

      <Point
        positionArray={[-1.4, 3.125, 3.3]}
        label="KI-23"
        labelPosition={3} />

      <Point
        positionArray={[-1.4, 4.098, 3.2]}
        label="KI-24"
        labelPosition={2} />

      <Point
        positionArray={[-1.4, 5.07, 2.75]}
        label="KI-25"
        labelPosition={1} />

      <Point
        positionArray={[-1.4, 6.042, 2.075]}
        label="KI-26"
        labelPosition={1} />

      <Point
        positionArray={[-1.4, 6.864, 1.5]}
        label="KI-27"
        labelPosition={1} />

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
