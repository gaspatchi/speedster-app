import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { startBootstrapApp, completeBootstrapApp } from "models";
import { deviceGpuTier } from "graphql/state";
import { getGPUTier } from "detect-gpu";

const GET_BOOTSTRAP_STATE = gql`
	query GetBootstrapState {
		appStatus {
			appBootstrapped @client
			appTheme @client
		}
	}
`;

export default function AppProvider() {
	const { data } = useQuery(GET_BOOTSTRAP_STATE);

	useEffect(() => {
		startBootstrapApp();
	}, []);

	useEffect(() => {
		setTimeout(async () => {
			const data = await getGPUTier({
				mobileTiers: [40, 65, 70],
			});
			deviceGpuTier(+data.tier);
		}, 1000);
	}, []);

	useEffect(() => {
		document.body.dataset.theme = data.appStatus.appTheme;
	}, [data.appStatus.appTheme]);

	useEffect(() => {
		if (data.appStatus.appBootstrapped) completeBootstrapApp();
	}, [data.appStatus.appBootstrapped]);

	return <></>;
}
