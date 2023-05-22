import './Ren.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { EXTRA_MERIDIAN_COLORS } from 'src/configs/constants';
import { debounce } from "lodash";

export const Ren = ({ showLine }) => {
  const LABEL = 'Ren'
  const LINE_BASE_COLOR = EXTRA_MERIDIAN_COLORS[2]

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
  points.push(new Vector3(0, -8.9, -0.15))
  points.push(new Vector3(0.6, -9.5, 2))
  points.push(new Vector3(0.8, -9, 2.5))
  points.push(new Vector3(0.9, -7.5, 2.75))
  points.push(new Vector3(0.2, -6.5, 3.5))
  points.push(new Vector3(-0.125, -4.32, 3.65))
  points.push(new Vector3(-0.125, -3.7527, 3.7))
  points.push(new Vector3(-0.125, -3.1755, 3.7))
  points.push(new Vector3(-0.125, -2.6182, 3.6))
  points.push(new Vector3(-0.125, -2.3296, 3.5))
  points.push(new Vector3(-0.125, -2.041, 3.5))
  points.push(new Vector3(-0.125, -1.4636, 3.45))
  points.push(new Vector3(-0.125, -0.8864, 3.4))
  points.push(new Vector3(-0.125, -0.3091, 3.315))
  points.push(new Vector3(-0.125, 0.2682, 3.35))
  points.push(new Vector3(-0.125, 0.8455, 3.275))
  points.push(new Vector3(-0.125, 1.4227, 3.075))
  points.push(new Vector3(-0.125, 2, 2.95))
  points.push(new Vector3(-0.125, 2.35, 2.9))
  points.push(new Vector3(-0.125, 2.7, 2.85))
  points.push(new Vector3(-0.1, 3.225, 2.85))
  points.push(new Vector3(-0.1, 4.198, 2.85))
  points.push(new Vector3(-0.1, 4.684, 2.7))
  points.push(new Vector3(-0.1, 5.17, 2.45))
  points.push(new Vector3(-0.05, 6.142, 1.875))
  points.push(new Vector3(-0.05, 6.964, 1.5))
  points.push(new Vector3(-0.05, 7.4, 1.25))
  points.push(new Vector3(-0.05, 8.32, 1.23))
  points.push(new Vector3(-0.05, 9.225, 1.425))
  points.push(new Vector3(-0.06, 9.3, 2.675))
  points.push(new Vector3(-0.06, 9.725, 2.79))
  points.push(new Vector3(-0.075, 10.15, 2.675))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[0, -8.9, -0.15]}
        label="Ren-1"
        labelPosition={3}
        viewFromBottom={true} />

      <Point
        positionArray={[-0.125, -4.32, 3.65]}
        label="Ren-2"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, -3.7527, 3.7]}
        label="Ren-3"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, -3.1755, 3.7]}
        label="Ren-4"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, -2.6182, 3.6]}
        label="Ren-5"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, -2.3296, 3.5]}
        label="Ren-6"
        labelPosition={0} />

      <Point
        positionArray={[-0.125, -2.041, 3.5]}
        label="Ren-7"
        labelPosition={0} />

      <Point
        positionArray={[-0.125, -1.4636, 3.45]}
        label="Ren-8"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, -0.8864, 3.4]}
        label="Ren-9"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, -0.3091, 3.315]}
        label="Ren-10"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, 0.2682, 3.35]}
        label="Ren-11"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, 0.8455, 3.275]}
        label="Ren-12"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, 1.4227, 3.075]}
        label="Ren-13"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, 2, 2.95]}
        label="Ren-14"
        labelPosition={3} />

      <Point
        positionArray={[-0.125, 2.35, 2.9]}
        label="Ren-15"
        labelPosition={0} />

      <Point
        positionArray={[-0.125, 2.7, 2.85]}
        label="Ren-16"
        labelPosition={0} />

      <Point
        positionArray={[-0.1, 3.225, 2.85]}
        label="Ren-17"
        labelPosition={1} />

      <Point
        positionArray={[-0.1, 4.198, 2.85]}
        label="Ren-18"
        labelPosition={1} />

      <Point
        positionArray={[-0.1, 5.17, 2.45]}
        label="Ren-19"
        labelPosition={1} />

      <Point
        positionArray={[-0.05, 6.142, 1.875]}
        label="Ren-20"
        labelPosition={1} />

      <Point
        positionArray={[-0.05, 6.964, 1.5]}
        label="Ren-21"
        labelPosition={1} />

      <Point
        positionArray={[-0.05, 7.4, 1.25]}
        label="Ren-22"
        labelPosition={1} />

      <Point
        positionArray={[-0.05, 9.225, 1.425]}
        label="Ren-23"
        labelPosition={3} />

      <Point
        positionArray={[-0.075, 10.15, 2.675]}
        label="Ren-24"
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
