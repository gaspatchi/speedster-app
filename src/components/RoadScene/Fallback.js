import React from "react";
import { useUnmount } from "react-use";

export default function Fallback({ unmounted }) {
	useUnmount(unmounted);
	return <></>;
}
