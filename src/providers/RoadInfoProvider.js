import React, { useEffect, useRef, useCallback } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { point } from "@turf/turf";
import { roadInfo, roadInfoLoading } from "graphql/state";
import { calculateDistance } from "helpers";
import useUserParameters from "hooks/useUserParameters";
import { ROAD_INFO_DISTANCE } from "config";

const GET_COMPLEX_STATUS = gql`
	query GetComplexStatus {
		appStatus {
			tripStarted @client
		}
		geolocationStatus {
			data @client
		}
	}
`;

const GET_ROAD_INFO = gql`
	query GetRoadInfo($user: UserInput!, $location: CurrentLocation!) {
		roadInfo(user: $user, location: $location) {
			maxspeed
			surface
			name
		}
	}
`;

export default function RoadInfoProvider() {
	const userParameters = useUserParameters();
	const previousLocation = useRef();
	const { data: complexStatus } = useQuery(GET_COMPLEX_STATUS);
	const [loadRoadInfo, { called, loading, refetch, data }] = useLazyQuery(GET_ROAD_INFO);

	const executeQuery = useCallback(
		(currentLocation) => {
			previousLocation.current = currentLocation;
			const variables = {
				user: userParameters,
				location: {
					location: point([currentLocation.lon, currentLocation.lat]).geometry,
				},
			};
			if (called) {
				refetch({ variables });
			} else {
				loadRoadInfo({ variables });
			}
		},
		[called, loadRoadInfo, refetch, userParameters]
	);

	useEffect(() => {
		const currentLocation = complexStatus.geolocationStatus.data;
		if (complexStatus.appStatus.tripStarted) {
			if (currentLocation) {
				if (previousLocation.current) {
					const distanceDiff = calculateDistance(
						previousLocation.current,
						currentLocation
					);
					if (distanceDiff >= ROAD_INFO_DISTANCE) {
						executeQuery(currentLocation);
					}
				} else {
					executeQuery(currentLocation);
				}
			}
		}
	}, [complexStatus, executeQuery]);

	useEffect(() => {
		if (data) roadInfo(data);
	}, [data]);

	useEffect(() => {
		roadInfoLoading(loading);
	}, [loading]);

	useEffect(() => {
		if (!complexStatus.appStatus.tripStarted) previousLocation.current = null;
	}, [complexStatus.appStatus.tripStarted]);

	return <></>;
}
