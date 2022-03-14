import { deviceId, highEndBlurryRecognition, scanditDataCaptureLocation, textRecognition, userLicenseKey, } from "../index";
import { BrowserHelper } from "./browserHelper";
import { dataCaptureWorkerBlob } from "./workers/dataCaptureWorker";
export class DataCaptureLoader {
    preloadedDataCaptureWorker;
    preloadedDataCaptureWorkerAvailable;
    constructor(preload) {
        if (preload) {
            this.preloadedDataCaptureWorker = new Worker(URL.createObjectURL(dataCaptureWorkerBlob));
            DataCaptureLoader.load(this.preloadedDataCaptureWorker);
        }
        this.preloadedDataCaptureWorkerAvailable = preload;
    }
    static load(dataCaptureWorker, preload = false, delayedRegistration = false) {
        dataCaptureWorker.postMessage({
            type: "load-library",
            deviceId,
            libraryLocation: scanditDataCaptureLocation,
            path: window.location.pathname,
            preload,
            delayedRegistration,
            highEndBlurryRecognition,
            textRecognition,
            licenseKey: userLicenseKey,
            deviceModelName: BrowserHelper.userAgentInfo.getDevice().model,
        });
    }
    getDataCaptureWorker() {
        if (this.preloadedDataCaptureWorkerAvailable && this.preloadedDataCaptureWorker != null) {
            this.preloadedDataCaptureWorkerAvailable = false;
            return this.preloadedDataCaptureWorker;
        }
        else {
            return new Worker(URL.createObjectURL(dataCaptureWorkerBlob));
        }
    }
    returnDataCaptureWorker(dataCaptureWorker) {
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
    }
}
//# sourceMappingURL=dataCaptureLoader.js.map