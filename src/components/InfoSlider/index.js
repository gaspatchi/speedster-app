import React, { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import InfoSlide from "components/InfoSlide";
import { DEFAULT_SPEEDLIMIT } from "config";

const variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			type: "tween",
			delay: 0.4,
			duration: 0.3,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			type: "tween",
			duration: 0.3,
		},
	},
};

const GET_ROAD_INFO = gql`
	query GetComplexRoadInfo {
		tripStatus {
			roadInfo @client
			roadInfoLoading @client
		}
		geolocationStatus {
			currentSpeed @client
		}
	}
`;

export default function InfoSlider() {
	const { data } = useQuery(GET_ROAD_INFO);
	const activeSlides = useMemo(() => {
		let slides = [];
		const infoAvailable = data.tripStatus.roadInfo?.roadInfo;
		if (infoAvailable) {
			const { maxspeed, name, surface } = data.tripStatus.roadInfo.roadInfo;
			const speedLimit = maxspeed === null ? DEFAULT_SPEEDLIMIT + 5 : maxspeed + 5;
			if (data.geolocationStatus.currentSpeed >= speedLimit) {
				slides.push({
					type: "violation",
					amount: data.geolocationStatus.currentSpeed - speedLimit,
				});
			}
			if (name) {
				slides.push({
					type: "location",
					location: name,
				});
			}
			if (surface) {
				slides.push({
					type: "surface",
					surface,
				});
			}
			return slides;
		} else {
			return [];
		}
	}, [data]);

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			className="InfoSlider"
		>
			<AnimatePresence>
				{activeSlides.map((slide) => (
					<InfoSlide
						key={slide.type}
						type={slide.type}
						amount={slide.amount}
						location={slide.location}
						surface={slide.surface}
					></InfoSlide>
				))}
			</AnimatePresence>
		</motion.div>
	);
}
