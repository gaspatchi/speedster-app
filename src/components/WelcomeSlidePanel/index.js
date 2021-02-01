import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
	visible: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: 200,
		transition: { type: "tween", duration: 0.3 },
	},
};

const contentVariants = {
	welcome: { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
	permissions: {
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
		transition: { duration: 0.8, delay: 0.1 },
	},
};

export default function WelcomeSlidePanel({
	permissionsActive,
	layoutAnimated,
	topContent,
	children,
}) {
	return (
		<motion.div
			layout
			animate="visible"
			exit="exit"
			variants={containerVariants}
			onLayoutAnimationComplete={layoutAnimated}
			className="WelcomeSlidePanel"
		>
			<motion.div
				layout
				transition={{ type: "tween", duration: 0.4 }}
				className="WelcomeSlidePanel__top-content"
			>
				{topContent}
			</motion.div>
			<motion.div
				layout
				initial="welcome"
				variants={contentVariants}
				animate={permissionsActive ? "permissions" : false}
				className="WelcomeSlidePanel__content"
			>
				{children}
			</motion.div>
		</motion.div>
	);
}
