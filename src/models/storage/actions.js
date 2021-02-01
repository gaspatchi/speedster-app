import { filter, isEmpty } from "lodash";
import { APP_BOOTSTRAP_KEYS, DEFAULT_OBJECTS_TYPES } from "config";
import {
	appFirstLaunched,
	appBootstrapped,
	objectsTypes,
	geolocationGranted,
	wakelockAccepted,
} from "graphql/state";
import { setStorageData } from "./events";

function processFirstLaunched(item) {
	if (isEmpty(item.value)) {
		appFirstLaunched(true);
	} else {
		const parsedValue = JSON.parse(item.value);
		appFirstLaunched(parsedValue.state);
	}
}

function processObjectTypes(item) {
	if (isEmpty(item.value)) {
		objectsTypes(DEFAULT_OBJECTS_TYPES);
	} else {
		const parsedValue = JSON.parse(item.value);
		objectsTypes(parsedValue.state);
	}
}

function processGeolocationGranted(item) {
	if (isEmpty(item.value)) {
		geolocationGranted(false);
	} else {
		const parsedValue = JSON.parse(item.value);
		geolocationGranted(parsedValue.state);
	}
}

function processWakelockAccepted(item) {
	if (isEmpty(item.value)) {
		geolocationGranted(false);
	} else {
		const parsedValue = JSON.parse(item.value);
		wakelockAccepted(parsedValue.state);
	}
}

const processAppData = (data) => {
	for (const item of data) {
		switch (item.key) {
			case "firstLaunched":
				processFirstLaunched(item);
				break;
			case "objectTypes":
				processObjectTypes(item);
				break;
			case "geolocationGranted":
				processGeolocationGranted(item);
				break;
			case "wakelockAccepted":
				processWakelockAccepted(item);
				break;
			default:
				break;
		}
	}
};

const processData = (event) => {
	const appData = filter(event.keys, (key) => APP_BOOTSTRAP_KEYS.includes(key.key));
	if (!isEmpty(appData)) processAppData(appData);
	if (appBootstrapped() !== true) appBootstrapped(true);
};

const processValidateGeolocationStatus = (newState) => {
	const currentStatus = geolocationGranted();
	if (currentStatus === false && newState) {
		geolocationGranted(newState);
		setStorageData({
			key: "geolocationGranted",
			payload: {
				state: true,
			},
		});
	}
};

export { processData, processValidateGeolocationStatus };
