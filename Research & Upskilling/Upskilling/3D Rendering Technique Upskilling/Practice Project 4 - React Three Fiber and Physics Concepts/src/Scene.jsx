import {
    Environment,
    OrbitControls,
    PerspectiveCamera
} from "@react-three/drei";
import { Suspense } from "react";
import { Ground } from './Ground';
import { Track } from './Track';
import { Car } from './Car';
import { useState, useEffect } from "react";

export const Scene = () => {
    const [thirdPerson, setThirdPerson] = useState(false);
    const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

    useEffect(() => {
        const keyDownHandler = (e) => {
            if (e.key == "k") {
                if (thirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
                setThirdPerson(!thirdPerson);
            }
        }

        window.addEventListener("keydown", keyDownHandler);
        return () => window.removeEventListener("keydown", keyDownHandler);
    }, [thirdPerson])

    return (
        <Suspense fallback={null}>
            <Environment
                files={process.env.PUBLIC_URL + "assets/textures/envmap.hdr"}
                background={"both"}
            />

            <PerspectiveCamera
                makeDefault
                position={cameraPosition}
                fov={40}>
                {!thirdPerson && (
                    <OrbitControls target={[-2.64, -0.71, 0.03]}/>
                )}
            </PerspectiveCamera>

            <OrbitControls target={[-2.64, -0.71, 0.03]}/>

            <Track/>
            <Ground/>
            <Car thirdPerson={thirdPerson}/>
        </Suspense>
    )    
}
