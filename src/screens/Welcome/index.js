import React, { useState } from "react";
import { AnimatePresence, useIsPresent, motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";

import PageView from "components/PageView";
import WelcomeUserLocation from "components/WelcomeUserLocation";
import WelcomeHeader from "components/WelcomeHeader";
import WelcomeProgress from "components/WelcomeProgress";
import WelcomeCamsBackground from "components/WelcomeCamsBackground";
import WelcomeRoadBackground from "components/WelcomeRoadBackground";
import WelcomeSlidePanel from "components/WelcomeSlidePanel";
import GotoAction from "./GotoAction";
import PermissionActions from "./PermissionActions";

const GET_APP_THEME = gql`
	query GetAppTheme {
		appStatus {
			appTheme @client
		}
	}
`;

export default function Welcome() {
	const { data } = useQuery(GET_APP_THEME);
	const isPresent = useIsPresent();
	const [layoutAnimated, setLayoutAnimated] = useState(false);
	const [permissionsActive, setPermissionsActive] = useState(false);

	return (
		<PageView>
			<motion.div exit={{ opacity: 1 }}>
				<AnimatePresence>
					{isPresent &&
						(!permissionsActive ? (
							<WelcomeCamsBackground
								appTheme={data.appStatus.appTheme}
							></WelcomeCamsBackground>
						) : (
							<WelcomeRoadBackground
								appTheme={data.appStatus.appTheme}
							></WelcomeRoadBackground>
						))}
				</AnimatePresence>
				<AnimatePresence>
					{!permissionsActive && isPresent && (
						<WelcomeUserLocation
							appTheme={data.appStatus.appTheme}
						></WelcomeUserLocation>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{isPresent && (
						<WelcomeSlidePanel
							permissionsActive={permissionsActive}
							layoutAnimated={() => setLayoutAnimated(true)}
							topContent={
								<>
									<WelcomeHeader
										appTheme={data.appStatus.appTheme}
										permissionsActive={permissionsActive}
									></WelcomeHeader>
									<WelcomeProgress
										steps={2}
										activeStep={permissionsActive ? 2 : 1}
										contrast={permissionsActive}
									></WelcomeProgress>
								</>
							}
						>
							{!permissionsActive && (
								<GotoAction
									appTheme={data.appStatus.appTheme}
									goto={() => setPermissionsActive(true)}
								></GotoAction>
							)}
							<AnimatePresence>
								{permissionsActive && (
									<PermissionActions
										appTheme={data.appStatus.appTheme}
										layoutAnimated={layoutAnimated}
									></PermissionActions>
								)}
							</AnimatePresence>
						</WelcomeSlidePanel>
					)}
				</AnimatePresence>
			</motion.div>
		</PageView>
	);
}
