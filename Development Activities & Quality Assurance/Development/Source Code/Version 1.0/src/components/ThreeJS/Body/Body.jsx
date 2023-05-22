import './Body.scss'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'src/assets/libraries/GLTFLoader';
import MALEBODY from 'src/assets/models/MaleBody.glb';

export const Body = () => {
  let mesh = useLoader(
    GLTFLoader,
    MALEBODY,
  );

  return (
    <primitive 
      castShadow
      object={mesh.scene} 
      rotation-y={-0.025} 
      position={[0, -30, 0]} />
  );
};
