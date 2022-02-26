import "objectFitPolyfill";
import { BlurryRecognitionPreloader } from "./lib/blurryRecognitionPreloader";
import { BrowserHelper } from "./lib/browserHelper";
import { CustomError } from "./lib/customError";
import { DataCaptureLoader } from "./lib/dataCaptureLoader";
import { Logger } from "./lib/logger";
import { UnsupportedBrowserError } from "./lib/unsupportedBrowserError";
import "./styles/styles.scss";
export * from "./lib/barcodePicker/barcodePicker";
export * from "./lib/barcode";
export * from "./lib/barcodeEncodingRange";
export * from "./lib/browserCompatibility";
export * from "./lib/browserHelper";
export * from "./lib/camera";
export * from "./lib/cameraAccess";
export * from "./lib/cameraSettings";
export * from "./lib/customError";
export * from "./lib/imageSettings";
export * from "./lib/logger";
export * from "./lib/point";
export * from "./lib/quadrilateral";
export * from "./lib/parser";
export * from "./lib/parserField";
export * from "./lib/parserResult";
export * from "./lib/recognizedText";
export * from "./lib/scanResult";
export * from "./lib/scanner";
export * from "./lib/scanSettings";
export * from "./lib/singleImageModeSettings";
export * from "./lib/searchArea";
export * from "./lib/symbologySettings";
export * from "./lib/textRecognitionSettings";
export * from "./lib/workers/dataCaptureWorker";
import { ScanditBarcodePicker } from "./webComponent";
ScanditBarcodePicker.registerComponent();
/**
 * @hidden
 */
export const deviceId = BrowserHelper.getDeviceId();
/**
 * @hidden
 */
export let userLicenseKey;
/**
 * @hidden
 */
export let scanditDataCaptureLocation;
/**
 * @hidden
 */
export let blurryRecognitionPreloader;
/**
 * @hidden
 */
export let highEndBlurryRecognition;
/**
 * @hidden
 */
export let textRecognition;
/**
 * @hidden
 */
export let dataCaptureLoader;
/**
 * @hidden
 *
 * Flag describing if configure() was called and if it could execute in its entirety.
 */
export let configurePhase = "unconfigured";
/**
 * @hidden
 */
export let configurePromise;
/**
 * @hidden
 *
 * Mainly used by tests.
 */
export function resetConfigure() {
    configurePhase = "unconfigured";
}
/**
 * Initialize and configure the Scandit Barcode Scanner SDK library. This function must be called (once) before
 * instantiating the main library components (`BarcodePicker` and `Scanner` objects) and returns a promise. In case this
 * is called again after a successful call, parameters from subsequent calls are ignored and the same promise returned
 * from the successful call will be returned.
 *
 * Depending on parameters and browser features, any of the following errors could be the rejected result of the
 * returned promise:
 * - `NoLicenseKeyError`
 * - `UnsupportedBrowserError`
 *
 * The external external Scandit Data Capture library and data needed for barcode blurry recognition are preloaded
 * asynchronously eagerly by default after library configuration to ensure the best performance. If needed this
 * behaviour can be changed via the *preloadEngine* and *preloadBlurryRecognition* options.
 *
 * For optimal performance, it is recommended to call this function as soon as possible to ensure needed components are
 * preloaded and initialized ahead of time.
 *
 * Camera access requests are done lazily only when needed by a [[BarcodePicker]] (or [[Scanner]]) object. You can also
 * eagerly ask only for camera access permissions by calling the [[CameraAccess.getCameras]] function.
 *
 * Ideally, to make the scanning process faster, it is recommended depending on the use case to create in
 * advance a (hidden and paused) [[BarcodePicker]] or [[Scanner]] object, to later show and unpause it when needed.
 * Depending on the options this can also be used to correctly ask for camera access permissions whenever preferred.
 *
 * @param licenseKey The Scandit license key to be used by the library.
 * @param logLevel <div class="tsd-signature-symbol">Default =&nbsp;Logger.Level.DEBUG</div>
 * The console log level to be used by the library.
 * @param engineLocation <div class="tsd-signature-symbol">Default =&nbsp;"/"</div>
 * The location of the folder containing the external scandit-engine-sdk.min.js and
 * scandit-engine-sdk.wasm files (external Scandit Data Capture library).
 * By default they are retrieved from the root of the web application.
 * Can be a full URL to folder or an absolute folder path.
 * @param highQualityBlurryRecognition <div class="tsd-signature-symbol">Default =&nbsp;false</div>
 * Whether to generate and use high quality barcode blurry recognition data, resulting in improved localization and
 * scanning performance of extremely challenging 1D codes. If enabled, more time is spent to initialize (load or
 * generate if needed) the needed data - at a time depending on the <em>preloadBlurryRecognition</em> option - and for
 * the processing of each video frame.
 *
 * Enabling this option is not recommended unless really needed due to its high performance impact.
 * @param loadTextRecognition <div class="tsd-signature-symbol">Default =&nbsp;false</div>
 * Whether to load a version of the external Scandit Data Capture library providing support for text recognition (OCR).
 * If enabled, a larger version of the library is loaded, unlocking [[ScanSettings]] options to enable text recognition
 * in addition or as an alternative to barcode scanning. This also requires more time to load (download if needed,
 * compile/instantiate WebAssembly code and initialize) the external Scandit Data Capture library, used by
 * [[BarcodePicker]] and [[Scanner]] objects to perform scan operations, at a time depending on the
 * <em>preloadEngine</em> option.
 *
 * In case barcode scanning is not needed, the <em>preloadBlurryRecognition</em> option should be disabled for better
 * initialization performance.
 * @param preloadBlurryRecognition <div class="tsd-signature-symbol">Default =&nbsp;true</div>
 * Whether to preload (load or generate if needed) data needed for barcode blurry recognition as soon as possible via a
 * separate asynchronous WebWorker thread running the external Scandit Data Capture library. Data for all symbologies is
 * generated over time.
 *
 * If enabled, any [[BarcodePicker]] or [[Scanner]] object will be able to start processing video frames much faster, as
 * it won't need to generate barcode blurry recognition data lazily only when needed. If necessary, depending on given
 * [[ScanSettings]] options and on readiness of the data, processing is also initially performed without blurry
 * recognition until this data becomes available, at which point the new data will be loaded and used.
 *
 * If disabled, [[BarcodePicker]] or [[Scanner]] objects will load or generate barcode blurry recognition data lazily
 * when needed to process the first frame, depending on given [[ScanSettings]] options, and will thus require more time
 * the first time the library is actively used with the given active symbologies. As this needs to be done in the same
 * WebWorker, the processing of the frame will then be blocked until the needed data is loaded or generated.
 *
 * Note that in either case the data for barcode blurry recognition will be cached for later successive uses of the
 * library.
 *
 * Note that preloading does not trigger a device activation for licensing purposes.
 * @param preloadEngine <div class="tsd-signature-symbol">Default =&nbsp;true</div>
 * Whether to preload (download if needed, compile/instantiate WebAssembly code and initialize) the external Scandit
 * Data Capture library, used by [[BarcodePicker]] and [[Scanner]] objects to perform scan operations.
 *
 * If enabled, any [[BarcodePicker]] or [[Scanner]] object will be ready to start processing video frames much faster,
 * as the needed external Scandit Data Capture library will already be in a partially or fully initialized state thanks
 * to it being preloaded now.
 *
 * If disabled, [[BarcodePicker]] and [[Scanner]] objects will load the external Scandit Data Capture library on
 * creation (if it wasn't already loaded before by a previously created object), and will thus require more time to be
 * initialized and ready.
 *
 * Note that in either case the loaded external Scandit Data Capture library will be reused whenever possible for later
 * successive uses of the library.
 *
 * Note that preloading does not trigger a device activation for licensing purposes.
 *
 * @returns A promise resolving when the library has been configured (preloading is done independently asynchronously).
 */
