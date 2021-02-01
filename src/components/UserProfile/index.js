import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function UserProfile({ profile, slim }) {
	const { t } = useTranslation();
	return (
		<motion.div className={`UserProfile UserProfile_${!slim && "vertical"}`}>
			<div className="UserProfile__avatar">
				<img className="UserProfile__avatar-image" src={profile?.avatar}></img>
			</div>
			<div className="UserProfile__header">
				{slim
					? t("UserProfile.slimTitle", { name: profile?.firstName })
					: `${profile?.firstName} ${profile?.lastName}`}
			</div>
		</motion.div>
	);
}
