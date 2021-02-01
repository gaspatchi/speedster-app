import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ROAD_OBJECTS_TYPES } from "config";
import { useTranslation } from "react-i18next";

const variants = {
	hidden: { opacity: 0, y: 0 },
	visible: { opacity: 1, y: -10 },
	exit: { opacity: 0, y: 0 },
};

export default function Notification({ target }) {
	const { t } = useTranslation();
	const roadObject = useMemo(
		() => ({
			type: target.type,
			icon: ROAD_OBJECTS_TYPES[target.type],
			distance: (target.distance * 1000).toFixed(),
		}),
		[target]
	);

	return (
		<motion.div
			layout
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			transition={{ duration: 0.3 }}
			className="Notification"
		>
			<audio autoPlay src="assets/audio/notification.ogg"></audio>
			<div className="Notification__content">
				<div
					className={`Notification__identity Notification__identity_${roadObject.icon}`}
				></div>

				<div className="Notification__header">
					<div className="Notification__header-title">
						{roadObject.distance < 25
							? t(`Notification.objectTypes.${roadObject.type}.title`)
							: t(`Notification.objectTypes.${roadObject.type}.ammountTitle`, {
									distance: roadObject.distance,
							  })}
					</div>
					<div className="Notification__header-description">
						{t(`Notification.objectTypes.${roadObject.type}.description`)}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
