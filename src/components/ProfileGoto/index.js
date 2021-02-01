import React from "react";
import { APP_GROUP } from "config";

export default function ProfileGoto({ title, goto }) {
	return (
		<div className="ProfileGoto">
			<div className="ProfileGoto__title">{title}</div>
			<a className="ProfileGoto__goto" href={APP_GROUP}>
				{goto}
			</a>
		</div>
	);
}
