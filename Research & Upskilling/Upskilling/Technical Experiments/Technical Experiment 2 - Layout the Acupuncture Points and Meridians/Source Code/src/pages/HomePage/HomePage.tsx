import './HomePage.scss'
import React from 'react';
import { Canvas } from '@react-three/fiber'
import { Scene } from 'src/components/index';

export const HomePage: React.FC = () => {
  return (
    <div
      role="div"
      aria-label="homepage"
      className="homepage">
      <Canvas>
        <Scene />
      </Canvas>
    </div >
  );
};
