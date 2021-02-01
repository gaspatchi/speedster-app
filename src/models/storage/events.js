import { createEvent } from "effector";

const bootstrapStorageData = createEvent();
const getStorageData = createEvent();
const receiveStorageData = createEvent();
const receiveStorageDataError = createEvent();
const setStorageData = createEvent();
const receiveSetStorageData = createEvent();
const receiveSetStorageDataError = createEvent();
const validateGeolocationStatus = createEvent();

export {
	bootstrapStorageData,
	getStorageData,
	receiveStorageData,
	receiveStorageDataError,
	setStorageData,
	receiveSetStorageData,
	receiveSetStorageDataError,
	validateGeolocationStatus,
};
