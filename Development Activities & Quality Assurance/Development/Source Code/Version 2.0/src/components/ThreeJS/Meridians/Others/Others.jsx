import './Others.scss'
import { Point } from "src/components/ThreeJS/index";

export const Others = ({ showLine }) => {
  return (
    <>
      <Point
        positionArray={[-0.05, 12.5, 2.75]}
        label="M-HN-3"
        labelPosition={1} />
    </>
  );
};
