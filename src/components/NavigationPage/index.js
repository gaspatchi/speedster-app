import React from "react";
import { motion } from "framer-motion";

const variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			type: "tween",
			ease: "easeOut",
			duration: 0.5,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			type: "tween",
			ease: "linear",
			duration: 0.25,
		},
	},
};

export default function NavigationPage({ children, identity }) {
	return (
		<motion.div
			layout
			key={identity}
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			className="NavigationPage"
		>
			{children}
		</motion.div>
	);
}
