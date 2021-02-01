import { userInfo } from "graphql/state";

const saveUserInfo = (event) => {
	const {
		photo_100: avatar,
		first_name: firstName,
		last_name: lastName,
		sex,
		city,
		country,
	} = event;

	const info = {
		avatar,
		firstName,
		lastName,
		sex,
		city,
		country,
	};
	userInfo(info);
};

export { saveUserInfo };
