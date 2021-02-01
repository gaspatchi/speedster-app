import { motion } from "framer-motion";
import React from "react";

export default function ViolationCard({ type, identity, value, title, description }) {
	return (
		<motion.div className={`ViolationCard ViolationCard_${type}`}>
			<div className="ViolationCard__header">
				<div className="ViolationCard__header-identity">
					{type === "icon" ? (
						<div
							className={`ViolationCard__header-identity-icon ViolationCard__header-identity-icon_${identity}`}
						></div>
					) : (
						<div className="ViolationCard__header-identity-value">{value}</div>
					)}
				</div>
				<div className="ViolationCard__header-title">{title}</div>
				<div className="ViolationCard__header-description">{description}</div>
			</div>
		</motion.div>
	);
}
