/**
 * @hidden
 *
 * @returns DataCapture
 */
// tslint:disable-next-line:max-func-body-length
export function dataCapture() {
    const writableDataPathPreload = "/scandit_sync_folder_preload";
    const writableDataPathStandard = "/scandit_sync_folder";
    const resourceFilesSubfolder = "resources";
    const scanQueue = [];
    const parseQueue = [];
    const gpuAccelerationAvailable = typeof self.OffscreenCanvas === "function";
    let originalFSSyncfs;
    let imageBufferPointer;
    let imageBufferSize;
    let preloading;
    let writableDataPath;
    let resourceFilesDataPath;
    let delayedRegistration;
    let highEndBlurryRecognition;
    let licenseKey;
    let scanSettings;
    let imageSettings;
    let recognitionMode;
    let cameraProperties;
    let deviceName;
    let blurryRecognitionAvailable = false;
    let workSubmitted = false;
    let loadingInProgress = false;
    let fileSystemSynced = false;
    let runtimeLoaded = false;
    let wasmReady = false;
    let scannerSettingsReady = false;
    let scannerImageSettingsReady = false;
    let contextAvailable = false;
    let fsSyncPromise = Promise.resolve();
    let fsSyncInProgress = false;
    let fsSyncScheduled = false;
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
        const simdSupport = WebAssembly.validate(new Uint8Array([
            0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 1, 253, 15, 253, 98, 11,
        ]));
        const { jsURI, wasmURI } = getLibraryLocationURIs(libraryLocation, textRecognition, simdSupport);
        preloading = preload;
        writableDataPath = preload ? writableDataPathPreload : writableDataPathStandard;
        resourceFilesDataPath = `${libraryLocation}${resourceFilesSubfolder}/`;
        highEndBlurryRecognition = newHighEndBlurryRecognition;
        self.window = self.document = self; // Fix some Emscripten quirks
        self.path = locationPath; // Used by the Scandit Data Capture library
        self.deviceModelName = deviceModelName; // Used by the Scandit Data Capture library
        Module = {
            arguments: [deviceId],
            canvas: gpuAccelerationAvailable ? new self.OffscreenCanvas(32, 32) : /* istanbul ignore next */ undefined,
            instantiateWasm: (importObject, successCallback) => {
                // wasmJSVersion is globally defined inside scandit-engine-sdk.min.js
                const wasmJSVersion = self.wasmJSVersion ?? "undefined";
                // istanbul ignore if
                if (wasmJSVersion !== "5.9.3") {
                    log("error", `The Scandit Data Capture library JS file found at ${jsURI} seems invalid: ` +
                        `expected version doesn't match (received: ${wasmJSVersion}, expected: ${"5.9.3"}). ` +
                        `Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.`);
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
                () => {
                    return setupFS()
                        .catch((error) => {
                        log("debug", "No IndexedDB support, some data will not be persisted:", error);
                    })
                        .then(() => {
                        fileSystemSynced = true;
                        start();
                    });
                },
            ],
            onRuntimeInitialized: () => {
                runtimeLoaded = true;
                start();
            },
            // tslint:disable-next-line: no-any
            print: (...data) => {
                log("info", ...data);
            },
            // tslint:disable-next-line: no-any
            printErr: (...data) => {
                log("error", ...data);
            },
        };
        function tryImportScripts() {
            try {
                return importScripts(jsURI) ?? Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        return retryWithExponentialBackoff(tryImportScripts, 250, 4000, (error) => {
            log("warn", error);
            log("warn", `Couldn't retrieve Scandit Data Capture library at ${jsURI}, retrying...`);
        }).catch((error) => {
            log("error", error);
            log("error", `Couldn't retrieve Scandit Data Capture library at ${jsURI}, did you configure the path for it correctly?`);
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
        const licenseKeyLength = lengthBytesUTF8(licenseKey) + 1;
        const licenseKeyPointer = Module._malloc(licenseKeyLength);
        stringToUTF8(licenseKey, licenseKeyPointer, licenseKeyLength);
        const writableDataPathLength = lengthBytesUTF8(writableDataPath) + 1;
        const writableDataPathPointer = Module._malloc(writableDataPathLength);
        stringToUTF8(writableDataPath, writableDataPathPointer, writableDataPathLength);
        const resourceFilesDataPathLength = lengthBytesUTF8(resourceFilesDataPath) + 1;
        const resourceFilesDataPathPointer = Module._malloc(resourceFilesDataPathLength);
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
        if (error.errorCode === 260) {
            let hostname;
            // istanbul ignore if
            if (location.href?.indexOf("blob:null/") === 0) {
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
            error.errorMessage = error.errorMessage.replace("domain name", `domain name (${hostname})`);
        }
        // License Key related error codes from 6 to 25 and 260
        if ([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 260].includes(error.errorCode) &&
            licenseKey != null &&
            licenseKey.length > 0) {
            error.errorMessage += ` License Key: ${licenseKey.slice(0, 15)}...`;
        }
    }
    function processScanWorkUnit(scanWorkUnit) {
        if (scanWorkUnit.highQualitySingleFrameMode) {
            applyScanSettings(true);
        }
        const resultData = scanImage(scanWorkUnit.data);
        if (scanWorkUnit.highQualitySingleFrameMode) {
            applyScanSettings(false);
        }
        const result = JSON.parse(resultData);
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
                recognitionMode?.includes("code") === true &&
                !blurryRecognitionAvailable) {
                break;
            }
            processScanWorkUnit(scanQueue.shift());
        }
    }
    function processParseWorkUnit(parseWorkUnit) {
        const resultData = parse(parseWorkUnit.dataFormat, parseWorkUnit.data, parseWorkUnit.options);
        const result = JSON.parse(resultData);
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
        const symbologyLength = lengthBytesUTF8(symbology) + 1;
        const symbologyPointer = Module._malloc(symbologyLength);
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
            cameraType,
            autofocus,
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
    function log(level, ...data) {
        data.forEach((dataArgument, index) => {
            if (dataArgument instanceof Error) {
                const errorObject = {
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
                data,
            },
        ]);
    }
    function retryWithExponentialBackoff(handler, backoffMs, maxBackoffMs, singleTryRejectionCallback) {
        return new Promise((resolve, reject) => {
            handler()
                .then(resolve)
                .catch((error) => {
                const newBackoffMs = backoffMs * 2;
                if (newBackoffMs > maxBackoffMs) {
                    return reject(error);
                }
                singleTryRejectionCallback(error);
                setTimeout(() => {
                    retryWithExponentialBackoff(handler, newBackoffMs, maxBackoffMs, singleTryRejectionCallback)
                        .then(resolve)
                        .catch(reject);
                }, backoffMs);
            });
        });
    }
    function getLibraryLocationURIs(libraryLocation, textRecognition, simdSupport) {
        let cdnURI = false;
        if (/^https?:\/\/([^\/.]*\.)*cdn.jsdelivr.net\//.test(libraryLocation)) {
            libraryLocation = "https://cdn.jsdelivr.net/npm/scandit-sdk@5.9.3/build/";
            cdnURI = true;
        }
        else if (/^https?:\/\/([^\/.]*\.)*unpkg.com\//.test(libraryLocation)) {
            libraryLocation = "https://unpkg.com/scandit-sdk@5.9.3/build/";
            cdnURI = true;
        }
        let fileExtension = "";
        if (textRecognition) {
            fileExtension += "-ocr";
            if (simdSupport) {
                fileExtension += "-simd";
            }
        }
        if (cdnURI) {
            return {
                jsURI: `${libraryLocation}scandit-engine-sdk${fileExtension}.min.js`,
                wasmURI: `${libraryLocation}scandit-engine-sdk${fileExtension}.wasm`,
            };
        }
        return {
            jsURI: `${libraryLocation}scandit-engine-sdk${fileExtension}.min.js?v=5.9.3`,
            wasmURI: `${libraryLocation}scandit-engine-sdk${fileExtension}.wasm?v=5.9.3`,
        };
    }
    function arrayBufferToHexString(arrayBuffer) {
        return Array.from(new Uint8Array(arrayBuffer))
            .map((byteNumber) => {
            const byteHex = byteNumber.toString(16);
            return byteHex.length === 1 ? /* istanbul ignore next */ `0${byteHex}` : byteHex;
        })
            .join("");
    }
    function applyScanSettings(highQualitySingleFrameMode = false) {
        if (!wasmReady || !contextAvailable || !workSubmitted || scanSettings == null) {
            return;
        }
        scannerSettingsReady = false;
        const parsedSettings = JSON.parse(scanSettings);
        recognitionMode = parsedSettings.recognitionMode;
        parsedSettings.textRecognitionSettings ??= JSON.stringify({});
        const scanSettingsLength = lengthBytesUTF8(scanSettings) + 1;
        const scanSettingsPointer = Module._malloc(scanSettingsLength);
        stringToUTF8(scanSettings, scanSettingsPointer, scanSettingsLength);
        const textRecognitionSettingsLength = lengthBytesUTF8(parsedSettings.textRecognitionSettings) + 1;
        const textRecognitionSettingsPointer = Module._malloc(textRecognitionSettingsLength);
        stringToUTF8(parsedSettings.textRecognitionSettings, textRecognitionSettingsPointer, textRecognitionSettingsLength);
        const resultPointer = Module._scanner_settings_new_from_json(scanSettingsPointer, textRecognitionSettingsPointer, 
        // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime
        recognitionMode?.includes("code") === true, recognitionMode?.includes("text") === true, parsedSettings.blurryRecognition === true && blurryRecognitionAvailable, parsedSettings.matrixScanEnabled ?? false, highQualitySingleFrameMode, parsedSettings.gpuAcceleration === true && gpuAccelerationAvailable);
        Module._free(scanSettingsPointer);
        const result = UTF8ToString(resultPointer);
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
        let channels;
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
        const deviceNameLength = lengthBytesUTF8(deviceName) + 1;
        const deviceNamePointer = Module._malloc(deviceNameLength);
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
        const dataLength = typeof data === "string" ? lengthBytesUTF8(data) + 1 : data.byteLength;
        const dataPointer = Module._malloc(dataLength);
        if (typeof data === "string") {
            stringToUTF8(data, dataPointer, dataLength);
        }
        else {
            Module.HEAPU8.set(data, dataPointer);
        }
        const optionsLength = lengthBytesUTF8(options) + 1;
        const optionsPointer = Module._malloc(optionsLength);
        stringToUTF8(options, optionsPointer, optionsLength);
        const resultPointer = Module._parser_parse_string(dataFormat.valueOf(), dataPointer, dataLength - 1, optionsPointer);
        Module._free(dataPointer);
        Module._free(optionsPointer);
        return UTF8ToString(resultPointer);
    }
    function verifiedWasmFetch(wasmURI, textRecognition, simdSupport, awaitFullResponse) {
        function verifyResponseData(responseData) {
            // istanbul ignore else
            if (typeof crypto?.subtle?.digest === "function") {
                crypto.subtle
                    .digest("SHA-256", responseData)
                    .then((hash) => {
                    const hashString = arrayBufferToHexString(hash);
                    let expectedHashString = "40e84fd0fce799334e8e70ee8adb1c7ecef93306071fd42bcb20034d54703211";
                    if (textRecognition) {
                        expectedHashString = simdSupport ? "0497e539c177b04c8bcf96144b50d43e0aab60ac3d348df0c4392e5a935eb756" : "25cb9569675714d461302099fe476d161a6152bb10b8dfe11564567f6fe4afbd";
                    }
                    // istanbul ignore if
                    if (hashString !== expectedHashString) {
                        log("error", `The Scandit Data Capture library WASM file found at ${wasmURI} seems invalid: ` +
                            `expected file hash doesn't match (received: ${hashString}, ` +
                            `expected: ${expectedHashString}). ` +
                            `Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.`);
                    }
                })
                    .catch(
                /* istanbul ignore next */ () => {
                    // Ignored
                });
            }
            else {
                log("warn", "Insecure context (see https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts): " +
                    `The hash of the Scandit Data Capture library WASM file found at ${wasmURI} could not be verified`);
            }
        }
        function tryFetch() {
            return new Promise((resolve, reject) => {
                fetch(wasmURI)
                    .then((response) => {
                    // istanbul ignore else
                    if (response.ok) {
                        response
                            .clone()
                            .arrayBuffer()
                            .then((responseData) => {
                            if (awaitFullResponse) {
                                resolve(response);
                            }
                            verifyResponseData(responseData);
                        })
                            .catch(
                        // istanbul ignore next
                        (error) => {
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
                    .catch((error) => {
                    reject(error);
                });
            });
        }
        return retryWithExponentialBackoff(tryFetch, 250, 4000, (error) => {
            log("warn", error);
            log("warn", `Couldn't retrieve Scandit Data Capture library at ${wasmURI}, retrying...`);
        }).catch((error) => {
            log("error", error);
            log("error", `Couldn't retrieve/instantiate Scandit Data Capture library at ${wasmURI}, ` +
                "did you configure the path for it correctly?");
            return Promise.reject(error);
        });
    }
    function instantiateWebAssembly(importObject, wasmURI, textRecognition, simdSupport, successCallback) {
        verifiedWasmFetch(wasmURI, textRecognition, simdSupport, true)
            .then((response) => {
            return response.arrayBuffer();
        })
            .then((bytes) => {
            return self.WebAssembly.instantiate(bytes, importObject)
                .then((results) => {
                successCallback(results.instance);
            })
                .catch((error) => {
                log("error", error);
                log("error", `Couldn't instantiate Scandit Data Capture library at ${wasmURI}, ` +
                    "did you configure the path for it correctly?");
            });
        })
            .catch(
        /* istanbul ignore next */ () => {
            // Ignored
        });
    }
    function instantiateWebAssemblyStreaming(importObject, wasmURI, textRecognition, simdSupport, successCallback) {
        verifiedWasmFetch(wasmURI, textRecognition, simdSupport, false)
            .then((response) => {
            self.WebAssembly.instantiateStreaming(response, importObject)
                .then((results) => {
                successCallback(results.instance);
            })
                .catch((error) => {
                log("warn", error);
                log("warn", "WebAssembly streaming compile failed. " +
                    "Falling back to ArrayBuffer instantiation (this will make things slower)");
                instantiateWebAssembly(importObject, wasmURI, textRecognition, simdSupport, successCallback);
            });
        })
            .catch(
        /* istanbul ignore next */ () => {
            // Ignored
        });
    }
    function syncFSMergePreloadedData() {
        const fsObjectStoreName = "FILE_DATA";
        let resolveCallback;
        let openDbSourceRequest;
        let openDbTargetRequest;
        function handleError() {
            openDbSourceRequest?.result?.close();
            openDbTargetRequest?.result?.close();
            // this.error
            resolveCallback(0);
        }
        function performMerge() {
            try {
                const objects = [];
                const sourceTransaction = openDbSourceRequest.result.transaction(fsObjectStoreName, "readonly");
                sourceTransaction.onerror = handleError;
                const cursorRequest = sourceTransaction
                    .objectStore(fsObjectStoreName)
                    .openCursor();
                cursorRequest.onsuccess = () => {
                    const cursor = cursorRequest.result;
                    if (cursor == null) {
                        try {
                            let mergedObjectsCount = 0;
                            const targetTransaction = openDbTargetRequest.result.transaction(fsObjectStoreName, "readwrite");
                            const targetObjectStore = targetTransaction.objectStore(fsObjectStoreName);
                            targetTransaction.onerror = handleError;
                            targetTransaction.oncomplete = () => {
                                openDbSourceRequest.result.close();
                                openDbTargetRequest.result.close();
                                return resolveCallback(mergedObjectsCount);
                            };
                            for (const object of objects) {
                                const countRequest = targetObjectStore.count(object.primaryKey);
                                countRequest.onsuccess = () => {
                                    if (countRequest.result === 0) {
                                        ++mergedObjectsCount;
                                        targetObjectStore.add(object.value, object.primaryKey);
                                    }
                                };
                            }
                        }
                        catch (error) {
                            // istanbul ignore next
                            handleError.call({ error });
                        }
                    }
                    else {
                        objects.push({
                            value: cursor.value,
                            primaryKey: cursor.primaryKey
                                .toString()
                                .replace(`${writableDataPathPreload}/`, `${writableDataPathStandard}/`),
                        });
                        cursor.continue();
                    }
                };
                cursorRequest.onerror = handleError;
            }
            catch (error) {
                // istanbul ignore next
                handleError.call({ error });
            }
        }
        return new Promise((resolve) => {
            resolveCallback = resolve;
            openDbSourceRequest = indexedDB.open(writableDataPathPreload);
            openDbSourceRequest.onupgradeneeded = () => {
                try {
                    openDbSourceRequest.result.createObjectStore(fsObjectStoreName);
                }
                catch (error) {
                    // Ignored
                }
            };
            openDbSourceRequest.onsuccess = () => {
                if (!Array.from(openDbSourceRequest.result.objectStoreNames).includes(fsObjectStoreName)) {
                    return resolve(0);
                }
                openDbTargetRequest = indexedDB.open(writableDataPathStandard);
                openDbTargetRequest.onupgradeneeded = () => {
                    try {
                        openDbTargetRequest.result.createObjectStore(fsObjectStoreName);
                    }
                    catch (error) {
                        // Ignored
                    }
                };
                openDbTargetRequest.onsuccess = () => {
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
        return new Promise((resolve, reject) => {
            // Merge with data coming from preloading workers if needed
            (!preloading && populate ? syncFSMergePreloadedData() : Promise.resolve(0))
                .then((mergedObjects) => {
                if (!preloading && populate && !initialPopulation && mergedObjects === 0) {
                    fsSyncInProgress = false;
                    return resolve();
                }
                // tslint:disable-next-line: no-non-null-assertion
                originalFSSyncfs(populate, (error) => {
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
    function syncFS(populate, initialPopulation = false, forceScheduling = false) {
        if (!fsSyncScheduled || forceScheduling) {
            if (fsSyncInProgress) {
                fsSyncScheduled = true;
                fsSyncPromise = fsSyncPromise.then(() => {
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
        FS.syncfs = ((populate, callback) => {
            const originalCallback = callback;
            callback = (error) => {
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
        loadLibrary,
        setScanSettings,
        setImageSettings,
        workOnScanQueue,
        workOnParseQueue,
        addScanWorkUnit,
        addParseWorkUnit,
        clearSession,
        createBlurryTable,
        setCameraProperties,
        setDeviceName,
        reset,
    };
}
// istanbul ignore next
function edataCaptureWorkerFunction() {
    const dataCaptureInstance = dataCapture();
    onmessage = (e) => {
        // Creating context triggers license key verification and activation: delay until first frame processed
        const data = e.data;
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
export const dataCaptureWorkerBlob = new Blob([`var Module;${dataCapture.toString()}(${edataCaptureWorkerFunction.toString()})()`], {
    type: "text/javascript",
});
//# sourceMappingURL=dataCaptureWorker.js.map