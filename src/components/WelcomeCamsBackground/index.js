import React, { useMemo } from "react";
import RadarGroup from "./RadarGroup";
import { motion } from "framer-motion";

const variants = {
	hidden: { opacity: 0, scale: 0.97 },
	visible: { opacity: 1, scale: 1 },
};

export default function WelcomeCamsBackground({ appTheme }) {
	const isDarkTheme = useMemo(() => (appTheme === "dark" ? true : false), [appTheme]);
	return (
		<motion.div
			key="cams"
			className="WelcomeCamsBackground"
			variants={variants}
			initial="hidden"
			animate="visible"
			exit="hidden"
			transition={{ type: "tween", duration: 0.3 }}
		>
			<svg
				viewBox="0 0 414 632"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				fillRule="evenodd"
				clipRule="evenodd"
				strokeMiterlimit="4.0002"
			>
				<g>
					<path
						d="M90.3 444.9l88.4-142.3 13 14.7-26.1 38.2 2.3 1.5 25.7-37.6 13.8 15.7-52.6 56.9 2 1.9 54-58.5 15.1 13.3 18-19.4 6.4 20.6-1.9 35.3v.1l14.7 89 2.7-.5-14.7-88.7 1.9-35.4v-.2l-13.7-44.2-.6-.5 34.7-39.1-2-1.8-34.6 39-14.6-14.5 30-31.5 14.7 1.1 28.7 15.7-.1.1 113.8 70.9v-5.4l-7.9-4.9 7.9-16.1v-6.2L399.1 333l-97.7-60.9 105.6-83 2.5 5.8v-6.8l-.3-.7.3-.2v-5.8l-36.9 29.1-41.1-69.6L401 90l8.5 18.2v-6.5l-30.1-64.8-22.5-9.5h-7.1L377.3 39l22.5 48.5-39.4 28.8-17.5-36.9-44.5-14.7-.9 2.6L341 81.5l17.3 36.3-28.5 20.9-85.5-39 23.3-72.4h-4.8l-29.3 91.1-26.2-9.5-20 63-18.2-6.1-16.3 39.9-35.9-16.5 24-78.3 22.3-39 44.5 17.5 1-2.6-44.1-17.3 24.1-42.1h-3.2l-47.1 82.4-24 78.2-34.2-15.8 7.9-34.6-29.9-60 47.1-50.2h-3.8L56.9 74.9 33.2 27.3h-5.1l25.4 51.1-26 27.1v4L54.8 81l28.5 57.2-7 30.7-48.8-57.8v4.2l48 56.9-.6 2.6 14.8 6.8 13.6 54.3 13.3 7.1-.1.2 1.3.5 43.4 23.1-7 17.3-.5.9-65-32.6-1.2 2.4 23.8 11.9L88.6 321l2.5 1.1 22.6-54 38.6 19.3-48.8 79.8 2.3 1.4 48.9-80 20.6 10.3-.3.9L27.5 537.3v8.7l61.2-98.5 47.6 57.7 12.9 102.6h2.8l-13-103.7-48.7-59.2zm146.8-138l6 19.3-17.3 18.6-12.6-11 23.9-26.9zm-1.9-1.9l-25.5 28.7-14.5-16.5.1-.1 25.4-26.6 14.5 14.5zm-41.9 10.1l-13.4-15.3 21.4-66.6 24.2 21.8 23.4 1.7-55.6 58.4zm5.3-88.4l-15.3-7 16.4-40.6 13 3.6-14.1 44zm44.8-124.3l85.3 38.9 41.8 70.8-72.9 57.4-29.1-15.9-12-.9 11.4-12 37.7-4.8 32-25.8-1.7-2.1-31.4 25.4-37.9 4.9-13.6 14.1-25.5-1.9-24-21.5-.7-.3 40.6-126.3zm-34.4 10l23.6 8.6-19 59-13.6-3.8.1-.1-10.2-3.4 19.1-60.3zm-38.4 56.8l26.6 8.9-16.4 40.5-25.5-11.8 15.3-37.6zm-52.9 71.3l-11.9-6.4-12.8-51 39.1 18-14.4 39.4zm2.4 1.3l14.5-39.5 16.5 7.6-16.2 39.8-14.8-7.9zm17.2 9.1l16.3-39.9 25.5 11.8-16.8 41.5-25-13.4zm18.9 35.3l.5-.8.1-.1 24.9-61.4 15.6 7.2-20.9 65.1-20.2-10z"
						fill="url(#_Radial1)"
						fillRule="nonzero"
						transform="translate(-29.113 -28.485) scale(1.08084)"
					/>
				</g>
				<RadarGroup duration={2} angle={20}>
					<g>
						<path
							d="M148.6 381.8c-3.6-4.5-10.5-11.8-21.7-16.6-11.2-4.8-21.2-4.7-27-4.2-1.3.1-2.3 1.4-2.1 2.7L104 406l9.5 4 34.7-24.9c1.1-.7 1.3-2.2.4-3.3z"
							fill="url(#_Linear2)"
							fillRule="nonzero"
							transform="rotate(7.36 292.03 233.02) scale(1.06663)"
						/>
					</g>
					<g>
						<g transform="rotate(-9.09 -56.007 591.492) scale(1.06667)">
							<ellipse
								cx="105.4"
								cy="415.8"
								rx="11"
								ry="11.1"
								fill={isDarkTheme ? "#b3224f" : "#fff"}
							/>
						</g>
						<g transform="rotate(-9.09 -56.01 591.491) scale(1.06667)">
							<circle
								cx="105.4"
								cy="415.8"
								r="8.9"
								fill="none"
								stroke="#f4316d"
								strokeWidth="4.34px"
							/>
						</g>
					</g>
					<g>
						<path
							fill="none"
							d="M.328 441.161l64.143-108.913 108.913 64.142-64.142 108.914z"
						/>
					</g>
				</RadarGroup>
				<RadarGroup duration={2} angle={20}>
					<g>
						<path
							d="M148.6 381.8c-3.6-4.5-10.5-11.8-21.7-16.6-11.2-4.8-21.2-4.7-27-4.2-1.3.1-2.3 1.4-2.1 2.7L104 406l9.5 4 34.7-24.9c1.1-.7 1.3-2.2.4-3.3z"
							fill="url(#_Linear3)"
							fillRule="nonzero"
							transform="rotate(89.207 229.313 276.068) scale(1.06663)"
						/>
					</g>
					<g>
						<g transform="rotate(72.757 277.757 267.11) scale(1.06667)">
							<ellipse
								cx="105.4"
								cy="415.8"
								rx="11"
								ry="11.1"
								fill={isDarkTheme ? "#b3224f" : "#fff"}
							/>
						</g>
						<g transform="rotate(72.757 277.757 267.11) scale(1.06667)">
							<circle
								cx="105.4"
								cy="415.8"
								r="8.9"
								fill="none"
								stroke="#f4316d"
								strokeWidth="4.34px"
							/>
						</g>
					</g>
					<g>
						<path
							fill="none"
							d="M25.817 78.95l116.91 48.048-48.048 116.91-116.91-48.048z"
						/>
					</g>
				</RadarGroup>
				<RadarGroup duration={1.25} angle={15}>
					<g>
						<path
							d="M340.1 194.4c5.6-1 15.4-3.6 24.9-11.2 9.5-7.6 14.2-16.5 16.5-21.7.5-1.2-.1-2.7-1.4-3.1L340 143.6l-8 6.4 5.4 42.4c.1 1.3 1.4 2.2 2.7 2z"
							fill="url(#_Linear4)"
							fillRule="nonzero"
							transform="translate(-33.331 -31.41) scale(1.06663)"
						/>
					</g>
					<g>
						<g transform="rotate(-78.082 316.74 154.296) scale(1.06658)">
							<ellipse
								cx="330.7"
								cy="140.1"
								rx="11"
								ry="11.1"
								fill={isDarkTheme ? "#b3224f" : "#fff"}
							/>
						</g>
						<g transform="rotate(-78.082 316.741 154.297) scale(1.06658)">
							<circle
								cx="330.7"
								cy="140.1"
								r="8.9"
								fill="none"
								stroke="#f4316d"
								strokeWidth="4.34px"
							/>
						</g>
					</g>
					<g>
						<path
							fill="none"
							d="M230.585 107.978l98.93-78.681 78.681 98.93-98.93 78.68z"
						/>
					</g>
				</RadarGroup>
				<RadarGroup duration={1.65} angle={20}>
					<g>
						<path
							d="M273.3 385.3c-5.5-1.8-15.3-4-27.2-1.7-11.9 2.3-20.3 8-24.7 11.6-1 .9-1.1 2.4-.2 3.4l28.6 31.7 10.1-1.9 14.9-40c.5-1.3-.2-2.7-1.5-3.1z"
							fill="url(#_Linear5)"
							fillRule="nonzero"
							transform="translate(-24.193 -27.646) scale(1.06663)"
						/>
					</g>
					<g>
						<g transform="scale(1.06667) rotate(-50.441 217.58 448.77)">
							<ellipse
								cx="256.4"
								cy="437.7"
								rx="11"
								ry="11.1"
								fill={isDarkTheme ? "#b3224f" : "#fff"}
							/>
						</g>
						<g transform="rotate(-50.437 232.092 478.701) scale(1.06659)">
							<circle
								cx="256.4"
								cy="437.7"
								r="8.9"
								fill="none"
								stroke="#f4316d"
								strokeWidth="4.34px"
							/>
						</g>
					</g>
					<g>
						<path
							fill="none"
							d="M175.27 389.008l124.133-23.8 23.8 124.134-124.133 23.8z"
						/>
					</g>
				</RadarGroup>
				<defs>
					<radialGradient
						id="_Radial1"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="matrix(394.8 0 0 -394.8 199.333 261.258)"
					>
						<stop
							offset="0"
							stopColor={isDarkTheme ? "white" : "black"}
							stopOpacity={isDarkTheme ? "0.2" : "0.1"}
						/>
						<stop offset="1" stopColor="white" stopOpacity="0" />
					</radialGradient>
					<linearGradient
						id="_Linear2"
						x1="0"
						y1="0"
						x2="1"
						y2="0"
						gradientUnits="userSpaceOnUse"
						gradientTransform="rotate(-66.865 367.696 128.24) scale(70.4521)"
					>
						<stop offset="0" stopColor="#ff0d1b" />
						<stop offset="0.35" stopColor="#ea4d56" stopOpacity=".36" />
						<stop offset="1" stopColor="#c4c4c4" stopOpacity="0" />
						<stop offset="1" stopColor="#c4c4c4" stopOpacity="0" />
					</linearGradient>
					<linearGradient
						id="_Linear3"
						x1="0"
						y1="0"
						x2="1"
						y2="0"
						gradientUnits="userSpaceOnUse"
						gradientTransform="rotate(-66.865 367.696 128.24) scale(70.4521)"
					>
						<stop offset="0" stopColor="#ff0d1b" />
						<stop offset="0.35" stopColor="#ea4d56" stopOpacity=".36" />
						<stop offset="1" stopColor="#c4c4c4" stopOpacity="0" />
						<stop offset="1" stopColor="#c4c4c4" stopOpacity="0" />
					</linearGradient>
					<linearGradient
						id="_Linear4"
						x1="0"
						y1="0"
						x2="1"
						y2="0"
						gradientUnits="userSpaceOnUse"
						gradientTransform="rotate(51.504 20.19 412.674) scale(70.4553)"
					>
						<stop offset="0" stopColor="#ff0d1b" />
						<stop offset="0.35" stopColor="#ea4d56" stopOpacity=".36" />
						<stop offset="1" stopColor="#c4c4c4" stopOpacity="0" />
						<stop offset="1" stopColor="#c4c4c4" stopOpacity="0" />
					</linearGradient>
					<linearGradient
						id="_Linear5"
						x1="0"
						y1="0"
						x2="1"
						y2="0"
						gradientUnits="userSpaceOnUse"
						gradientTransform="scale(-70.45) rotate(79.146 1.94 -5.31)"
					>
						<stop offset="0" stopColor="#ff0d1b" />
						<stop offset="0.35" stopColor="#ea4d56" stopOpacity=".36" />
						<stop offset="1" stopColor="#c4c4c4" stopOpacity="0" />
						<stop offset="1" stopColor="#c4c4c4" stopOpacity="0" />
					</linearGradient>
				</defs>
			</svg>
		</motion.div>
	);
}
