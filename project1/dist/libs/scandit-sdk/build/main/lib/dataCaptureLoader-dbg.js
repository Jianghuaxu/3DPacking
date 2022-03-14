"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCaptureLoader = void 0;
var index_1 = require("../index");
var browserHelper_1 = require("./browserHelper");
var dataCaptureWorker_1 = require("./workers/dataCaptureWorker");
var DataCaptureLoader = /** @class */ (function () {
    function DataCaptureLoader(preload) {
        if (preload) {
            this.preloadedDataCaptureWorker = new Worker(URL.createObjectURL(dataCaptureWorker_1.dataCaptureWorkerBlob));
            DataCaptureLoader.load(this.preloadedDataCaptureWorker);
        }
        this.preloadedDataCaptureWorkerAvailable = preload;
    }
    DataCaptureLoader.load = function (dataCaptureWorker, preload, delayedRegistration) {
        if (preload === void 0) { preload = false; }
        if (delayedRegistration === void 0) { delayedRegistration = false; }
        dataCaptureWorker.postMessage({
            type: "load-library",
            deviceId: index_1.deviceId,
            libraryLocation: index_1.scanditDataCaptureLocation,
            path: window.location.pathname,
            preload: preload,
            delayedRegistration: delayedRegistration,
            highEndBlurryRecognition: index_1.highEndBlurryRecognition,
            textRecognition: index_1.textRecognition,
            licenseKey: index_1.userLicenseKey,
            deviceModelName: browserHelper_1.BrowserHelper.userAgentInfo.getDevice().model,
        });
    };
    DataCaptureLoader.prototype.getDataCaptureWorker = function () {
        if (this.preloadedDataCaptureWorkerAvailable && this.preloadedDataCaptureWorker != null) {
            this.preloadedDataCaptureWorkerAvailable = false;
            return this.preloadedDataCaptureWorker;
        }
        else {
            return new Worker(URL.createObjectURL(dataCaptureWorker_1.dataCaptureWorkerBlob));
        }
    };
    DataCaptureLoader.prototype.returnDataCaptureWorker = function (dataCaptureWorker) {
        if (this.preloadedDataCaptureWorker == null) {
            this.preloadedDataCaptureWorker = dataCaptureWorker;
        }
        if (this.preloadedDataCaptureWorker === dataCaptureWorker) {
            this.preloadedDataCaptureWorker.onmessage = null;
            this.preloadedDataCaptureWorker.postMessage({
                type: "reset",
            });
            this.preloadedDataCaptureWorkerAvailable = true;
        }
        else {
            dataCaptureWorker.terminate();
        }
    };
    return DataCaptureLoader;
}());
exports.DataCaptureLoader = DataCaptureLoader;
//# sourceMappingURL=dataCaptureLoader.js.map