import './HT.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"
export const HT = ({ showLine }) => {
  const LABEL = 'HT'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[3]

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
  points.push(new Vector3(4.7, 3.9, 0.25))
  points.push(new Vector3(5.75, 2.575, 0.125))
  points.push(new Vector3(6.8, 1.65, 0))
  points.push(new Vector3(7.5, 1.2, -0.05))
  points.push(new Vector3(8.1, 0.85, -0.1))
  points.push(new Vector3(9.5, -0.5, 0.5))
  points.push(new Vector3(10.5, -1.1, 0.8))
  points.push(new Vector3(12, -1.76, 0.95))
  points.push(new Vector3(12.8, -1.9, 1.05))
  points.push(new Vector3(13.05, -2, 1.15))
  points.push(new Vector3(13.3, -2.1, 1.25))
  points.push(new Vector3(13.5, -2.45, 1.35))
  points.push(new Vector3(13.55, -3.025, 1.75))
  points.push(new Vector3(14.74, -3.45, 2.15))
  points.push(new Vector3(15.1, -3.7, 2.4))
  points.push(new Vector3(15.5, -3.75, 2.45))
  points.push(new Vector3(15.95, -4, 2.7))
  points.push(new Vector3(16.45, -4.275, 2.8))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[4.7, 3.9, 0.25]}
        label="HT-1"
        labelPosition={3} />

      <Point
        positionArray={[6.8, 1.65, 0]}
        label="HT-2"
        labelPosition={2} />

      <Point
        positionArray={[8.1, 0.85, -0.1]}
        label="HT-3"
        labelPosition={2} />

      <Point
        positionArray={[12.8, -1.9, 1.05]}
        label="HT-4"
        labelPosition={3} />

      <Point
        positionArray={[13.05, -2, 1.15]}
        label="HT-5"
        labelPosition={3} />

      <Point
        positionArray={[13.3, -2.1, 1.25]}
        label="HT-6"
        labelPosition={3} />

      <Point
        positionArray={[13.5, -2.45, 1.35]}
        label="HT-7"
        labelPosition={3} />

      <Point
        positionArray={[14.74, -3.45, 2.15]}
        label="HT-8"
        labelPosition={3} />

      <Point
        positionArray={[16.45, -4.275, 2.8]}
        label="HT-9"
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
