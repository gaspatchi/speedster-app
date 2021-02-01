import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const titleVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
	defaultLightTheme: { color: "#000000" },
	contastLightTheme: { color: "#FFFFFF" },

	defaultDarkTheme: { color: "#E5E5E5" },
	contastDarkTheme: { color: "#E5E5E5" },
};

const descriptionVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
	defaultLightTheme: { color: "#797979" },
	contastLightTheme: { color: "#FFFFFF" },

	defaultDarkTheme: { color: "#7A7A7A" },
	contastDarkTheme: { color: "#7A7A7A" },
};

export default function WelcomeHeader({ appTheme, permissionsActive }) {
	const { t } = useTranslation();

	const animationVariants = useMemo(() => {
		return appTheme === "dark"
			? permissionsActive
				? ["contastDarkTheme", "visible"]
				: ["defaultDarkTheme", "visible"]
			: permissionsActive
			? ["contastLightTheme", "visible"]
			: ["defaultLightTheme", "visible"];
	}, [appTheme, permissionsActive]);

	return (
		<div className="WelcomeHeader">
			<motion.div
				initial="hidden"
				animate={animationVariants}
				variants={titleVariants}
				className="WelcomeHeader__title"
				transition={{
					type: "tween",
					duration: 0.3,
				}}
			>
				{permissionsActive
					? t("WelcomeHeader.permissions.title")
					: t("WelcomeHeader.welcome.title")}
			</motion.div>

			<motion.div
				initial="hidden"
				animate={animationVariants}
				variants={descriptionVariants}
				className="WelcomeHeader__description"
				transition={{
					type: "tween",
					duration: 0.35,
					delay: 0.08,
					y: { duration: 0.45 },
				}}
			>
				{permissionsActive
					? t("WelcomeHeader.permissions.description")
					: t("WelcomeHeader.welcome.description")}
			</motion.div>
		</div>
	);
}
