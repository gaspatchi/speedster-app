import { APP_BOOTSTRAP_KEYS } from "config";
import { sendEvent } from "models/bridge";
import {
	bootstrapStorageData,
	getStorageData,
	receiveStorageData,
	receiveStorageDataError,
	setStorageData,
	receiveSetStorageData,
	receiveSetStorageDataError,
	validateGeolocationStatus,
} from "./events";
import { processData, processValidateGeolocationStatus } from "./actions";

bootstrapStorageData.watch(() => {
	getStorageData(APP_BOOTSTRAP_KEYS);
});

getStorageData.watch((keys) =>
	sendEvent({
		event: "VKWebAppStorageGet",
		payload: {
			keys,
		},
	})
);

setStorageData.watch(({ key, payload }) => {
	sendEvent({
		event: "VKWebAppStorageSet",
		payload: {
			key,
			value: JSON.stringify(payload),
		},
	});
});

receiveStorageData.watch(processData);
validateGeolocationStatus.watch(processValidateGeolocationStatus);

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
