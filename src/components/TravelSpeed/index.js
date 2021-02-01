import React, { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { motion } from "framer-motion";
import { Spring } from "react-spring/renderprops";
import { useTranslation } from "react-i18next";

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

const GET_GEOLOCATION_SPEED = gql`
	query GetCurrentGeolocation {
		geolocationStatus {
			currentSpeed @client
		}
	}
`;

export default function TravelSpeed() {
	const { t } = useTranslation();
	const { data } = useQuery(GET_GEOLOCATION_SPEED);

	const currentSpeed = useMemo(() => {
		const currentSpeed = +data.geolocationStatus.currentSpeed.toFixed();
		return currentSpeed <= 3 ? 0 : currentSpeed;
	}, [data.geolocationStatus.currentSpeed]);

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			transition={{ duration: 0.5 }}
			className="TravelSpeed"
		>
			<Spring from={{ speed: 0 }} to={{ speed: currentSpeed }} config={{ duration: 500 }}>
				{(props) => <div className="TravelSpeed__speed">{props.speed.toFixed()}</div>}
			</Spring>
			<motion.div className="TravelSpeed__units">{t("TravelSpeed.units.kmh")}</motion.div>
		</motion.div>
	);
}
