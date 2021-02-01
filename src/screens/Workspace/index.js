import React, { useCallback, useRef, useEffect, useMemo } from "react";
import NoSleep from "nosleep.js";
import { AnimatePresence } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import {
	currentPage,
	tripStarted,
	loaderHidden,
	modelLoaded,
	canvasTapped,
	waitGeolocationStatus,
	geolocationAvailable,
	workspaceVisible,
} from "graphql/state";
import { requestGeolocation, startListenGeolocation, stopListenGeolocation } from "models";
import PageView from "components/PageView";
import { NavigationBar } from "components/NavigationBar";
import RoadScene from "components/RoadScene";
import TravelSpeed from "components/TravelSpeed";
import SpeedLimit from "components/SpeedLimit";
import ObjectNotifier from "components/ObjectNotifier";
import WorkspaceHeader from "components/WorkspaceHeader";
import InfoSlider from "components/InfoSlider";
import TripStatus from "components/TripStatus";
import Notification from "components/Notification";
import Violation from "pages/Violation";
import Profile from "pages/Profile";

const GET_APP_STATUS = gql`
	query GetAppStatus {
		appStatus {
			appTheme @client
			currentPage @client
			tripStarted @client
			loaderHidden @client
			modelLoaded @client
			canvasTapped @client
			deviceGpuTier @client
		}
		geolocationStatus {
			geolocationLoading @client
			granted @client
			available @client
		}
		tripStatus {
			currentTarget @client
		}
		accelerometerStatus {
			relativeAngle @client
		}
	}
`;

export default function Workspace() {
	const noSleep = useRef(new NoSleep());
	const timerID = useRef(null);
	const { data } = useQuery(GET_APP_STATUS);

	const isTripStatusVisible = useMemo(
		() =>
			data.appStatus.currentPage === "navigation" &&
			((data.appStatus.loaderHidden && !data.appStatus.tripStarted) ||
				(data.appStatus.tripStarted && data.appStatus.canvasTapped)),
		[
			data.appStatus.canvasTapped,
			data.appStatus.currentPage,
			data.appStatus.loaderHidden,
			data.appStatus.tripStarted,
		]
	);
	const isNotificationVisible = useMemo(
		() => data.appStatus.currentPage === "navigation" && data.tripStatus.currentTarget,
		[data.appStatus.currentPage, data.tripStatus.currentTarget]
	);

	const isInfoSliderVisible = useMemo(
		() =>
			data.appStatus.currentPage === "navigation" &&
			data.appStatus.tripStarted &&
			!data.appStatus.canvasTapped,
		[data.appStatus.canvasTapped, data.appStatus.currentPage, data.appStatus.tripStarted]
	);

	const setCurrentPage = useCallback((page) => {
		currentPage(page);
	}, []);

	const startTrip = useCallback(() => {
		startListenGeolocation();
		tripStarted(true);
	}, []);

	const stopTrip = useCallback(() => {
		stopListenGeolocation();
		tripStarted(false);
		geolocationAvailable(false);
	}, []);

	const setCanvasTapState = useCallback(() => {
		clearTimeout(timerID.current);
		canvasTapped(true);
		timerID.current = setTimeout(() => {
			canvasTapped(false);
		}, 3000);
	}, []);

	useEffect(() => {
		clearTimeout(timerID.current);
	}, []);

	useEffect(() => {
		if (data.appStatus.tripStarted) {
			noSleep.current.enable();
			waitGeolocationStatus(false);
		} else {
			noSleep.current.disable();
			waitGeolocationStatus(true);
		}
	}, [data.appStatus.tripStarted]);

	return (
		<PageView>
			<WorkspaceHeader
				top={<TravelSpeed></TravelSpeed>}
				bottom={
					<>
						<AnimatePresence>
							{data.tripStatus.currentTarget && (
								<ObjectNotifier
									target={data.tripStatus.currentTarget}
								></ObjectNotifier>
							)}
						</AnimatePresence>
						<AnimatePresence>
							{data.appStatus.tripStarted && <SpeedLimit></SpeedLimit>}
						</AnimatePresence>
					</>
				}
			></WorkspaceHeader>

			<AnimatePresence>
				{isTripStatusVisible && (
					<TripStatus
						geolocationGranted={data.geolocationStatus.granted}
						geolocationAvailable={data.geolocationStatus.available}
						geolocationLoading={data.geolocationStatus.geolocationLoading}
						tripStarted={data.appStatus.tripStarted}
						requestGeolocation={requestGeolocation}
						startTrip={startTrip}
						stopTrip={stopTrip}
					></TripStatus>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isNotificationVisible && (
					<Notification target={data.tripStatus.currentTarget}></Notification>
				)}
			</AnimatePresence>

			<RoadScene
				appTheme={data.appStatus.appTheme}
				deviceGpuTier={data.appStatus.deviceGpuTier}
				tripStarted={data.appStatus.tripStarted}
				modelLoaded={data.appStatus.modelLoaded}
				loaderHidden={data.appStatus.loaderHidden}
				accelerometerAngle={data.accelerometerStatus.relativeAngle}
				onAnimationComplete={() => workspaceVisible(true)}
				onModelLoaded={() => modelLoaded(true)}
				onLoaderHidden={() => loaderHidden(true)}
				onCanvasTapped={setCanvasTapState}
			></RoadScene>
			<AnimatePresence>{isInfoSliderVisible && <InfoSlider></InfoSlider>}</AnimatePresence>
			<NavigationBar currentPage={data.appStatus.currentPage} setPage={setCurrentPage}>
				<AnimatePresence exitBeforeEnter>
					{/* {data.appStatus.currentPage === "violation" ? (
						<Violation></Violation>
					) : data.appStatus.currentPage === "profile" ? (
						<Profile></Profile>
					) : null} */}
					{data.appStatus.currentPage === "profile" && <Profile></Profile>}
				</AnimatePresence>
			</NavigationBar>
		</PageView>
	);
}
