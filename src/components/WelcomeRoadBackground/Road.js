import React from "react";
import { motion } from "framer-motion";

const variants = {
	hidden: { opacity: 0, scale: 0.95, originX: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		originX: 0,
		transition: {
			type: "tween",
			delay: 0.15,
			duration: 0.2,
		},
	},
	exit: {
		opacity: 0,
		scale: 0,
		originX: 0,
		originY: 1,
		transition: {
			type: "tween",
			delay: 0.15,
			duration: 0.8,
			originY: {
				duration: 0,
			},
		},
	},
};

export default function Road() {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			className="WelcomeRoadBackground__road"
		></motion.div>
	);
}
