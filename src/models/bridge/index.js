import { createEvent } from "effector";
// import bridge from "@vkontakte/vk-bridge-mock";
import bridge from "@vkontakte/vk-bridge";

const receiveEvent = createEvent();
const sendEvent = createEvent();

bridge.subscribe((event) => {
	receiveEvent(event);
});

sendEvent.watch(({ event, payload }) => {
	bridge.send(event, payload);
});

export { receiveEvent, sendEvent };
