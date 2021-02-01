import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";
import { isEmpty } from "lodash";
import { a, useSpring } from "@react-spring/three";
import { Shadow } from "@react-three/drei";
import { easeLinear } from "d3-ease";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { clamp } from "lodash";
import { CAMERA_ROTATION_ANGLE_LIMIT } from "config";

const bodyMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xff0000,
	metalness: 0.6,
	roughness: 0.4,
	clearcoat: 0.05,
	clearcoatRoughness: 0.05,
});

const detailsMaterial = new THREE.MeshStandardMaterial({
	color: 0xffffff,
	metalness: 1.0,
	roughness: 0.5,
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xffffff,
	metalness: 0,
	roughness: 0.1,
	transmission: 0.9,
	transparent: true,
});

export default function Model({ accelerometerAngle, tripStarted, deviceGpuTier, visible }) {
	const shadow = useRef();
	const group = useRef();
	const { nodes, materials } = useGLTF("assets/ferrari.glb");

	const [powerAnimation, setPowerAnimation, stopPowerAnimation] = useSpring(() => ({ power: 0 }));
	const shadowAnimation = powerAnimation.power.to([0, 1], [0, 0.3]);

	const processedShadowAnimation = useSpring({
		spring: shadowAnimation,
		delay: 300,
		duration: {
			duration: 300,
			easing: easeLinear,
		},
	});

	const processedAccelerometerAngle = useMemo(
		() =>
			clamp(
				accelerometerAngle / 5,
				-CAMERA_ROTATION_ANGLE_LIMIT,
				CAMERA_ROTATION_ANGLE_LIMIT
			),
		[accelerometerAngle]
	);

	const wheelAngle = useSpring({
		spring: tripStarted ? processedAccelerometerAngle : 0,
	});

	const processedWheelAngle = wheelAngle.spring.to([-5, 5], [0.5, -0.5]);

	useEffect(() => {
		if (visible) {
			setPowerAnimation({
				power: 1,
				config: {
					duration: 500,
					easing: easeLinear,
				},
			});
		}
	}, [visible]);

	useFrame(() => {
		if (deviceGpuTier <= 1 && shadow.current) {
			const animationOpacity = processedShadowAnimation.spring.get();
			if (shadow.current.material.opacity !== animationOpacity) {
				shadow.current.material.transparent = true;
				shadow.current.material.opacity = animationOpacity;
				shadow.current.material.needsUpdate = true;
			}
		}
	});

	return (
		<>
			{deviceGpuTier <= 1 && (
				<Shadow
					ref={shadow}
					color="black"
					scale={[3, 5, 1]}
					position={[0, 0.1, 0.25]}
					rotation={[-90 * THREE.MathUtils.DEG2RAD, 0, 0]}
				/>
			)}
			{!isEmpty(nodes) && (
				<a.group
					ref={group}
					scale-x={powerAnimation.power}
					scale-z={powerAnimation.power}
					scale-y={powerAnimation.power}
				>
					<group position={[0, 0.68, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
						<mesh
							material={materials.Leather_red}
							geometry={nodes.trim.geometry}
							position={[-0.38, 0, -0.02]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Taillight_Glass}
							geometry={nodes.lights_red.geometry}
							position={[0.91, 0, -0.01]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.plastic_gray}
							geometry={nodes.plastic_gray.geometry}
							position={[0.11, 0, -0.03]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.metal.geometry}
							position={[0.22, 0, 0]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Projector_Glass}
							geometry={nodes.lights.geometry}
							position={[-1.85, 0, -0.07]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Turn_Signal_LED}
							geometry={nodes.leds.geometry}
							position={[-1.27, 0, 0.02]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Leather}
							geometry={nodes.leather.geometry}
							position={[-0.35, 0, -0.03]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Interior_dark}
							geometry={nodes.interior_light.geometry}
							position={[0, 0, 0]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Tires}
							geometry={nodes.grills.geometry}
							position={[0.05, -0.01, -0.03]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={glassMaterial}
							geometry={nodes.glass.geometry}
							position={[0, 0, 0.19]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.metal_chrome}
							geometry={nodes.chrome.geometry}
							position={[0.03, 0, 0.01]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Carpet}
							geometry={nodes.carpet.geometry}
							position={[-0.28, 0, -0.23]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Carbon_Fiber}
							geometry={nodes.carbon_fibre_trim.geometry}
							position={[-0.18, 0, -0.04]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Carbon_Fiber}
							geometry={nodes.carbon_fibre.geometry}
							position={[-0.44, -0.35, 0.12]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Taillight_Glass}
							geometry={nodes.brakes.geometry}
							position={[1.99, 0, 0.2]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={bodyMaterial}
							geometry={nodes.interior_dark.geometry}
							position={[0, 0, 0.01]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={bodyMaterial}
							geometry={nodes.body.geometry}
							position={[-0.01, 0, 0.02]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials._0098_DodgerBlue}
							geometry={nodes.blue.geometry}
							position={[-0.35, -0.44, 0.07]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Tires}
							geometry={nodes.wipers.geometry}
							position={[-1.09, 0.01, 0.11]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Ferrari_Yellow}
							geometry={nodes.yellow_trim.geometry}
							position={[-1.4, 0, 0.05]}
							rotation={[0, 0, 0]}
						/>
					</group>
					<group position={[0.82, 0.36, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.wheel.geometry}
							position={[0, 0, 0]}
						/>
						<mesh
							material={materials.Tires}
							geometry={nodes.tire.geometry}
							position={[-0.01, 0, 0]}
						/>
						<mesh
							material={detailsMaterial}
							geometry={nodes.rim_rr.geometry}
							position={[0.13, 0, 0]}
						/>
						<mesh
							material={materials.Ferrari_Yellow}
							geometry={nodes.centre.geometry}
							position={[0.11, 0, 0]}
						/>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.brake.geometry}
							position={[0.01, 0, 0]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Interior_dark}
							geometry={nodes.nuts.geometry}
							position={[0.1, 0, 0.01]}
						/>
					</group>
					<group position={[-0.82, 0.36, 1.49]} rotation={[-Math.PI / 2, 0, 0]}>
						<mesh
							material={materials.Tires}
							geometry={nodes.tire_1.geometry}
							position={[0.01, 0, 0]}
						/>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.brake_1.geometry}
							position={[-0.02, 0, 0]}
						/>
						<mesh
							material={materials.Ferrari_Yellow}
							geometry={nodes.centre_1.geometry}
							position={[-0.11, 0, 0]}
						/>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.wheel_1.geometry}
							position={[0, 0, 0]}
						/>
						<mesh
							material={detailsMaterial}
							geometry={nodes.rim_rl.geometry}
							position={[-0.13, 0, 0]}
						/>
						<mesh
							material={materials.Interior_dark}
							geometry={nodes.nuts_1.geometry}
							position={[-0.1, 0, 0.01]}
						/>
					</group>
					<a.group
						position={[-0.84, 0.36, -1.16]}
						rotation-z={processedWheelAngle}
						rotation-x={-Math.PI / 2}
					>
						<mesh
							material={detailsMaterial}
							geometry={nodes.rim_fl.geometry}
							position={[-0.11, 0, 0]}
						/>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.brake_2.geometry}
							position={[0, 0, 0]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Ferrari_Yellow}
							geometry={nodes.centre_2.geometry}
							position={[-0.1, 0, 0]}
						/>
						<mesh
							material={materials.Interior_dark}
							geometry={nodes.nuts_2.geometry}
							position={[-0.09, 0, 0.01]}
						/>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.wheel_2.geometry}
							position={[0, 0, 0]}
						/>
						<mesh
							material={materials.Tires}
							geometry={nodes.tire_2.geometry}
							position={[0.01, 0, 0]}
						/>
					</a.group>
					<a.group
						position={[0.83, 0.36, -1.15]}
						rotation-z={processedWheelAngle}
						rotation-x={-Math.PI / 2}
					>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.brake_3.geometry}
							position={[0, 0, 0]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Ferrari_Yellow}
							geometry={nodes.centre_3.geometry}
							position={[0.1, 0, 0]}
						/>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.wheel_3.geometry}
							position={[0, 0, 0]}
						/>
						<mesh
							material={detailsMaterial}
							geometry={nodes.rim_fr.geometry}
							position={[0.11, 0, 0]}
						/>
						<mesh
							material={materials.Tires}
							geometry={nodes.tire_3.geometry}
							position={[-0.01, 0, 0]}
						/>
						<mesh
							material={materials.Interior_dark}
							geometry={nodes.nuts_3.geometry}
							position={[0.09, 0, 0.01]}
						/>
					</a.group>
					<group position={[-0.35, 0.8, -0.35]} rotation={[-1.92, 0, 0]}>
						<mesh
							material={materials.Carbon_Fiber}
							geometry={nodes.steering_carbon.geometry}
							position={[0, 0.02, 0.01]}
							rotation={[Math.PI / 9, 0, 0]}
						/>
						<mesh
							material={materials.Ferrari_Yellow}
							geometry={nodes.steering_centre.geometry}
							position={[0, 0, 0]}
							rotation={[0, 0, 0]}
						/>
						<mesh
							material={materials.Interior_dark}
							geometry={nodes.steering_column.geometry}
							position={[0, 0.07, -0.01]}
							rotation={[Math.PI / 9, 0, 0]}
						/>
						<mesh
							material={materials.Leather}
							geometry={nodes.steering_leather.geometry}
							position={[0, 0.02, 0.01]}
							rotation={[Math.PI / 9, 0, 0]}
						/>
						<mesh
							material={materials.metal_gray}
							geometry={nodes.steering_metal.geometry}
							position={[0.09, 0.02, -0.07]}
							rotation={[Math.PI / 9, 0, 0]}
						/>
						<mesh
							material={materials.Taillight_Glass}
							geometry={nodes.steering_red_lights.geometry}
							position={[0.01, 0.02, -0.07]}
							rotation={[Math.PI / 9, 0, 0]}
						/>
						<mesh
							material={materials.Leather_red}
							geometry={nodes.steering_trim.geometry}
							position={[0, 0.02, -0.08]}
							rotation={[Math.PI / 9, 0, 0]}
						/>
					</group>
				</a.group>
			)}
		</>
	);
}