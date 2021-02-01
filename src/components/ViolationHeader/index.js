import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ViolationHeader() {
	const { t } = useTranslation();
	return (
		<motion.div className="ViolationHeader">
			<div className="ViolationHeader__title">{t("ViolationHeader.title")}</div>
		</motion.div>
	);
}
