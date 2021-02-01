import { makeVar } from "@apollo/client";

const geolocationLoading = makeVar(false);
const geolocationGranted = makeVar(false);
const geolocationAvailable = makeVar(false);
const geolocationData = makeVar(null);
const speedTimeline = makeVar([]);
const geolocationTimeline = makeVar([]);
const speedCalcTime = makeVar(null);
const currentSpeed = makeVar(0);

export {
	geolocationLoading,
	geolocationGranted,
	geolocationAvailable,
	geolocationData,
	speedTimeline,
	geolocationTimeline,
	speedCalcTime,
	currentSpeed,
};
