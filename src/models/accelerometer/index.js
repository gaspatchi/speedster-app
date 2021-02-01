import { createEvent } from "effector";
import { processRequestAccelerometer, listenHardwareAccelerometerEvent } from "./actions";
import { receiveDeviceMotion } from "./events";

const requestAccelerometer = createEvent();

requestAccelerometer.watch(processRequestAccelerometer);
receiveDeviceMotion.watch(listenHardwareAccelerometerEvent);

export { requestAccelerometer };
