import { sendEvent } from "models/bridge";
import { geolocationStore } from "./store";
import {
	requestGeolocation,
	receiveGeolocationResult,
	receiveGeolocationError,
	startListenGeolocation,
	stopListenGeolocation,
	setListenGeolocationTimer,
} from "./events";
import {
	processGeolocation,
	processGeolocationError,
	processListenGeolocation,
	processStopListenGeolocation,
} from "./actions";
import { geolocationLoading } from "graphql/state";

requestGeolocation.watch(() => {
	geolocationLoading(true);
	sendEvent({ event: "VKWebAppGetGeodata" });
});
receiveGeolocationResult.watch(processGeolocation);
receiveGeolocationError.watch(processGeolocationError);
startListenGeolocation.watch(processListenGeolocation);
stopListenGeolocation.watch(processStopListenGeolocation);

geolocationStore.on(setListenGeolocationTimer, (state, timerID) => ({
	...state,
	timerID,
}));

export {
	requestGeolocation,
	receiveGeolocationResult,
	receiveGeolocationError,
	startListenGeolocation,
	stopListenGeolocation,
};
