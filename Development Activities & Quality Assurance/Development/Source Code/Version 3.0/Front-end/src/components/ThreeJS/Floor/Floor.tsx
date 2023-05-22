import { angleToRadians } from "src/helpers/angle";

export const Floor = () => {
  return (
    <>
      <mesh rotation={[-(angleToRadians(95)), 0.01, 0]} position={[0, -29.9, 0]} receiveShadow>
        <circleGeometry args={[300, 10000]} />
        <meshStandardMaterial color="#E0F2FC" opacity={1} />
      </mesh>

      <mesh rotation={[-(angleToRadians(95)), 0.01, 0]} position={[0, -29.9, 0]}>
        <ringGeometry args={[300, 450, 10000, 1]} />
        <meshStandardMaterial color="#E0F2FC" transparent opacity={0.125} />
      </mesh>
    </>
  );
};
