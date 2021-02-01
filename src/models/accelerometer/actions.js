import {
	accelerometerAvailable,
	accelerometerData,
	absoluteAngle,
	relativeAngle,
} from "graphql/state";
import { getDevicePlatform, getDistance, processHardwareAngle } from "helpers";
import { throttle } from "lodash";
import { sendEvent } from "models/bridge";

let offsetAnglePosition = null;

const invalidateAccelerometerData = () => {
	setInterval(() => {
		const currentData = accelerometerData();
		if (currentData?.alpha) {
			offsetAnglePosition = accelerometerData().alpha;
			relativeAngle(0);
		}
	}, 5000);
};

const processAccelerometerData = (event) => {
	const currentAngle = event.alpha;
	absoluteAngle(currentAngle);
	if (offsetAnglePosition === null) {
		offsetAnglePosition = currentAngle;
		relativeAngle(0);
	} else {
		const newAngle = getDistance(currentAngle, offsetAnglePosition);
		relativeAngle(newAngle * -1);
	}
};

const listenBrowserAccelerometerEvent = () => {
	window.addEventListener(
		"deviceorientation",
		throttle((event) => {
			const processedEvent = {
				alpha: +event.alpha.toFixed(1),
				beta: +event.beta.toFixed(1),
				gamma: +event.gamma.toFixed(1),
			};
			accelerometerData(processedEvent);
			processAccelerometerData(processedEvent);
		}, 100)
	);
};

const listenHardwareAccelerometerEvent = throttle((event) => {
	const processedEvent = {
		alpha: processHardwareAngle(+event.alpha).toFixed(1),
		beta: processHardwareAngle(+event.beta).toFixed(1),
		gamma: processHardwareAngle(+event.gamma).toFixed(1),
	};
	accelerometerData(processedEvent);
	processAccelerometerData(processedEvent);
}, 50);

const processRequestAccelerometer = async () => {
	const devicePlatform = getDevicePlatform();
	if (devicePlatform === "android") {
		if (window.DeviceOrientationEvent) {
			listenBrowserAccelerometerEvent();
			invalidateAccelerometerData();
			accelerometerAvailable(true);
		} else {
			accelerometerAvailable(false);
		}
	} else if (devicePlatform === "ios") {
		// sendEvent({ event: "VKWebAppDeviceMotionStart" });
		invalidateAccelerometerData();
		accelerometerAvailable(true);
	} else {
		accelerometerAvailable(false);
	}
};

export { processRequestAccelerometer, listenHardwareAccelerometerEvent };
