"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.configure=exports.resetConfigure=exports.configurePromise=exports.configurePhase=exports.dataCaptureLoader=exports.textRecognition=exports.highEndBlurryRecognition=exports.blurryRecognitionPreloader=exports.scanditDataCaptureLocation=exports.userLicenseKey=exports.deviceId=void 0;var tslib_1=require("tslib");require("objectFitPolyfill");var blurryRecognitionPreloader_1=require("./lib/blurryRecognitionPreloader");var browserHelper_1=require("./lib/browserHelper");var customError_1=require("./lib/customError");var dataCaptureLoader_1=require("./lib/dataCaptureLoader");var logger_1=require("./lib/logger");var unsupportedBrowserError_1=require("./lib/unsupportedBrowserError");require("./styles/styles.scss");(0,tslib_1.__exportStar)(require("./lib/barcodePicker/barcodePicker"),exports);(0,tslib_1.__exportStar)(require("./lib/barcode"),exports);(0,tslib_1.__exportStar)(require("./lib/barcodeEncodingRange"),exports);(0,tslib_1.__exportStar)(require("./lib/browserCompatibility"),exports);(0,tslib_1.__exportStar)(require("./lib/browserHelper"),exports);(0,tslib_1.__exportStar)(require("./lib/camera"),exports);(0,tslib_1.__exportStar)(require("./lib/cameraAccess"),exports);(0,tslib_1.__exportStar)(require("./lib/cameraSettings"),exports);(0,tslib_1.__exportStar)(require("./lib/customError"),exports);(0,tslib_1.__exportStar)(require("./lib/imageSettings"),exports);(0,tslib_1.__exportStar)(require("./lib/logger"),exports);(0,tslib_1.__exportStar)(require("./lib/point"),exports);(0,tslib_1.__exportStar)(require("./lib/quadrilateral"),exports);(0,tslib_1.__exportStar)(require("./lib/parser"),exports);(0,tslib_1.__exportStar)(require("./lib/parserField"),exports);(0,tslib_1.__exportStar)(require("./lib/parserResult"),exports);(0,tslib_1.__exportStar)(require("./lib/recognizedText"),exports);(0,tslib_1.__exportStar)(require("./lib/scanResult"),exports);(0,tslib_1.__exportStar)(require("./lib/scanner"),exports);(0,tslib_1.__exportStar)(require("./lib/scanSettings"),exports);(0,tslib_1.__exportStar)(require("./lib/singleImageModeSettings"),exports);(0,tslib_1.__exportStar)(require("./lib/searchArea"),exports);(0,tslib_1.__exportStar)(require("./lib/symbologySettings"),exports);(0,tslib_1.__exportStar)(require("./lib/textRecognitionSettings"),exports);(0,tslib_1.__exportStar)(require("./lib/workers/dataCaptureWorker"),exports);var webComponent_1=require("./webComponent");webComponent_1.ScanditBarcodePicker.registerComponent();exports.deviceId=browserHelper_1.BrowserHelper.getDeviceId();exports.configurePhase="unconfigured";function resetConfigure(){exports.configurePhase="unconfigured"}exports.resetConfigure=resetConfigure;
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
 */function configure(e,r){var t=this;var o=r===void 0?{}:r,i=o.logLevel,s=i===void 0?logger_1.Logger.Level.DEBUG:i,n=o.engineLocation,a=n===void 0?"/":n,l=o.highQualityBlurryRecognition,u=l===void 0?false:l,p=o.loadTextRecognition,c=p===void 0?false:p,_=o.preloadBlurryRecognition,b=_===void 0?true:_,g=o.preloadEngine,x=g===void 0?true:g;if(exports.configurePhase!=="unconfigured"&&exports.configurePromise!=null){return exports.configurePromise}logger_1.Logger.setLevel(s);exports.configurePromise=new Promise(function(r,o){return(0,tslib_1.__awaiter)(t,void 0,void 0,function(){var t,i,s,n;return(0,tslib_1.__generator)(this,function(l){switch(l.label){case 0:logger_1.Logger.log(logger_1.Logger.Level.INFO,"Scandit Web SDK version: 5.9.3");exports.configurePhase="started";t=browserHelper_1.BrowserHelper.checkBrowserCompatibility();if(!t.fullSupport&&!t.scannerSupport){return[2,o(new unsupportedBrowserError_1.UnsupportedBrowserError(t))]}if(e==null||e.trim().length<64){return[2,o(new customError_1.CustomError({name:"NoLicenseKeyError",message:"No license key provided"}))]}exports.userLicenseKey=e;a+=a.slice(-1)==="/"?"":"/";if(/^https?:\/\//.test(a)){exports.scanditDataCaptureLocation="".concat(a)}else{a=a.split("/").filter(function(e){return e.length>0}).join("/");if(a===""){a="/"}else{a="/".concat(a,"/")}if(location.protocol==="file:"||location.origin==="null"){exports.scanditDataCaptureLocation="".concat(location.href.split("/").slice(0,-1).join("/")).concat(a)}else{exports.scanditDataCaptureLocation="".concat(location.origin).concat(a)}}i=browserHelper_1.BrowserHelper.userAgentInfo.getBrowser().name;s=browserHelper_1.BrowserHelper.userAgentInfo.getOS().name;if(!((i==null||i.includes("Safari")||s==null||s==="iOS")&&window.indexedDB!=null&&"databases"in indexedDB))return[3,2];return[4,new Promise(function(e){function r(){indexedDB.databases().then(e).catch(function(){})}n=window.setInterval(r,50);r()}).then(function(){return clearInterval(n)})];case 1:l.sent();l.label=2;case 2:exports.highEndBlurryRecognition=u;exports.textRecognition=c;return[4,blurryRecognitionPreloader_1.BlurryRecognitionPreloader.create(b)];case 3:exports.blurryRecognitionPreloader=l.sent();return[4,exports.blurryRecognitionPreloader.prepareBlurryTables()];case 4:l.sent();exports.dataCaptureLoader=new dataCaptureLoader_1.DataCaptureLoader(x);exports.configurePhase="done";return[2,r()]}})})}).catch(function(e){resetConfigure();throw e});return exports.configurePromise}exports.configure=configure;