"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataCaptureWorkerBlob = exports.dataCapture = void 0;
var tslib_1 = require("tslib");
/**
 * @hidden
 *
 * @returns DataCapture
 */
// tslint:disable-next-line:max-func-body-length
function dataCapture() {
    var writableDataPathPreload = "/scandit_sync_folder_preload";
    var writableDataPathStandard = "/scandit_sync_folder";
    var resourceFilesSubfolder = "resources";
    var scanQueue = [];
    var parseQueue = [];
    var gpuAccelerationAvailable = typeof self.OffscreenCanvas === "function";
    var originalFSSyncfs;
    var imageBufferPointer;
    var imageBufferSize;
    var preloading;
    var writableDataPath;
    var resourceFilesDataPath;
    var delayedRegistration;
    var highEndBlurryRecognition;
    var licenseKey;
    var scanSettings;
    var imageSettings;
    var recognitionMode;
    var cameraProperties;
    var deviceName;
    var blurryRecognitionAvailable = false;
    var workSubmitted = false;
    var loadingInProgress = false;
    var fileSystemSynced = false;
    var runtimeLoaded = false;
    var wasmReady = false;
    var scannerSettingsReady = false;
    var scannerImageSettingsReady = false;
    var contextAvailable = false;
    var fsSyncPromise = Promise.resolve();
    var fsSyncInProgress = false;
    var fsSyncScheduled = false;
    // Public
    // Promise result is used only during testing
    // tslint:disable-next-line: parameters-max-number
    function loadLibrary(deviceId, libraryLocation, locationPath, preload, newDelayedRegistration, newHighEndBlurryRecognition, textRecognition, newLicenseKey, deviceModelName) {
        function reportLoadSuccess() {
            postMessage(["library-loaded"]);
            createContext(newDelayedRegistration, newHighEndBlurryRecognition, newLicenseKey);
        }
        function start() {
            if (!wasmReady && fileSystemSynced && runtimeLoaded) {
                loadingInProgress = false;
                Module.callMain();
                wasmReady = true;
                reportLoadSuccess();
                if (!newDelayedRegistration) {
                    workOnScanQueue();
                    workOnParseQueue();
                }
            }
        }
        if (loadingInProgress) {
            return Promise.resolve();
        }
        if (wasmReady) {
            reportLoadSuccess();
            return Promise.resolve();
        }
        loadingInProgress = true;
        // Sample WebAssembly WAT SIMD Program, containing i8x16.popcnt as part of one of the latest SIMD opcodes
        // (module
        //   (func (result v128)
        //     i32.const 1
        //     i8x16.splat
        //     i8x16.popcnt
        //   )
        // )
        var simdSupport = WebAssembly.validate(new Uint8Array([
            0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 1, 253, 15, 253, 98, 11,
        ]));
        var _a = getLibraryLocationURIs(libraryLocation, textRecognition, simdSupport), jsURI = _a.jsURI, wasmURI = _a.wasmURI;
        preloading = preload;
        writableDataPath = preload ? writableDataPathPreload : writableDataPathStandard;
        resourceFilesDataPath = "".concat(libraryLocation).concat(resourceFilesSubfolder, "/");
        highEndBlurryRecognition = newHighEndBlurryRecognition;
        self.window = self.document = self; // Fix some Emscripten quirks
        self.path = locationPath; // Used by the Scandit Data Capture library
        self.deviceModelName = deviceModelName; // Used by the Scandit Data Capture library
        Module = {
            arguments: [deviceId],
            canvas: gpuAccelerationAvailable ? new self.OffscreenCanvas(32, 32) : /* istanbul ignore next */ undefined,
            instantiateWasm: function (importObject, successCallback) {
                var _a;
                // wasmJSVersion is globally defined inside scandit-engine-sdk.min.js
                var wasmJSVersion = (_a = self.wasmJSVersion) !== null && _a !== void 0 ? _a : "undefined";
                // istanbul ignore if
                if (wasmJSVersion !== "5.12.0") {
                    log("error", "The Scandit Data Capture library JS file found at ".concat(jsURI, " seems invalid: ") +
                        "expected version doesn't match (received: ".concat(wasmJSVersion, ", expected: ").concat("5.12.0", "). ") +
                        "Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.");
                }
                if (typeof self.WebAssembly.instantiateStreaming === "function") {
                    instantiateWebAssemblyStreaming(importObject, wasmURI, textRecognition, simdSupport, successCallback);
                }
                else {
                    instantiateWebAssembly(importObject, wasmURI, textRecognition, simdSupport, successCallback);
                }
                return {};
            },
            noInitialRun: true,
            preRun: [
                function () {
                    return setupFS()
                        .catch(function (error) {
                        log("debug", "No IndexedDB support, some data will not be persisted:", error);
                    })
                        .then(function () {
                        fileSystemSynced = true;
                        start();
                    });
                },
            ],
            onRuntimeInitialized: function () {
                runtimeLoaded = true;
                start();
            },
            // tslint:disable-next-line: no-any
            print: function () {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i] = arguments[_i];
                }
                log.apply(void 0, tslib_1.__spreadArray(["info"], tslib_1.__read(data), false));
            },
            // tslint:disable-next-line: no-any
            printErr: function () {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i] = arguments[_i];
                }
                log.apply(void 0, tslib_1.__spreadArray(["error"], tslib_1.__read(data), false));
            },
        };
        function tryImportScripts() {
            var _a;
            try {
                return (_a = importScripts(jsURI)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        return retryWithExponentialBackoff(tryImportScripts, 250, 4000, function (error) {
            log("warn", error);
            log("warn", "Couldn't retrieve Scandit Data Capture library at ".concat(jsURI, ", retrying..."));
        }).catch(function (error) {
            log("error", error);
            log("error", "Couldn't retrieve Scandit Data Capture library at ".concat(jsURI, ", did you configure the path for it correctly?"));
            return Promise.resolve(error); // Promise is used only during testing
        });
    }
    function createContext(
    // tslint:disable-next-line: bool-param-default
    newDelayedRegistration, 
    // tslint:disable-next-line: bool-param-default
    newHighEndBlurryRecognition, newLicenseKey) {
        function completeCreateContext() {
            postMessage([
                "context-created",
                {
                    hiddenScanditLogoAllowed: Module._can_hide_logo() === 1,
                },
            ]);
        }
        if (contextAvailable) {
            return completeCreateContext();
        }
        if (newDelayedRegistration != null) {
            delayedRegistration = newDelayedRegistration;
        }
        if (newHighEndBlurryRecognition != null) {
            highEndBlurryRecognition = newHighEndBlurryRecognition;
        }
        if (newLicenseKey != null) {
            licenseKey = newLicenseKey;
        }
        if (!wasmReady ||
            delayedRegistration == null ||
            highEndBlurryRecognition == null ||
            (!workSubmitted && !delayedRegistration) ||
            licenseKey == null) {
            return;
        }
        var licenseKeyLength = lengthBytesUTF8(licenseKey) + 1;
        var licenseKeyPointer = Module._malloc(licenseKeyLength);
        stringToUTF8(licenseKey, licenseKeyPointer, licenseKeyLength);
        var writableDataPathLength = lengthBytesUTF8(writableDataPath) + 1;
        var writableDataPathPointer = Module._malloc(writableDataPathLength);
        stringToUTF8(writableDataPath, writableDataPathPointer, writableDataPathLength);
        var resourceFilesDataPathLength = lengthBytesUTF8(resourceFilesDataPath) + 1;
        var resourceFilesDataPathPointer = Module._malloc(resourceFilesDataPathLength);
        stringToUTF8(resourceFilesDataPath, resourceFilesDataPathPointer, resourceFilesDataPathLength);
        Module._create_context(licenseKeyPointer, writableDataPathPointer, delayedRegistration, highEndBlurryRecognition, resourceFilesDataPathPointer, false);
        Module._free(licenseKeyPointer);
        Module._free(writableDataPathPointer);
        Module._free(resourceFilesDataPathPointer);
        contextAvailable = true;
        reportCameraProperties();
        reportDeviceName();
        completeCreateContext();
    }
    function setScanSettings(newScanSettings, newBlurryRecognitionAvailable, blurryRecognitionRequiresUpdate) {
        function completeSetScanSettings() {
            scanSettings = newScanSettings;
            blurryRecognitionAvailable = newBlurryRecognitionAvailable;
            applyScanSettings();
            workOnScanQueue();
        }
        scanSettings = undefined;
        scannerSettingsReady = false;
        if (newBlurryRecognitionAvailable && blurryRecognitionRequiresUpdate) {
            syncFS(true, false, true).then(completeSetScanSettings).catch(completeSetScanSettings);
        }
        else {
            completeSetScanSettings();
        }
    }
    function setImageSettings(newImageSettings) {
        imageSettings = newImageSettings;
        applyImageSettings();
        workOnScanQueue();
    }
    function augmentErrorInformation(error) {
        var _a;
        if (error.errorCode === 260) {
            var hostname = void 0;
            // istanbul ignore if
            if (((_a = location.href) === null || _a === void 0 ? void 0 : _a.indexOf("blob:null/")) === 0) {
                hostname = "localhost";
            }
            else {
                hostname = new URL(location.pathname != null && location.pathname !== "" && !location.pathname.startsWith("/")
                    ? /* istanbul ignore next */ location.pathname
                    : location.origin).hostname;
            }
            // istanbul ignore next
            if (hostname[0].startsWith("[") && hostname.endsWith("]")) {
                hostname = hostname.slice(1, -1);
            }
            error.errorMessage = error.errorMessage.replace("domain name", "domain name (".concat(hostname, ")"));
        }
        // License Key related error codes from 6 to 25 and 260
        if ([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 260].includes(error.errorCode) &&
            licenseKey != null &&
            licenseKey.length > 0) {
            error.errorMessage += " License Key: ".concat(licenseKey.slice(0, 15), "...");
        }
    }
    function processScanWorkUnit(scanWorkUnit) {
        if (scanWorkUnit.highQualitySingleFrameMode) {
            applyScanSettings(true);
        }
        var resultData = scanImage(scanWorkUnit.data);
        if (scanWorkUnit.highQualitySingleFrameMode) {
            applyScanSettings(false);
        }
        var result = JSON.parse(resultData);
        if (result.error != null) {
            augmentErrorInformation(result.error);
            postMessage([
                "work-error",
                {
                    requestId: scanWorkUnit.requestId,
                    error: result.error,
                },
                scanWorkUnit.data,
            ], [scanWorkUnit.data.buffer]);
        }
        else {
            // istanbul ignore else
            if (result.barcodeResult != null && result.textResult != null) {
                postMessage([
                    "work-result",
                    {
                        requestId: scanWorkUnit.requestId,
                        result: {
                            barcodes: result.barcodeResult,
                            texts: result.textResult,
                        },
                    },
                    scanWorkUnit.data,
                ], [scanWorkUnit.data.buffer]);
            }
        }
    }
    function workOnScanQueue() {
        if (!wasmReady || scanQueue.length === 0) {
            return;
        }
        // Initialization for first submitted work unit
        if (!contextAvailable) {
            createContext();
        }
        if (!scannerSettingsReady) {
            applyScanSettings();
        }
        if (!scannerImageSettingsReady) {
            applyImageSettings();
        }
        if (!contextAvailable || !scannerSettingsReady || !scannerImageSettingsReady) {
            return;
        }
        while (scanQueue.length !== 0) {
            if (scanQueue[0].highQualitySingleFrameMode &&
                // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime
                (recognitionMode === null || recognitionMode === void 0 ? void 0 : recognitionMode.includes("code")) === true &&
                !blurryRecognitionAvailable) {
                break;
            }
            processScanWorkUnit(scanQueue.shift());
        }
    }
    function processParseWorkUnit(parseWorkUnit) {
        var resultData = parse(parseWorkUnit.dataFormat, parseWorkUnit.data, parseWorkUnit.options);
        var result = JSON.parse(resultData);
        if (result.error != null) {
            augmentErrorInformation(result.error);
            postMessage([
                "parse-error",
                {
                    requestId: parseWorkUnit.requestId,
                    error: result.error,
                },
            ]);
        }
        else {
            // istanbul ignore else
            if (result.result != null) {
                postMessage([
                    "parse-result",
                    {
                        requestId: parseWorkUnit.requestId,
                        result: result.result,
                    },
                ]);
            }
        }
    }
    function workOnParseQueue() {
        if (!wasmReady || parseQueue.length === 0) {
            return;
        }
        // Initialization for first submitted work unit
        if (!contextAvailable) {
            createContext();
            if (!contextAvailable) {
                return;
            }
        }
        while (parseQueue.length !== 0) {
            processParseWorkUnit(parseQueue.shift());
        }
    }
    function addScanWorkUnit(scanWorkUnit) {
        workSubmitted = true;
        scanQueue.push(scanWorkUnit);
        workOnScanQueue();
    }
    function addParseWorkUnit(parseWorkUnit) {
        workSubmitted = true;
        parseQueue.push(parseWorkUnit);
        workOnParseQueue();
    }
    function clearSession() {
        if (scannerSettingsReady) {
            Module._scanner_session_clear();
        }
    }
    function createBlurryTable(symbology) {
        function reportResult() {
            postMessage(["create-blurry-table-result", symbology]);
        }
        if (!wasmReady || !contextAvailable) {
            return;
        }
        var symbologyLength = lengthBytesUTF8(symbology) + 1;
        var symbologyPointer = Module._malloc(symbologyLength);
        stringToUTF8(symbology, symbologyPointer, symbologyLength);
        Module._create_blurry_table(symbologyPointer);
        Module._free(symbologyPointer);
        // FS.syncfs is called by data capture if needed: the current promise is the one to wait for
        fsSyncPromise.then(reportResult).catch(
        // istanbul ignore next
        reportResult);
    }
    function setCameraProperties(cameraType, autofocus) {
        cameraProperties = {
            cameraType: cameraType,
            autofocus: autofocus,
        };
        reportCameraProperties();
    }
    function setDeviceName(newDeviceName) {
        if (deviceName !== newDeviceName) {
            deviceName = newDeviceName;
            reportDeviceName();
        }
    }
    function reset() {
        clearSession();
        scanQueue.length = 0;
        parseQueue.length = 0;
        scanSettings = undefined;
        imageSettings = undefined;
        workSubmitted = false;
        scannerSettingsReady = false;
        scannerImageSettingsReady = false;
    }
    // Private
    // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime
    // tslint:disable-next-line: no-any
    function log(level) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        data.forEach(function (dataArgument, index) {
            if (dataArgument instanceof Error) {
                var errorObject = {
                    name: dataArgument.name,
                    message: dataArgument.message,
                    stack: dataArgument.stack,
                };
                data[index] = errorObject;
            }
        });
        postMessage([
            "log",
            {
                level: level,
                data: data,
            },
        ]);
    }
    function retryWithExponentialBackoff(handler, backoffMs, maxBackoffMs, singleTryRejectionCallback) {
        return new Promise(function (resolve, reject) {
            handler()
                .then(resolve)
                .catch(function (error) {
                var newBackoffMs = backoffMs * 2;
                if (newBackoffMs > maxBackoffMs) {
                    return reject(error);
                }
                singleTryRejectionCallback(error);
                setTimeout(function () {
                    retryWithExponentialBackoff(handler, newBackoffMs, maxBackoffMs, singleTryRejectionCallback)
                        .then(resolve)
                        .catch(reject);
                }, backoffMs);
            });
        });
    }
    function getLibraryLocationURIs(libraryLocation, textRecognition, simdSupport) {
        var cdnURI = false;
        if (/^https?:\/\/([^\/.]*\.)*cdn.jsdelivr.net\//.test(libraryLocation)) {
            libraryLocation = "https://cdn.jsdelivr.net/npm/scandit-sdk@5.12.0/build/";
            cdnURI = true;
        }
        else if (/^https?:\/\/([^\/.]*\.)*unpkg.com\//.test(libraryLocation)) {
            libraryLocation = "https://unpkg.com/scandit-sdk@5.12.0/build/";
            cdnURI = true;
        }
        var fileExtension = "";
        if (textRecognition) {
            fileExtension += "-ocr";
            if (simdSupport) {
                fileExtension += "-simd";
            }
        }
        if (cdnURI) {
            return {
                jsURI: "".concat(libraryLocation, "scandit-engine-sdk").concat(fileExtension, ".min.js"),
                wasmURI: "".concat(libraryLocation, "scandit-engine-sdk").concat(fileExtension, ".wasm"),
            };
        }
        return {
            jsURI: "".concat(libraryLocation, "scandit-engine-sdk").concat(fileExtension, ".min.js?v=5.12.0"),
            wasmURI: "".concat(libraryLocation, "scandit-engine-sdk").concat(fileExtension, ".wasm?v=5.12.0"),
        };
    }
    function arrayBufferToHexString(arrayBuffer) {
        return Array.from(new Uint8Array(arrayBuffer))
            .map(function (byteNumber) {
            var byteHex = byteNumber.toString(16);
            return byteHex.length === 1 ? /* istanbul ignore next */ "0".concat(byteHex) : byteHex;
        })
            .join("");
    }
    function applyScanSettings(highQualitySingleFrameMode) {
        var _a, _b;
        if (highQualitySingleFrameMode === void 0) { highQualitySingleFrameMode = false; }
        if (!wasmReady || !contextAvailable || !workSubmitted || scanSettings == null) {
            return;
        }
        scannerSettingsReady = false;
        var parsedSettings = JSON.parse(scanSettings);
        recognitionMode = parsedSettings.recognitionMode;
        (_a = parsedSettings.textRecognitionSettings) !== null && _a !== void 0 ? _a : (parsedSettings.textRecognitionSettings = JSON.stringify({}));
        var scanSettingsLength = lengthBytesUTF8(scanSettings) + 1;
        var scanSettingsPointer = Module._malloc(scanSettingsLength);
        stringToUTF8(scanSettings, scanSettingsPointer, scanSettingsLength);
        var textRecognitionSettingsLength = lengthBytesUTF8(parsedSettings.textRecognitionSettings) + 1;
        var textRecognitionSettingsPointer = Module._malloc(textRecognitionSettingsLength);
        stringToUTF8(parsedSettings.textRecognitionSettings, textRecognitionSettingsPointer, textRecognitionSettingsLength);
        var resultPointer = Module._scanner_settings_new_from_json(scanSettingsPointer, textRecognitionSettingsPointer, 
        // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime
        (recognitionMode === null || recognitionMode === void 0 ? void 0 : recognitionMode.includes("code")) === true, (recognitionMode === null || recognitionMode === void 0 ? void 0 : recognitionMode.includes("text")) === true, parsedSettings.blurryRecognition === true && blurryRecognitionAvailable, (_b = parsedSettings.matrixScanEnabled) !== null && _b !== void 0 ? _b : false, highQualitySingleFrameMode, parsedSettings.gpuAcceleration === true && gpuAccelerationAvailable);
        Module._free(scanSettingsPointer);
        var result = UTF8ToString(resultPointer);
        if (result !== "") {
            scannerSettingsReady = true;
            log("debug", "External Scandit Data Capture scan settings:", JSON.parse(result));
        }
    }
    function applyImageSettings() {
        if (!wasmReady || !contextAvailable || !workSubmitted || imageSettings == null) {
            return;
        }
        scannerImageSettingsReady = false;
        var channels;
        // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime
        if (imageSettings.format.valueOf() === 1) {
            // RGB_8U
            channels = 3;
        }
        else if (imageSettings.format.valueOf() === 2) {
            // RGBA_8U
            channels = 4;
        }
        else {
            // GRAY_8U
            channels = 1;
        }
        Module._scanner_image_settings_new(imageSettings.width, imageSettings.height, channels);
        if (imageBufferPointer != null) {
            Module._free(imageBufferPointer);
        }
        imageBufferSize = imageSettings.width * imageSettings.height * channels;
        imageBufferPointer = Module._malloc(imageBufferSize);
        scannerImageSettingsReady = true;
    }
    function reportCameraProperties() {
        if (!wasmReady || !contextAvailable || cameraProperties == null) {
            return;
        }
        // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime
        Module._report_camera_properties(cameraProperties.cameraType === "front", cameraProperties.autofocus);
    }
    function reportDeviceName() {
        if (!wasmReady || !contextAvailable || deviceName == null) {
            return;
        }
        var deviceNameLength = lengthBytesUTF8(deviceName) + 1;
        var deviceNamePointer = Module._malloc(deviceNameLength);
        stringToUTF8(deviceName, deviceNamePointer, deviceNameLength);
        Module._set_device_name(deviceNamePointer);
        Module._free(deviceNamePointer);
    }
    function scanImage(imageData) {
        if (imageData.byteLength !== imageBufferSize) {
            // This could happen in unexpected situations and should be temporary
            return JSON.stringify({ barcodeResult: [], textResult: [] });
        }
        Module.HEAPU8.set(imageData, imageBufferPointer);
        return UTF8ToString(Module._scanner_scan(imageBufferPointer));
    }
    function parse(dataFormat, data, options) {
        var dataLength = typeof data === "string" ? lengthBytesUTF8(data) + 1 : data.byteLength;
        var dataPointer = Module._malloc(dataLength);
        if (typeof data === "string") {
            stringToUTF8(data, dataPointer, dataLength);
        }
        else {
            Module.HEAPU8.set(data, dataPointer);
        }
        var optionsLength = lengthBytesUTF8(options) + 1;
        var optionsPointer = Module._malloc(optionsLength);
        stringToUTF8(options, optionsPointer, optionsLength);
        var resultPointer = Module._parser_parse_string(dataFormat.valueOf(), dataPointer, dataLength - 1, optionsPointer);
        Module._free(dataPointer);
        Module._free(optionsPointer);
        return UTF8ToString(resultPointer);
    }
    function verifiedWasmFetch(wasmURI, textRecognition, simdSupport, awaitFullResponse) {
        function verifyResponseData(responseData) {
            var _a;
            // istanbul ignore else
            if (typeof ((_a = crypto === null || crypto === void 0 ? void 0 : crypto.subtle) === null || _a === void 0 ? void 0 : _a.digest) === "function") {
                crypto.subtle
                    .digest("SHA-256", responseData)
                    .then(function (hash) {
                    var hashString = arrayBufferToHexString(hash);
                    var expectedHashString = "4572045fed6c242bd9523d4c4890c8832b1d8ded591f5f84a452f66b86affb5d";
                    if (textRecognition) {
                        expectedHashString = simdSupport ? "f66f36ada4369d161a55dd0efcfb1dc290b907f2a3ea3588b86d489cf9e79873" : "900b975dc7c0e8973dac38464fd7f7bfac8e5543693bc0ed0dfd8e0e2bd09272";
                    }
                    // istanbul ignore if
                    if (hashString !== expectedHashString) {
                        log("error", "The Scandit Data Capture library WASM file found at ".concat(wasmURI, " seems invalid: ") +
                            "expected file hash doesn't match (received: ".concat(hashString, ", ") +
                            "expected: ".concat(expectedHashString, "). ") +
                            "Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.");
                    }
                })
                    .catch(
                /* istanbul ignore next */ function () {
                    // Ignored
                });
            }
            else {
                log("warn", "Insecure context (see https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts): " +
                    "The hash of the Scandit Data Capture library WASM file found at ".concat(wasmURI, " could not be verified"));
            }
        }
        function tryFetch() {
            return new Promise(function (resolve, reject) {
                fetch(wasmURI)
                    .then(function (response) {
                    // istanbul ignore else
                    if (response.ok) {
                        response
                            .clone()
                            .arrayBuffer()
                            .then(function (responseData) {
                            if (awaitFullResponse) {
                                resolve(response);
                            }
                            verifyResponseData(responseData);
                        })
                            .catch(
                        // istanbul ignore next
                        function (error) {
                            if (awaitFullResponse) {
                                reject(error);
                            }
                        });
                        if (!awaitFullResponse) {
                            resolve(response);
                        }
                    }
                    else {
                        reject(new Error("HTTP status code is not ok"));
                    }
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        }
        return retryWithExponentialBackoff(tryFetch, 250, 4000, function (error) {
            log("warn", error);
            log("warn", "Couldn't retrieve Scandit Data Capture library at ".concat(wasmURI, ", retrying..."));
        }).catch(function (error) {
            log("error", error);
            log("error", "Couldn't retrieve/instantiate Scandit Data Capture library at ".concat(wasmURI, ", ") +
                "did you configure the path for it correctly?");
            return Promise.reject(error);
        });
    }
    function instantiateWebAssembly(importObject, wasmURI, textRecognition, simdSupport, successCallback, existingResponse) {
        (existingResponse != null
            ? Promise.resolve(existingResponse)
            : verifiedWasmFetch(wasmURI, textRecognition, simdSupport, true))
            .then(function (response) {
            return response.arrayBuffer();
        })
            .then(function (bytes) {
            return self.WebAssembly.instantiate(bytes, importObject)
                .then(function (results) {
                successCallback(results.instance);
            })
                .catch(function (error) {
                log("error", error);
                log("error", "Couldn't instantiate Scandit Data Capture library at ".concat(wasmURI, ", ") +
                    "did you configure the path for it correctly?");
            });
        })
            .catch(
        /* istanbul ignore next */ function () {
            // Ignored
        });
    }
    function instantiateWebAssemblyStreaming(importObject, wasmURI, textRecognition, simdSupport, successCallback) {
        verifiedWasmFetch(wasmURI, textRecognition, simdSupport, false)
            .then(function (response) {
            self.WebAssembly.instantiateStreaming(response, importObject)
                .then(function (results) {
                successCallback(results.instance);
            })
                .catch(function (error) {
                log("warn", error);
                log("warn", "WebAssembly streaming compile failed. " +
                    "Falling back to ArrayBuffer instantiation (this will make things slower)");
                instantiateWebAssembly(importObject, wasmURI, textRecognition, simdSupport, successCallback, response);
            });
        })
            .catch(
        /* istanbul ignore next */ function () {
            // Ignored
        });
    }
    function syncFSMergePreloadedData() {
        var fsObjectStoreName = "FILE_DATA";
        var resolveCallback;
        var openDbSourceRequest;
        var openDbTargetRequest;
        function handleError() {
            var _a, _b;
            (_a = openDbSourceRequest === null || openDbSourceRequest === void 0 ? void 0 : openDbSourceRequest.result) === null || _a === void 0 ? void 0 : _a.close();
            (_b = openDbTargetRequest === null || openDbTargetRequest === void 0 ? void 0 : openDbTargetRequest.result) === null || _b === void 0 ? void 0 : _b.close();
            // this.error
            resolveCallback(0);
        }
        function performMerge() {
            try {
                var objects_1 = [];
                var sourceTransaction = openDbSourceRequest.result.transaction(fsObjectStoreName, "readonly");
                sourceTransaction.onerror = handleError;
                var cursorRequest_1 = sourceTransaction
                    .objectStore(fsObjectStoreName)
                    .openCursor();
                cursorRequest_1.onsuccess = function () {
                    var e_1, _a;
                    var cursor = cursorRequest_1.result;
                    if (cursor == null) {
                        try {
                            var mergedObjectsCount_1 = 0;
                            var targetTransaction = openDbTargetRequest.result.transaction(fsObjectStoreName, "readwrite");
                            var targetObjectStore_1 = targetTransaction.objectStore(fsObjectStoreName);
                            targetTransaction.onerror = handleError;
                            targetTransaction.oncomplete = function () {
                                openDbSourceRequest.result.close();
                                openDbTargetRequest.result.close();
                                return resolveCallback(mergedObjectsCount_1);
                            };
                            var _loop_1 = function (object) {
                                var countRequest = targetObjectStore_1.count(object.primaryKey);
                                countRequest.onsuccess = function () {
                                    if (countRequest.result === 0) {
                                        ++mergedObjectsCount_1;
                                        targetObjectStore_1.add(object.value, object.primaryKey);
                                    }
                                };
                            };
                            try {
                                for (var objects_2 = tslib_1.__values(objects_1), objects_2_1 = objects_2.next(); !objects_2_1.done; objects_2_1 = objects_2.next()) {
                                    var object = objects_2_1.value;
                                    _loop_1(object);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (objects_2_1 && !objects_2_1.done && (_a = objects_2.return)) _a.call(objects_2);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        catch (error) {
                            // istanbul ignore next
                            handleError.call({ error: error });
                        }
                    }
                    else {
                        objects_1.push({
                            value: cursor.value,
                            primaryKey: cursor.primaryKey
                                .toString()
                                .replace("".concat(writableDataPathPreload, "/"), "".concat(writableDataPathStandard, "/")),
                        });
                        cursor.continue();
                    }
                };
                cursorRequest_1.onerror = handleError;
            }
            catch (error) {
                // istanbul ignore next
                handleError.call({ error: error });
            }
        }
        return new Promise(function (resolve) {
            resolveCallback = resolve;
            openDbSourceRequest = indexedDB.open(writableDataPathPreload);
            openDbSourceRequest.onupgradeneeded = function () {
                try {
                    openDbSourceRequest.result.createObjectStore(fsObjectStoreName);
                }
                catch (error) {
                    // Ignored
                }
            };
            openDbSourceRequest.onsuccess = function () {
                if (!Array.from(openDbSourceRequest.result.objectStoreNames).includes(fsObjectStoreName)) {
                    return resolve(0);
                }
                openDbTargetRequest = indexedDB.open(writableDataPathStandard);
                openDbTargetRequest.onupgradeneeded = function () {
                    try {
                        openDbTargetRequest.result.createObjectStore(fsObjectStoreName);
                    }
                    catch (error) {
                        // Ignored
                    }
                };
                openDbTargetRequest.onsuccess = function () {
                    performMerge();
                };
                openDbTargetRequest.onblocked = openDbTargetRequest.onerror = handleError;
            };
            openDbSourceRequest.onblocked = openDbSourceRequest.onerror = handleError;
        });
    }
    function syncFSPromisified(populate, initialPopulation) {
        // istanbul ignore if
        if (originalFSSyncfs == null) {
            return Promise.resolve();
        }
        fsSyncInProgress = true;
        return new Promise(function (resolve, reject) {
            // Merge with data coming from preloading workers if needed
            (!preloading && populate ? syncFSMergePreloadedData() : Promise.resolve(0))
                .then(function (mergedObjects) {
                if (!preloading && populate && !initialPopulation && mergedObjects === 0) {
                    fsSyncInProgress = false;
                    return resolve();
                }
                // tslint:disable-next-line: no-non-null-assertion
                originalFSSyncfs(populate, function (error) {
                    fsSyncInProgress = false;
                    // istanbul ignore if
                    if (error != null) {
                        return reject(error);
                    }
                    resolve();
                });
            })
                .catch(reject);
        });
    }
    function syncFS(populate, initialPopulation, forceScheduling) {
        if (initialPopulation === void 0) { initialPopulation = false; }
        if (forceScheduling === void 0) { forceScheduling = false; }
        if (!fsSyncScheduled || forceScheduling) {
            if (fsSyncInProgress) {
                fsSyncScheduled = true;
                fsSyncPromise = fsSyncPromise.then(function () {
                    fsSyncScheduled = false;
                    return syncFSPromisified(populate, initialPopulation);
                });
            }
            else {
                fsSyncPromise = syncFSPromisified(populate, initialPopulation);
            }
        }
        return fsSyncPromise;
    }
    function setupFS() {
        // FS.syncfs is also called by data capture on file storage, ensure everything is coordinated nicely
        originalFSSyncfs = FS.syncfs;
        FS.syncfs = (function (populate, callback) {
            var originalCallback = callback;
            callback = function (error) {
                originalCallback(error);
            };
            syncFS(populate).then(callback).catch(callback);
        });
        try {
            FS.mkdir(writableDataPath);
        }
        catch (error) {
            // istanbul ignore next
            if (error.code !== "EEXIST") {
                originalFSSyncfs = undefined;
                return Promise.reject(error);
            }
        }
        FS.mount(IDBFS, {}, writableDataPath);
        return syncFS(true, true);
    }
    return {
        loadLibrary: loadLibrary,
        setScanSettings: setScanSettings,
        setImageSettings: setImageSettings,
        workOnScanQueue: workOnScanQueue,
        workOnParseQueue: workOnParseQueue,
        addScanWorkUnit: addScanWorkUnit,
        addParseWorkUnit: addParseWorkUnit,
        clearSession: clearSession,
        createBlurryTable: createBlurryTable,
        setCameraProperties: setCameraProperties,
        setDeviceName: setDeviceName,
        reset: reset,
    };
}
exports.dataCapture = dataCapture;
// istanbul ignore next
function edataCaptureWorkerFunction() {
    var dataCaptureInstance = dataCapture();
    onmessage = function (e) {
        // Creating context triggers license key verification and activation: delay until first frame processed
        var data = e.data;
        switch (data.type) {
            case "load-library":
                // tslint:disable-next-line: no-floating-promises
                dataCaptureInstance.loadLibrary(data.deviceId, data.libraryLocation, data.path, data.preload, data.delayedRegistration, data.highEndBlurryRecognition, data.textRecognition, data.licenseKey, data.deviceModelName);
                break;
            case "scan-settings":
                dataCaptureInstance.setScanSettings(data.settings, data.blurryRecognitionAvailable, data.blurryRecognitionRequiresUpdate);
                break;
            case "image-settings":
                dataCaptureInstance.setImageSettings(data.imageSettings);
                break;
            case "scan-image":
                dataCaptureInstance.addScanWorkUnit({
                    requestId: data.requestId,
                    data: data.data,
                    highQualitySingleFrameMode: data.highQualitySingleFrameMode,
                });
                break;
            case "parse":
                dataCaptureInstance.addParseWorkUnit({
                    requestId: data.requestId,
                    dataFormat: data.dataFormat,
                    data: data.data,
                    options: data.options,
                });
                break;
            case "clear-session":
                dataCaptureInstance.clearSession();
                break;
            case "create-blurry-table":
                dataCaptureInstance.createBlurryTable(data.symbology);
                break;
            case "camera-properties":
                dataCaptureInstance.setCameraProperties(data.cameraType, data.autofocus);
                break;
            case "device-name":
                dataCaptureInstance.setDeviceName(data.deviceName);
                break;
            case "reset":
                dataCaptureInstance.reset();
                break;
            default:
                break;
        }
    };
}
/**
 * @hidden
 */
exports.dataCaptureWorkerBlob = new Blob(["var Module;".concat(dataCapture.toString(), "(").concat(edataCaptureWorkerFunction.toString(), ")()")], {
    type: "text/javascript",
});
//# sourceMappingURL=dataCaptureWorker.js.map