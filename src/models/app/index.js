import { createEvent } from "effector";
import { receiveEvent, sendEvent } from "models/bridge";
import { requestUserInfo, receiveUserInfo, receiveUserInfoError } from "models/user";
import {
	requestGeolocation,
	receiveGeolocationResult,
	receiveGeolocationError,
} from "models/geolocation";

import {
	bootstrapStorageData,
	getStorageData,
	receiveStorageData,
	receiveStorageDataError,
	receiveSetStorageData,
	receiveSetStorageDataError,
} from "models/storage";

import { requestAccelerometer } from "models/accelerometer";
import { processAcceptWakelock, processSetAppfirstlaunched, processUpdateConfig } from "./actions";
import { receiveDeviceMotion } from "models/accelerometer/events";

const startBootstrapApp = createEvent();
const completeBootstrapApp = createEvent();
const setAppfirstlaunched = createEvent();
const acceptWakelock = createEvent();

receiveEvent.watch((event) => {
	const eventType = event.detail.type;
	const eventData = event.detail.data;
	if (eventType === "VKWebAppUpdateConfig") {
		processUpdateConfig(eventData);
	} else if (eventType === "VKWebAppGetUserInfoResult") {
		receiveUserInfo(eventData);
	} else if (eventType === "VKWebAppGetUserInfoFailed") {
		receiveUserInfoError(eventData);
	} else if (eventType === "VKWebAppGetGeodataResult" || eventType === "VKWebAppGeodataResult") {
		receiveGeolocationResult(eventData);
	} else if (eventType === "VKWebAppGeodataFailed") {
		receiveGeolocationError(eventData);
	} else if (eventType === "VKWebAppStorageGetResult") {
		receiveStorageData(eventData);
	} else if (eventType === "VKWebAppStorageGetFailed") {
		receiveStorageDataError(eventData);
	} else if (eventType === "VKWebAppStorageSetResult") {
		receiveSetStorageData(eventData);
	} else if (eventType === "VKWebAppStorageSetFailed") {
		receiveSetStorageDataError(eventData);
	} else if (eventType === "VKWebAppDeviceMotionChanged") {
		receiveDeviceMotion(eventData);
	}
});

startBootstrapApp.watch(() => {
	bootstrapStorageData();
});

completeBootstrapApp.watch(() => {
	sendEvent({ event: "VKWebAppInit" });
	requestUserInfo();
	requestAccelerometer();
});

setAppfirstlaunched.watch(processSetAppfirstlaunched);
acceptWakelock.watch(processAcceptWakelock);

export {
	startBootstrapApp,
	completeBootstrapApp,
	setAppfirstlaunched,
	requestGeolocation,
	requestAccelerometer,
	acceptWakelock,
};
