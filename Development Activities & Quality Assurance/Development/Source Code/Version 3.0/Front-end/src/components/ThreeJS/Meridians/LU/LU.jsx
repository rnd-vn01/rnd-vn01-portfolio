import './LU.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"
export const LU = ({ showLine }) => {
  const LABEL = 'LU'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[1]

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
  points.push(new Vector3(-4, 6.4, 1.05))
  points.push(new Vector3(-4, 6.9, 0.75))
  points.push(new Vector3(-5.15, 5.9, 0.95))
  points.push(new Vector3(-6.6, 4.2, 0.35))
  points.push(new Vector3(-7.1, 3.7, 0.375))
  points.push(new Vector3(-7.9, 2.8, 0.5))
  points.push(new Vector3(-8.75, 1.9, 0.175))
  points.push(new Vector3(-9.75, 1.05, 0.7))
  points.push(new Vector3(-10.75, 0.2, 1.025))
  points.push(new Vector3(-12.2, -1.5, 1.6))
  points.push(new Vector3(-12.4, -1.85, 1.5))
  points.push(new Vector3(-12.8, -2.5, 2))
  points.push(new Vector3(-12.8, -2.65, 2.8))
  points.push(new Vector3(-13.25, -2.75, 3.6))
  points.push(new Vector3(-13.5, -3.0, 4))
  points.push(new Vector3(-13.9, -3.1, 4.5))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-4, 6.4, 1.05]}
        label="LU-1"
        labelPosition={2} />
      <Point
        positionArray={[-4, 6.9, 0.75]}
        label="LU-2"
        labelPosition={2} />
      <Point
        positionArray={[-6.6, 4.2, 0.35]}
        label="LU-3"
        labelPosition={1} />
      <Point
        positionArray={[-7.1, 3.7, 0.375]}
        label="LU-4"
        labelPosition={1} />
      <Point
        positionArray={[-8.75, 1.9, 0.175]}
        label="LU-5"
        labelPosition={1} />
      <Point
        positionArray={[-10.75, 0.2, 1.025]}
        label="LU-6"
        labelPosition={1} />
      <Point
        positionArray={[-12.2, -1.5, 1.6]}
        label="LU-7"
        labelPosition={0} />
      <Point
        positionArray={[-12.4, -1.85, 1.5]}
        label="LU-8"
        labelPosition={0} />
      <Point
        positionArray={[-12.8, -2.5, 2]}
        label="LU-9"
        labelPosition={0} />
      <Point
        positionArray={[-13.25, -2.75, 3.6]}
        label="LU-10"
        labelPosition={0} />
      <Point
        positionArray={[-13.9, -3.1, 4.5]}
        label="LU-11"
        labelPosition={0} />

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
