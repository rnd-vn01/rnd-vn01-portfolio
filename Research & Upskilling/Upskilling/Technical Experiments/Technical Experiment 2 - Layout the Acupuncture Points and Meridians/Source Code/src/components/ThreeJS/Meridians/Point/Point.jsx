import { useLoader } from '@react-three/fiber';
import { TextureLoader, DynamicDrawUsage } from 'three';
import circleImg from 'src/assets/images/circle.png';
import { useMemo, useState } from 'react';
import { Text } from "../index";

export const Point = ({ positionArray, label, labelPosition }) => {
  let textPosition = useMemo(() => {
    if (labelPosition === 0) {
      return [positionArray[0] + 0.1, positionArray[1] + 0.01, positionArray[2] + 0.01]
    } else if (labelPosition === 1) {
      return [positionArray[0] - 0.15, positionArray[1] + 0.1, positionArray[2] + 0.01]
    }
  }, [positionArray])
  let position = useMemo(() => {
    return new Float32Array(positionArray);
  }, [positionArray])
  
  const imgTex = useLoader(TextureLoader, circleImg);

  

  return (
    <>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={position.length / 3}
            array={position}
            itemSize={3}
            usage={DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          map={imgTex}
          color={0xFFFF00}
          size={0.5}
          sizeAttenuation
          transparent={false}
          alphaTest={0.5}
          opacity={1.0}
        />
      </points>

      <Text
        positionArray={textPosition}
        text={label}
      ></Text>
    </>
  );
};
