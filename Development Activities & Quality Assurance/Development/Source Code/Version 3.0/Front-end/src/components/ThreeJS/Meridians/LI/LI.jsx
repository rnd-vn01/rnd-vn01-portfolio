import './LI.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"
export const LI = ({ showLine }) => {
  const LABEL = 'LI'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[2]

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
  points.push(new Vector3(15.8, -4.3, 5.4))
  points.push(new Vector3(14.9, -3, 4.5))
  points.push(new Vector3(14.5, -2.8, 4.3))
  points.push(new Vector3(13.75, -2.5, 4.1))
  points.push(new Vector3(13.625, -2, 3.7))
  points.push(new Vector3(13.2, -1.5, 3))
  points.push(new Vector3(12.5, -0.4, 2.1))
  points.push(new Vector3(12.3, -0.05, 1.85))
  points.push(new Vector3(12.1, 0.15, 1.6))
  points.push(new Vector3(11.25, 1.15, 1))
  points.push(new Vector3(10.75, 1.725, 0.7))
  points.push(new Vector3(10.25, 2.175, 0.4))
  points.push(new Vector3(9.75, 2.5, 0.25))
  points.push(new Vector3(9.4, 2.7, 0.1))
  points.push(new Vector3(9.2, 2.95, -0.2))
  points.push(new Vector3(9, 3.1, -0.5))
  points.push(new Vector3(8.3, 3.75, -0.85))
  points.push(new Vector3(7, 4.85, -0.85))
  points.push(new Vector3(6.7, 5.55, -0.85))
  points.push(new Vector3(6.25, 6.25, -0.85))
  points.push(new Vector3(5.75, 7, -0.45))
  points.push(new Vector3(4.95, 7.425, -0.45))
  points.push(new Vector3(1.5, 9, 0.55))
  points.push(new Vector3(1.4, 9.3, 0.65))
  points.push(new Vector3(1.3, 10.5, 2))
  points.push(new Vector3(0.8, 10.8, 2.45))
  points.push(new Vector3(0.175, 11.125, 2.8))
  points.push(new Vector3(0.35, 11.125, 2.8))
  points.push(new Vector3(0.35, 11.3, 2.65))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[15.8, -4.3, 5.4]}
        label="LI-1"
        labelPosition={0} />
      <Point
        positionArray={[14.9, -3, 4.5]}
        label="LI-2"
        labelPosition={0} />
      <Point
        positionArray={[14.5, -2.8, 4.3]}
        label="LI-3"
        labelPosition={0} />
      <Point
        positionArray={[13.75, -2.5, 4.1]}
        label="LI-4"
        labelPosition={0} />
      <Point
        positionArray={[13.2, -1.5, 3]}
        label="LI-5"
        labelPosition={0} />
      <Point
        positionArray={[12.5, -0.4, 2.1]}
        label="LI-6"
        labelPosition={0} />
      <Point
        positionArray={[12.1, 0.15, 1.6]}
        label="LI-7"
        labelPosition={0} />
      <Point
        positionArray={[11.25, 1.15, 1]}
        label="LI-8"
        labelPosition={0} />
      <Point
        positionArray={[10.75, 1.725, 0.7]}
        label="LI-9"
        labelPosition={0} />
      <Point
        positionArray={[10.25, 2.175, 0.4]}
        label="LI-10"
        labelPosition={0} />
      <Point
        positionArray={[9.4, 2.7, 0.1]}
        label="LI-11"
        labelPosition={0} />
      <Point
        positionArray={[9, 3.1, -0.5]}
        label="LI-12"
        labelPosition={0} />
      <Point
        positionArray={[8.3, 3.75, -0.85]}
        label="LI-13"
        labelPosition={0} />
      <Point
        positionArray={[7, 4.85, -0.85]}
        label="LI-14"
        labelPosition={0} />
      <Point
        positionArray={[6.25, 6.25, -0.85]}
        label="LI-15"
        labelPosition={0} />
      <Point
        positionArray={[4.95, 7.425, -0.45]}
        label="LI-16"
        labelPosition={0} />
      <Point
        positionArray={[1.5, 9, 0.55]}
        label="LI-17"
        labelPosition={0} />
      <Point
        positionArray={[1.4, 9.3, 0.65]}
        label="LI-18"
        labelPosition={0} />
      <Point
        positionArray={[0.175, 11.125, 2.8]}
        label="LI-19"
        labelPosition={0} />
      <Point
        positionArray={[0.35, 11.3, 2.65]}
        label="LI-20"
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
