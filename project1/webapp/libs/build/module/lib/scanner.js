import { EventEmitter } from "eventemitter3";
import { blurryRecognitionPreloader, configurePhase, dataCaptureLoader } from "../index";
import { BrowserHelper } from "./browserHelper";
import { CustomError } from "./customError";
import { DataCaptureLoader } from "./dataCaptureLoader";
import { ImageSettings } from "./imageSettings";
import { Logger } from "./logger";
import { Parser } from "./parser";
import { ScanResult } from "./scanResult";
import { ScanSettings } from "./scanSettings";
import { UnsupportedBrowserError } from "./unsupportedBrowserError";
/**
 * @hidden
 */
class ScannerEventEmitter extends EventEmitter {
}
/**
 * A low-level scanner interacting with the external Scandit Data Capture library.
 * Used to set up scan / image settings and to process single image frames.
 *
 * The loading of the external Scandit Data Capture library can take some time, the [[on]] method targeting the
 * [[ready]] event can be used to set up a listener function to be called when the library is loaded and the [[isReady]]
 * method can return the current status. The scanner will be ready to start scanning when the library is fully loaded.
 *
 * By default the external Scandit Data Capture library is preloaded in order to reduce the initialization time as much
 * as possible.
 *
 * In the special case where a single [[Scanner]] instance is shared between multiple active [[BarcodePicker]]
 * instances, the fairness in resource allocation for processing images between the different pickers is not guaranteed.
 */
