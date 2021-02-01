import React, { useMemo, useEffect, useCallback, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import { geolocationModalVisible } from "graphql/state";
import { useDevicePlatform } from "hooks";
import { acceptWakelock } from "models";
import ModalWindow from "components/ModalWindow";

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

const GET_COMPLEX_STATE = gql`
	query GetComplexState {
		appStatus {
			appBootstrapped @client
			appTheme @client
			waitGeolocationStatus @client
			geolocationModalVisible @client
			appFirstLaunched @client
			wakelockAccepted @client
			workspaceVisible @client
		}
	}
`;

export default function ModalProvider() {
	const currentPlatform = useDevicePlatform();
	const { data } = useQuery(GET_COMPLEX_STATE);
	const [modalState, setModalState] = useState({ visible: false, type: null });

	const inActiveState = useMemo(
		() =>
			data.appStatus.appBootstrapped &&
			((data.appStatus.waitGeolocationStatus && data.appStatus.geolocationModalVisible) ||
				(!data.appStatus.appFirstLaunched &&
					!data.appStatus.wakelockAccepted &&
					data.appStatus.workspaceVisible)),
		[data]
	);

	const modalMode = useMemo(
		() =>
			data.appStatus.geolocationModalVisible
				? "geolocation"
				: !data.appStatus.wakelockAccepted
				? "wakelock"
				: null,

		[data.appStatus.geolocationModalVisible, data.appStatus.wakelockAccepted]
	);

	const closeModal = useCallback(() => {
		if (modalMode === "geolocation") {
			geolocationModalVisible(false);
		} else if (modalMode === "wakelock") {
			acceptWakelock();
		}
	}, [modalMode]);

	useEffect(() => {
		if (inActiveState) {
			if (modalMode === "geolocation") {
				setModalState({
					visible: true,
					type: "geolocation",
				});
			} else if (modalMode === "wakelock") {
				if ("wakeLock" in navigator) {
					acceptWakelock();
				} else {
					setModalState({
						visible: true,
						type: "wakelock",
					});
				}
			}
		} else {
			setModalState({ type: modalState.type, visible: false });
		}
	}, [inActiveState, modalMode, modalState.type]);

	return (
		<AnimatePresence>
			{modalState.visible && (
				<motion.div
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={variants}
					transition={{ duration: 0.4 }}
					className="ModalWrapper"
				>
					<ModalWindow
						appTheme={data.appStatus.appTheme}
						type={modalState.type}
						platform={currentPlatform}
						close={closeModal}
					></ModalWindow>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
