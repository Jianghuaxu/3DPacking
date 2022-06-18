import { EventEmitter } from "eventemitter3";
import { highEndBlurryRecognition } from "..";
import { Barcode } from "./barcode";
import { BrowserHelper } from "./browserHelper";
import { DataCaptureLoader } from "./dataCaptureLoader";
import { Logger } from "./logger";
import { dataCaptureWorkerBlob } from "./workers/dataCaptureWorker";
class BlurryRecognitionPreloaderEventEmitter extends EventEmitter {
}
export class BlurryRecognitionPreloader {
    static writableDataPath = "/scandit_sync_folder_preload";
    static fsObjectStoreName = "FILE_DATA";
    // From AndroidLowEnd
    static defaultBlurryTableFiles = [
        "/20919bc5228479679a264521447f9c87.scandit",
        "/855b1fdf70718074e40e97328ea23039.scandit",
        "/92038ea8367cfcdfebed31e0ad1c5c6d.scandit",
        "/1c02d3aa478da28ebf5756c342565017.scandit",
        "/ce00c525c9f8160b0cd12b09fa739fbf.scandit",
        "/e5e60e4cc82ecb0f1b7f7bfaabfe7a8c.scandit",
        "/3a63262b342a4f603b3626a98565e174.scandit",
        "/e9bb1a0e5ec3ddd037a91497c09d8daa.scandit",
        "/f6f53a0c00683f6b349f29ff76107662.scandit",
        "/41db165d92b2369b4e7c841e29ced06a.scandit",
        "/4571aa251af4c3d3bd63f47a0b54d30d.scandit",
        "/94c3ff79d8c922c01f048c1deac9d89b.scandit",
        "/7a1d15cb731e1a8fd146427bb7920922.scandit",
        "/b874f8f9aa42b909b68c8cb59db5b2aa.scandit",
        "/f867458021a0bd9b2bd2448958e98d9b.scandit",
        "/828281aceea050a47657fab7fc470b2c.scandit",
        "/9e06fc65990c496de0da6c71376758b3.scandit",
        "/ef939d962bc030919393e822be1ba6f7.scandit",
        "/04c912268484e863833dcf31c8ad7898.scandit",
        "/401b20aa6d4551f9d001c20581ece64e.scandit",
        "/b8f73417d6947f4c4fc205329703804c.scandit", // msi-plessey
    ].map((path) => {
        return `${BlurryRecognitionPreloader.writableDataPath}${path}`;
    });
    // From AndroidGeneric
    static highEndBlurryTableFiles = [
        "/9acb7e350bb910f2a1309b31214f9a4e.scandit",
        "/b2dc1168d2bb679c233068f078944e41.scandit",
        "/4b93e8f2d0a529874f5737e04b9784c1.scandit",
        "/4e9821a5898a46445b8beed46626581f.scandit",
        "/260b8a8fdf8e5fbf2526e138c7c0bbb5.scandit",
        "/8c561caef1b9c4b852811f5c2374bb8e.scandit",
        "/f63809050de2702c9527eb1891b337e5.scandit",
        "/576639d5aa0b5f5d19bfe3864eab749a.scandit",
        "/e645b5549783972888fc1cf69163de27.scandit",
        "/9dd619e2ae39d75ecbc1cb9391b04aad.scandit",
        "/0fa0b08a89e9ce63edc91beab6206461.scandit",
        "/c0a273dbcef08a1e4a9cc387752b4c0e.scandit",
        "/00caaf030fbdfcec26df3f8d3a400f2e.scandit",
        "/b53f643fcc542977ffe8ce30d1f8beb0.scandit",
        "/825a85c14ca9e19e2bc211c8e82c1e53.scandit",
        "/23b2c91f549629488800b671406ed399.scandit",
        "/7c43295d738875ce8265ecf037fa1b12.scandit",
        "/3f9b28270bc4a077fde6b547574d5780.scandit",
        "/814cf529041339e4f6598e6b69b7c608.scandit",
        "/ddc7990e91e2293216c98e6bb1ac024a.scandit",
        "/75e3eaabf7987fdb433be1d1fe92032a.scandit",
        "/497112cbe8674c21c4c8bd7f0e957b71.scandit",
        "/94ae9b357c6061d489c10d7ac73e3139.scandit",
        "/df4383c06c7a85a8e8c2a1d86b61e6bc.scandit",
        "/5aee7e2ea252b3b05145493721caa9b1.scandit",
        "/aeb733f6d7a86c4115826b2c89df2720.scandit",
        "/c22f49a08f466b877208c4a31569bd9d.scandit",
        "/1524b7b4fa54aee57369c54b86bd65f4.scandit",
        "/cf3110c18bec369705b94e50aae077ab.scandit",
        "/bb7b0c63371cfa0787a90b19c3650587.scandit",
        "/6e4454c7a20910115e6653b1cd607e12.scandit",
        "/492339332477a5c9efa2cb6701f754d3.scandit",
        "/50919ffed0c9a78f19ff465bdfd4f2b8.scandit",
        "/c0795f18a2ebfd0b6835be5ad787a040.scandit",
        "/1e0a5fb89be9e843b96174b0c182727b.scandit",
        "/14126c0d924e0128f6caca76ecdceb6d.scandit",
        "/5f43256a6a2032966dd44c6a3eef53eb.scandit",
        "/83bb18bb71dead54a013fe2cc85ad4f7.scandit",
        "/6ee5a2338030d3282516040607182b26.scandit",
        "/7a341c4ba35f02335fd3200ec02ff205.scandit",
        "/6ebdbff2f3739b35ba8f68517451eb37.scandit",
        "/a5ba033b43d4a2c80dab49eaa2d90162.scandit", // msi-plessey
    ].map((path) => {
        return `${BlurryRecognitionPreloader.writableDataPath}${path}`;
    });
    // Roughly ordered by priority
    static availableBlurryRecognitionSymbologies = new Set([
        Barcode.Symbology.EAN13,
        Barcode.Symbology.EAN8,
        Barcode.Symbology.CODE32,
        Barcode.Symbology.CODE39,
        Barcode.Symbology.CODE128,
        Barcode.Symbology.CODE93,
        Barcode.Symbology.INTERLEAVED_2_OF_5,
        Barcode.Symbology.MSI_PLESSEY,
        Barcode.Symbology.CODABAR,
        Barcode.Symbology.UPCA,
        Barcode.Symbology.UPCE, // Shared with EAN8, EAN13, UPCA
    ]);
    eventEmitter = new EventEmitter();
    preload;
    queuedBlurryRecognitionSymbologies = Array.from(BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies.values());
    readyBlurryRecognitionSymbologies = new Set();
    dataCaptureWorker;
    constructor(preload) {
        this.preload = preload;
    }
    static async create(preload) {
        if (preload) {
            // Edge <= 18 doesn't support IndexedDB in blob Web Workers so data wouldn't be persisted,
            // hence it would be useless to preload barcode blurry recognition as data couldn't be saved.
            // Verify support for IndexedDB in blob Web Workers.
            const browserName = BrowserHelper.userAgentInfo.getBrowser().name;
            if (browserName != null && browserName.includes("Edge")) {
                const worker = new Worker(URL.createObjectURL(new Blob([`(${BlurryRecognitionPreloader.workerIndexedDBSupportTestFunction.toString()})()`], {
                    type: "text/javascript",
                })));
                return new Promise((resolve) => {
                    worker.onmessage = (message) => {
                        worker.terminate();
                        resolve(new BlurryRecognitionPreloader(message.data));
                    };
                });
            }
        }
        return new BlurryRecognitionPreloader(preload);
    }
    // istanbul ignore next
    static workerIndexedDBSupportTestFunction() {
        try {
            indexedDB.deleteDatabase("scandit_indexeddb_support_test");
            // @ts-ignore
            postMessage(true);
        }
        catch (error) {
            // @ts-ignore
            postMessage(false);
        }
    }
    async prepareBlurryTables() {
        let alreadyAvailable = true;
        if (this.preload) {
            try {
                alreadyAvailable = await this.checkBlurryTablesAlreadyAvailable();
            }
            catch (error) {
                // istanbul ignore next
                Logger.log(Logger.Level.ERROR, error);
            }
        }
        if (alreadyAvailable) {
            this.queuedBlurryRecognitionSymbologies = [];
            this.readyBlurryRecognitionSymbologies = new Set(BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies);
            this.eventEmitter.emit("blurryTablesUpdate", new Set(this.readyBlurryRecognitionSymbologies));
        }
        else {
            this.dataCaptureWorker = new Worker(URL.createObjectURL(dataCaptureWorkerBlob));
            this.dataCaptureWorker.onmessage = this.dataCaptureWorkerOnMessage.bind(this);
            DataCaptureLoader.load(this.dataCaptureWorker, true, true);
        }
    }
    on(eventName, listener) {
        // istanbul ignore else
        if (eventName === "blurryTablesUpdate") {
            if (this.readyBlurryRecognitionSymbologies.size ===
                BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies.size) {
                listener(this.readyBlurryRecognitionSymbologies);
            }
            else {
                this.eventEmitter.on(eventName, listener);
            }
        }
    }
    updateBlurryRecognitionPriority(scanSettings) {
        const newQueuedBlurryRecognitionSymbologies = this.queuedBlurryRecognitionSymbologies.slice();
        this.getEnabledSymbologies(scanSettings).forEach((symbology) => {
            const symbologyQueuePosition = newQueuedBlurryRecognitionSymbologies.indexOf(symbology);
            if (symbologyQueuePosition !== -1) {
                newQueuedBlurryRecognitionSymbologies.unshift(newQueuedBlurryRecognitionSymbologies.splice(symbologyQueuePosition, 1)[0]);
            }
        });
        this.queuedBlurryRecognitionSymbologies = newQueuedBlurryRecognitionSymbologies;
    }
    isBlurryRecognitionAvailable(scanSettings) {
        const enabledBlurryRecognitionSymbologies = this.getEnabledSymbologies(scanSettings);
        return enabledBlurryRecognitionSymbologies.every((symbology) => {
            return this.readyBlurryRecognitionSymbologies.has(symbology);
        });
    }
    getEnabledSymbologies(scanSettings) {
        return Array.from(BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies.values()).filter((symbology) => {
            return scanSettings.isSymbologyEnabled(symbology);
        });
    }
    createNextBlurryTableSymbology() {
        let symbology;
        do {
            symbology = this.queuedBlurryRecognitionSymbologies.shift();
        } while (symbology != null && this.readyBlurryRecognitionSymbologies.has(symbology));
        // istanbul ignore else
        if (symbology != null) {
            this.dataCaptureWorker.postMessage({
                type: "create-blurry-table",
                symbology,
            });
        }
    }
    checkBlurryTablesAlreadyAvailable() {
        return new Promise((resolve) => {
            const openDbRequest = indexedDB.open(BlurryRecognitionPreloader.writableDataPath);
            function handleErrorOrNew() {
                openDbRequest?.result?.close();
                // this.error
                resolve(false);
            }
            openDbRequest.onupgradeneeded = () => {
                try {
                    openDbRequest.result.createObjectStore(BlurryRecognitionPreloader.fsObjectStoreName);
                }
                catch (error) {
                    // Ignored
                }
            };
            openDbRequest.onsuccess = () => {
                try {
                    const transaction = openDbRequest.result.transaction(BlurryRecognitionPreloader.fsObjectStoreName, "readonly");
                    transaction.onerror = handleErrorOrNew;
                    const storeKeysRequest = transaction
                        .objectStore(BlurryRecognitionPreloader.fsObjectStoreName)
                        .getAllKeys();
                    storeKeysRequest.onsuccess = () => {
                        openDbRequest.result.close();
                        if ((highEndBlurryRecognition
                            ? BlurryRecognitionPreloader.highEndBlurryTableFiles
                            : BlurryRecognitionPreloader.defaultBlurryTableFiles).every((file) => {
                            return storeKeysRequest.result.indexOf(file) !== -1;
                        })) {
                            return resolve(true);
                        }
                        else {
                            return resolve(false);
                        }
                    };
                    storeKeysRequest.onerror = handleErrorOrNew;
                }
                catch (error) {
                    handleErrorOrNew.call({ error });
                }
            };
            openDbRequest.onblocked = openDbRequest.onerror = handleErrorOrNew;
        });
    }
    dataCaptureWorkerOnMessage(ev) {
        const data = ev.data;
        // istanbul ignore else
        if (data[1] != null) {
            switch (data[0]) {
                case "context-created":
                    this.createNextBlurryTableSymbology();
                    break;
                case "create-blurry-table-result":
                    this.readyBlurryRecognitionSymbologies.add(data[1]);
                    if ([Barcode.Symbology.EAN8, Barcode.Symbology.EAN13, Barcode.Symbology.UPCA, Barcode.Symbology.UPCE].includes(data[1])) {
                        this.readyBlurryRecognitionSymbologies.add(Barcode.Symbology.EAN13);
                        this.readyBlurryRecognitionSymbologies.add(Barcode.Symbology.EAN8);
                        this.readyBlurryRecognitionSymbologies.add(Barcode.Symbology.UPCA);
                        this.readyBlurryRecognitionSymbologies.add(Barcode.Symbology.UPCE);
                    }
                    else if ([Barcode.Symbology.CODE32, Barcode.Symbology.CODE39].includes(data[1])) {
                        this.readyBlurryRecognitionSymbologies.add(Barcode.Symbology.CODE32);
                        this.readyBlurryRecognitionSymbologies.add(Barcode.Symbology.CODE39);
                    }
                    this.eventEmitter.emit("blurryTablesUpdate", new Set(this.readyBlurryRecognitionSymbologies));
                    if (this.readyBlurryRecognitionSymbologies.size ===
                        BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies.size) {
                        // Avoid data not being persisted if IndexedDB operations in WebWorker are slow
                        setTimeout(() => {
                            this.dataCaptureWorker.terminate();
                        }, 250);
                    }
                    else {
                        this.createNextBlurryTableSymbology();
                    }
                    break;
                // istanbul ignore next
                default:
                    break;
            }
        }
    }
}
//# sourceMappingURL=blurryRecognitionPreloader.js.map