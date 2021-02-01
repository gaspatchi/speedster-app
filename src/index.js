import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import "@vkontakte/vkui/dist/vkui.css";
import "./assets/styles/main.scss";
import App from "./App";

ReactDOM.unstable_createRoot(document.getElementById("root")).render(<App />);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
	// eslint-disable-next-line no-unused-vars
	import("./Eruda").then(({ default: eruda }) => {});
}
