import './LI.scss'
import { Point } from "../index";
import { BufferGeometry, Vector3 } from "three";

export const LI = () => {
  const points = []
  // points.push(new Vector3(-2.9, 6.4, 1.55))
  

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
    <Point
      positionArray={[15.8, -4.3, 5.4]}
      label="LI-1"
      labelPosition={0}/>
    <Point
      positionArray={[14.9, -3, 4.5]}
      label="LI-2"
      labelPosition={0}/>
    <Point
      positionArray={[14.5, -2.8, 4.3]}
      label="LI-3"
      labelPosition={0}/>
    <Point
      positionArray={[13.75, -2.5, 4.1]}
      label="LI-4"
      labelPosition={0}/>
    <Point
      positionArray={[13.5, -1.5, 3]}
      label="LI-5"
      labelPosition={0}/>
    <Point
      positionArray={[13, -0.6, 2]}
      label="LI-6"
      labelPosition={0}/>
    <Point
      positionArray={[12.8, -0.3, 1.6]}
      label="LI-7"
      labelPosition={0}/>
    <Point
      positionArray={[12.3, 0.3, 1]}
      label="LI-8"
      labelPosition={0}/>
    <Point
      positionArray={[12.1, 0.5, 0.7]}
      label="LI-9"
      labelPosition={0}/>
    <Point
      positionArray={[11.9, 0.7, 0.4]}
      label="LI-10"
      labelPosition={0}/>
    <Point
      positionArray={[11.4, 1.1, 0]}
      label="LI-11"
      labelPosition={0}/>
    <Point
      positionArray={[11.1, 1.2, -0.3]}
      label="LI-12"
      labelPosition={0}/>
    <Point
      positionArray={[10.5, 1.8, -0.65]}
      label="LI-13"
      labelPosition={0}/>
    <Point
      positionArray={[8.3, 3.75, -0.85]}
      label="LI-14"
      labelPosition={0}/>
    <Point
      positionArray={[6.25, 6.25, -0.85]}
      label="LI-15"
      labelPosition={0}/>
    <Point
      positionArray={[4.9, 7.15, -1.75]}
      label="LI-16"
      labelPosition={0}/>
    <Point
      positionArray={[1.5, 9, 0.55]}
      label="LI-17"
      labelPosition={0}/>  
    <Point
      positionArray={[1.4, 9.3, 0.65]}
      label="LI-18"
      labelPosition={0}/>
    <Point
      positionArray={[0.175, 11.125, 2.8]}
      label="LI-19"
      labelPosition={0}/>
    <Point
      positionArray={[0.35, 11.3, 2.65]}
      label="LI-20"
      labelPosition={0}/>
    
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={'#ff0000'} linewidth={1} linecap={'round'} linejoin={'round'} />
    </line>
    </>
  );
};
