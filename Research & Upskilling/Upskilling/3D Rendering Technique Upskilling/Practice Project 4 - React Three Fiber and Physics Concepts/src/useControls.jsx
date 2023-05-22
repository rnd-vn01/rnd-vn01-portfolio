import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
    let [controls, setControls] = useState({});

    useEffect(() => {
        const keyDownPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: true
            }))
        }

        const keyUpPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: false
            }))
        }

        window.addEventListener("keydown", keyDownPressHandler);
        window.addEventListener("keyup", keyUpPressHandler);
        return () => {
            window.removeEventListener("keydown", keyDownPressHandler);
            window.removeEventListener("keyup", keyUpPressHandler);
        }
    }, [])

    useEffect(() => {
        if (controls.arrowup) {
            vehicleApi.applyEngineForce(100, 2);
            vehicleApi.applyEngineForce(100, 3);
        } else if (controls.arrowdown) {
            vehicleApi.applyEngineForce(-100, 2);
            vehicleApi.applyEngineForce(-100, 3);
        } else {
            vehicleApi.applyEngineForce(0, 2);
            vehicleApi.applyEngineForce(0, 3);
        }

        if (controls.arrowleft) {
            vehicleApi.setSteeringValue(0.35, 2);
            vehicleApi.setSteeringValue(0.35, 3);
            vehicleApi.setSteeringValue(-0.1, 0);
            vehicleApi.setSteeringValue(-0.1, 1);
        } else if (controls.arrowright) {
            vehicleApi.setSteeringValue(-0.35, 2);
            vehicleApi.setSteeringValue(-0.35, 3);
            vehicleApi.setSteeringValue(0.1, 0);
            vehicleApi.setSteeringValue(0.1, 1);
        } else {
            for (let i = 0; i < 4; i++) {
                vehicleApi.setSteeringValue(0, i);
            }
        }

        if (controls.s) {
            chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
        }
        if (controls.w) {
            chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
        }
        if (controls.a) {
            chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
        }
        if (controls.r) {
            chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);
        }
    }, [controls, vehicleApi, chassisApi])

    return controls
}
