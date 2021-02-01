import React, { useState } from "react";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const variants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
};

export default function GotoAction({ appTheme, goto }) {
	const { t } = useTranslation();
	const [variant, setVariant] = useState("visible");

	return (
		<motion.div
			initial="hidden"
			animate={variant}
			variants={variants}
			onClick={() => setVariant("hidden")}
		>
			<Button
				mode={appTheme === "dark" ? "overlay_secondary" : "primary"}
				size="xl"
				stretched={true}
				onClick={goto}
			>
				{t("GotoAction")}
			</Button>
		</motion.div>
	);
}
