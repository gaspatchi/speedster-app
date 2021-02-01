import React from "react";
import { motion } from "framer-motion";

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export default function Sensitivity({ level }) {
	return (
		<svg
			className="ObjectNotifier__sensitivity"
			version="1.1"
			id="Слой_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 178.4 178.4"
			xmlSpace="preserve"
		>
			<style>{".st1,.st2{fill:#fff;fill-opacity:.8}.st2{fill-opacity:.9}"}</style>
			<circle cx="90.6" cy="87.9" r="22.6" fill="#fff" />
			<motion.g
				initial="hidden"
				animate={level === "low" || level === "high" ? "visible" : "hidden"}
				variants={variants}
				transition={{ delay: 0.4, duration: 0.5 }}
			>
				<path
					className="st1"
					d="M136.1 30.2c-1.9-1.5-4.7-1.2-6.2.7s-1.2 4.7.7 6.2c16 12.7 25.1 31.7 25.1 52.1s-9.2 39.4-25.1 52.1c-1.9 1.5-2.2 4.3-.7 6.2 1.5 1.9 4.3 2.2 6.2.7 18.1-14.4 28.5-35.9 28.5-59s-10.4-44.6-28.5-59zM47.8 141.3c-16-12.7-25.1-31.7-25.1-52.1 0-20.4 9.2-39.4 25.1-52.1 1.9-1.5 2.2-4.3.7-6.2-1.5-1.9-4.3-2.2-6.2-.7-18.1 14.4-28.5 35.9-28.5 59s10.4 44.6 28.5 59c1.9 1.5 4.7 1.2 6.2-.7s1.2-4.6-.7-6.2z"
				/>
			</motion.g>
			<motion.g
				initial="hidden"
				animate="visible"
				variants={variants}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<path
					className="st2"
					d="M121.4 48.6c-1.9-1.5-4.7-1.2-6.2.7s-1.2 4.7.7 6.2c10.4 8.2 16.3 20.5 16.3 33.7s-5.9 25.5-16.3 33.7c-1.9 1.5-2.2 4.3-.7 6.2 1.5 1.9 4.3 2.2 6.2.7 12.5-9.9 19.6-24.7 19.6-40.6 0-15.9-7.1-30.7-19.6-40.6zM62.5 122.9c-10.4-8.2-16.3-20.5-16.3-33.7s5.9-25.5 16.3-33.7c1.9-1.5 2.2-4.3.7-6.2-1.5-1.9-4.3-2.2-6.2-.7-12.5 9.9-19.6 24.7-19.6 40.6 0 15.9 7.2 30.7 19.6 40.6 1.9 1.5 4.7 1.2 6.2-.7 1.6-1.9 1.2-4.7-.7-6.2z"
				/>
			</motion.g>
		</svg>
	);
}
