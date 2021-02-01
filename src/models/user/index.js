import { createEvent } from "effector";
import { sendEvent } from "models/bridge";
import { saveUserInfo } from "./actions";

const requestUserInfo = createEvent();
const receiveUserInfo = createEvent();
const receiveUserInfoError = createEvent();

requestUserInfo.watch(() => sendEvent({ event: "VKWebAppGetUserInfo" }));
receiveUserInfo.watch(saveUserInfo);

export { requestUserInfo, receiveUserInfo, receiveUserInfoError };
