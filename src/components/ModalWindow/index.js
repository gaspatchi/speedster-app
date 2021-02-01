import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from "@vkontakte/vkui/dist/components/Button/Button";

const variants = {
	hidden: { opacity: 0, y: "100%" },
	visible: { opacity: 1, y: "0" },
	exit: { pacity: 0, y: "100%" },
};

export default function ModalWindow({ appTheme, type, platform, close }) {
	const { t } = useTranslation();

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			transition={{ type: "spring", ease: "easeInOut", bounce: 0, duration: 0.4 }}
			className="ModalWindow"
		>
			<div className="ModalWindow__anchor" onClick={close}></div>
			<div className={`ModalWindow__identity ModalWindow__identity_${type}`}></div>
			<div className="ModalWindow__header">
				<div className="ModalWindow__header-title">{t(`ModalWindow.${type}.title`)}</div>
				<div
					className="ModalWindow__header-description"
					dangerouslySetInnerHTML={{
						__html:
							type === "geolocation"
								? t(`ModalWindow.geolocation.description`)
								: type === "wakelock"
								? t(`ModalWindow.wakelock.description.${platform}`)
								: null,
					}}
				></div>
			</div>
			<div className="ModalWindow__actions">
				<div className="ModalWindow__action">
					<Button
						mode={appTheme === "dark" ? "overlay_secondary" : "primary"}
						size="l"
						stretched={true}
						onClick={close}
					>
						{t(`ModalWindow.${type}.action`)}
					</Button>
				</div>
			</div>
		</motion.div>
	);
}
