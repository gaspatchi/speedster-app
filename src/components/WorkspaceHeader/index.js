import React from "react";

export default function WorkspaceHeader({ top, bottom }) {
	return (
		<div className="WorkspaceHeader">
			<div className="WorkspaceHeader__top">{top}</div>
			<div className="WorkspaceHeader__separator"></div>
			<div className="WorkspaceHeader__bottom">{bottom}</div>
		</div>
	);
}
