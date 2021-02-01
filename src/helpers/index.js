import { distance, point } from "@turf/turf";
import { DEVICE_PLATFORM } from "config";

export function getDistance(angle1, angle2) {
	let phi = Math.abs(angle2 - angle1) % 360;
	let sign = 1;
	let result;

	if (
		!(angle1 - angle2 >= 0 && angle1 - angle2 <= 180) ||
		(angle1 - angle2 <= -180 && angle1 - angle2 >= -360)
	) {
		sign = -1;
	}
	if (phi > 180) {
		result = 360 - phi;
	} else {
		result = phi;
	}
	return result * sign;
}

export function calculateSpeed(lastGeolocation, newGeolocation) {
	let calculatedSpeed;
	const pointsDistance = distance(
		point([lastGeolocation.lon, lastGeolocation.lat]),
		point([newGeolocation.lon, newGeolocation.lat])
	);
	const pointsTimeDiff = newGeolocation.time - lastGeolocation.time;
	if (pointsDistance || pointsTimeDiff) {
		calculatedSpeed = +((pointsDistance / pointsTimeDiff) * 3600 * 1000).toFixed();
	} else {
		calculatedSpeed = 0;
	}
	return calculatedSpeed;
}

export function calculateDistance(lastGeolocation, newGeolocation) {
	const pointsDistance = distance(
		point([lastGeolocation.lon, lastGeolocation.lat]),
		point([newGeolocation.lon, newGeolocation.lat])
	);
	return pointsDistance;
}

export function getDevicePlatform() {
	const launchString = window.location.search.slice(1);
	const platform = /vk_platform=(\w+)/gm.exec(launchString);
	if (platform) {
		return DEVICE_PLATFORM[platform[1]] ?? null;
	} else {
		return null;
	}
}

export function processHardwareAngle(angle) {
	return ((angle > 0 ? angle : 2 * Math.PI + angle) * 360) / (2 * Math.PI);
}
