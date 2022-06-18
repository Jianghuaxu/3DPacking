"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAttribute = void 0;
var __1 = require("..");
var tsHelper_1 = require("./tsHelper");
function convertAttribute(schema, value) {
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
            return new __1.TextRecognitionSettings(convertJsonToObject(value, schema.default));
        default:
            break;
    }
    // Trick to make sure all cases are covered:
    return (0, tsHelper_1.assertUnreachable)(schema);
}
exports.convertAttribute = convertAttribute;
function convertToBoolean(input, defaultValue) {
    return input == null ? defaultValue : input !== "false";
}
function convertToString(input, defaultValue) {
    return input !== null && input !== void 0 ? input : defaultValue;
}
function convertToInteger(input, defaultValue) {
    if (input == null) {
        return defaultValue;
    }
    var parsed = parseInt(input, 10);
    if (isNaN(parsed)) {
        return defaultValue;
    }
    return parsed;
}
function convertToArray(input, defaultValue) {
    if (input == null) {
        return defaultValue;
    }
    var json = toJson(input);
    if (json == null || !Array.isArray(json)) {
        return defaultValue;
    }
    return json;
}
function convertJsonToObject(input, defaultValue) {
    if (input == null) {
        return defaultValue;
    }
    var json = toJson(input);
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