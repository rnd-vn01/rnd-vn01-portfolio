import './Liv.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"
export const Liv = ({ showLine }) => {
  const LABEL = 'Liv'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[12]

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
  points.push(new Vector3(4, -29.25, 4.4))
  points.push(new Vector3(3.8, -29.05, 3.75))
  points.push(new Vector3(3.55, -28.5, 2.75))
  points.push(new Vector3(3.3, -28.15, 1.75))
  points.push(new Vector3(3, -27.75, 0.7))
  points.push(new Vector3(2.65, -27, 0))
  points.push(new Vector3(2.7, -26, -0.35))
  points.push(new Vector3(2.625, -25.1, -0.7))
  points.push(new Vector3(2.525, -24.1, -0.7))
  points.push(new Vector3(1.55, -22, -1.1))
  points.push(new Vector3(1.6, -20.5, -1.3))
  points.push(new Vector3(1.85, -19.25, -1.5))
  points.push(new Vector3(1.95, -18.35, -1.55))
  points.push(new Vector3(1.2, -16.35, -1.275))
  points.push(new Vector3(0.8, -14.35, -1))
  points.push(new Vector3(0.5, -13.85, 0))
  points.push(new Vector3(0.8, -12.85, 1))
  points.push(new Vector3(1, -10.85, 2))
  points.push(new Vector3(1.25, -8.25, 2.8))
  points.push(new Vector3(1.5, -7.45, 2.86))
  points.push(new Vector3(1.5, -6.85, 2.9))
  points.push(new Vector3(1.6, -4.75, 3.15))
  points.push(new Vector3(2.5, -2.75, 2.75))
  points.push(new Vector3(3.2, -1.75, 2.3))
  points.push(new Vector3(3.4, -0.75, 1.5))
  points.push(new Vector3(3.2, 0, 1.85))
  points.push(new Vector3(3, 1, 2.365))
  points.push(new Vector3(2.5, 1.45, 2.6))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[4, -29.25, 4.4]}
        label="Liv-1"
        labelPosition={1} />

      <Point
        positionArray={[3.8, -29.05, 3.75]}
        label="Liv-2"
        labelPosition={1} />

      <Point
        positionArray={[3.3, -28.15, 1.75]}
        label="Liv-3"
        labelPosition={1} />

      <Point
        positionArray={[3, -27.75, 0.7]}
        label="Liv-4"
        labelPosition={1} />

      <Point
        positionArray={[2.625, -25.1, -0.7]}
        label="Liv-5"
        labelPosition={2} />

      <Point
        positionArray={[2.525, -24.1, -0.7]}
        label="Liv-6"
        labelPosition={2} />

      <Point
        positionArray={[1.85, -19.25, -1.5]}
        label="Liv-7"
        labelPosition={2} />

      <Point
        positionArray={[1.95, -18.35, -1.55]}
        label="Liv-8"
        labelPosition={2} />

      <Point
        positionArray={[0.8, -14.35, -1]}
        label="Liv-9"
        labelPosition={2} />

      <Point
        positionArray={[1.5, -7.45, 2.86]}
        label="Liv-10"
        labelPosition={2} />

      <Point
        positionArray={[1.5, -6.85, 2.9]}
        label="Liv-11"
        labelPosition={2} />

      <Point
        positionArray={[1.6, -4.75, 3.15]}
        label="Liv-12"
        labelPosition={3} />

      <Point
        positionArray={[3.4, -0.75, 1.5]}
        label="Liv-13"
        labelPosition={0} />

      <Point
        positionArray={[2.5, 1.45, 2.6]}
        label="Liv-14"
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
