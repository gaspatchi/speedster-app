import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { requestGeolocation, setAppfirstlaunched } from "models/app";
import { waitGeolocationStatus } from "graphql/state";

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};

const buttonVariants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
	exit: {
		opacity: 0,
		scale: 0.95,
	},
};

export const GET_PERMISSIONS = gql`
	query GetCartItems {
		geolocationStatus {
			granted @client
		}
	}
`;

export default function PermissionActions({ appTheme, layoutAnimated }) {
	const { data } = useQuery(GET_PERMISSIONS);
	const { t } = useTranslation();

	useEffect(() => {
		waitGeolocationStatus(true);
		return () => waitGeolocationStatus(false);
	}, []);

	useEffect(() => {
		let timerID;
		if (data.geolocationStatus.granted) {
			timerID = setTimeout(() => setAppfirstlaunched(), 1300);
		}
		return () => clearTimeout(timerID);
	}, [data]);

	return (
		<motion.div
			initial="hidden"
			animate={layoutAnimated && "visible"}
			exit="exit"
			variants={containerVariants}
		>
			<div className="WelcomeSlidePanel__action WelcomeSlidePanel__action_geoposition">
				<Button
					before={
						<AnimatePresence exitBeforeEnter>
							{data.geolocationStatus.granted ? (
								<motion.div
									key="success"
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={buttonVariants}
									className="WelcomeSlidePanel__action-icon WelcomeSlidePanel__action-icon_geoposition WelcomeSlidePanel__action-icon_geoposition-success"
								></motion.div>
							) : (
								<motion.div
									key="icon"
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={buttonVariants}
									className="WelcomeSlidePanel__action-icon WelcomeSlidePanel__action-icon_geoposition"
								></motion.div>
							)}
						</AnimatePresence>
					}
					mode={appTheme === "dark" ? "overlay_outline" : "outline"}
					size="xl"
					stretched={true}
					onClick={!data.geolocationStatus.granted ? requestGeolocation : undefined}
				>
					{t("PermissionActions.geolocation")}
				</Button>
			</div>

			<div
				className="WelcomeSlidePanel__action WelcomeSlidePanel__action_skip"
				onClick={!data.geolocationStatus.granted ? setAppfirstlaunched : undefined}
			>
				{t("PermissionActions.skip")}
			</div>
		</motion.div>
	);
}
