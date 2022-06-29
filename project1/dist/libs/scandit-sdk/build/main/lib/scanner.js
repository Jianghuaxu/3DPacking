"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Scanner=void 0;var tslib_1=require("tslib");var eventemitter3_1=require("eventemitter3");var index_1=require("../index");var browserHelper_1=require("./browserHelper");var customError_1=require("./customError");var dataCaptureLoader_1=require("./dataCaptureLoader");var imageSettings_1=require("./imageSettings");var logger_1=require("./logger");var parser_1=require("./parser");var scanResult_1=require("./scanResult");var scanSettings_1=require("./scanSettings");var unsupportedBrowserError_1=require("./unsupportedBrowserError");var ScannerEventEmitter=function(e){(0,tslib_1.__extends)(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t}(eventemitter3_1.EventEmitter);var Scanner=function(){function e(e){var t=e===void 0?{}:e,r=t.scanSettings,i=r===void 0?new scanSettings_1.ScanSettings:r,a=t.imageSettings;var n=browserHelper_1.BrowserHelper.checkBrowserCompatibility();if(!n.scannerSupport){throw new unsupportedBrowserError_1.UnsupportedBrowserError(n)}if(index_1.configurePhase!=="done"){throw new customError_1.CustomError({name:"LibraryNotConfiguredError",message:index_1.configurePhase==="started"?"The library has not completed its configuration yet, please call 'configure' and wait for the returned\n            promise's resolution":"The library was not configured yet, 'configure' must be called with valid parameters before instantiating\n            the Scanner"})}this.eventEmitter=new eventemitter3_1.EventEmitter;this.isReadyToWork=false;this.workerScanQueueLength=0;this.workerParseRequestId=0;this.dataCaptureWorker=index_1.dataCaptureLoader.getDataCaptureWorker();this.dataCaptureWorker.onmessage=this.dataCaptureWorkerOnMessage.bind(this);dataCaptureLoader_1.DataCaptureLoader.load(this.dataCaptureWorker);this.activeBlurryRecognitionSymbologies=new Set;this.blurryRecognitionAvailable=false;this.applyScanSettings(i);if(a!=null){this.applyImageSettings(a)}index_1.blurryRecognitionPreloader.on("blurryTablesUpdate",this.handleBlurryTablesUpdate.bind(this))}e.ready=function(){};e.prototype.destroy=function(){if(this.dataCaptureWorker!=null){index_1.dataCaptureLoader.returnDataCaptureWorker(this.dataCaptureWorker)}this.eventEmitter.removeAllListeners()};e.prototype.applyScanSettings=function(e){var t=this;this.scanSettings=e;index_1.blurryRecognitionPreloader.updateBlurryRecognitionPriority(this.scanSettings);var r=index_1.blurryRecognitionPreloader.getEnabledSymbologies(this.scanSettings);this.blurryRecognitionAvailable=index_1.blurryRecognitionPreloader.isBlurryRecognitionAvailable(this.scanSettings);this.dataCaptureWorker.postMessage({type:"scan-settings",settings:this.scanSettings.toJSONString(),blurryRecognitionAvailable:this.blurryRecognitionAvailable,blurryRecognitionRequiresUpdate:r.some(function(e){return!t.activeBlurryRecognitionSymbologies.has(e)})});var i=this.scanSettings.getDeviceName();if(i!=null){this.dataCaptureWorker.postMessage({type:"device-name",deviceName:i})}if(this.blurryRecognitionAvailable){this.activeBlurryRecognitionSymbologies=new Set((0,tslib_1.__spreadArray)((0,tslib_1.__spreadArray)([],(0,tslib_1.__read)(this.activeBlurryRecognitionSymbologies),false),(0,tslib_1.__read)(r),false))}this.eventEmitter.emit("newScanSettings",this.scanSettings);return this};e.prototype.applyImageSettings=function(e){this.imageSettings=e;this.dataCaptureWorker.postMessage({type:"image-settings",imageSettings:e});return this};e.prototype.clearSession=function(){this.dataCaptureWorker.postMessage({type:"clear-session"});return this};e.prototype.processImage=function(t,r){if(r===void 0){r=false}return(0,tslib_1.__awaiter)(this,void 0,void 0,function(){var i;var a=this;return(0,tslib_1.__generator)(this,function(n){if(this.imageSettings==null){throw new customError_1.CustomError({name:"NoImageSettings",message:"No image settings set up in the scanner"})}if(t instanceof HTMLImageElement){if(this.imageDataConversionContext==null){this.imageDataConversionContext=document.createElement("canvas").getContext("2d")}this.imageDataConversionContext.canvas.width=t.naturalWidth;this.imageDataConversionContext.canvas.height=t.naturalHeight;this.imageDataConversionContext.drawImage(t,0,0,t.naturalWidth,t.naturalHeight);t=new Uint8Array(this.imageDataConversionContext.getImageData(0,0,t.naturalWidth,t.naturalHeight).data.buffer)}switch(this.imageSettings.format.valueOf()){case imageSettings_1.ImageSettings.Format.GRAY_8U:i=1;break;case imageSettings_1.ImageSettings.Format.RGB_8U:i=3;break;case imageSettings_1.ImageSettings.Format.RGBA_8U:i=4;break;default:i=1;break}if(this.imageSettings.width*this.imageSettings.height*i!==t.length){throw new customError_1.CustomError({name:"ImageSettingsDataMismatch",message:"The provided image data doesn't match the previously set image settings"})}e.workerScanRequestId++;this.workerScanQueueLength++;return[2,new Promise(function(i,n){var s="workResult-".concat(e.workerScanRequestId);var o="workError-".concat(e.workerScanRequestId);a.eventEmitter.once(s,function(e,t){a.eventEmitter.removeAllListeners(o);a.workerScanQueueLength--;i(new scanResult_1.ScanResult(e.barcodes,e.texts,t,a.imageSettings))});a.eventEmitter.once(o,function(e,t){logger_1.Logger.log(logger_1.Logger.Level.ERROR,"Scandit Data Capture error (".concat(e.errorCode,"):"),e.errorMessage);a.eventEmitter.removeAllListeners(s);a.workerScanQueueLength--;var r=new customError_1.CustomError({name:"ScanditEngineError",message:"".concat(e.errorMessage," (").concat(e.errorCode,")")});n(r)});a.dataCaptureWorker.postMessage({type:"scan-image",requestId:e.workerScanRequestId,data:t,highQualitySingleFrameMode:r},[t.buffer])})]})})};e.prototype.isBusyProcessing=function(){return this.workerScanQueueLength!==0};e.prototype.isReady=function(){return this.isReadyToWork};e.prototype.on=function(e,t){if(e==="ready"){if(this.isReadyToWork){t()}else{this.eventEmitter.once(e,t,this)}}else if(e==="contextCreated"){if(this.licenseKeyFeatures!=null){t(this.licenseKeyFeatures)}else{this.eventEmitter.once(e,t,this)}}else{this.eventEmitter.on(e,t,this)}return this};e.prototype.addListener=function(e,t){return this.on(e,t)};e.prototype.createParserForFormat=function(e){return new parser_1.Parser(this,e)};e.prototype.getImageSettings=function(){return this.imageSettings};e.prototype.getScanSettings=function(){return this.scanSettings};e.prototype.parse=function(e,t,r){return(0,tslib_1.__awaiter)(this,void 0,void 0,function(){var i=this;return(0,tslib_1.__generator)(this,function(a){this.workerParseRequestId++;return[2,new Promise(function(a,n){var s="parseResult-".concat(i.workerParseRequestId);var o="parseError-".concat(i.workerParseRequestId);i.eventEmitter.once(s,function(e){i.eventEmitter.removeAllListeners(o);var t={jsonString:e,fields:[],fieldsByName:{}};JSON.parse(e).forEach(function(e){t.fields.push(e);t.fieldsByName[e.name]=e});a(t)});i.eventEmitter.once(o,function(e){logger_1.Logger.log(logger_1.Logger.Level.ERROR,"Scandit Data Capture error (".concat(e.errorCode,"):"),e.errorMessage);i.eventEmitter.removeAllListeners(s);var t=new customError_1.CustomError({name:"ScanditEngineError",message:"".concat(e.errorMessage," (").concat(e.errorCode,")")});n(t)});i.dataCaptureWorker.postMessage({type:"parse",requestId:i.workerParseRequestId,dataFormat:e,data:t,options:r==null?"{}":JSON.stringify(r)})})]})})};e.prototype.reportCameraProperties=function(e,t){if(t===void 0){t=true}this.dataCaptureWorker.postMessage({type:"camera-properties",cameraType:e,autofocus:t});return this};e.prototype.removeListener=function(e,t){this.eventEmitter.removeListener(e,t);return this};e.prototype.removeAllListeners=function(e){this.eventEmitter.removeAllListeners(e);return this};e.prototype.handleBlurryTablesUpdate=function(){if(this.blurryRecognitionAvailable){return}this.blurryRecognitionAvailable=index_1.blurryRecognitionPreloader.isBlurryRecognitionAvailable(this.scanSettings);if(this.blurryRecognitionAvailable){this.activeBlurryRecognitionSymbologies=new Set((0,tslib_1.__spreadArray)((0,tslib_1.__spreadArray)([],(0,tslib_1.__read)(this.activeBlurryRecognitionSymbologies),false),(0,tslib_1.__read)(index_1.blurryRecognitionPreloader.getEnabledSymbologies(this.scanSettings)),false));this.dataCaptureWorker.postMessage({type:"scan-settings",settings:this.scanSettings.toJSONString(),blurryRecognitionAvailable:true,blurryRecognitionRequiresUpdate:true})}};e.prototype.dataCaptureWorkerOnMessage=function(e){var t=e.data;if(t[0]==="log"){t[1].data.forEach(function(e,r){if(e.name!=null&&e.message!=null){var i=new customError_1.CustomError({name:e.name,message:e.message});i.stack=e.stack;t[1].data[r]=i}});logger_1.Logger.log.apply(logger_1.Logger,(0,tslib_1.__spreadArray)([t[1].level],(0,tslib_1.__read)(t[1].data),false));return}if(t[0]==="library-loaded"){this.isReadyToWork=true;this.eventEmitter.emit("ready");return}if(t[1]!=null){switch(t[0]){case"context-created":this.licenseKeyFeatures=t[1];this.eventEmitter.emit("contextCreated",this.licenseKeyFeatures);break;case"work-result":this.eventEmitter.emit("workResult-".concat(t[1].requestId),t[1].result,t[2]);break;case"work-error":this.eventEmitter.emit("workError-".concat(t[1].requestId),t[1].error,t[2]);break;case"parse-result":this.eventEmitter.emit("parseResult-".concat(t[1].requestId),t[1].result);break;case"parse-error":this.eventEmitter.emit("parseError-".concat(t[1].requestId),t[1].error);break;default:break}}};e.workerScanRequestId=0;return e}();exports.Scanner=Scanner;