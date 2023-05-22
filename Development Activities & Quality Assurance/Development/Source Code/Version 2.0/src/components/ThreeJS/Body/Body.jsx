import './Body.scss'
import MALEBODY from 'src/assets/models/MaleBody.glb';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/redux/store';
import {
  resetToInitialStatePointSelectionSlice,
  setIsCurrentMousePosition,
  setIsCurrentMouseMovePosition
} from 'src/redux/slice/index';
import { useCallback } from "react";
import { debounce } from "lodash";
import { useMediaQuery } from 'react-responsive';
import { useGLTF } from '@react-three/drei';

export const Body = ({ isQuizMode }) => {
  //Responsive
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  const model = useGLTF(MALEBODY)

  const {
    isHoveringPoint,
    isHoveringLine
  } = useSelector(
    (state) => state.selectionSlice,
  );

  const dispatch = useAppDispatch();

  const debounceClick = useCallback(
    debounce((data) => dispatch(setIsCurrentMousePosition(data)), 50), []);

  const debounceUpdateMousePosition = useCallback(
    debounce((data) => dispatch(setIsCurrentMouseMovePosition(data)), 10), []);

  return (
    <mesh
      onDoubleClick={(e) => {
        if (!isQuizMode) {
          if (isDesktop) {
            e.stopPropagation();
            dispatch(resetToInitialStatePointSelectionSlice())
            debounceClick({
              currentMousePosition: null
            })
          } else {
            debounceClick({
              currentMousePosition: {
                x: e.point.x,
                y: e.point.y,
                z: e.point.z
              }
            })
          }
        }
      }}
      onClick={(e) => {
        if (!isQuizMode) {
          if (isDesktop) {
            debounceClick({
              currentMousePosition: {
                x: e.point.x,
                y: e.point.y,
                z: e.point.z
              }
            })
          } else {
            if (!isHoveringPoint) {
              dispatch(resetToInitialStatePointSelectionSlice())
            }
          }
        }
      }}
      onPointerMove={(e) => {
        if (!isQuizMode) {
          if (isDesktop) {
            debounceUpdateMousePosition({
              currentMouseMovePosition: {
                x: e.point.x,
                y: e.point.y,
                z: e.point.z
              }
            })
          }
        }
      }}
    >
      <primitive
        castShadow
        object={model.scene}
        rotation-y={-0.025}
        position={[0, -30, 0]} />
    </mesh>
  );
};

useGLTF.preload(MALEBODY)
