import './DemoPage.scss'
import React from 'react';
import { Canvas } from '@react-three/fiber'
import { Scene } from 'src/components/index';

export const DemoPage: React.FC = () => {
  return (
    <div
      role="div"
      aria-label="demo-page"
      className="demo-page">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div >
  );
};
