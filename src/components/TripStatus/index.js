import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants = {
	hidden: { opacity: 0, y: 5, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "tween",
			delay: 0.35,
			duration: 0.3,
		},
	},
	exit: {
		opacity: 0,
		y: 5,
		scale: 0.95,
		transition: {
			type: "tween",
			duration: 0.3,
		},
	},
};

const spinnerVariants = {
	hidden: { opacity: 0, scale: 0.5 },
	visible: {
		opacity: 1,
		scale: [1, 1.2, 0.8],
		transition: {
			scale: {
				type: "spring",
				repeatType: "reverse",
				ease: "easeInOut",
				duration: 1,
				repeat: Infinity,
			},
		},
	},
	exit: { opacity: 0, scale: 0.5 },
};

const iconVariants = {
	hidden: { opacity: 0, scale: 0.5 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.5 },
};

export default function TripStatus({
	geolocationGranted,
	geolocationAvailable,
	geolocationLoading,
	tripStarted,
	requestGeolocation,
	startTrip,
	stopTrip,
}) {
	const { t } = useTranslation();
	const [clicked, setClicked] = useState(false);
	const processClick = useCallback(() => {
		if (!tripStarted) {
			setClicked(true);
			requestGeolocation();
		} else {
			setClicked(false);
			stopTrip();
		}
	}, [requestGeolocation, stopTrip, tripStarted]);

	useEffect(() => {
		if (clicked && geolocationAvailable && geolocationGranted && !tripStarted) startTrip();
	}, [geolocationAvailable, geolocationGranted, clicked, startTrip, tripStarted]);

	return (
		<motion.div
			layout
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={containerVariants}
			className={`TripStatus TripStatus_${!geolocationGranted && "disabled"}`}
			onClick={processClick}
		>
			<motion.div className="TripStatus__title">
				{geolocationGranted
					? tripStarted
						? t("TripStatus.stop")
						: t("TripStatus.start")
					: t("TripStatus.request")}
			</motion.div>
			<div className="TripStatus__goto">
				<AnimatePresence exitBeforeEnter>
					{geolocationLoading ? (
						<motion.div
							key="spinner"
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={spinnerVariants}
							className="TripStatus__goto-spinner"
						></motion.div>
					) : (
						<motion.div
							key="icon"
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={iconVariants}
							transition={{ duration: 0.2 }}
							className="TripStatus__goto-icon"
						></motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
