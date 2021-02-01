import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useGolocationSpeed } from "hooks/useGolocationSpeed";
import { speedCalcTime, currentSpeed, geolocationTimeline, speedTimeline } from "graphql/state";

const GET_GEOLOCATION_SPEED = gql`
	query GetCurrentGeolocation {
		geolocationStatus {
			data @client
		}
	}
`;

export default function GeolocationProvider() {
	const { data } = useQuery(GET_GEOLOCATION_SPEED);
	const [
		newSpeedTimeline,
		newGeolocationTimeline,
		newSpeedCalcTime,
		newSpeed,
	] = useGolocationSpeed(data.geolocationStatus.data);

	useEffect(() => {
		speedTimeline(newSpeedTimeline);
		geolocationTimeline(newGeolocationTimeline);
		speedCalcTime(newSpeedCalcTime);
		currentSpeed(newSpeed);
	}, [newSpeedTimeline, newGeolocationTimeline, newSpeedCalcTime, newSpeed]);

	return <></>;
}
