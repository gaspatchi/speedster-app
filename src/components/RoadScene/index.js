import React, { Suspense } from "react";
import { motion } from "framer-motion";
import ThreeCanvas from "./Canvas";
import Model from "./Model";
import Camera from "./Camera";
import Loader from "./Loader";
import Light from "./Light";
import Road from "./Road";
import Fallback from "./Fallback";

const variants = {
	hidden: {
		opacity: 0.2,
	},
	visible: {
		opacity: 1,
	},
};

export default function RoadScene({
	appTheme,
	accelerometerAngle,
	deviceGpuTier,
	tripStarted,
	modelLoaded,
	loaderHidden,
	onLoaderHidden,
	onAnimationComplete,
	onModelLoaded,
	onCanvasTapped,
}) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={variants}
			className="RoadScene"
			onAnimationComplete={onAnimationComplete}
			onPointerDown={onCanvasTapped}
		>
			<ThreeCanvas deviceGpuTier={deviceGpuTier}>
				<Camera
					accelerometerAngle={accelerometerAngle}
					modelLoaded={loaderHidden}
					tripStarted={tripStarted}
				></Camera>
				<Road
					appTheme={appTheme}
					accelerometerAngle={accelerometerAngle}
					deviceGpuTier={deviceGpuTier}
					modelLoaded={loaderHidden}
					tripStarted={tripStarted}
				></Road>
				<Light visible={loaderHidden}></Light>
				<Loader visible={!modelLoaded} onExit={onLoaderHidden}></Loader>
				<Suspense fallback={<Fallback unmounted={onModelLoaded}></Fallback>}>
					<Model
						accelerometerAngle={accelerometerAngle}
						tripStarted={tripStarted}
						deviceGpuTier={deviceGpuTier}
						visible={loaderHidden}
					></Model>
				</Suspense>
			</ThreeCanvas>
		</motion.div>
	);
}
