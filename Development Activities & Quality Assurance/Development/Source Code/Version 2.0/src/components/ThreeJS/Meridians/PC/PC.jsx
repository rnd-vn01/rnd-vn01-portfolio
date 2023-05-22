import './PC.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"
export const PC = ({ showLine }) => {
  const LABEL = 'PC'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[9]

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
  points.push(new Vector3(-3.45, 2.925, 2.5))
  points.push(new Vector3(-4.2, 4.2, 2))
  points.push(new Vector3(-5, 5, 0.8))
  points.push(new Vector3(-5.65, 4.55, 0.45))
  points.push(new Vector3(-6.3, 4.1, 0.4))
  points.push(new Vector3(-6.3, 3.5, 0.5))
  points.push(new Vector3(-6.65, 2.75, 0.55))
  points.push(new Vector3(-7, 2, 0.4))
  points.push(new Vector3(-8.5, 0.6, -0.4))
  points.push(new Vector3(-9.85, -0.5, 0.225))
  points.push(new Vector3(-11.2, -1.1, 0.85))
  points.push(new Vector3(-11.92, -1.55, 1.01))
  points.push(new Vector3(-12.28, -1.75, 1.09))
  points.push(new Vector3(-13, -2.4, 1.25))
  points.push(new Vector3(-13.2, -2.95, 1.7))
  points.push(new Vector3(-13.86, -3.1, 2))
  points.push(new Vector3(-14.7, -3.4, 2.55))
  points.push(new Vector3(-15.5, -3.95, 3))
  points.push(new Vector3(-16.25, -4.65, 3.4))
  points.push(new Vector3(-16.5, -4.9, 3.65))
  points.push(new Vector3(-16.75, -4.875, 3.85))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-3.45, 2.925, 2.5]}
        label="PC-1"
        labelPosition={3} />

      <Point
        positionArray={[-6.3, 4.1, 0.4]}
        label="PC-2"
        labelPosition={1} />

      <Point
        positionArray={[-8.5, 0.6, -0.4]}
        label="PC-3"
        labelPosition={3} />

      <Point
        positionArray={[-11.2, -1.1, 0.85]}
        label="PC-4"
        labelPosition={3} />

      <Point
        positionArray={[-11.92, -1.55, 1.01]}
        label="PC-5"
        labelPosition={3} />

      <Point
        positionArray={[-12.28, -1.75, 1.09]}
        label="PC-6"
        labelPosition={3} />

      <Point
        positionArray={[-13, -2.4, 1.25]}
        label="PC-7"
        labelPosition={3} />

      <Point
        positionArray={[-14.7, -3.4, 2.55]}
        label="PC-8"
        labelPosition={3}
        viewFromBottom />

      <Point
        positionArray={[-16.75, -4.875, 3.85]}
        label="PC-9"
        labelPosition={3}
        viewFromBottom />

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
