import React, { useMemo } from "react";
import { Canvas } from "react-three-fiber";

export default function ThreeCanvas({ deviceGpuTier, children }) {
	const pixelRatio = useMemo(
		() =>
			deviceGpuTier <= 2
				? window.devicePixelRatio
				: window.devicePixelRatio % 1 !== 0
				? window.devicePixelRatio
				: window.devicePixelRatio * 2,
		[deviceGpuTier]
	);

	return (
		<Canvas pixelRatio={pixelRatio} gl={{ antialias: false }} shadowMap={true}>
			{children}
		</Canvas>
	);
}
