import { extend } from '@react-three/fiber';
import { FontLoader } from "src/assets/libraries/FontLoader"
import { TextGeometry } from 'src/assets/libraries/TextGeometry'
import helvetiker from "src/assets/fonts/helvetiker_regular.typeface.json"
import { useSelector } from 'react-redux';
import { Quaternion } from 'three';
import { useMediaQuery } from "react-responsive";

export const Text = ({ positionArray, text, reverse, viewFromBottom, isOnHover }) => {
  extend({ TextGeometry })
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  const helvetikerRegular = new FontLoader().parse(helvetiker)
  const textOptions = {
    font: helvetikerRegular,
    size: 0.1,
    height: 0.1,
  }
  const {
    x, y, z, w
  } = useSelector(
    (state) => state.cameraQuaternionSlice,
  );

  const getTextSize = () => {
    if (isOnHover) {
      return isDesktop ? [1, 1, 0.05] : [1.5, 1.5, 0.075]
    } else {
      return isDesktop ? [0.625, 0.625, 0.005] : [0.9375, 0.9375, 0.0075]
    }
  }

  return (
    <mesh position={positionArray} rotation={[0, 0, 0]} scale={getTextSize()}
      quaternion={
        !viewFromBottom ? new Quaternion(x, reverse ? 1 : y, z, w)
          : new Quaternion(0.7, -0.05, 0.05, 0.7)
      }>
      <textGeometry attach='geometry' args={[text || "", textOptions]} />
      <meshLambertMaterial
        attach='material' color={isOnHover ? 'rgb(0, 0, 0)' : 'rgb(0, 0, 0)'} />
    </mesh>
  );
};
