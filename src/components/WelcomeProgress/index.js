/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { motion } from "framer-motion";
import range from "lodash/range";

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	inactive(contrastTheme) {
		const themeStyles = contrastTheme
			? {
					backgroundColor: "#FFFFFF",
					opacity: 0.8,
			  }
			: {
					backgroundColor: "#DFDFDF",
			  };
		return { width: 6, ...themeStyles };
	},
	active(contrastTheme) {
		const themeStyles = contrastTheme
			? {
					backgroundColor: "#FFFFFF",
			  }
			: {
					backgroundColor: "#C4C4C4",
			  };
		return { width: 30, ...themeStyles };
	},
};

export default function WelcomeProgress({ steps, activeStep, contrast }) {
	return (
		<div className="WelcomeProgress">
			{range(1, steps + 1).map((step) => (
				<motion.div
					key={step}
					initial="hidden"
					custom={contrast}
					animate={step === activeStep ? ["active", "visible"] : ["inactive", "visible"]}
					variants={variants}
					className="WelcomeProgress__step"
				></motion.div>
			))}
		</div>
	);
}
