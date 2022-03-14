import { BarcodePicker, Camera, ScanSettings, SearchArea, SingleImageModeSettings, TextRecognitionSettings } from "..";
export declare enum Attribute {
    ACCESS_CAMERA = "accessCamera",
    CAMERA = "camera",
    CAMERA_SETTINGS = "cameraSettings",
    CAMERA_TYPE = "cameraType",
    CONFIGURE = "configure",
    ENABLE_CAMERA_SWITCHER = "enableCameraSwitcher",
    ENABLE_PINCH_TO_ZOOM = "enablePinchToZoom",
    ENABLE_TAP_TO_FOCUS = "enableTapToFocus",
    ENABLE_TORCH_TOGGLE = "enableTorchToggle",
    GUI_STYLE = "guiStyle",
    LASER_AREA = "laserArea",
    PLAY_SOUND_ON_SCAN = "playSoundOnScan",
    SCANNING_PAUSED = "scanningPaused",
    SINGLE_IMAGE_MODE_SETTINGS = "singleImageModeSettings",
    TARGET_SCANNING_FPS = "targetScanningFPS",
    VIBRATE_ON_SCAN = "vibrateOnScan",
    VIDEO_FIT = "videoFit",
    VIEWFINDER_AREA = "viewfinderArea",
    VISIBLE = "visible",
    CONFIGURE_ENGINE_LOCATION = "configure.engineLocation",
    CONFIGURE_LICENSE_KEY = "configure.licenseKey",
    CONFIGURE_HIGH_QUALITY_BLURRY_RECOGNITION = "configure.highQualityBlurryRecognition",
    CONFIGURE_LOAD_TEXT_RECOGNITION = "configure.loadTextRecognition",
    CONFIGURE_PRELOAD_BLURRY_RECOGNITION = "configure.preloadBlurryRecognition",
    CONFIGURE_PRELOAD_ENGINE = "configure.preloadEngine",
    SCAN_SETTINGS_BLURRY_RECOGNITION = "scanSettings.blurryRecognition",
    SCAN_SETTINGS_CODE_DIRECTION_HINT = "scanSettings.codeDirectionHint",
    SCAN_SETTINGS_CODE_DUPLICATE_FILTER = "scanSettings.codeDuplicateFilter",
    SCAN_SETTINGS_DEVICE_NAME = "scanSettings.deviceName",
    SCAN_SETTINGS_ENABLED_SYMBOLOGIES = "scanSettings.enabledSymbologies",
    SCAN_SETTINGS_GPU_ACCELERATION = "scanSettings.gpuAcceleration",
    SCAN_SETTINGS_MAX_NUMBER_OF_CODES_PER_FRAME = "scanSettings.maxNumberOfCodesPerFrame",
    SCAN_SETTINGS_RECOGNITION_MODE = "scanSettings.recognitionMode",
    SCAN_SETTINGS_SEARCH_AREA = "scanSettings.searchArea",
    SCAN_SETTINGS_TEXT_RECOGNITION_SETTINGS = "scanSettings.textRecognitionSettings"
}
export declare const attributes: Attribute[];
export declare function getSchema(): {
    [key in Attribute]: AttributeDescriptor;
};
declare type AttributeType = "boolean" | "string" | "integer" | "array" | "videoFit" | "camera" | "cameraSettings" | "cameraType" | "guiStyle" | "searchArea" | "codeDirection" | "recognitionMode" | "singleImageModeSettings" | "textRecognitionSettings";
export declare type AttributeDescriptor = StringValue | BooleanValue | IntegerValue | ArrayValue | VideoFitValue | CameraValue | CameraSettings | CameraTypeValue | GuiStyleValue | SearchAreaValue | CodeDirectionValue | RecognitionModeValue | SingleImageModeSettingsValue | TextRecognitionSettingsValue;
interface GenericValue {
    type: AttributeType;
}
interface BooleanValue extends GenericValue {
    type: "boolean";
    default: boolean;
}
interface StringValue extends GenericValue {
    type: "string";
    default?: string;
}
interface IntegerValue extends GenericValue {
    type: "integer";
    default?: number;
}
interface ArrayValue extends GenericValue {
    type: "array";
    default?: string[] | number[];
}
interface VideoFitValue extends GenericValue {
    type: "videoFit";
    default?: BarcodePicker.ObjectFit;
}
interface CameraValue extends GenericValue {
    type: "camera";
    default?: Camera;
}
interface CameraSettings extends GenericValue {
    type: "cameraSettings";
    default?: CameraSettings;
}
interface CameraTypeValue extends GenericValue {
    type: "cameraType";
    default?: Camera.Type;
}
interface GuiStyleValue extends GenericValue {
    type: "guiStyle";
    default?: BarcodePicker.GuiStyle;
}
interface SearchAreaValue extends GenericValue {
    type: "searchArea";
    default?: SearchArea;
}
interface CodeDirectionValue extends GenericValue {
    type: "codeDirection";
    default?: ScanSettings.CodeDirection;
}
interface RecognitionModeValue extends GenericValue {
    type: "recognitionMode";
    default?: ScanSettings.RecognitionMode;
}
interface SingleImageModeSettingsValue extends GenericValue {
    type: "singleImageModeSettings";
    default?: SingleImageModeSettings;
}
interface TextRecognitionSettingsValue extends GenericValue {
    type: "textRecognitionSettings";
    default?: TextRecognitionSettings;
}
export {};
