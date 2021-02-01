import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delay: 0.3,
			duration: 0.15,
		},
	},
};

export default function NavigationItem({ type, active, onClick }) {
	const { t } = useTranslation();
	return (
		<motion.div
			variants={containerVariants}
			className={`NavigationItem NavigationItem_${type}  NavigationItem_${
				active && "active"
			}`}
			onClick={() => onClick(type)}
		>
			<div className="NavigationItem__icon"></div>
			<div className="NavigationItem__title">{t(`NavigationItem.${type}`)}</div>
		</motion.div>
	);
}
