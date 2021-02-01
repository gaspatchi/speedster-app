import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { a, useSpring } from "@react-spring/three";
import { easePolyInOut, easeLinear } from "d3-ease";
import * as THREE from "three";

let mat = Math.PI;
let speed = Math.PI / 120;
let forwards = 1;

const twist = (geometry, amount) => {
	const quaternion = new THREE.Quaternion();
	for (let index = 0; index < geometry.vertices.length; index++) {
		quaternion.setFromAxisAngle(
			new THREE.Vector3(1, 0, 0),
			(Math.PI / 180) * (geometry.vertices[index].x / amount)
		);
		geometry.vertices[index].applyQuaternion(quaternion);
	}
	geometry.verticesNeedUpdate = true;
};

export default function Loader({ visible, onExit }) {
	const geometry = useRef(null);
	const [loaderVisible, setLoaderVisible] = useState(true);
	const [powerAnimation, setPowerAnimation, stopPowerAnimation] = useSpring(() => ({ power: 0 }));
	const directionalLightPower = powerAnimation.power.to([0, 1], [0, 0.3]);
	const [rotationAnimation, , stopRotationAnimation] = useSpring(() => ({
		from: { rotation: -95 * THREE.MathUtils.DEG2RAD },
		to: async (next) => {
			while (true) {
				await next({
					rotation: 95 * THREE.MathUtils.DEG2RAD,
				});
				await next({
					rotation: -95 * THREE.MathUtils.DEG2RAD,
				});
			}
		},
		config: {
			duration: 2500,
			easing: easePolyInOut,
		},
	}));

	useEffect(() => {
		setPowerAnimation({
			power: 1,
			config: {
				duration: 300,
				easing: easeLinear,
			},
			delay: 200,
		});
	}, []);

	useEffect(() => {
		if (!visible) {
			setTimeout(() => {
				setPowerAnimation({
					power: 0,
					config: {
						duration: 300,
						easing: easeLinear,
					},
					onRest: () => {
						stopRotationAnimation();
						stopPowerAnimation();
						setLoaderVisible(false);
						onExit();
					},
				});
			}, 1000);
		}
	}, [visible]);

	useFrame(() => {
		if (loaderVisible) {
			mat = mat - speed;
			if (mat <= 0) {
				mat = Math.PI;
				forwards = -1;
			}
			twist(geometry.current, (mat >= Math.PI / 2 ? -120 : 120) * forwards);
		}
	});

	return (
		<group visible={loaderVisible}>
			<a.directionalLight
				args={[0xffffff, 0.3]}
				position={[0, 200, 0]}
				castShadow={true}
				intensity={directionalLightPower}
			></a.directionalLight>
			<a.directionalLight
				args={[0xffffff, 0.4]}
				position={[0, 0, 300]}
				castShadow={true}
				intensity={directionalLightPower}
			></a.directionalLight>
			<a.mesh
				rotation-x={rotationAnimation.rotation}
				scale-x={powerAnimation.power}
				scale-z={powerAnimation.power}
				scale-y={powerAnimation.power}
				position={[0, 0, 0]}
				receiveShadow={true}
			>
				<torusGeometry ref={geometry} args={[70, 20, 20, 50]}></torusGeometry>
				<a.meshPhongMaterial
					color={0xffffff}
					shininess={20}
					opacity={powerAnimation.power}
					transparent={true}
				></a.meshPhongMaterial>
			</a.mesh>
		</group>
	);
}
