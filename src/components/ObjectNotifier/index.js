import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Sensitivity from "./Sensitivity";

const variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.8 },
};

export default function ObjectNotifier({ target }) {
	const notifierType = useMemo(() => {
		const processedDistance = target.distance * 1000;
		return processedDistance <= 50 ? "high" : processedDistance <= 100 ? "medium" : "low";
	}, [target]);

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
			className={`ObjectNotifier ObjectNotifier_${notifierType}`}
		>
			<div className="ObjectNotifier__outline">
				<div className="ObjectNotifier__circle">
					<Sensitivity level={notifierType}></Sensitivity>
				</div>
			</div>
		</motion.div>
	);
}