export class Scanner {
    static workerScanRequestId = 0;
    dataCaptureWorker;
    eventEmitter;
    scanSettings;
    imageSettings;
    workerParseRequestId;
    workerScanQueueLength;
    isReadyToWork;
    licenseKeyFeatures;
    imageDataConversionContext;
    activeBlurryRecognitionSymbologies;
    blurryRecognitionAvailable;
    /**
     * Create a Scanner instance.
     *
     * It is required to having configured the library via [[configure]] before this object can be created.
     *
     * Before processing an image the relative settings must also have been set.
     *
     * Depending on library configuration, browser features and user permissions for camera access, any of the following
     * errors could be thrown:
     * - `LibraryNotConfiguredError`
     * - `UnsupportedBrowserError`
     *
     * @param scanSettings <div class="tsd-signature-symbol">Default =&nbsp;new ScanSettings()</div>
     * The configuration object for scanning options (all symbologies disabled by default).
     * @param imageSettings <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The configuration object to define the properties of an image to be scanned.
     */
    constructor({ scanSettings = new ScanSettings(), imageSettings, } = {}) {
        const browserCompatibility = BrowserHelper.checkBrowserCompatibility();
        if (!browserCompatibility.scannerSupport) {
            throw new UnsupportedBrowserError(browserCompatibility);
        }
        if (configurePhase !== "done") {
            throw new CustomError({
                name: "LibraryNotConfiguredError",
                message: configurePhase === "started"
                    ? `The library has not completed its configuration yet, please call 'configure' and wait for the returned
            promise's resolution`
                    : `The library was not configured yet, 'configure' must be called with valid parameters before instantiating
            the Scanner`,
            });
        }
        this.eventEmitter = new EventEmitter();
        this.isReadyToWork = false;
        this.workerScanQueueLength = 0;
        this.workerParseRequestId = 0;
        this.dataCaptureWorker = dataCaptureLoader.getDataCaptureWorker();
        this.dataCaptureWorker.onmessage = this.dataCaptureWorkerOnMessage.bind(this);
        DataCaptureLoader.load(this.dataCaptureWorker);
        this.activeBlurryRecognitionSymbologies = new Set();
        this.blurryRecognitionAvailable = false;
        this.applyScanSettings(scanSettings);
        if (imageSettings != null) {
            this.applyImageSettings(imageSettings);
        }
        blurryRecognitionPreloader.on("blurryTablesUpdate", this.handleBlurryTablesUpdate.bind(this));
    }
    /**
     * Fired when the external Scandit Data Capture library has been loaded and the scanner can thus start to scan
     * barcodes/texts.
     *
     * @event
     */
    // istanbul ignore next
    static ready() {
        // Ignored
    }
    /**
     * Stop/reset the internal WebWorker and destroy the scanner itself; ensuring complete cleanup.
     *
     * This method should be called after you don't plan to use the scanner anymore,
     * before the object is automatically cleaned up by JavaScript.
     * The scanner must not be used in any way after this call.
     */
    destroy() {
        if (this.dataCaptureWorker != null) {
            dataCaptureLoader.returnDataCaptureWorker(this.dataCaptureWorker);
        }
        this.eventEmitter.removeAllListeners();
    }
    /**
     * Apply a new set of scan settings to the scanner (replacing old settings).
     *
     * @param scanSettings The scan configuration object to be applied to the scanner.
     * @returns The updated [[Scanner]] object.
     */
    applyScanSettings(scanSettings) {
        this.scanSettings = scanSettings;
        blurryRecognitionPreloader.updateBlurryRecognitionPriority(this.scanSettings);
        const activeBlurryRecognitionSymbologies = blurryRecognitionPreloader.getEnabledSymbologies(this.scanSettings);
        this.blurryRecognitionAvailable = blurryRecognitionPreloader.isBlurryRecognitionAvailable(this.scanSettings);
        this.dataCaptureWorker.postMessage({
            type: "scan-settings",
            settings: this.scanSettings.toJSONString(),
            blurryRecognitionAvailable: this.blurryRecognitionAvailable,
            blurryRecognitionRequiresUpdate: activeBlurryRecognitionSymbologies.some((symbology) => {
                return !this.activeBlurryRecognitionSymbologies.has(symbology);
            }),
        });
        const deviceName = this.scanSettings.getDeviceName();
        if (deviceName != null) {
            this.dataCaptureWorker.postMessage({
                type: "device-name",
                deviceName,
            });
        }
        if (this.blurryRecognitionAvailable) {
            this.activeBlurryRecognitionSymbologies = new Set([
                ...this.activeBlurryRecognitionSymbologies,
                ...activeBlurryRecognitionSymbologies,
            ]);
        }
        this.eventEmitter.emit("newScanSettings", this.scanSettings);
        return this;
    }
    /**
     * Apply a new set of image settings to the scanner (replacing old settings).
     *
     * @param imageSettings The image configuration object to be applied to the scanner.
     * @returns The updated [[Scanner]] object.
     */
    applyImageSettings(imageSettings) {
        this.imageSettings = imageSettings;
        this.dataCaptureWorker.postMessage({
            type: "image-settings",
            imageSettings,
        });
        return this;
    }
    /**
     * Clear the scanner session.
     *
     * This removes all recognized barcodes/texts from the scanner session and allows them to be scanned again in case a
     * custom *codeDuplicateFilter* and/or *textDuplicateFilter* option was set in the [[ScanSettings]].
     *
     * @returns The updated [[Scanner]] object.
     */
    clearSession() {
        this.dataCaptureWorker.postMessage({
            type: "clear-session",
        });
        return this;
    }
    /**
     * Process a given image using the previously set scanner and image settings,
     * recognizing codes/texts and retrieving the result as a list of barcodes/texts (if any).
     *
     * Multiple requests done without waiting for previous results will be queued and handled in order.
     *
     * If *highQualitySingleFrameMode* is enabled the image will be processed with really accurate barcode internal
     * settings, resulting in much slower but more precise scanning results. This should be used only for single images
     * not part of a continuous video stream.
     *
     * Passing image data as a *Uint8Array* is the fastest option, passing a *HTMLImageElement*
     * will incur in additional operations.
     *
     * Data passed to this function is "detached"/"neutered" becoming unusable as it's being passed to the external
     * Scandit Data Capture library. You can access the same data once it's returned in the [[ScanResult.imageData]]
     * property.
     *
     * Depending on the current image settings, given *imageData* and scanning execution, any of the following errors
     * could be the rejected result of the returned promise:
     * - `NoImageSettings`
     * - `ImageSettingsDataMismatch`
     * - `ScanditEngineError`
     *
     * @param imageData The image data given as byte array or image element, complying with the previously set
     * image settings.
     * @param highQualitySingleFrameMode Whether to process the image as a high quality single frame.
     * @returns A promise resolving to the [[ScanResult]] object.
     */
    async processImage(imageData, highQualitySingleFrameMode = false) {
        if (this.imageSettings == null) {
            throw new CustomError({ name: "NoImageSettings", message: "No image settings set up in the scanner" });
        }
        if (imageData instanceof HTMLImageElement) {
            if (this.imageDataConversionContext == null) {
                this.imageDataConversionContext = document.createElement("canvas").getContext("2d");
            }
            this.imageDataConversionContext.canvas.width = imageData.naturalWidth;
            this.imageDataConversionContext.canvas.height = imageData.naturalHeight;
            this.imageDataConversionContext.drawImage(imageData, 0, 0, imageData.naturalWidth, imageData.naturalHeight);
            imageData = new Uint8Array(this.imageDataConversionContext.getImageData(0, 0, imageData.naturalWidth, imageData.naturalHeight).data.buffer);
        }
        let channels;
        switch (this.imageSettings.format.valueOf()) {
            case ImageSettings.Format.GRAY_8U:
                channels = 1;
                break;
            case ImageSettings.Format.RGB_8U:
                channels = 3;
                break;
            case ImageSettings.Format.RGBA_8U:
                channels = 4;
                break;
            default:
                channels = 1;
                break;
        }
        if (this.imageSettings.width * this.imageSettings.height * channels !== imageData.length) {
            throw new CustomError({
                name: "ImageSettingsDataMismatch",
                message: "The provided image data doesn't match the previously set image settings",
            });
        }
        Scanner.workerScanRequestId++;
        this.workerScanQueueLength++;
        return new Promise((resolve, reject) => {
            const workResultEvent = `workResult-${Scanner.workerScanRequestId}`;
            const workErrorEvent = `workError-${Scanner.workerScanRequestId}`;
            this.eventEmitter.once(workResultEvent, (workResult, returnedImageData) => {
                this.eventEmitter.removeAllListeners(workErrorEvent);
                this.workerScanQueueLength--;
                resolve(new ScanResult(workResult.barcodes, workResult.texts, returnedImageData, this.imageSettings));
            });
            this.eventEmitter.once(workErrorEvent, (error, _) => {
                Logger.log(Logger.Level.ERROR, `Scandit Data Capture error (${error.errorCode}):`, error.errorMessage);
                this.eventEmitter.removeAllListeners(workResultEvent);
                this.workerScanQueueLength--;
                const errorObject = new CustomError({
                    name: "ScanditEngineError",
                    message: `${error.errorMessage} (${error.errorCode})`,
                });
                reject(errorObject);
            });
            this.dataCaptureWorker.postMessage({
                type: "scan-image",
                requestId: Scanner.workerScanRequestId,
                data: imageData,
                highQualitySingleFrameMode,
            }, [imageData.buffer]);
        });
    }
    /**
     * @returns Whether the scanner is currently busy processing an image.
     */
    isBusyProcessing() {
        return this.workerScanQueueLength !== 0;
    }
    /**
     * @returns Whether the scanner has loaded the external Scandit Data Capture library and is ready to scan.
     */
    isReady() {
        return this.isReadyToWork;
    }
    on(eventName, listener) {
        if (eventName === "ready") {
            if (this.isReadyToWork) {
                listener();
            }
            else {
                this.eventEmitter.once(eventName, listener, this);
            }
        }
        else if (eventName === "contextCreated") {
            if (this.licenseKeyFeatures != null) {
                listener(this.licenseKeyFeatures);
            }
            else {
                this.eventEmitter.once(eventName, listener, this);
            }
        }
        else {
            this.eventEmitter.on(eventName, listener, this);
        }
        return this;
    }
    /**
     * *See the [[on]] method.*
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function.
     * @returns The updated [[Scanner]] object.
     */
    addListener(eventName, listener) {
        return this.on(eventName, listener);
    }
    /**
     * Create a new parser object.
     *
     * @param dataFormat The format of the input data for the parser.
     * @returns The newly created parser.
     */
    createParserForFormat(dataFormat) {
        return new Parser(this, dataFormat);
    }
    /**
     * Return the current image settings.
     *
     * Note that modifying this object won't directly apply these settings: the [[applyImageSettings]] method must be
     * called with the updated object.
     *
     * @returns The current image settings.
     */
    getImageSettings() {
        return this.imageSettings;
    }
    /**
     * Return the current scan settings.
     *
     * Note that modifying this object won't directly apply these settings: the [[applyScanSettings]] method must be
     * called with the updated object.
     *
     * @returns The current scan settings.
     */
    getScanSettings() {
        return this.scanSettings;
    }
    /**
     * @hidden
     *
     * Process a given string or byte array using the Scandit Parser library,
     * parsing the data in the given format and retrieving the result as a [[ParserResult]] object.
     *
     * Multiple requests done without waiting for previous results will be queued and handled in order.
     *
     * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
     *
     * @param dataFormat The format of the given data.
     * @param data The string or byte array containing the data to be parsed.
     * @param options Options for the specific data format parser.
     * @returns A promise resolving to the [[ParserResult]] object.
     */
    async parse(dataFormat, data, options) {
        this.workerParseRequestId++;
        return new Promise((resolve, reject) => {
            const parseResultEvent = `parseResult-${this.workerParseRequestId}`;
            const parseErrorEvent = `parseError-${this.workerParseRequestId}`;
            this.eventEmitter.once(parseResultEvent, (result) => {
                this.eventEmitter.removeAllListeners(parseErrorEvent);
                const parserResult = {
                    jsonString: result,
                    fields: [],
                    fieldsByName: {},
                };
                JSON.parse(result).forEach((parserField) => {
                    parserResult.fields.push(parserField);
                    parserResult.fieldsByName[parserField.name] = parserField;
                });
                resolve(parserResult);
            });
            this.eventEmitter.once(parseErrorEvent, (error) => {
                Logger.log(Logger.Level.ERROR, `Scandit Data Capture error (${error.errorCode}):`, error.errorMessage);
                this.eventEmitter.removeAllListeners(parseResultEvent);
                const errorObject = new CustomError({
                    name: "ScanditEngineError",
                    message: `${error.errorMessage} (${error.errorCode})`,
                });
                reject(errorObject);
            });
            this.dataCaptureWorker.postMessage({
                type: "parse",
                requestId: this.workerParseRequestId,
                dataFormat,
                data,
                options: options == null ? "{}" : JSON.stringify(options),
            });
        });
    }
    /**
     * @hidden
     *
     * Report new camera properties.
     *
     * This ensures optimal settings usage and detailed analytics information.
     *
     * @param cameraType The camera type (facing mode/direction).
     * @param autofocus Whether the camera supports autofocus, by default it's assumed it does.
     * @returns The updated [[Scanner]] object.
     */
    reportCameraProperties(cameraType, autofocus = true) {
        this.dataCaptureWorker.postMessage({
            type: "camera-properties",
            cameraType,
            autofocus,
        });
        return this;
    }
    /**
     * Remove the specified listener from the given event's listener array.
     *
     * @param eventName The name of the event from which to remove the listener.
     * @param listener The listener function to be removed.
     * @returns The updated [[Scanner]] object.
     */
    removeListener(eventName, listener) {
        this.eventEmitter.removeListener(eventName, listener);
        return this;
    }
    /**
     * Remove all listeners from the given event's listener array.
     *
     * @param eventName The name of the event from which to remove all listeners.
     * @returns The updated [[Scanner]] object.
     */
    removeAllListeners(eventName) {
        this.eventEmitter.removeAllListeners(eventName);
        return this;
    }
    handleBlurryTablesUpdate() {
        if (this.blurryRecognitionAvailable) {
            return;
        }
        this.blurryRecognitionAvailable = blurryRecognitionPreloader.isBlurryRecognitionAvailable(this.scanSettings);
        if (this.blurryRecognitionAvailable) {
            this.activeBlurryRecognitionSymbologies = new Set([
                ...this.activeBlurryRecognitionSymbologies,
                ...blurryRecognitionPreloader.getEnabledSymbologies(this.scanSettings),
            ]);
            this.dataCaptureWorker.postMessage({
                type: "scan-settings",
                settings: this.scanSettings.toJSONString(),
                blurryRecognitionAvailable: true,
                blurryRecognitionRequiresUpdate: true,
            });
        }
    }
    dataCaptureWorkerOnMessage(ev) {
        const data = ev.data;
        if (data[0] === "log") {
            data[1].data.forEach((dataArgument, index) => {
                if (dataArgument.name != null && dataArgument.message != null) {
                    const error = new CustomError({ name: dataArgument.name, message: dataArgument.message });
                    error.stack = dataArgument.stack;
                    data[1].data[index] = error;
                }
            });
            Logger.log(data[1].level, ...data[1].data);
            return;
        }
        if (data[0] === "library-loaded") {
            this.isReadyToWork = true;
            this.eventEmitter.emit("ready");
            return;
        }
        if (data[1] != null) {
            switch (data[0]) {
                case "context-created":
                    this.licenseKeyFeatures = data[1];
                    this.eventEmitter.emit("contextCreated", this.licenseKeyFeatures);
                    break;
                case "work-result":
                    this.eventEmitter.emit(`workResult-${data[1].requestId}`, data[1].result, data[2]);
                    break;
                case "work-error":
                    this.eventEmitter.emit(`workError-${data[1].requestId}`, data[1].error, data[2]);
                    break;
                case "parse-result":
                    this.eventEmitter.emit(`parseResult-${data[1].requestId}`, data[1].result);
                    break;
                case "parse-error":
                    this.eventEmitter.emit(`parseError-${data[1].requestId}`, data[1].error);
                    break;
                // istanbul ignore next
                default:
                    break;
            }
        }
    }
}
//# sourceMappingURL=scanner.js.map