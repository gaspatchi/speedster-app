import { useLocation } from "react-use";
import { useMemo } from "react";

export default function useUserParameters() {
	const browserLocation = useLocation();
	const executionString = useMemo(() => browserLocation.search.slice(1), [browserLocation]);
	const userParameters = useMemo(() => {
		const userID = /vk_user_id=(\d+)/gm.exec(executionString);
		return {
			id: userID ? +userID[1] : null,
			executionString,
		};
	}, [executionString]);
	return userParameters;
}
