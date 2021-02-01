import { useState, useEffect } from "react";
import { isEmpty, last, mean, takeRight } from "lodash";
import { calculateSpeed } from "helpers";
import { getTime } from "date-fns";

export function useGolocationSpeed(geolocation) {
	const [speedTimeline, setSpeedTimeline] = useState([]);
	const [geolocationTimeline, setGeolocationTimeline] = useState([]);

	const [speedCalcTime, setSpeedCalcTime] = useState(null);
	const [speed, setSpeed] = useState(0);

	useEffect(() => {
		if (geolocation) {
			const geolocationTimelineEmpty = isEmpty(geolocationTimeline);
			if (geolocationTimelineEmpty) {
				setSpeedTimeline([0]);
				setGeolocationTimeline([geolocation]);
				setSpeedCalcTime(getTime(new Date()));
				setSpeed(0);
			} else {
				const lastGeolocation = last(geolocationTimeline);
				const currentSpeed = calculateSpeed(lastGeolocation, geolocation);
				const geolocationData = [...takeRight(geolocationTimeline, 2), geolocation];
				const speedData = [...takeRight(speedTimeline, 2), currentSpeed];
				const meanSpeed = mean(speedData);
				setSpeedTimeline(speedData);
				setGeolocationTimeline(geolocationData);
				setSpeedCalcTime(getTime(new Date()));
				setSpeed(meanSpeed);
			}
		}
	}, [geolocation]);

	return [speedTimeline, geolocationTimeline, speedCalcTime, speed];
}