export function configure(licenseKey, { logLevel = Logger.Level.DEBUG, engineLocation = "/", highQualityBlurryRecognition = false, loadTextRecognition = false, preloadBlurryRecognition = true, preloadEngine = true, } = {}) {
    if (configurePhase !== "unconfigured" && configurePromise != null) {
        return configurePromise;
    }
    Logger.setLevel(logLevel);
    configurePromise = new Promise(async (resolve, reject) => {
        Logger.log(Logger.Level.INFO, "Scandit Web SDK version: 5.9.3");
        configurePhase = "started";
        const browserCompatibility = BrowserHelper.checkBrowserCompatibility();
        if (!browserCompatibility.fullSupport && !browserCompatibility.scannerSupport) {
            return reject(new UnsupportedBrowserError(browserCompatibility));
        }
        if (licenseKey == null || licenseKey.trim().length < 64) {
            return reject(new CustomError({ name: "NoLicenseKeyError", message: "No license key provided" }));
        }
        userLicenseKey = licenseKey;
        engineLocation += engineLocation.slice(-1) === "/" ? "" : "/";
        if (/^https?:\/\//.test(engineLocation)) {
            scanditDataCaptureLocation = `${engineLocation}`;
        }
        else {
            engineLocation = engineLocation
                .split("/")
                .filter((s) => {
                return s.length > 0;
            })
                .join("/");
            if (engineLocation === "") {
                engineLocation = "/";
            }
            else {
                engineLocation = `/${engineLocation}/`;
            }
            if (location.protocol === "file:" || location.origin === "null") {
                scanditDataCaptureLocation = `${location.href.split("/").slice(0, -1).join("/")}${engineLocation}`;
            }
            else {
                scanditDataCaptureLocation = `${location.origin}${engineLocation}`;
            }
        }
        // Workaround to solve Safari/iOS bug preventing IndexedDB to work correctly on first page load
        // https://bugs.webkit.org/show_bug.cgi?id=226547
        const browserName = BrowserHelper.userAgentInfo.getBrowser().name;
        const osName = BrowserHelper.userAgentInfo.getOS().name;
        if ((browserName == null || browserName.includes("Safari") || osName == null || osName === "iOS") &&
            window.indexedDB != null &&
            "databases" in indexedDB) {
            let indexedDBStatusCheckInterval;
            await new Promise((resolveCheck) => {
                function checkIndexedDBStatus() {
                    indexedDB
                        .databases()
                        .then(resolveCheck)
                        .catch(
                    /* istanbul ignore next */ () => {
                        // Ignored
                    });
                }
                indexedDBStatusCheckInterval = window.setInterval(checkIndexedDBStatus, 50);
                checkIndexedDBStatus();
            }).then(() => clearInterval(indexedDBStatusCheckInterval));
        }
        highEndBlurryRecognition = highQualityBlurryRecognition;
        textRecognition = loadTextRecognition;
        blurryRecognitionPreloader = await BlurryRecognitionPreloader.create(preloadBlurryRecognition);
        await blurryRecognitionPreloader.prepareBlurryTables();
        dataCaptureLoader = new DataCaptureLoader(preloadEngine);
        configurePhase = "done";
        return resolve();
    }).catch((e) => {
        resetConfigure();
        throw e;
    });
    return configurePromise;
}
//# sourceMappingURL=index.js.map