import React, { useEffect, useRef, useMemo } from "react";
import { useThree, useFrame } from "react-three-fiber";
import { a, useSpring } from "@react-spring/three";
import { easeLinear } from "d3-ease";
import { clamp } from "lodash";
import { CAMERA_ROTATION_ANGLE_LIMIT, CAMERA_POSITION_LIMIT } from "config";
import * as THREE from "three";

export default function Camera({ accelerometerAngle, tripStarted, modelLoaded }) {
	const ref = useRef();
	const { setDefaultCamera } = useThree();
	const processedAccelerometerAngle = useMemo(
		() =>
			clamp(
				(accelerometerAngle / 5) * THREE.MathUtils.DEG2RAD,
				-CAMERA_ROTATION_ANGLE_LIMIT * THREE.MathUtils.DEG2RAD,
				CAMERA_ROTATION_ANGLE_LIMIT * THREE.MathUtils.DEG2RAD
			),
		[accelerometerAngle]
	);
	const processedCameraAngle = useMemo(
		() => clamp((accelerometerAngle / 3) * 0.15, -CAMERA_POSITION_LIMIT, CAMERA_POSITION_LIMIT),
		[accelerometerAngle]
	);

	const cameraRotations = useSpring({
		spring: tripStarted ? processedAccelerometerAngle : 0,
		config: {
			mass: 5,
			duration: 300,
			easing: easeLinear,
		},
	});

	const cameraOffset = useSpring({
		spring: tripStarted ? processedCameraAngle : 0,
		config: {
			mass: 5,
			duration: 300,
			easing: easeLinear,
		},
	});

	const [cameraPosition, setCameraPosition, stopCameraPosition] = useSpring(() => ({
		y: 1500,
		z: -100.25,
	}));

	const [cameraRotation, setCameraRotation, stopCameraRotation] = useSpring(() => ({
		x: -90 * THREE.MathUtils.DEG2RAD,
	}));

	useEffect(() => {
		if (modelLoaded) {
			setCameraPosition({
				y: 12,
				z: 0.25,
				config: {
					duration: 0,
					easing: easeLinear,
				},
			});
		}
	}, [modelLoaded]);

	useEffect(() => {
		if (tripStarted) {
			setCameraRotation({
				x: -40 * THREE.MathUtils.DEG2RAD,
				config: {
					duration: 1000,
					// easing: easeLinear,
				},
			});
			setCameraPosition({
				y: 10,
				z: 10.8,
				config: {
					duration: 1000,
					// easing: easeLinear,
				},
			});
		} else if (!tripStarted && modelLoaded) {
			setCameraRotation({
				x: -90 * THREE.MathUtils.DEG2RAD,
				config: {
					duration: 1000,
					// easing: easeLinear,
				},
			});
			setCameraPosition({
				y: 14,
				z: 0.25,
				config: {
					duration: 1000,
					// easing: easeLinear,
				},
			});
		}
	}, [tripStarted]);

	useEffect(() => setDefaultCamera(ref.current), []);
	useFrame(() => ref.current.updateMatrixWorld());

	return (
		<a.perspectiveCamera
			ref={ref}
			rotation-x={cameraRotation.x}
			rotation-y={cameraRotations.spring}
			rotation-z={cameraRotations.spring}
			position-x={cameraOffset.spring}
			position-y={cameraPosition.y}
			position-z={cameraPosition.z}
		></a.perspectiveCamera>
	);
}
