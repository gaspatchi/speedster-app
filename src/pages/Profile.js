import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import NavigationPage from "components/NavigationPage";
import UserProfile from "components/UserProfile";
import ProfileMotd from "components/ProfileMotd";
import ProfileGoto from "components/ProfileGoto";

const GET_USER_INFO = gql`
	query GetUserProfile {
		userStatus {
			profile @client
		}
	}
`;

export default function Profile() {
	const { t } = useTranslation();
	const { data } = useQuery(GET_USER_INFO);

	return (
		<NavigationPage identity="Profile">
			<UserProfile profile={data.userStatus.profile}></UserProfile>
			<ProfileMotd
				title={t("ProfileMotd.title")}
				description={t("ProfileMotd.description")}
			></ProfileMotd>
			<ProfileGoto title={t("ProfileGoto.title")} goto={t("ProfileGoto.goto")}></ProfileGoto>
		</NavigationPage>
	);
}
