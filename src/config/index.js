const APP_BOOTSTRAP_KEYS = [
	"firstLaunched",
	"objectTypes",
	"geolocationGranted",
	"wakelockAccepted",
];

const DEFAULT_OBJECTS_TYPES = [
	"STATIC_CAMERA",
	"BUILTIN_CAMERA",
	"REDLIGHT_CAMERA",
	"AVERAGESPEED_CAMERA",
	"MOBILE_CAMERA",
	"SPEED_LIMIT",
	"SPEED_BUMP",
	"BAD_ROAD",
	"DANGEROUS_DIRECTION",
	"DANGEROUS_INTERSECTION",
	"ANOTHER_DANGER",
];
const CAMERA_ROTATION_ANGLE_LIMIT = 5;
const CAMERA_POSITION_LIMIT = 0.5;

const ROAD_OBJECTS_TYPES = {
	STATIC_CAMERA: "camera",
	BUILTIN_CAMERA: "camera",
	REDLIGHT_CAMERA: "camera",
	AVERAGESPEED_CAMERA: "camera",
	MOBILE_CAMERA: "camera",
	SPEED_LIMIT: "sign",
	SPEED_BUMP: "object",
	BAD_ROAD: "alert",
	DANGEROUS_DIRECTION: "alert",
	DANGEROUS_INTERSECTION: "alert",
	ANOTHER_DANGER: "alert",
};

const COLOR_SCHEMES = {
	client_light: "light",
	bright_light: "light",
	client_dark: "dark",
	space_gray: "dark",
};

const APP_GROUP = "https://vk.com/speedster_app";

const DEFAULT_SPEEDLIMIT = 60;

const ROAD_INFO_DISTANCE = 0.2; //200m
const NEIGHBORS_BUFFER_RADIUS = 0.8; //800m

const DEVICE_PLATFORM = {
	mobile_android: "android",
	mobile_iphone: "ios",
	mobile_android_messenger: "android",
	mobile_iphone_messenger: "ios",
};

export {
	APP_BOOTSTRAP_KEYS,
	DEFAULT_OBJECTS_TYPES,
	CAMERA_ROTATION_ANGLE_LIMIT,
	CAMERA_POSITION_LIMIT,
	ROAD_OBJECTS_TYPES,
	COLOR_SCHEMES,
	APP_GROUP,
	DEFAULT_SPEEDLIMIT,
	ROAD_INFO_DISTANCE,
	NEIGHBORS_BUFFER_RADIUS,
	DEVICE_PLATFORM,
};
