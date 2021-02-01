import React from "react";
import { motion } from "framer-motion";
import Sun from "./Sun";
import Sign from "./Sign";
import Road from "./Road";

const variants = {
	hiddenLight: {
		opacity: 0,
		background:
			"linear-gradient(150deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)",
	},
	visibleLight: {
		opacity: 1,
		background: "linear-gradient(150deg, rgba(86, 154, 232, 1) 0%, rgba(40, 136, 245, 1) 100%)",
	},
	exitLight: {
		opacity: 0.2,
		background: "linear-gradient(150deg, rgba(86, 154, 232, 1) 0%, rgba(40, 136, 245, 1) 100%)",
	},
	hiddenDark: {
		opacity: 0,
		background: "linear-gradient(150deg, rgba(31, 31, 31, 1) 0%, rgba(31, 31, 31, 1) 100%)",
	},
	visibleDark: {
		opacity: 1,
		background: "linear-gradient(150deg, rgba(35, 35, 35, 1) 0%, rgba(0, 0, 0, 1) 100%)",
	},
	exitDark: {
		opacity: 0.2,
		background:
			"linear-gradient(180deg, rgba(240, 237, 241, 1) 0%, rgba(240, 240, 240, 1) 100%)",
	},
};

export default function WelcomeRoadBackground({ appTheme }) {
	return (
		<motion.div
			key="road"
			initial={appTheme === "dark" ? "hiddenDark" : "hiddenLight"}
			animate={appTheme === "dark" ? "visibleDark" : "visibleLight"}
			exit={appTheme === "dark" ? "exitDark" : "exitLight"}
			variants={variants}
			transition={{ type: "tween", duration: 0.2 }}
			className="WelcomeRoadBackground"
		>
			<Road></Road>
			<Sun></Sun>
			<Sign></Sign>
		</motion.div>
	);
}
