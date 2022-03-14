"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlurryRecognitionPreloader = void 0;
var tslib_1 = require("tslib");
var eventemitter3_1 = require("eventemitter3");
var __1 = require("..");
var barcode_1 = require("./barcode");
var browserHelper_1 = require("./browserHelper");
var dataCaptureLoader_1 = require("./dataCaptureLoader");
var logger_1 = require("./logger");
var dataCaptureWorker_1 = require("./workers/dataCaptureWorker");
var BlurryRecognitionPreloaderEventEmitter = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(BlurryRecognitionPreloaderEventEmitter, _super);
    function BlurryRecognitionPreloaderEventEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BlurryRecognitionPreloaderEventEmitter;
}(eventemitter3_1.EventEmitter));
var BlurryRecognitionPreloader = /** @class */ (function () {
    function BlurryRecognitionPreloader(preload) {
        this.eventEmitter = new eventemitter3_1.EventEmitter();
        this.queuedBlurryRecognitionSymbologies = Array.from(BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies.values());
        this.readyBlurryRecognitionSymbologies = new Set();
        this.preload = preload;
    }
    BlurryRecognitionPreloader.create = function (preload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var browserName, worker_1;
            return (0, tslib_1.__generator)(this, function (_a) {
                if (preload) {
                    browserName = browserHelper_1.BrowserHelper.userAgentInfo.getBrowser().name;
                    if (browserName != null && browserName.includes("Edge")) {
                        worker_1 = new Worker(URL.createObjectURL(new Blob(["(".concat(BlurryRecognitionPreloader.workerIndexedDBSupportTestFunction.toString(), ")()")], {
                            type: "text/javascript",
                        })));
                        return [2 /*return*/, new Promise(function (resolve) {
                                worker_1.onmessage = function (message) {
                                    worker_1.terminate();
                                    resolve(new BlurryRecognitionPreloader(message.data));
                                };
                            })];
                    }
                }
                return [2 /*return*/, new BlurryRecognitionPreloader(preload)];
            });
        });
    };
    // istanbul ignore next
    BlurryRecognitionPreloader.workerIndexedDBSupportTestFunction = function () {
        try {
            indexedDB.deleteDatabase("scandit_indexeddb_support_test");
            // @ts-ignore
            postMessage(true);
        }
        catch (error) {
            // @ts-ignore
            postMessage(false);
        }
    };
    BlurryRecognitionPreloader.prototype.prepareBlurryTables = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var alreadyAvailable, error_1;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alreadyAvailable = true;
                        if (!this.preload) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.checkBlurryTablesAlreadyAvailable()];
                    case 2:
                        alreadyAvailable = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        // istanbul ignore next
                        logger_1.Logger.log(logger_1.Logger.Level.ERROR, error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        if (alreadyAvailable) {
                            this.queuedBlurryRecognitionSymbologies = [];
                            this.readyBlurryRecognitionSymbologies = new Set(BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies);
                            this.eventEmitter.emit("blurryTablesUpdate", new Set(this.readyBlurryRecognitionSymbologies));
                        }
                        else {
                            this.dataCaptureWorker = new Worker(URL.createObjectURL(dataCaptureWorker_1.dataCaptureWorkerBlob));
                            this.dataCaptureWorker.onmessage = this.dataCaptureWorkerOnMessage.bind(this);
                            dataCaptureLoader_1.DataCaptureLoader.load(this.dataCaptureWorker, true, true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BlurryRecognitionPreloader.prototype.on = function (eventName, listener) {
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
    };
    BlurryRecognitionPreloader.prototype.updateBlurryRecognitionPriority = function (scanSettings) {
        var newQueuedBlurryRecognitionSymbologies = this.queuedBlurryRecognitionSymbologies.slice();
        this.getEnabledSymbologies(scanSettings).forEach(function (symbology) {
            var symbologyQueuePosition = newQueuedBlurryRecognitionSymbologies.indexOf(symbology);
            if (symbologyQueuePosition !== -1) {
                newQueuedBlurryRecognitionSymbologies.unshift(newQueuedBlurryRecognitionSymbologies.splice(symbologyQueuePosition, 1)[0]);
            }
        });
        this.queuedBlurryRecognitionSymbologies = newQueuedBlurryRecognitionSymbologies;
    };
    BlurryRecognitionPreloader.prototype.isBlurryRecognitionAvailable = function (scanSettings) {
        var _this = this;
        var enabledBlurryRecognitionSymbologies = this.getEnabledSymbologies(scanSettings);
        return enabledBlurryRecognitionSymbologies.every(function (symbology) {
            return _this.readyBlurryRecognitionSymbologies.has(symbology);
        });
    };
    BlurryRecognitionPreloader.prototype.getEnabledSymbologies = function (scanSettings) {
        return Array.from(BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies.values()).filter(function (symbology) {
            return scanSettings.isSymbologyEnabled(symbology);
        });
    };
    BlurryRecognitionPreloader.prototype.createNextBlurryTableSymbology = function () {
        var symbology;
        do {
            symbology = this.queuedBlurryRecognitionSymbologies.shift();
        } while (symbology != null && this.readyBlurryRecognitionSymbologies.has(symbology));
        // istanbul ignore else
        if (symbology != null) {
            this.dataCaptureWorker.postMessage({
                type: "create-blurry-table",
                symbology: symbology,
            });
        }
    };
    BlurryRecognitionPreloader.prototype.checkBlurryTablesAlreadyAvailable = function () {
        return new Promise(function (resolve) {
            var openDbRequest = indexedDB.open(BlurryRecognitionPreloader.writableDataPath);
            function handleErrorOrNew() {
                var _a;
                (_a = openDbRequest === null || openDbRequest === void 0 ? void 0 : openDbRequest.result) === null || _a === void 0 ? void 0 : _a.close();
                // this.error
                resolve(false);
            }
            openDbRequest.onupgradeneeded = function () {
                try {
                    openDbRequest.result.createObjectStore(BlurryRecognitionPreloader.fsObjectStoreName);
                }
                catch (error) {
                    // Ignored
                }
            };
            openDbRequest.onsuccess = function () {
                try {
                    var transaction = openDbRequest.result.transaction(BlurryRecognitionPreloader.fsObjectStoreName, "readonly");
                    transaction.onerror = handleErrorOrNew;
                    var storeKeysRequest_1 = transaction
                        .objectStore(BlurryRecognitionPreloader.fsObjectStoreName)
                        .getAllKeys();
                    storeKeysRequest_1.onsuccess = function () {
                        openDbRequest.result.close();
                        if ((__1.highEndBlurryRecognition
                            ? BlurryRecognitionPreloader.highEndBlurryTableFiles
                            : BlurryRecognitionPreloader.defaultBlurryTableFiles).every(function (file) {
                            return storeKeysRequest_1.result.indexOf(file) !== -1;
                        })) {
                            return resolve(true);
                        }
                        else {
                            return resolve(false);
                        }
                    };
                    storeKeysRequest_1.onerror = handleErrorOrNew;
                }
                catch (error) {
                    handleErrorOrNew.call({ error: error });
                }
            };
            openDbRequest.onblocked = openDbRequest.onerror = handleErrorOrNew;
        });
    };
    BlurryRecognitionPreloader.prototype.dataCaptureWorkerOnMessage = function (ev) {
        var _this = this;
        var data = ev.data;
        // istanbul ignore else
        if (data[1] != null) {
            switch (data[0]) {
                case "context-created":
                    this.createNextBlurryTableSymbology();
                    break;
                case "create-blurry-table-result":
                    this.readyBlurryRecognitionSymbologies.add(data[1]);
                    if ([barcode_1.Barcode.Symbology.EAN8, barcode_1.Barcode.Symbology.EAN13, barcode_1.Barcode.Symbology.UPCA, barcode_1.Barcode.Symbology.UPCE].includes(data[1])) {
                        this.readyBlurryRecognitionSymbologies.add(barcode_1.Barcode.Symbology.EAN13);
                        this.readyBlurryRecognitionSymbologies.add(barcode_1.Barcode.Symbology.EAN8);
                        this.readyBlurryRecognitionSymbologies.add(barcode_1.Barcode.Symbology.UPCA);
                        this.readyBlurryRecognitionSymbologies.add(barcode_1.Barcode.Symbology.UPCE);
                    }
                    else if ([barcode_1.Barcode.Symbology.CODE32, barcode_1.Barcode.Symbology.CODE39].includes(data[1])) {
                        this.readyBlurryRecognitionSymbologies.add(barcode_1.Barcode.Symbology.CODE32);
                        this.readyBlurryRecognitionSymbologies.add(barcode_1.Barcode.Symbology.CODE39);
                    }
                    this.eventEmitter.emit("blurryTablesUpdate", new Set(this.readyBlurryRecognitionSymbologies));
                    if (this.readyBlurryRecognitionSymbologies.size ===
                        BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies.size) {
                        // Avoid data not being persisted if IndexedDB operations in WebWorker are slow
                        setTimeout(function () {
                            _this.dataCaptureWorker.terminate();
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
    };
    BlurryRecognitionPreloader.writableDataPath = "/scandit_sync_folder_preload";
    BlurryRecognitionPreloader.fsObjectStoreName = "FILE_DATA";
    // From AndroidLowEnd
    BlurryRecognitionPreloader.defaultBlurryTableFiles = [
        "/606674e04e9da6f3ff049665e249a2d3.scandit",
        "/05ccc70dd555fe1dd48784bd0cf8e386.scandit",
        "/c5f9e9352415c38c40498e5e95dadfe7.scandit",
        "/977fe759fdd7cdfe10730e7c6a313cf1.scandit",
        "/1537c55cf10f0541c82353754f4c64fd.scandit",
        "/975d994615bcffd9b2a73fa3a678eab0.scandit",
        "/dd1689816469f85afcf8474667d8f03d.scandit",
        "/8f244e6545292e588c1df97a086c6c1b.scandit",
        "/a575dcaf6e5494a4fcc1ab4acde73ec8.scandit",
        "/dabb5674b7672c4942b526b140087d72.scandit",
        "/515813776005b3f7f83a2f1dda0c3512.scandit",
        "/1803599e0a639ac73d4fa17406f626d0.scandit",
        "/1c853515cb625cb5599ffbc55d49660b.scandit",
        "/02f134be7444abe8670302d63154ee12.scandit",
        "/f66d20444d640fb5696ad1fd84844da1.scandit",
        "/cda0058badf2e2826f38e015b4bc2086.scandit",
        "/a7f53b46cfafa92cda842f8e5552fe94.scandit",
        "/520af862bc387cbcd123bf4f6c0a2309.scandit",
        "/fe5dee8bc5034b58510f0525996d3fd1.scandit",
        "/6fa9155af734f2c952b17414e455dd9d.scandit",
        "/b43dfae194695c822dfccba33ff2c86d.scandit", // msi-plessey
    ].map(function (path) {
        return "".concat(BlurryRecognitionPreloader.writableDataPath).concat(path);
    });
    // From AndroidGeneric
    BlurryRecognitionPreloader.highEndBlurryTableFiles = [
        "/1874dc4934d21603e5d9a5ae43a778e4.scandit",
        "/63c129cdcf76aea7d93d5be187fe2538.scandit",
        "/115d22696b705b9981072313d6be73ea.scandit",
        "/4608867660a119fc208c2e2d9cb324a5.scandit",
        "/d17c176dc829d0963c15e161a80e5494.scandit",
        "/5323ad9f4f68808ccbccf152360d858b.scandit",
        "/280fc47c520d4da71bd7b46e800bf56d.scandit",
        "/285e85aaef2ce3fc3e02bd3a122c88a3.scandit",
        "/c511cd547c936a071b8d02714716e1ca.scandit",
        "/4957f614000cb4e1c37230ddf6ae2695.scandit",
        "/32b179628cb7fe9f7b9ec76f05f71843.scandit",
        "/064d712f2a6804bf7eadcb4b03aac94b.scandit",
        "/148896f408d127c37065bd889e097a48.scandit",
        "/99f6c6df8988e4fa954ca95fc96d417a.scandit",
        "/85502aef6aded3d4278bd979c10ad55e.scandit",
        "/24b31e817a962593346bc5bedfecfd42.scandit",
        "/13034b70bf6c595a3ae6df6d6ee1d6a4.scandit",
        "/4cb12590b4dac0ac0f8724b8aa45b75d.scandit",
        "/b3dfd3876ce0f8413c5069d87f8e8795.scandit",
        "/40d900c40fd427d6cc7ea1418209a293.scandit",
        "/feb5b253b7b4a9a210058f7cafa38461.scandit",
        "/aabd7f1b722807e223293dfaf212be23.scandit",
        "/2a9858ec9bba816cdfbdf1b14c8719a9.scandit",
        "/d8011fc47cc6aec6b172aae4af4fdd9b.scandit",
        "/e8747cf80b9ff066ca5026a8ca092b09.scandit",
        "/5fdf50ec8f84271ea21dd77be8d44872.scandit",
        "/661b785b69d6ca90e9d1ea8ab542b59f.scandit",
        "/07fa32ccbca1132b1d4799883e98b39a.scandit",
        "/5603271a54266a81ca40966e66e97265.scandit",
        "/d623ba3aa0c43fb3fc1c7be7aa2c69d2.scandit",
        "/bb770ea7325ee07808a318a236f2ec00.scandit",
        "/c4ddab70bcfb9e88bd75786459211217.scandit",
        "/9097adb842cd84073fd834d83520e3d3.scandit",
        "/642f7fb3cf1b48a7391c2ac0358f2bc2.scandit",
        "/a29f17de80be594245277fc418bf6a28.scandit",
        "/5295187c71b6c414d89f41909a92d74e.scandit",
        "/9dd44ec739d98429fc5fbdafb0127c43.scandit",
        "/7bc6d7c115ffb99739447c56e1faa181.scandit",
        "/2e84c1f83144a30ce5e3384766cd0918.scandit",
        "/be65a2a8af180ba9461b4607de385afe.scandit",
        "/8507e094c3e139c87cdba48291e5b888.scandit",
        "/06c61f29f834fa28b36700587e777f89.scandit", // msi-plessey
    ].map(function (path) {
        return "".concat(BlurryRecognitionPreloader.writableDataPath).concat(path);
    });
    // Roughly ordered by priority
    BlurryRecognitionPreloader.availableBlurryRecognitionSymbologies = new Set([
        barcode_1.Barcode.Symbology.EAN13,
        barcode_1.Barcode.Symbology.EAN8,
        barcode_1.Barcode.Symbology.CODE32,
        barcode_1.Barcode.Symbology.CODE39,
        barcode_1.Barcode.Symbology.CODE128,
        barcode_1.Barcode.Symbology.CODE93,
        barcode_1.Barcode.Symbology.INTERLEAVED_2_OF_5,
        barcode_1.Barcode.Symbology.MSI_PLESSEY,
        barcode_1.Barcode.Symbology.CODABAR,
        barcode_1.Barcode.Symbology.UPCA,
        barcode_1.Barcode.Symbology.UPCE, // Shared with EAN8, EAN13, UPCA
    ]);
    return BlurryRecognitionPreloader;
}());
exports.BlurryRecognitionPreloader = BlurryRecognitionPreloader;
//# sourceMappingURL=blurryRecognitionPreloader.js.map