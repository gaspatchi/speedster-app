import { RetryLink } from "@apollo/client/link/retry";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import {
	appBootstrapped,
	appFirstLaunched,
	appTheme,
	deviceGpuTier,
	userInfo,
	geolocationAvailable,
	geolocationData,
	speedCalcTime,
	currentSpeed,
	accelerometerAvailable,
	accelerometerData,
	absoluteAngle,
	relativeAngle,
	tripStarted,
	loaderHidden,
	modelLoaded,
	canvasTapped,
	roadInfo,
	roadInfoLoading,
	geolocationTimeline,
	speedTimeline,
	currentTarget,
	geolocationGranted,
	waitGeolocationStatus,
	geolocationModalVisible,
	geolocationLoading,
	currentPage,
	wakelockAccepted,
	workspaceVisible
} from "./state";

const retrylink = new RetryLink();

const batchLink = new BatchHttpLink({
	uri: `https://speedster.xelza.ru/api`,
	batchMax: 3,
});

const link = from([retrylink, batchLink]);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					appStatus() {
						return {
							appBootstrapped: appBootstrapped(),
							appFirstLaunched: appFirstLaunched(),
							appTheme: appTheme(),
							currentPage: currentPage(),
							waitGeolocationStatus: waitGeolocationStatus(),
							geolocationModalVisible: geolocationModalVisible(),
							tripStarted: tripStarted(),
							loaderHidden: loaderHidden(),
							modelLoaded: modelLoaded(),
							canvasTapped: canvasTapped(),
							deviceGpuTier: deviceGpuTier(),
							wakelockAccepted: wakelockAccepted(),
							workspaceVisible: workspaceVisible()
						};
					},
					userStatus() {
						return {
							profile: userInfo(),
						};
					},
					geolocationStatus() {
						return {
							geolocationLoading: geolocationLoading(),
							granted: geolocationGranted(),
							available: geolocationAvailable(),
							data: geolocationData(),
							speedCalcTime: speedCalcTime(),
							currentSpeed: currentSpeed(),
							geolocationTimeline: geolocationTimeline(),
							speedTimeline: speedTimeline(),
						};
					},
					accelerometerStatus() {
						return {
							available: accelerometerAvailable(),
							data: accelerometerData(),
							absoluteAngle: absoluteAngle(),
							relativeAngle: relativeAngle(),
						};
					},
					tripStatus() {
						return {
							roadInfo: roadInfo(),
							roadInfoLoading: roadInfoLoading(),
							currentTarget: currentTarget(),
						};
					},
				},
			},
		},
	}),
});

export { client };
