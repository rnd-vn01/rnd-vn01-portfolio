import './Scene.scss'
import React, { Suspense, useRef } from 'react';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import SCENE_BACKGROUND from 'src/assets/images/SCENE_BACKGROUND.hdr';
import { Body } from "../Body/Body";
import { Vector3 } from 'three';

export const Scene: React.FC = () => {
  const controls = useRef(null);
  const camera = useRef(null);

  return (
    <Suspense fallback={null}>
      <Environment
        files={SCENE_BACKGROUND}
        background={true}
      />

      <ambientLight intensity={-0.3} />

      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[-1.75, 10.85, 40]}
        zoom={1.5}
      >
      </PerspectiveCamera>

      <OrbitControls
        ref={controls}
        target={[1, 5, 0]}
        mouseButtons={{
          LEFT: 2,
          MIDDLE: 1,
          RIGHT: 0
        }}
        onChange={(e) => {
          var minPan = new Vector3(0.00, -30, 0);
          var maxPan = new Vector3(0.01, 15, 0);

          let _v = new Vector3();
          _v.copy(controls.current.target);
          controls.current.target.clamp(minPan, maxPan);
          _v.sub(controls.current.target)
          camera.current.position.sub(_v);
        }}
        minDistance={0}
        maxDistance={75}
      ></OrbitControls>
      <Body />
    </Suspense >
  );
};
