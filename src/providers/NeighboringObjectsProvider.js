import React, { useCallback, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useNeighboringObjects } from "hooks";
import { currentTarget } from "graphql/state";
import useUserParameters from "hooks/useUserParameters";

const GET_COMPLEX_STATUS = gql`
	query GetComplexStatus {
		appStatus {
			tripStarted @client
		}
		geolocationStatus {
			data @client
			geolocationTimeline @client
			speedTimeline @client
			speedCalcTime @client
			currentSpeed @client
		}
		accelerometerStatus {
			absoluteAngle @client
		}
	}
`;

const GET_NEIGHBORING_OBJECTS = gql`
	query GetNeighboringObjects($user: UserInput!, $location: NeighborInput!) {
		neighboringObjects(user: $user, location: $location) {
			id
			... on ControlCamera {
				type
				location
				bbox
			}
			... on RoadObject {
				type
				location
				bbox
			}
		}
	}
`;

export default function NeighboringObjectsProvider() {
	const userParameters = useUserParameters();
	const { data: complexStatus } = useQuery(GET_COMPLEX_STATUS);
	const [loadNeighboringObjects, { called, loading, refetch, data }] = useLazyQuery(
		GET_NEIGHBORING_OBJECTS
	);

	const fetchNeighbors = useCallback(
		(location) => {
			const variables = {
				user: userParameters,
				location: {
					location,
					metadata: {
						speed: complexStatus.geolocationStatus.currentSpeed,
						angle: complexStatus.accelerometerStatus.absoluteAngle,
					},
				},
			};
			if (called) {
				refetch({ variables });
			} else {
				loadNeighboringObjects({ variables });
			}
		},
		[
			userParameters,
			complexStatus.geolocationStatus.currentSpeed,
			complexStatus.accelerometerStatus.absoluteAngle,
			called,
			refetch,
			loadNeighboringObjects,
		]
	);

	const newCurrentTarget = useNeighboringObjects(
		complexStatus.geolocationStatus.geolocationTimeline,
		complexStatus.geolocationStatus.speedCalcTime,
		complexStatus.geolocationStatus.currentSpeed,
		data,
		fetchNeighbors
	);

	useEffect(() => {
		currentTarget(newCurrentTarget);
	}, [newCurrentTarget]);

	return <></>;
}
