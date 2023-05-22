import './BL.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";

export const BL = ({ }) => {
  const points = []
  points.push(new Vector3(0.35, 12.275, 2.5))
  points.push(new Vector3(0.35, 12.5, 2.75))
  points.push(new Vector3(0.35, 12.7, 2.775))
  points.push(new Vector3(0.35, 13.8, 2.45))
  points.push(new Vector3(0.35, 14.2, 2.15))
  points.push(new Vector3(0.7, 14.2, 2.05))
  points.push(new Vector3(0.8, 14.45, 1.7))
  points.push(new Vector3(0.8, 14.725, 0.65))
  points.push(new Vector3(0.8, 14.75, 0.125))
  points.push(new Vector3(0.8, 14.7, -0.4))
  points.push(new Vector3(0.8, 14.6, -0.925))
  points.push(new Vector3(0.8, 14.3, -1.45))
  points.push(new Vector3(0.8, 13.5, -1.95))
  points.push(new Vector3(0.8, 12.75, -2.05))
  points.push(new Vector3(0.8, 12.4, -2))
  points.push(new Vector3(0.8, 11.825, -1.9))
  points.push(new Vector3(0.8, 11.25, -1.6))
  points.push(new Vector3(0.8, 9.675, -1.65))
  points.push(new Vector3(0.8, 7.5, -2.8))
  points.push(new Vector3(0.8, 6.775, -3.05))
  points.push(new Vector3(0.8, 6.05, -3.25))
  points.push(new Vector3(0.8, 5.325, -3.35))
  points.push(new Vector3(0.8, 4.6, -3.35))
  points.push(new Vector3(0.8, 3.875, -3.3))
  points.push(new Vector3(0.8, 3.15, -3.3))
  points.push(new Vector3(0.8, 1.475, -3.05))
  points.push(new Vector3(0.8, 0.75, -2.9))
  points.push(new Vector3(0.8, 0.025, -2.7))
  points.push(new Vector3(0.8, -0.7, -2.45))
  points.push(new Vector3(0.8, -1.425, -2.2))
  points.push(new Vector3(0.8, -2.15, -2.1))
  points.push(new Vector3(0.8, -2.875, -2.15))
  points.push(new Vector3(0.8, -3.6, -2.275))
  points.push(new Vector3(0.9, -4.4, -2.55))
  points.push(new Vector3(0.9, -4.9, -2.85))
  points.push(new Vector3(0.9, -5.4, -3.05))
  points.push(new Vector3(0.9, -5.8, -3.2))
  points.push(new Vector3(0.9, -6.2, -3.3))
  points.push(new Vector3(0.675, -5.55, -3.1))
  points.push(new Vector3(0.45, -4.9, -2.75))
  points.push(new Vector3(0.45, -5.4, -2.95))
  points.push(new Vector3(0.45, -5.8, -3.1))
  points.push(new Vector3(0.45, -6.2, -3.25))
  points.push(new Vector3(0.3, -7.05, -3.2))
  points.push(new Vector3(1.2, -7.75, -3.5))
  points.push(new Vector3(1.8, -8.1375, -3.25))
  points.push(new Vector3(2.4, -9.225, -2.6))
  points.push(new Vector3(2.7, -10, -2.35))
  points.push(new Vector3(2.7, -12.465, -2.6))
  points.push(new Vector3(3.175, -13.5, -2.5))
  points.push(new Vector3(3.65, -15.8, -2.0))
  points.push(new Vector3(3.65, -16.5, -2.1))
  points.push(new Vector3(3.8, -17, -2.15))
  points.push(new Vector3(3.5, -17, -2.3))
  points.push(new Vector3(3.2, -17, -2.35))
  points.push(new Vector3(3.35, -16, -2.2))
  points.push(new Vector3(3.45, -14, -2.35))
  points.push(new Vector3(3.55, -10, -2.25))
  points.push(new Vector3(3, -7, -3))
  points.push(new Vector3(1.35, -6.2, -3.4))
  points.push(new Vector3(1.35, -5.4, -3.1))
  points.push(new Vector3(1.35, -5.4, -3.1))
  points.push(new Vector3(1.35, -4.9, -2.95))
  points.push(new Vector3(1.35, -4.4, -2.55))
  points.push(new Vector3(1.35, -3.6, -2.275))
  points.push(new Vector3(1.35, -2.875, -2.15))
  points.push(new Vector3(1.35, -2.15, -2.1))
  points.push(new Vector3(1.35, -1.425, -2.2))
  points.push(new Vector3(1.35, -0.7, -2.45))
  points.push(new Vector3(1.35, 0.025, -2.7))
  points.push(new Vector3(1.35, 0.75, -2.95))
  points.push(new Vector3(1.35, 1.475, -3.1))
  points.push(new Vector3(1.35, 3.15, -3.4))
  points.push(new Vector3(1.35, 3.875, -3.4))
  points.push(new Vector3(1.35, 4.6, -3.45))
  points.push(new Vector3(1.35, 5.325, -3.45))
  points.push(new Vector3(1.35, 6.05, -3.35))
  points.push(new Vector3(1.35, 6.775, -3.1))
  points.push(new Vector3(1.35, 7.5, -2.95))
  points.push(new Vector3(1.1, 9.2, -1.8))
  points.push(new Vector3(0.95, 10.225, -1.5))
  points.push(new Vector3(0.8, 11.25, -1.6))

  const points2 = [];
  points2.push(new Vector3(3.2, -17, -2.35))
  points2.push(new Vector3(3.3, -18.1, -2.75))
  points2.push(new Vector3(3.3, -19.2, -3))
  points2.push(new Vector3(3.3, -20.3, -3.2))
  points2.push(new Vector3(3.3, -21.4, -3.25))
  points2.push(new Vector3(3.3, -22.5, -3.1))
  points2.push(new Vector3(3.6, -23.25, -2.8))
  points2.push(new Vector3(3.75, -25.5, -2.1))
  points2.push(new Vector3(3.8, -27.4, -1.9))
  points2.push(new Vector3(3.875, -27.95, -1.85))
  points2.push(new Vector3(3.95, -28.5, -1.7))
  points2.push(new Vector3(4.2, -28.1, -1.25))
  points2.push(new Vector3(4.25, -28.45, -0.925))
  points2.push(new Vector3(4.4, -28.8, -0.6))
  points2.push(new Vector3(4.85, -29.4, 0.4))
  points2.push(new Vector3(5.075, -29.415, 1))
  points2.push(new Vector3(5.2, -29.43, 1.6))
  points2.push(new Vector3(5.3, -29.44, 2.1))
  points2.push(new Vector3(5.4, -29.45, 2.4))
  points2.push(new Vector3(5.525, -29.45, 2.95))

  const lineGeometry = new BufferGeometry().setFromPoints(points)
  const lineGeometry2 = new BufferGeometry().setFromPoints(points2)

  return (
    <>
      <Point
        positionArray={[0.35, 12.275, 2.5]}
        label="BL-1"
        labelPosition={0} />

      <Point
        positionArray={[0.35, 12.5, 2.75]}
        label="BL-2"
        labelPosition={0} />

      <Point
        positionArray={[0.35, 14.2, 2.15]}
        label="BL-3"
        labelPosition={1} />

      <Point
        positionArray={[0.7, 14.2, 2.05]}
        label="BL-4"
        labelPosition={0} />

      <Point
        positionArray={[0.8, 14.45, 1.7]}
        label="BL-5"
        labelPosition={0} />

      <Point
        positionArray={[0.8, 14.725, 0.65]}
        label="BL-6"
        labelPosition={0} />

      <Point
        positionArray={[0.8, 14.7, -0.4]}
        label="BL-7"
        labelPosition={0} />

      <Point
        positionArray={[0.8, 14.3, -1.45]}
        label="BL-8"
        labelPosition={0} />

      <Point
        positionArray={[0.8, 12.4, -2]}
        label="BL-9"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[0.8, 11.25, -1.6]}
        label="BL-10"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[0.8, 7.5, -2.8]}
        label="BL-11"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, 6.775, -3.05]}
        label="BL-12"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, 6.05, -3.25]}
        label="BL-13"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, 5.325, -3.35]}
        label="BL-14"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, 4.6, -3.35]}
        label="BL-15"
        labelPosition={4} 
        reverse/>

      <Point
        positionArray={[0.8, 3.875, -3.3]}
        label="BL-16"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, 3.15, -3.3]}
        label="BL-17"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, 1.475, -3.05]}
        label="BL-18"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, 0.75, -2.9]}
        label="BL-19"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, 0.025, -2.7]}
        label="BL-20"
        labelPosition={4} 
        reverse/>

      <Point
        positionArray={[0.8, -0.7, -2.45]}
        label="BL-21"
        labelPosition={4} 
        reverse/>

      <Point
        positionArray={[0.8, -1.425, -2.2]}
        label="BL-22"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, -2.15, -2.1]}
        label="BL-23"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, -2.875, -2.15]}
        label="BL-24"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.8, -3.6, -2.275]}
        label="BL-25"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.9, -4.4, -2.55]}
        label="BL-26"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.9, -4.9, -2.85]}
        label="BL-27"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.9, -5.4, -3.05]}
        label="BL-28"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.9, -5.8, -3.2]}
        label="BL-29"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[0.9, -6.2, -3.3]}
        label="BL-30"
        labelPosition={4} 
        reverse/>

      <Point
        positionArray={[0.45, -4.9, -2.75]}
        label="BL-31"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[0.45, -5.4, -2.95]}
        label="BL-32"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[0.45, -5.8, -3.1]}
        label="BL-33"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[0.45, -6.2, -3.25]}
        label="BL-34"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[0.3, -7.05, -3.2]}
        label="BL-35"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[2.4, -9.225, -2.6]}
        label="BL-36"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[2.7, -12.465, -2.6]}
        label="BL-37"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[3.65, -16.5, -2.1]}
        label="BL-38"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.8, -17, -2.15]}
        label="BL-39"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.2, -17, -2.35]}
        label="BL-40"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[1.35, 6.775, -3.1]}
        label="BL-41"
        labelPosition={4} 
        reverse/>

      <Point
        positionArray={[1.35, 6.05, -3.35]}
        label="BL-42"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, 5.325, -3.45]}
        label="BL-43"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, 4.6, -3.45]}
        label="BL-44"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, 3.875, -3.4]}
        label="BL-45"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, 3.15, -3.4]}
        label="BL-46"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, 1.475, -3.1]}
        label="BL-47"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, 0.75, -2.95]}
        label="BL-48"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, 0.025, -2.7]}
        label="BL-49"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, -0.7, -2.45]}
        label="BL-50"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, -1.425, -2.2]}
        label="BL-51"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, -2.15, -2.1]}
        label="BL-52"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, -5.4, -3.1]}
        label="BL-53"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.35, -6.2, -3.4]}
        label="BL-54"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.3, -18.1, -2.75]}
        label="BL-55"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.3, -20.3, -3.2]}
        label="BL-56"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.3, -22.5, -3.1]}
        label="BL-57"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.6, -23.25, -2.8]}
        label="BL-58"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.75, -25.5, -2.1]}
        label="BL-59"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.8, -27.4, -1.9]}
        label="BL-60"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.95, -28.5, -1.7]}
        label="BL-61"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[4.2, -28.1, -1.25]}
        label="BL-62"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[4.4, -28.8, -0.6]}
        label="BL-63"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[4.85, -29.4, 0.4]}
        label="BL-64"
        labelPosition={0} />

      <Point
        positionArray={[5.2, -29.43, 1.6]}
        label="BL-65"
        labelPosition={0} />

      <Point
        positionArray={[5.4, -29.45, 2.4]}
        label="BL-66"
        labelPosition={0} />

      <Point
        positionArray={[5.525, -29.45, 2.95]}
        label="BL-67"
        labelPosition={0} />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#44A668'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>

      <line geometry={lineGeometry2}>
        <lineBasicMaterial attach="material" color={'#44A668'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
