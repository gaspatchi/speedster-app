import { makeVar } from "@apollo/client";

const appBootstrapped = makeVar(false);
const appFirstLaunched = makeVar(true);
const appTheme = makeVar("light");
const currentPage = makeVar("navigation");
const waitGeolocationStatus = makeVar(false);
const geolocationModalVisible = makeVar(false);
const userInfo = makeVar(null);
const tripStarted = makeVar(false);
const loaderHidden = makeVar(false);
const modelLoaded = makeVar(false);
const canvasTapped = makeVar(false);
const deviceGpuTier = makeVar(0);
const wakelockAccepted = makeVar(false);
const workspaceVisible = makeVar(false);

export {
	appBootstrapped,
	appFirstLaunched,
	appTheme,
	currentPage,
	waitGeolocationStatus,
	geolocationModalVisible,
	userInfo,
	tripStarted,
	loaderHidden,
	modelLoaded,
	canvasTapped,
	deviceGpuTier,
	wakelockAccepted,
	workspaceVisible
};
