import { useMemo } from "react";
import { useLocation } from "react-use";
import { DEVICE_PLATFORM } from "config";

export function useDevicePlatform() {
	const browserLocation = useLocation();
	const executionString = useMemo(() => browserLocation.search.slice(1), [browserLocation]);

	const devicePlatform = useMemo(() => {
		const platform = /vk_platform=(\w+)/gm.exec(executionString);
		if (platform) {
			return DEVICE_PLATFORM[platform[1]] ?? null;
		} else {
			return null;
		}
	}, [executionString]);

	return devicePlatform;
}
