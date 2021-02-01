import React, { useMemo, useRef, useEffect } from "react";
import { useUpdate } from "react-use";
import { a, useSpring } from "@react-spring/three";
import { clamp } from "lodash";
import { easeLinear, easeQuadOut } from "d3-ease";
import { useFrame } from "react-three-fiber";
import { CAMERA_ROTATION_ANGLE_LIMIT } from "config";
import * as THREE from "three";

let leftPath = new THREE.CatmullRomCurve3([
	new THREE.Vector3(-1.2, 0, -30),
	new THREE.Vector3(-1.4, 0, -5),
	new THREE.Vector3(-1.65, 0, 15),
]);

let rightPath = new THREE.CatmullRomCurve3([
	new THREE.Vector3(1.2, 0, -30),
	new THREE.Vector3(1.4, 0, -5),
	new THREE.Vector3(1.65, 0, 15),
]);

export default function Road({
	appTheme,
	accelerometerAngle,
	deviceGpuTier,
	modelLoaded,
	tripStarted,
}) {
	const update = useUpdate();
	const prevAngle = useRef(0);

	const roadSegments = useMemo(
		() => (deviceGpuTier === 0 ? 20 : deviceGpuTier === 1 ? 50 : 100),
		[deviceGpuTier]
	);

	const roadRadialSegments = useMemo(() => (deviceGpuTier <= 1 ? 10 : 20), [deviceGpuTier]);

	const processedAccelerometerAngle = useMemo(
		() =>
			clamp(
				accelerometerAngle / 5,
				-CAMERA_ROTATION_ANGLE_LIMIT,
				CAMERA_ROTATION_ANGLE_LIMIT
			),
		[accelerometerAngle]
	);

	const [powerAnimation, setPowerAnimation] = useSpring(() => ({
		power: 0,
	}));

	const [colorAnimation, setColorAnimation] = useSpring(() => ({
		color: 0x000000,
	}));

	const roadAngle = useSpring({
		spring: tripStarted ? processedAccelerometerAngle : 0,
	});

	const leftLaneAngle = roadAngle.spring.to([-5, 0, 5], [-3, -1.2, 0.6]);
	const rightLaneAngle = roadAngle.spring.to([-5, 0, 5], [-0.6, 1.2, 3]);

	useEffect(() => {
		if (appTheme === "dark") {
			setColorAnimation({
				color: 0xffffff,
				config: {
					duration: 200,
					easing: easeQuadOut,
				},
			});
			if (tripStarted) {
				setPowerAnimation({
					power: 0.3,
					delay: 1300,
					config: {
						duration: 300,
						easing: easeLinear,
					},
				});
			} else if (!tripStarted && modelLoaded) {
				setPowerAnimation({
					power: 0,
					delay: 300,
					config: {
						duration: 300,
						easing: easeLinear,
					},
				});
			}
		} else {
			setColorAnimation({
				color: 0x000000,
				config: {
					duration: 200,
					easing: easeQuadOut,
				},
			});
			if (tripStarted) {
				setPowerAnimation({
					power: 0.1,
					delay: 1300,
					config: {
						duration: 300,
						easing: easeLinear,
					},
				});
			} else if (!tripStarted && modelLoaded) {
				setPowerAnimation({
					power: 0,
					delay: 300,
					config: {
						duration: 300,
						easing: easeLinear,
					},
				});
			}
		}
	}, [tripStarted, appTheme]);

	useFrame(() => {
		const currentAngle = roadAngle.spring.get();
		if (currentAngle !== prevAngle.current) {
			leftPath = new THREE.CatmullRomCurve3([
				new THREE.Vector3(leftLaneAngle.get(), 0, -30),
				new THREE.Vector3(-1.4, 0, -5),
				new THREE.Vector3(-1.65, 0, 15),
			]);

			rightPath = new THREE.CatmullRomCurve3([
				new THREE.Vector3(rightLaneAngle.get(), 0, -30),
				new THREE.Vector3(1.4, 0, -5),
				new THREE.Vector3(1.65, 0, 15),
			]);
			prevAngle.current = currentAngle;
			update();
		}
	});

	return (
		<>
			<mesh>
				<tubeBufferGeometry
					attach="geometry"
					args={[leftPath, roadSegments, 0.08, roadRadialSegments]}
				/>
				<a.meshPhysicalMaterial
					attach="material"
					color={colorAnimation.color}
					metalness={0.8}
					transparent={true}
					opacity={powerAnimation.power}
					roughness={0.5}
				></a.meshPhysicalMaterial>
			</mesh>

			<mesh>
				<tubeBufferGeometry
					attach="geometry"
					args={[rightPath, roadSegments, 0.08, roadRadialSegments]}
				/>
				<a.meshPhysicalMaterial
					attach="material"
					color={colorAnimation.color}
					metalness={0.8}
					transparent={true}
					opacity={powerAnimation.power}
					roughness={0.5}
				></a.meshPhysicalMaterial>
			</mesh>
		</>
	);
}
