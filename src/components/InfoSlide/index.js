import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const variants = {
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

const surfaceVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

export default function InfoSlide({ type, amount, location, surface }) {
	const { t } = useTranslation();

	return (
		<motion.div
			layout
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			className={`InfoSlide ${type === "location" && "InfoSlide_location"}`}
		>
			{type === "violation" && <audio autoPlay src="assets/audio/violation.ogg"></audio>}
			<div className="InfoSlide__content">
				<div className="InfoSlide__header">
					<div className="InfoSlide__header-title">
						{type === "violation"
							? t("InfoSlider.ViolationSlide.title")
							: type === "surface"
							? t("InfoSlider.SurfaceSlide.title")
							: location}
					</div>
					{(type === "violation" || type === "surface") && (
						<div className="InfoSlide__header-description">
							{type === "violation"
								? t("InfoSlider.ViolationSlide.description", {
										amount: amount.toFixed(),
								  })
								: t(`General.surfaces.${surface}`)}
						</div>
					)}
				</div>

				{type === "violation" && <div className="InfoSlide__shadow"></div>}
				{type === "violation" && (
					<div className="InfoSlide__identity InfoSlide__identity_violation"></div>
				)}
				{type === "location" && (
					<div className="InfoSlide__identity InfoSlide__identity_location"></div>
				)}
				<AnimatePresence exitBeforeEnter>
					{type === "surface" && (
						<motion.div
							key={surface}
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={surfaceVariants}
							className={`InfoSlide__identity InfoSlide__identity_${surface}`}
							transition={{ duration: 0.2 }}
						></motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
