import { COLOR_SCHEMES } from "config";
import { setStorageData } from "models/storage";
import { appTheme, appFirstLaunched, geolocationGranted, wakelockAccepted } from "graphql/state";

const processSetAppfirstlaunched = () => {
	appFirstLaunched(false);
	setStorageData({
		key: "firstLaunched",
		payload: {
			state: false,
		},
	});
	setStorageData({
		key: "geolocationGranted",
		payload: {
			state: geolocationGranted(),
		},
	});
};

const processUpdateConfig = (data) => {
	appTheme(COLOR_SCHEMES[data.scheme]);
};

const processAcceptWakelock = () => {
	wakelockAccepted(true);
	setStorageData({
		key: "wakelockAccepted",
		payload: {
			state: true,
		},
	});
};

export { processSetAppfirstlaunched, processUpdateConfig, processAcceptWakelock };
