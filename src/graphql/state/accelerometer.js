import { makeVar } from "@apollo/client";

const accelerometerAvailable = makeVar(false);
const accelerometerData = makeVar(null);
const absoluteAngle = makeVar(0);
const relativeAngle = makeVar(0);

export { accelerometerAvailable, accelerometerData, absoluteAngle, relativeAngle };
