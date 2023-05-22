import { extend } from '@react-three/fiber';
import { FontLoader } from "src/assets/libraries/FontLoader"
import { TextGeometry } from 'src/assets/libraries/TextGeometry'
import helvetiker from "src/assets/fonts/helvetiker_regular.typeface.json"
import { useSelector } from 'react-redux';
import { Quaternion } from 'three';

export const Text = ({ positionArray, text, reverse }) => {
  extend({ TextGeometry })

  const helvetikerRegular = new FontLoader().parse(helvetiker)
  const textOptions = {
    font: helvetikerRegular,
    size: 5,
    height: 1,
  }
  const {
    x, y, z, w
  } = useSelector(
    (state) => state.cameraQuaternionSlice,
  );

  return (
    <mesh position={positionArray} rotation={[0, 0, 0]} scale={[0.02, 0.02, 0.001]} 
          quaternion={new Quaternion(x, reverse? 1 : y, z, w)}>
      <textGeometry attach='geometry' args={[text || "", textOptions]} />
      <meshLambertMaterial attach='material' color={'black'} />
    </mesh>
  );
};
