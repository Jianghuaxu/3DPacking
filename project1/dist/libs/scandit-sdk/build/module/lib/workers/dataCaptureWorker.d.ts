import { Barcode, BarcodeWASMResult } from "../barcode";
import { Camera } from "../camera";
import { ImageSettings } from "../imageSettings";
import { Logger } from "../logger";
import { Parser } from "../parser";
declare type ScanWorkUnit = {
    requestId: number;
    data: Uint8Array;
    highQualitySingleFrameMode: boolean;
};
declare type ParseWorkUnit = {
    requestId: number;
    dataFormat: Parser.DataFormat;
    data: string | Uint8Array;
    options: string;
};
/**
 * @hidden
 */
export declare type DataCaptureReceivedMessageData = {
    type: "load-library";
    deviceId: string;
    libraryLocation: string;
    path: string;
    preload: boolean;
    delayedRegistration: boolean;
    highEndBlurryRecognition: boolean;
    textRecognition: boolean;
    licenseKey?: string;
    deviceModelName?: string;
} | {
    type: "scan-settings";
    settings: string;
    blurryRecognitionAvailable: boolean;
    blurryRecognitionRequiresUpdate: boolean;
} | {
    type: "image-settings";
    imageSettings: ImageSettings;
} | {
    type: "scan-image";
    requestId: number;
    data: Uint8Array;
    highQualitySingleFrameMode: boolean;
} | {
    type: "parse";
    requestId: number;
    dataFormat: Parser.DataFormat;
    data: string | Uint8Array;
    options: string;
} | {
    type: "clear-session";
} | {
    type: "create-blurry-table";
    symbology: Barcode.Symbology;
} | {
    type: "camera-properties";
    cameraType: Camera.Type;
    autofocus: boolean;
} | {
    type: "device-name";
    deviceName: string;
} | {
    type: "reset";
};
/**
 * @hidden
 */
export declare type DataCaptureSentMessageData = ["log", {
    level: Exclude<Logger.Level, Logger.Level.QUIET>;
    data: any[];
}] | ["library-loaded"] | ["context-created", object] | ["work-result", {
    requestId: number;
    result: {
        barcodes: BarcodeWASMResult[];
        texts: string[];
    };
}, Uint8Array] | ["work-error", {
    requestId: number;
    error: {
        errorCode: number;
        errorMessage: string;
    };
}, Uint8Array] | ["parse-result", {
    requestId: number;
    result: string;
}] | ["parse-error", {
    requestId: number;
    error: {
        errorCode: number;
        errorMessage: string;
    };
}] | ["create-blurry-table-result", Barcode.Symbology];
/**
 * @hidden
 */
export interface DataCaptureWorker extends Worker {
    onmessage: ((this: Worker, ev: MessageEvent & {
        data: DataCaptureSentMessageData;
    }) => void) | null;
    postMessage(message: DataCaptureReceivedMessageData, transfer: Transferable[]): void;
    postMessage(message: DataCaptureReceivedMessageData, options?: {
        transfer?: any[];
    }): void;
}
/**
 * @hidden
 */
export declare type DataCapture = {
    loadLibrary(deviceId: string, libraryLocation: string, locationPath: string, preload: boolean, delayedRegistration: boolean, highEndBlurryRecognition: boolean, textRecognition: boolean, licenseKey?: string, deviceModelName?: string): Promise<void>;
    setScanSettings(newScanSettings: string, blurryRecognitionAvailable: boolean, blurryRecognitionRequiresUpdate: boolean): void;
    setImageSettings(imageSettings: ImageSettings): void;
    workOnScanQueue(): void;
    workOnParseQueue(): void;
    addScanWorkUnit(scanWorkUnit: ScanWorkUnit): void;
    addParseWorkUnit(parseWorkUnit: ParseWorkUnit): void;
    clearSession(): void;
    createBlurryTable(symbology: Barcode.Symbology): void;
    setCameraProperties(cameraType: Camera.Type, autofocus: boolean): void;
    setDeviceName(deviceName: string): void;
    reset(): void;
};
/**
 * @hidden
 *
 * @returns DataCapture
 */
export declare function dataCapture(): DataCapture;
/**
 * @hidden
 */
export declare const dataCaptureWorkerBlob: Blob;
export {};
