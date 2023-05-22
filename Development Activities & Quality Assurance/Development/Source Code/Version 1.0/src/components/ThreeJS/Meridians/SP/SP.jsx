import './SP.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";

export const SP = ({ }) => {
  const points = []
  points.push(new Vector3(-3.5, -29.3, 4.4))
  points.push(new Vector3(-3.45, -29.2, 4.25))
  points.push(new Vector3(-3.35, -29.1, 3.9))
  points.push(new Vector3(-3.25, -29, 3.4))
  points.push(new Vector3(-3, -28.9, 2.9))
  points.push(new Vector3(-2.75, -28.75, 1.5))
  points.push(new Vector3(-2.5, -28.5, 0.35))
  points.push(new Vector3(-2.4, -27.75, -0.35))
  points.push(new Vector3(-2.25, -27.3, -0.75))
  points.push(new Vector3(-2.45, -26.4, -1))
  points.push(new Vector3(-2.45, -26, -1))
  points.push(new Vector3(-2.3, -24.56, -1.1))
  points.push(new Vector3(-2.15, -23.875, -1.15))
  points.push(new Vector3(-1.8, -23, -1.15))
  points.push(new Vector3(-1.6, -22.25, -1.15))
  points.push(new Vector3(-1.55, -21.67, -1.15))
  points.push(new Vector3(-1.55, -21, -1.25))
  points.push(new Vector3(-1.75, -19.5, -1.25))
  points.push(new Vector3(-1.95, -18.65, -0.75))
  points.push(new Vector3(-1.55, -17, -0.2))
  points.push(new Vector3(-1.25, -16, -0.2))
  points.push(new Vector3(-0.7, -14, 0.15))
  points.push(new Vector3(-0.5, -12, 0.5))
  points.push(new Vector3(-0.475, -11, 1))
  points.push(new Vector3(-1, -10, 2))
  points.push(new Vector3(-1.4, -8, 2.8))
  points.push(new Vector3(-1.6, -7, 2.8))
  points.push(new Vector3(-1.8, -6.25, 2.8))
  points.push(new Vector3(-2.05, -5.4, 2.75))
  points.push(new Vector3(-2.05, -4.45, 2.95))
  points.push(new Vector3(-2.05, -3.5, 2.95))
  points.push(new Vector3(-2.05, -2.25, 2.85))
  points.push(new Vector3(-2.05, -0.9, 2.6))
  points.push(new Vector3(-2.8, 2.25, 2.5))
  points.push(new Vector3(-3.3, 2.55, 2.4))
  points.push(new Vector3(-3.6, 2.85, 2.3))
  points.push(new Vector3(-3.8, 3.75, 2.3))
  points.push(new Vector3(-3.8, 4.75, 2.2))
  points.push(new Vector3(-4.35, 4, 1.7))
  points.push(new Vector3(-4.35, 3.35, 1.65))
  points.push(new Vector3(-3.8, 2.65, 1.2))
  points.push(new Vector3(-3.65, 1.25, 0.8))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-3.5, -29.3, 4.4]}
        label="SP-1"
        labelPosition={0} />

      <Point
        positionArray={[-3.35, -29.1, 3.9]}
        label="SP-2"
        labelPosition={0} />

      <Point
        positionArray={[-3, -28.9, 2.9]}
        label="SP-3"
        labelPosition={0} />

      <Point
        positionArray={[-2.75, -28.75, 1.5]}
        label="SP-4"
        labelPosition={0} />

      <Point
        positionArray={[-2.4, -27.75, -0.35]}
        label="SP-5"
        labelPosition={0} />

      <Point
        positionArray={[-2.45, -26, -1]}
        label="SP-6"
        labelPosition={0} />

      <Point
        positionArray={[-2.3, -24.56, -1.1]}
        label="SP-7"
        labelPosition={0} />

      <Point
        positionArray={[-1.55, -21.67, -1.15]}
        label="SP-8"
        labelPosition={0} />

      <Point
        positionArray={[-1.75, -19.5, -1.25]}
        label="SP-9"
        labelPosition={0} />

      <Point
        positionArray={[-1.25, -16, -0.2]}
        label="SP-10"
        labelPosition={0} />

      <Point
        positionArray={[-0.5, -12, 0.5]}
        label="SP-11"
        labelPosition={0} />

      <Point
        positionArray={[-1.8, -6.25, 2.8]}
        label="SP-12"
        labelPosition={2} />

      <Point
        positionArray={[-2.05, -5.4, 2.75]}
        label="SP-13"
        labelPosition={2} />

      <Point
        positionArray={[-2.05, -3.5, 2.95]}
        label="SP-14"
        labelPosition={2} />

      <Point
        positionArray={[-2.05, -2.25, 2.85]}
        label="SP-15"
        labelPosition={2} />

      <Point
        positionArray={[-2.05, -0.9, 2.6]}
        label="SP-16"
        labelPosition={2} />

      <Point
        positionArray={[-2.8, 2.25, 2.5]}
        label="SP-17"
        labelPosition={3} />

      <Point
        positionArray={[-3.6, 2.85, 2.3]}
        label="SP-18"
        labelPosition={2} />

      <Point
        positionArray={[-3.8, 3.75, 2.3]}
        label="SP-19"
        labelPosition={2} />

      <Point
        positionArray={[-3.8, 4.75, 2.2]}
        label="SP-20"
        labelPosition={2} />

      <Point
        positionArray={[-3.65, 1.25, 0.8]}
        label="SP-21"
        labelPosition={2} />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#C5CC43'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
