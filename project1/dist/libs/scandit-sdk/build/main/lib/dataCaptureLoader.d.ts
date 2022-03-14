import { DataCaptureWorker } from "./workers/dataCaptureWorker";
export declare class DataCaptureLoader {
    private preloadedDataCaptureWorker?;
    private preloadedDataCaptureWorkerAvailable;
    constructor(preload: boolean);
    static load(dataCaptureWorker: DataCaptureWorker, preload?: boolean, delayedRegistration?: boolean): void;
    getDataCaptureWorker(): DataCaptureWorker;
    returnDataCaptureWorker(dataCaptureWorker: DataCaptureWorker): void;
}
