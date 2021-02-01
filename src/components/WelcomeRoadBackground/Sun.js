import React from "react";
import { motion } from "framer-motion";

const sunVariants = {
	hidden: {
		opacity: 0,
		scale: 0.1,
		x: "-10%",
		y: "-15%",
		originX: "50%",
		originY: "50%",
	},
	visible: {
		opacity: 1,
		scale: 1,
		x: "30%",
		y: "0%",
		originX: "50%",
		originY: "50%",
		transition: {
			type: "spring",
			delay: 0.2,
			duration: 1,
			bounce: 0.55,
			when: "beforeChildren",
			staggerChildren: 1,
			x: {
				bounce: 0.2,
			},
			y: {
				bounce: 0.2,
			},
		},
	},
	exit: {
		opacity: 0,
		scale: 0,
		originX: "50%",
		originY: "50%",
		transition: {
			type: "spring",
			duration: 0.3,
		},
	},
};

const raysVariants = {
	hidden: { opacity: 0, scale: 0.7, originX: "50%", originY: "50%" },
	visible: {
		opacity: 1,
		scale: [1, 1.05, 0.97],
		originX: "50%",
		originY: "50%",
		rotate: 360,
		transition: {
			rotate: {
				type: "tween",
				ease: "linear",
				duration: 7,
				repeat: Infinity,
			},
			scale: {
				type: "tween",
				repeatType: "reverse",
				ease: "easeInOut",
				duration: 2,
				repeat: Infinity,
			},
		},
	},
};

export default function Sun() {
	return (
		<motion.svg
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={sunVariants}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 512 512"
			className="WelcomeRoadBackground__sun"
		>
			<motion.g
				initial="hidden"
				animate="visible"
				variants={raysVariants}
				transition={{ type: "tween", duration: 1 }}
			>
				<linearGradient
					id="a"
					gradientUnits="userSpaceOnUse"
					x1="256"
					y1="58"
					x2="256"
					y2="458"
					gradientTransform="matrix(1 0 0 -1 0 514)"
				>
					<stop offset="0" stopColor="#ffd927" />
					<stop offset="1" stopColor="#ffd127" />
				</linearGradient>
				<path
					d="M103.7 256c0-6.5-5.2-11.7-11.7-11.7H67.7c-6.5 0-11.7 5.2-11.7 11.7 0 6.5 5.2 11.7 11.7 11.7h24.2c6.5 0 11.8-5.2 11.8-11.7zm340.6-11.7h-24.2c-6.5 0-11.7 5.2-11.7 11.7 0 6.5 5.2 11.7 11.7 11.7h24.2c6.5 0 11.7-5.2 11.7-11.7 0-6.5-5.2-11.7-11.7-11.7zM256 56c-6.5 0-11.7 5.2-11.7 11.7v24.2c0 6.5 5.2 11.7 11.7 11.7 6.5 0 11.7-5.2 11.7-11.7V67.7c0-6.5-5.2-11.7-11.7-11.7zm0 352.3c-6.5 0-11.7 5.2-11.7 11.7v24.2c0 6.5 5.2 11.7 11.7 11.7 6.5 0 11.7-5.2 11.7-11.7V420c0-6.4-5.2-11.7-11.7-11.7zm-124.3-44.6l-16.6 16.6c-4.6 4.6-4.6 12 0 16.6 4.6 4.6 12 4.6 16.6 0l16.6-16.6c4.6-4.6 4.6-12 0-16.6-4.6-4.6-12-4.6-16.6 0zm248.6-215.4l16.6-16.6c4.6-4.6 4.6-12 0-16.6-4.6-4.6-12-4.6-16.6 0l-16.6 16.6c-4.6 4.6-4.6 12 0 16.6 4.6 4.6 12 4.6 16.6 0zm-248.6-33.2c-4.6-4.6-12-4.6-16.6 0-4.6 4.6-4.6 12 0 16.6l16.6 16.6c4.6 4.6 12 4.6 16.6 0 4.6-4.6 4.6-12 0-16.6l-16.6-16.6zm248.6 248.6c-4.6-4.6-12-4.6-16.6 0s-4.6 12 0 16.6l16.6 16.6c4.6 4.6 12 4.6 16.6 0 4.6-4.6 4.6-12 0-16.6l-16.6-16.6zm-182.6 33c-6-2.5-12.8.4-15.3 6.3l-9 21.7c-2.5 6 .4 12.8 6.3 15.3 6 2.5 12.8-.4 15.3-6.3l9-21.7c2.5-5.9-.3-12.8-6.3-15.3zM332.2 71.9c-6-2.5-12.8.4-15.3 6.3l-9 21.7c-2.5 6 .4 12.8 6.3 15.3 6 2.5 12.8-.4 15.3-6.3l9-21.7c2.6-5.9-.3-12.8-6.3-15.3zM78.3 195.1l21.7 9c1.5.6 3 .9 4.5.9 4.6 0 9-2.7 10.8-7.2 2.5-6-.4-12.8-6.3-15.3l-21.7-9c-6-2.5-12.8.4-15.3 6.3-2.5 5.9.3 12.8 6.3 15.3zm355.4 121.8l-21.7-9c-6-2.5-12.8.4-15.3 6.3-2.5 6 .4 12.8 6.3 15.3l21.7 9c6 2.5 12.8-.4 15.3-6.3 2.5-5.9-.3-12.8-6.3-15.3zm-104.1 86.2c-2.5-6-9.3-8.8-15.3-6.3-6 2.5-8.8 9.3-6.3 15.3l9 21.7c2.5 6 9.3 8.8 15.3 6.3 6-2.5 8.8-9.3 6.3-15.3l-9-21.7zM195.1 78.3c-2.5-6-9.3-8.8-15.3-6.3-6 2.5-8.8 9.3-6.3 15.3l9 21.7c2.5 6 9.3 8.8 15.3 6.3 6-2.5 8.8-9.3 6.3-15.3l-9-21.7zm201.6 119.4c2.5 6 9.3 8.8 15.3 6.3l21.7-9c6-2.5 8.8-9.3 6.3-15.3-2.5-6-9.3-8.8-15.3-6.3l-21.7 9c-5.9 2.5-8.7 9.3-6.3 15.3zM115.3 314.3c-2.5-6-9.3-8.8-15.3-6.3l-21.7 9c-6 2.5-8.8 9.3-6.3 15.3 2.5 6 9.3 8.8 15.3 6.3l21.7-9c5.9-2.5 8.7-9.3 6.3-15.3z"
					opacity=".85"
					fill="url(#a)"
				/>
			</motion.g>
			<linearGradient
				id="b"
				gradientUnits="userSpaceOnUse"
				x1="108.0787"
				y1="46.9808"
				x2="323.7037"
				y2="351.6683"
			>
				<stop offset="0" stopColor="#ffde15" />
				<stop offset="1" stopColor="#ffc127" />
			</linearGradient>
			<circle cx="256" cy="256" r="128.9" fill="url(#b)" />
		</motion.svg>
	);
}
