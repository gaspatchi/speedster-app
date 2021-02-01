import React from "react";
import { gql, useQuery } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { Welcome, Workspace } from "screens";

const GET_FIRSTLAUNCH_STATE = gql`
	query GetAppFirstLaunchedState {
		appStatus {
			appBootstrapped @client
			appFirstLaunched @client
		}
	}
`;

export default function ScreenProvider() {
	const { data } = useQuery(GET_FIRSTLAUNCH_STATE);

	return data.appStatus.appBootstrapped ? (
		<AnimatePresence exitBeforeEnter>
			{data.appStatus.appFirstLaunched ? (
				<Welcome key="Welcome"></Welcome>
			) : (
				<Workspace key="Workspace"></Workspace>
			)}
		</AnimatePresence>
	) : (
		<></>
	);
}
