import React from "react";

export default function ProfileMotd({ title, description }) {
	return (
		<div className="ProfileMotd">
			<div className="ProfileMotd__title">{title}</div>
			<div className="ProfileMotd__description">{description}</div>
		</div>
	);
}
