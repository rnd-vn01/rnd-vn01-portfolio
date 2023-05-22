import './LU.scss'
import { Point } from "../index";
import { BufferGeometry, Vector3 } from "three";

export const LU = () => {
  const calculateUnit = (array1, array2) => {
    let result = 0
    for (let i = 0; i < 3; i++) {
      result += Math.pow(array1[i] - array2[i], 2);
    }
    return Math.sqrt(result) / 21
  }

  const points = []
  points.push(new Vector3(-2.9, 6.4, 1.55))
  points.push(new Vector3(-2.9, 6.9, 1.25))
  points.push(new Vector3(-4.75, 5.55, 1.2))
  points.push(new Vector3(-6.6, 4.2, 0.35))
  points.push(new Vector3(-7.1, 3.7, 0.375))
  points.push(new Vector3(-7.9, 2.8, 0.5))
  points.push(new Vector3(-8.75, 1.9, 0.175))
  points.push(new Vector3(-9.75, 1.05, 0.7))
  points.push(new Vector3(-10.75, 0.2, 1.025))
  points.push(new Vector3(-12.2, -1.5, 1.6))
  points.push(new Vector3(-12.4, -1.85, 1.5))
  points.push(new Vector3(-12.8, -2.5, 2))
  points.push(new Vector3(-13.1, -3.0, 2.6))
  points.push(new Vector3(-13.3, -3.025, 3.1))
  points.push(new Vector3(-13.5, -3.0, 4))
  points.push(new Vector3(-13.9, -3.1, 4.5))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
    <Point
      positionArray={[-2.9, 6.4, 1.55]}
      label="LU-1"
      labelPosition={0}/>
    <Point
      positionArray={[-2.9, 6.9, 1.25]}
      label="LU-2"
      labelPosition={0}/>
    <Point
      positionArray={[-6.6, 4.2, 0.35]}
      label="LU-3"
      labelPosition={1}/>  
    <Point
      positionArray={[-7.1, 3.7, 0.375]}
      label="LU-4"
      labelPosition={1}/>  
    <Point
      positionArray={[-8.75, 1.9, 0.175]}
      label="LU-5"
      labelPosition={1}/> 
    <Point
      positionArray={[-10.75, 0.2, 1.025]}
      label="LU-6"
      labelPosition={1}/>  
    <Point
      positionArray={[-12.2, -1.5, 1.6]}
      label="LU-7"
      labelPosition={0}/> 
    <Point
      positionArray={[-12.4, -1.85, 1.5]}
      label="LU-8"
      labelPosition={0}/> 
    <Point
      positionArray={[-12.8, -2.5, 2]}
      label="LU-9"
      labelPosition={0}/> 
    <Point
      positionArray={[-13.3, -3.025, 3.1]}
      label="LU-10"
      labelPosition={0}/>
    <Point
      positionArray={[-13.9, -3.1, 4.5]}
      label="LU-11"
      labelPosition={0}/>
    
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={1} linecap={'round'} linejoin={'round'} />
    </line>
    </>
  );
};
