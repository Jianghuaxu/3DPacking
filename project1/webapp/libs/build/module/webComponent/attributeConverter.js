import { TextRecognitionSettings } from "..";
import { assertUnreachable } from "./tsHelper";
export function convertAttribute(schema, value) {
    switch (schema.type) {
        case "boolean":
            return convertToBoolean(value, schema.default);
        case "string":
        case "guiStyle":
        case "cameraType":
        case "videoFit":
        case "codeDirection":
        case "recognitionMode":
            return convertToString(value, schema.default);
        case "array":
            return convertToArray(value, schema.default);
        case "integer":
            return convertToInteger(value, schema.default);
        case "searchArea":
        case "camera":
        case "cameraSettings":
        case "singleImageModeSettings":
            return convertJsonToObject(value, schema.default);
        case "textRecognitionSettings":
            return new TextRecognitionSettings(convertJsonToObject(value, schema.default));
        default:
            break;
    }
    // Trick to make sure all cases are covered:
    return assertUnreachable(schema);
}
function convertToBoolean(input, defaultValue) {
    return input == null ? defaultValue : input !== "false";
}
function convertToString(input, defaultValue) {
    return input ?? defaultValue;
}
function convertToInteger(input, defaultValue) {
    if (input == null) {
        return defaultValue;
    }
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) {
        return defaultValue;
    }
    return parsed;
}
function convertToArray(input, defaultValue) {
    if (input == null) {
        return defaultValue;
    }
    const json = toJson(input);
    if (json == null || !Array.isArray(json)) {
        return defaultValue;
    }
    return json;
}
function convertJsonToObject(input, defaultValue) {
    if (input == null) {
        return defaultValue;
    }
    const json = toJson(input);
    if (json == null) {
        return defaultValue;
    }
    // must be an object
    if (Array.isArray(json) || typeof json === "number") {
        return defaultValue;
    }
    return json;
}
function toJson(input) {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return;
    }
}
//# sourceMappingURL=attributeConverter.js.map