import { useLoader } from '@react-three/fiber';
import { TextureLoader, DynamicDrawUsage } from 'three';
import circleImg from 'src/assets/images/PointCircle.png';
import { useMemo, useState } from 'react';
import { Text } from "src/components/ThreeJS/index";

export const Point = ({ positionArray, label, labelPosition, reverse = false }) => {
  let textPosition = useMemo(() => {
    if (labelPosition === 0) {
      return [positionArray[0] + 0.1, positionArray[1] + 0.01, positionArray[2] + 0.01]
    } else if (labelPosition === 1) {
      return [positionArray[0] - 0.15, positionArray[1] + 0.1, positionArray[2] + 0.01]
    } else if (labelPosition === 2) {
      return [positionArray[0] - 0.5, positionArray[1] - 0.05, positionArray[2] + 0.02]
    } else if (labelPosition === 3) {
      return [positionArray[0] - 0.15, positionArray[1] - 0.25, positionArray[2] + 0.01]
    } else if (labelPosition === 4) {
      return [positionArray[0], positionArray[1], positionArray[2] - 0.05]
    } else if (labelPosition === 5) {
      return [positionArray[0] + 0.4, positionArray[1], positionArray[2] - 0.05]
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
        reverse={reverse}
      ></Text>
    </>
  );
};
