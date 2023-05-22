import './Du.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { EXTRA_MERIDIAN_COLORS } from 'src/configs/constants';
import { debounce } from "lodash";

export const Du = ({ showLine }) => {
  const LABEL = 'Du'
  const LINE_BASE_COLOR = EXTRA_MERIDIAN_COLORS[1]

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
  points.push(new Vector3(0.1, -7.4, -2.95))
  points.push(new Vector3(0.1, -6.8, -2.95))
  points.push(new Vector3(0.08, -4.9, -2.75))
  points.push(new Vector3(0.075, -3.6, -2.275))
  points.push(new Vector3(0.075, -2.95, -2.125))
  points.push(new Vector3(0.075, -2.3, -2.05))
  points.push(new Vector3(0.075, -1.575, -2.05))
  points.push(new Vector3(0.075, -0.7625, -2.18))
  points.push(new Vector3(0.075, 0.05, -2.475))
  points.push(new Vector3(0.075, 0.775, -2.675))
  points.push(new Vector3(0.075, 1.5, -2.875))
  points.push(new Vector3(0.075, 3.175, -3.1))
  points.push(new Vector3(0.075, 3.875, -3.175))
  points.push(new Vector3(0.075, 4.58, -3.2))
  points.push(new Vector3(0.075, 6.05, -3.1))
  points.push(new Vector3(0.075, 6.7875, -2.85))
  points.push(new Vector3(0.075, 7.525, -2.5))
  points.push(new Vector3(0.075, 7.9, -2.35))
  points.push(new Vector3(0.075, 9, -1.85))
  points.push(new Vector3(0.075, 9.75, -1.6))
  points.push(new Vector3(0.075, 10.5, -1.65))
  points.push(new Vector3(0.075, 11.285, -1.84))
  points.push(new Vector3(0.075, 11.485, -1.925))
  points.push(new Vector3(0.075, 11.9175, -2.1))
  points.push(new Vector3(0.075, 12.35, -2.175))
  points.push(new Vector3(0.075, 12.7875, -2.25))
  points.push(new Vector3(0.075, 13.225, -2.15))
  points.push(new Vector3(0.075, 13.75, -2))
  points.push(new Vector3(0.075, 14.1, -1.75))
  points.push(new Vector3(0.075, 14.55, -1.4))
  points.push(new Vector3(0.075, 14.75, -1))
  points.push(new Vector3(0.075, 14.85, -0.6))
  points.push(new Vector3(0.075, 14.925, -0.075))
  points.push(new Vector3(0.075, 14.9, 0.45))
  points.push(new Vector3(0.075, 14.85, 0.95))
  points.push(new Vector3(0.075, 14.7, 1.45))
  points.push(new Vector3(0.075, 14.5, 1.95))
  points.push(new Vector3(0.075, 14.2, 2.25))
  points.push(new Vector3(-0.075, 13.25, 2.71))
  points.push(new Vector3(-0.075, 12.25, 2.9))
  points.push(new Vector3(-0.075, 11.5, 3.175))
  points.push(new Vector3(-0.075, 11.25, 3.175))
  points.push(new Vector3(-0.075, 11, 2.8))
  points.push(new Vector3(-0.075, 10.75, 2.8))
  points.push(new Vector3(-0.075, 10.625, 2.85))
  points.push(new Vector3(-0.075, 10.5, 2.8))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[0.1, -7.4, -2.95]}
        label="Du-1"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.1, -6.8, -2.95]}
        label="Du-2"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, -3.6, -2.275]}
        label="Du-3"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, -2.3, -2.05]}
        label="Du-4"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, -1.575, -2.05]}
        label="Du-5"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 0.05, -2.475]}
        label="Du-6"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 0.775, -2.675]}
        label="Du-7"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 1.5, -2.875]}
        label="Du-8"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 3.175, -3.1]}
        label="Du-9"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 3.875, -3.175]}
        label="Du-10"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 4.58, -3.2]}
        label="Du-11"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 6.05, -3.1]}
        label="Du-12"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 7.525, -2.5]}
        label="Du-13"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 7.9, -2.35]}
        label="Du-14"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 11.285, -1.84]}
        label="Du-15"
        labelPosition={7}
        reverse />

      <Point
        positionArray={[0.075, 11.485, -1.925]}
        label="Du-16"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 12.35, -2.175]}
        label="Du-17"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 13.225, -2.15]}
        label="Du-18"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 14.1, -1.75]}
        label="Du-19"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 14.85, -0.6]}
        label="Du-20"
        labelPosition={6}
        reverse />

      <Point
        positionArray={[0.075, 14.9, 0.45]}
        label="Du-21"
        labelPosition={0} />

      <Point
        positionArray={[0.075, 14.7, 1.45]}
        label="Du-22"
        labelPosition={0} />

      <Point
        positionArray={[0.075, 14.5, 1.95]}
        label="Du-23"
        labelPosition={0} />

      <Point
        positionArray={[0.075, 14.2, 2.25]}
        label="Du-24"
        labelPosition={2} />

      <Point
        positionArray={[-0.075, 11.5, 3.175]}
        label="Du-25"
        labelPosition={2} />

      <Point
        positionArray={[-0.075, 11, 2.8]}
        label="Du-26"
        labelPosition={2} />

      <Point
        positionArray={[-0.075, 10.75, 2.8]}
        label="Du-27"
        labelPosition={2} />

      <Point
        positionArray={[-0.075, 10.5, 2.8]}
        label="Du-28"
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
