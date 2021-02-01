import { createEvent } from "effector";

const requestGeolocation = createEvent();
const receiveGeolocationResult = createEvent();
const receiveGeolocationError = createEvent();
const startListenGeolocation = createEvent();
const stopListenGeolocation = createEvent();
const setListenGeolocationTimer = createEvent();

export {
	requestGeolocation,
	receiveGeolocationResult,
	receiveGeolocationError,
	startListenGeolocation,
	stopListenGeolocation,
	setListenGeolocationTimer,
};
