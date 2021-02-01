import { makeVar } from "@apollo/client";

const objectsTypes = makeVar([]);
const roadInfo = makeVar(null);
const roadInfoLoading = makeVar(false);
const currentTarget = makeVar(null);

export { objectsTypes, roadInfo, roadInfoLoading, currentTarget };
