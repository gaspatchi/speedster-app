import React from "react";
import { motion } from "framer-motion";

export default function RadarGroup({ children, duration, angle }) {
	return (
		<motion.g
			animate={{ rotate: [0, angle, 0] }}
			transition={{ type: "spring", duration, repeat: Infinity }}
			style={{ transformOrigin: "50% 50%" }}
		>
			{children}
		</motion.g>
	);
}
