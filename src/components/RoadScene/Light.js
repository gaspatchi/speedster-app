import React, { useEffect } from "react";
import { a, useSpring } from "@react-spring/three";
import { easeLinear } from "d3-ease";

export default function Light({ visible }) {
	const [powerAnimation, setPowerAnimation, stopPowerAnimation] = useSpring(() => ({ power: 0 }));

	useEffect(() => {
		if (visible) {
			setPowerAnimation({
				power: 1,
				config: {
					duration: 300,
					easing: easeLinear,
				},
			});
		}
	}, [visible]);

	return (
		<>
			<a.pointLight position={[10, 20, 10]} intensity={powerAnimation.power}></a.pointLight>
			<a.ambientLight intensity={0.7}></a.ambientLight>
		</>
	);
}
