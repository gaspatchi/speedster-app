import React, { useState } from "react";
import { motion } from "framer-motion";
import { gql, useQuery } from "@apollo/client";

const avatarVariants = {
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			duration: 0.5,
			bounce: 0.55,
			when: "beforeChildren",
			staggerChildren: 0.3,
		},
	},
	hidden: {
		opacity: 0,
		scale: 0.7,
	},
	exit: {
		opacity: 0,
		scale: 0.7,
		transition: {
			type: "tween",
			duration: 0.05,
			when: "afterChildren",
			staggerChildren: 0.05,
		},
	},
};

const locationVariants = {
	hidden: { opacity: 0, scale: 0.7 },
	visible: { opacity: 1, scale: 1 },
	exit: {
		opacity: 0,
		scale: 0.7,
		transition: {
			type: "tween",
			duration: 0.05,
		},
	},
};

const GET_USER_INFO = gql`
	query GetUserProfile {
		userStatus {
			profile @client
		}
	}
`;

export default function WelcomeUserLocation() {
	const [avatarLoaded, setAvatarLoaded] = useState(false);
	const { data } = useQuery(GET_USER_INFO);

	return (
		<div className="WelcomeUserLocation">
			<motion.div
				initial="hidden"
				animate={avatarLoaded ? "visible" : false}
				exit="exit"
				variants={avatarVariants}
				className="WelcomeUserLocation__avatar"
			>
				<img
					className="WelcomeUserLocation__avatar-image"
					src={data.userStatus.profile?.avatar}
					onLoad={() => setAvatarLoaded(true)}
				></img>
				<motion.div
					className="WelcomeUserLocation__location"
					transition={{ type: "spring", bounce: 0.55 }}
					variants={locationVariants}
					exit="exit"
				>
					<div className="WelcomeUserLocation__location-icon"></div>
				</motion.div>
			</motion.div>
		</div>
	);
}
