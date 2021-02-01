import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import NavigationPage from "components/NavigationPage";
import UserProfile from "components/UserProfile";
import ViolationCard from "components/ViolationCard";
import ViolationHeader from "components/ViolationHeader";
import ViolationCards from "components/ViolationCards";

const GET_USER_INFO = gql`
	query GetUserProfile {
		userStatus {
			profile @client
		}
	}
`;

export default function Violation() {
	const { t } = useTranslation();
	const { data } = useQuery(GET_USER_INFO);
	return (
		<NavigationPage identity="Violation">
			<UserProfile profile={data.userStatus.profile} slim></UserProfile>
			<ViolationHeader></ViolationHeader>
			<ViolationCards>
				<ViolationCard
					type="value"
					title={t("ViolationCard.stat.title")}
					description={t("ViolationCard.stat.description", {
						name: data.userStatus.profile?.firstName,
					})}
					value="0"
				></ViolationCard>
				<ViolationCard
					type="icon"
					identity="emblem"
					title={t("ViolationCard.fines.title")}
					description={t("ViolationCard.fines.description")}
				></ViolationCard>
			</ViolationCards>
		</NavigationPage>
	);
}
