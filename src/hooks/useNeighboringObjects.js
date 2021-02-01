import { useRef, useEffect, useCallback, useState } from "react";
import {
	bearing,
	booleanPointInPolygon,
	buffer,
	distance,
	point,
	polygon,
	transformTranslate,
} from "@turf/turf";
import { isEmpty, last, sortBy, takeRight } from "lodash";
import { getTime } from "date-fns";
import { NEIGHBORS_BUFFER_RADIUS } from "config";

function transformObjects(objects) {
	return objects.map((object) => ({
		...object,
		bbox: polygon(object.bbox.coordinates),
		location: point(object.location.coordinates),
	}));
}

export function useNeighboringObjects(
	geolocationTimeline,
	speedCalcTime,
	currentSpeed,
	neighbors,
	fetchNeighbors
) {
	const searchBufffer = useRef();
	const transformedGeolocationTimeline = useRef();
	const transformedObjects = useRef();
	const [currentTarget, setCurrentTarget] = useState(null);

	const calculateSlidingGeolocation = useCallback(() => {
		const emptyTimeline = isEmpty(transformedGeolocationTimeline.current);
		if (!emptyTimeline) {
			const invalidTimeline = transformedGeolocationTimeline.current.length < 2;
			if (invalidTimeline) {
				return last(transformedGeolocationTimeline.current);
			} else {
				const lastGeolocationPoints = takeRight(transformedGeolocationTimeline.current, 2);
				const firstPoint = lastGeolocationPoints[0];
				const secondPoint = lastGeolocationPoints[1];
				const bearingAngle = bearing(firstPoint, secondPoint);
				const currentTime = getTime(new Date());
				const diffTime = currentTime - speedCalcTime;
				const traveledDistance = (currentSpeed / (3600 * 1000)) * diffTime;
				const newGeolocation = transformTranslate(
					secondPoint,
					traveledDistance,
					bearingAngle
				);
				return newGeolocation;
			}
		}
	}, [currentSpeed, speedCalcTime]);

	const findTrackingObject = useCallback(() => {
		const objectsEmpty = isEmpty(transformedObjects.current);
		const timelineEmpty = isEmpty(transformedGeolocationTimeline.current);
		if (!objectsEmpty && !timelineEmpty) {
			let intersectedObjects = [];
			const currentSlidingGeolocation = calculateSlidingGeolocation();
			for (let object of transformedObjects.current) {
				const isIntersected = booleanPointInPolygon(currentSlidingGeolocation, object.bbox);
				if (isIntersected) {
					intersectedObjects.push({
						...object,
						distance: distance(currentSlidingGeolocation, object.location),
					});
				}
			}
			if (intersectedObjects.length === 0) {
				setCurrentTarget(null);
			} else if (intersectedObjects.length === 1) {
				setCurrentTarget({
					type: intersectedObjects[0].type,
					distance: intersectedObjects[0].distance,
				});
			} else {
				const sortedObjects = sortBy(intersectedObjects, ["distance"]);
				setCurrentTarget({
					type: sortedObjects[0].type,
					distance: sortedObjects[0].distance,
				});
			}
		}
	}, [calculateSlidingGeolocation]);

	useEffect(() => {
		const timelineEmpty = geolocationTimeline.length === 0;
		const hasTwoGeolocations = geolocationTimeline.length >= 2;
		if (!timelineEmpty) {
			let currentGeolocation = last(geolocationTimeline);
			const transformedCurrentGeolocation = point([
				currentGeolocation.lon,
				currentGeolocation.lat,
			]);
			if (hasTwoGeolocations) {
				const previousGeolocation = geolocationTimeline[geolocationTimeline.length - 2];
				const transformedPreviousGeolocation = point([
					previousGeolocation.lon,
					previousGeolocation.lat,
				]);
				transformedGeolocationTimeline.current = [
					transformedPreviousGeolocation,
					transformedCurrentGeolocation,
				];
			} else {
				transformedGeolocationTimeline.current = [transformedCurrentGeolocation];
			}
			if (!searchBufffer.current) {
				const transformedInitialGeolocation = transformedCurrentGeolocation;
				searchBufffer.current = buffer(transformedInitialGeolocation, NEIGHBORS_BUFFER_RADIUS);
				fetchNeighbors(transformedCurrentGeolocation.geometry);
			} else {
				const positionInCurrentSearch = booleanPointInPolygon(
					transformedCurrentGeolocation,
					searchBufffer.current
				);
				if (!positionInCurrentSearch) {
					fetchNeighbors(transformedCurrentGeolocation.geometry);
				}
			}
		}
	}, [fetchNeighbors, geolocationTimeline]);

	useEffect(() => {
		if (neighbors?.neighboringObjects) {
			transformedObjects.current = transformObjects(neighbors.neighboringObjects);
		}
	}, [neighbors]);

	useEffect(() => {
		const timerID = setInterval(() => {
			findTrackingObject();
		}, 250);
		return () => clearInterval(timerID);
	}, [findTrackingObject]);

	return currentTarget;
}
