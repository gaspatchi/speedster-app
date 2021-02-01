import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql";
import {
	AppProvider,
	ModalProvider,
	ScreenProvider,
	RoadInfoProvider,
	GeolocationProvider,
	NeighboringObjectsProvider,
} from "./providers";

function App() {
	return (
		<ApolloProvider client={client}>
			<AppProvider></AppProvider>
			<GeolocationProvider></GeolocationProvider>
			<RoadInfoProvider></RoadInfoProvider>
			<NeighboringObjectsProvider></NeighboringObjectsProvider>
			<ModalProvider></ModalProvider>
			<ScreenProvider></ScreenProvider>
		</ApolloProvider>
	);
}

export default App;
