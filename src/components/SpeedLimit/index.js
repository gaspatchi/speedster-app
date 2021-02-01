import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery, gql } from "@apollo/client";
import { DEFAULT_SPEEDLIMIT } from "config";

const containerVariants = {
	hidden: { opacity: 0, y: 5 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "tween",
			delay: 1,
			duration: 0.3,
		},
	},
	exit: {
		opacity: 0,
		y: 0,
		transition: {
			type: "tween",
			duration: 0.3,
		},
	},
};

const maxspeedVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.9 },
};

const GET_ROAD_MAXSPEED = gql`
	query GetRoadMaxspeed {
		tripStatus {
			roadInfo @client
			roadInfoLoading @client
		}
	}
`;

export default function SpeedLimit() {
	const { t } = useTranslation();
	const { data } = useQuery(GET_ROAD_MAXSPEED);
	
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={containerVariants}
			className="SpeedLimit"
		>
			<div className="SpeedLimit__title">{t("SpeedLimit.title")}</div>
			<AnimatePresence exitBeforeEnter>
				<motion.div
					key={data.tripStatus.roadInfo?.maxspeed ?? DEFAULT_SPEEDLIMIT}
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={maxspeedVariants}
					className="SpeedLimit__speed"
					transition={{ type: "spring", bounce: 0.25, duration: 0.35 }}
				>
					{data.tripStatus.roadInfo?.maxspeed ?? DEFAULT_SPEEDLIMIT}
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
}
