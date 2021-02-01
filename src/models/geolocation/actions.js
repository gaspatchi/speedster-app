import { getTime } from "date-fns";
import { sendEvent } from "models/bridge";
import {
	geolocationAvailable,
	geolocationData,
	geolocationLoading,
	geolocationModalVisible,
	waitGeolocationStatus,
} from "graphql/state";
import { setListenGeolocationTimer } from "./events";
import { geolocationStore } from "./store";
import { validateGeolocationStatus } from "models/storage";

const processListenGeolocation = () => {
	sendEvent({ event: "VKWebAppGetGeodata" });
	const timerID = setInterval(() => {
		sendEvent({ event: "VKWebAppGetGeodata" });
	}, 2000);
	setListenGeolocationTimer(timerID);
};

const processStopListenGeolocation = () => {
	clearInterval(geolocationStore.getState().timerID);
	setListenGeolocationTimer(null);
};

const processGeolocation = (event) => {
	const eventGeolocationState = !!event.available;
	if (eventGeolocationState) {
		const eventData = {
			lat: +event.lat,
			lon: +event.long,
			time: getTime(new Date()),
		};
		geolocationData(eventData);
	}
	geolocationLoading(false);
	if (waitGeolocationStatus()) {
		geolocationModalVisible(!eventGeolocationState);
	}
	validateGeolocationStatus(eventGeolocationState);
	geolocationAvailable(eventGeolocationState);
};
const processGeolocationError = (event) => {
	geolocationLoading(false);
	if (waitGeolocationStatus()) {
		geolocationModalVisible(true);
	}
	geolocationAvailable(false);
};

export {
	processGeolocation,
	processGeolocationError,
	processListenGeolocation,
	processStopListenGeolocation,
};
