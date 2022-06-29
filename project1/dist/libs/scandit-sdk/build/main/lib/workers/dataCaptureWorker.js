"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.dataCaptureWorkerBlob=exports.dataCapture=void 0;var tslib_1=require("tslib");function dataCapture(){var e="/scandit_sync_folder_preload";var t="/scandit_sync_folder";var r="resources";var n=[];var a=[];var o=typeof self.OffscreenCanvas==="function";var i;var s;var c;var l;var u;var f;var d;var v;var g;var h;var p;var m;var y;var b;var _=false;var S=false;var M=false;var T=false;var w=false;var k=false;var F=false;var U=false;var C=false;var x=Promise.resolve();var I=false;var R=false;function P(n,a,i,s,c,d,g,h,p){function m(){postMessage(["library-loaded"]);A(c,d,h)}function y(){if(!k&&T&&w){M=false;Module.callMain();k=true;m();if(!c){O();N()}}}if(M){return Promise.resolve()}if(k){m();return Promise.resolve()}M=true;var b=WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,1,253,15,253,98,11]));var _=G(a,g,b),S=_.jsURI,F=_.wasmURI;l=s;u=s?e:t;f="".concat(a).concat(r,"/");v=d;self.window=self.document=self;self.path=i;self.deviceModelName=p;Module={arguments:[n],canvas:o?new self.OffscreenCanvas(32,32):undefined,instantiateWasm:function(e,t){var r;var n=(r=self.wasmJSVersion)!==null&&r!==void 0?r:"undefined";if(n!=="5.9.3"){V("error","The Scandit Data Capture library JS file found at ".concat(S," seems invalid: ")+"expected version doesn't match (received: ".concat(n,", expected: ").concat("5.9.3","). ")+"Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.")}if(typeof self.WebAssembly.instantiateStreaming==="function"){ie(e,F,g,b,t)}else{oe(e,F,g,b,t)}return{}},noInitialRun:true,preRun:[function(){return ue().catch(function(e){V("debug","No IndexedDB support, some data will not be persisted:",e)}).then(function(){T=true;y()})}],onRuntimeInitialized:function(){w=true;y()},print:function(){var e=[];for(var t=0;t<arguments.length;t++){e[t]=arguments[t]}V.apply(void 0,(0,tslib_1.__spreadArray)(["info"],(0,tslib_1.__read)(e),false))},printErr:function(){var e=[];for(var t=0;t<arguments.length;t++){e[t]=arguments[t]}V.apply(void 0,(0,tslib_1.__spreadArray)(["error"],(0,tslib_1.__read)(e),false))}};function U(){var e;try{return(e=importScripts(S))!==null&&e!==void 0?e:Promise.resolve()}catch(e){return Promise.reject(e)}}return X(U,250,4e3,function(e){V("warn",e);V("warn","Couldn't retrieve Scandit Data Capture library at ".concat(S,", retrying..."))}).catch(function(e){V("error",e);V("error","Couldn't retrieve Scandit Data Capture library at ".concat(S,", did you configure the path for it correctly?"));return Promise.resolve(e)})}function A(e,t,r){function n(){postMessage(["context-created",{hiddenScanditLogoAllowed:Module._can_hide_logo()===1}])}if(C){return n()}if(e!=null){d=e}if(t!=null){v=t}if(r!=null){g=r}if(!k||d==null||v==null||!S&&!d||g==null){return}var a=lengthBytesUTF8(g)+1;var o=Module._malloc(a);stringToUTF8(g,o,a);var i=lengthBytesUTF8(u)+1;var s=Module._malloc(i);stringToUTF8(u,s,i);var c=lengthBytesUTF8(f)+1;var l=Module._malloc(c);stringToUTF8(f,l,c);Module._create_context(o,s,d,v,l,false);Module._free(o);Module._free(s);Module._free(l);C=true;ee();te();n()}function B(e,t,r){function n(){h=e;_=t;Z();O()}h=undefined;F=false;if(t&&r){le(true,false,true).then(n).catch(n)}else{n()}}function W(e){p=e;$();O()}function j(e){var t;if(e.errorCode===260){var r=void 0;if(((t=location.href)===null||t===void 0?void 0:t.indexOf("blob:null/"))===0){r="localhost"}else{r=new URL(location.pathname!=null&&location.pathname!==""&&!location.pathname.startsWith("/")?location.pathname:location.origin).hostname}if(r[0].startsWith("[")&&r.endsWith("]")){r=r.slice(1,-1)}e.errorMessage=e.errorMessage.replace("domain name","domain name (".concat(r,")"))}
// License Key related error codes from 6 to 25 and 260
if([6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,260].includes(e.errorCode)&&g!=null&&g.length>0){e.errorMessage+=" License Key: ".concat(g.slice(0,15),"...")}}function D(e){if(e.highQualitySingleFrameMode){Z(true)}var t=re(e.data);if(e.highQualitySingleFrameMode){Z(false)}var r=JSON.parse(t);if(r.error!=null){j(r.error);postMessage(["work-error",{requestId:e.requestId,error:r.error},e.data],[e.data.buffer])}else{if(r.barcodeResult!=null&&r.textResult!=null){postMessage(["work-result",{requestId:e.requestId,result:{barcodes:r.barcodeResult,texts:r.textResult}},e.data],[e.data.buffer])}}}function O(){if(!k||n.length===0){return}if(!C){A()}if(!F){Z()}if(!U){$()}if(!C||!F||!U){return}while(n.length!==0){if(n[0].highQualitySingleFrameMode&&(m===null||m===void 0?void 0:m.includes("code"))===true&&!_){break}D(n.shift())}}function q(e){var t=ne(e.dataFormat,e.data,e.options);var r=JSON.parse(t);if(r.error!=null){j(r.error);postMessage(["parse-error",{requestId:e.requestId,error:r.error}])}else{if(r.result!=null){postMessage(["parse-result",{requestId:e.requestId,result:r.result}])}}}function N(){if(!k||a.length===0){return}if(!C){A();if(!C){return}}while(a.length!==0){q(a.shift())}}function E(e){S=true;n.push(e);O()}function L(e){S=true;a.push(e);N()}function J(){if(F){Module._scanner_session_clear()}}function Q(e){function t(){postMessage(["create-blurry-table-result",e])}if(!k||!C){return}var r=lengthBytesUTF8(e)+1;var n=Module._malloc(r);stringToUTF8(e,n,r);Module._create_blurry_table(n);Module._free(n);x.then(t).catch(t)}function K(e,t){y={cameraType:e,autofocus:t};ee()}function H(e){if(b!==e){b=e;te()}}function z(){J();n.length=0;a.length=0;h=undefined;p=undefined;S=false;F=false;U=false}function V(e){var t=[];for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}t.forEach(function(e,r){if(e instanceof Error){var n={name:e.name,message:e.message,stack:e.stack};t[r]=n}});postMessage(["log",{level:e,data:t}])}function X(e,t,r,n){return new Promise(function(a,o){e().then(a).catch(function(i){var s=t*2;if(s>r){return o(i)}n(i);setTimeout(function(){X(e,s,r,n).then(a).catch(o)},t)})})}function G(e,t,r){var n=false;if(/^https?:\/\/([^\/.]*\.)*cdn.jsdelivr.net\//.test(e)){e="https://cdn.jsdelivr.net/npm/scandit-sdk@5.9.3/build/";n=true}else if(/^https?:\/\/([^\/.]*\.)*unpkg.com\//.test(e)){e="https://unpkg.com/scandit-sdk@5.9.3/build/";n=true}var a="";if(t){a+="-ocr";if(r){a+="-simd"}}if(n){return{jsURI:"".concat(e,"scandit-engine-sdk").concat(a,".min.js"),wasmURI:"".concat(e,"scandit-engine-sdk").concat(a,".wasm")}}return{jsURI:"".concat(e,"scandit-engine-sdk").concat(a,".min.js?v=5.9.3"),wasmURI:"".concat(e,"scandit-engine-sdk").concat(a,".wasm?v=5.9.3")}}function Y(e){return Array.from(new Uint8Array(e)).map(function(e){var t=e.toString(16);return t.length===1?"0".concat(t):t}).join("")}function Z(e){var t,r;if(e===void 0){e=false}if(!k||!C||!S||h==null){return}F=false;var n=JSON.parse(h);m=n.recognitionMode;(t=n.textRecognitionSettings)!==null&&t!==void 0?t:n.textRecognitionSettings=JSON.stringify({});var a=lengthBytesUTF8(h)+1;var i=Module._malloc(a);stringToUTF8(h,i,a);var s=lengthBytesUTF8(n.textRecognitionSettings)+1;var c=Module._malloc(s);stringToUTF8(n.textRecognitionSettings,c,s);var l=Module._scanner_settings_new_from_json(i,c,(m===null||m===void 0?void 0:m.includes("code"))===true,(m===null||m===void 0?void 0:m.includes("text"))===true,n.blurryRecognition===true&&_,(r=n.matrixScanEnabled)!==null&&r!==void 0?r:false,e,n.gpuAcceleration===true&&o);Module._free(i);var u=UTF8ToString(l);if(u!==""){F=true;V("debug","External Scandit Data Capture scan settings:",JSON.parse(u))}}function $(){if(!k||!C||!S||p==null){return}U=false;var e;if(p.format.valueOf()===1){e=3}else if(p.format.valueOf()===2){e=4}else{e=1}Module._scanner_image_settings_new(p.width,p.height,e);if(s!=null){Module._free(s)}c=p.width*p.height*e;s=Module._malloc(c);U=true}function ee(){if(!k||!C||y==null){return}Module._report_camera_properties(y.cameraType==="front",y.autofocus)}function te(){if(!k||!C||b==null){return}var e=lengthBytesUTF8(b)+1;var t=Module._malloc(e);stringToUTF8(b,t,e);Module._set_device_name(t);Module._free(t)}function re(e){if(e.byteLength!==c){return JSON.stringify({barcodeResult:[],textResult:[]})}Module.HEAPU8.set(e,s);return UTF8ToString(Module._scanner_scan(s))}function ne(e,t,r){var n=typeof t==="string"?lengthBytesUTF8(t)+1:t.byteLength;var a=Module._malloc(n);if(typeof t==="string"){stringToUTF8(t,a,n)}else{Module.HEAPU8.set(t,a)}var o=lengthBytesUTF8(r)+1;var i=Module._malloc(o);stringToUTF8(r,i,o);var s=Module._parser_parse_string(e.valueOf(),a,n-1,i);Module._free(a);Module._free(i);return UTF8ToString(s)}function ae(e,t,r,n){function a(n){var a;if(typeof((a=crypto===null||crypto===void 0?void 0:crypto.subtle)===null||a===void 0?void 0:a.digest)==="function"){crypto.subtle.digest("SHA-256",n).then(function(n){var a=Y(n);var o="40e84fd0fce799334e8e70ee8adb1c7ecef93306071fd42bcb20034d54703211";if(t){o=r?"0497e539c177b04c8bcf96144b50d43e0aab60ac3d348df0c4392e5a935eb756":"25cb9569675714d461302099fe476d161a6152bb10b8dfe11564567f6fe4afbd"}if(a!==o){V("error","The Scandit Data Capture library WASM file found at ".concat(e," seems invalid: ")+"expected file hash doesn't match (received: ".concat(a,", ")+"expected: ".concat(o,"). ")+"Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.")}}).catch(function(){})}else{V("warn","Insecure context (see https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts): "+"The hash of the Scandit Data Capture library WASM file found at ".concat(e," could not be verified"))}}function o(){return new Promise(function(t,r){fetch(e).then(function(e){if(e.ok){e.clone().arrayBuffer().then(function(r){if(n){t(e)}a(r)}).catch(function(e){if(n){r(e)}});if(!n){t(e)}}else{r(new Error("HTTP status code is not ok"))}}).catch(function(e){r(e)})})}return X(o,250,4e3,function(t){V("warn",t);V("warn","Couldn't retrieve Scandit Data Capture library at ".concat(e,", retrying..."))}).catch(function(t){V("error",t);V("error","Couldn't retrieve/instantiate Scandit Data Capture library at ".concat(e,", ")+"did you configure the path for it correctly?");return Promise.reject(t)})}function oe(e,t,r,n,a){ae(t,r,n,true).then(function(e){return e.arrayBuffer()}).then(function(r){return self.WebAssembly.instantiate(r,e).then(function(e){a(e.instance)}).catch(function(e){V("error",e);V("error","Couldn't instantiate Scandit Data Capture library at ".concat(t,", ")+"did you configure the path for it correctly?")})}).catch(function(){})}function ie(e,t,r,n,a){ae(t,r,n,false).then(function(o){self.WebAssembly.instantiateStreaming(o,e).then(function(e){a(e.instance)}).catch(function(o){V("warn",o);V("warn","WebAssembly streaming compile failed. "+"Falling back to ArrayBuffer instantiation (this will make things slower)");oe(e,t,r,n,a)})}).catch(function(){})}function se(){var r="FILE_DATA";var n;var a;var o;function i(){var e,t;(e=a===null||a===void 0?void 0:a.result)===null||e===void 0?void 0:e.close();(t=o===null||o===void 0?void 0:o.result)===null||t===void 0?void 0:t.close();n(0)}function s(){try{var s=[];var c=a.result.transaction(r,"readonly");c.onerror=i;var l=c.objectStore(r).openCursor();l.onsuccess=function(){var c,u;var f=l.result;if(f==null){try{var d=0;var v=o.result.transaction(r,"readwrite");var g=v.objectStore(r);v.onerror=i;v.oncomplete=function(){a.result.close();o.result.close();return n(d)};var h=function(e){var t=g.count(e.primaryKey);t.onsuccess=function(){if(t.result===0){++d;g.add(e.value,e.primaryKey)}}};try{for(var p=(0,tslib_1.__values)(s),m=p.next();!m.done;m=p.next()){var y=m.value;h(y)}}catch(e){c={error:e}}finally{try{if(m&&!m.done&&(u=p.return))u.call(p)}finally{if(c)throw c.error}}}catch(e){i.call({error:e})}}else{s.push({value:f.value,primaryKey:f.primaryKey.toString().replace("".concat(e,"/"),"".concat(t,"/"))});f.continue()}};l.onerror=i}catch(e){i.call({error:e})}}return new Promise(function(c){n=c;a=indexedDB.open(e);a.onupgradeneeded=function(){try{a.result.createObjectStore(r)}catch(e){}};a.onsuccess=function(){if(!Array.from(a.result.objectStoreNames).includes(r)){return c(0)}o=indexedDB.open(t);o.onupgradeneeded=function(){try{o.result.createObjectStore(r)}catch(e){}};o.onsuccess=function(){s()};o.onblocked=o.onerror=i};a.onblocked=a.onerror=i})}function ce(e,t){if(i==null){return Promise.resolve()}I=true;return new Promise(function(r,n){(!l&&e?se():Promise.resolve(0)).then(function(a){if(!l&&e&&!t&&a===0){I=false;return r()}i(e,function(e){I=false;if(e!=null){return n(e)}r()})}).catch(n)})}function le(e,t,r){if(t===void 0){t=false}if(r===void 0){r=false}if(!R||r){if(I){R=true;x=x.then(function(){R=false;return ce(e,t)})}else{x=ce(e,t)}}return x}function ue(){i=FS.syncfs;FS.syncfs=function(e,t){var r=t;t=function(e){r(e)};le(e).then(t).catch(t)};try{FS.mkdir(u)}catch(e){if(e.code!=="EEXIST"){i=undefined;return Promise.reject(e)}}FS.mount(IDBFS,{},u);return le(true,true)}return{loadLibrary:P,setScanSettings:B,setImageSettings:W,workOnScanQueue:O,workOnParseQueue:N,addScanWorkUnit:E,addParseWorkUnit:L,clearSession:J,createBlurryTable:Q,setCameraProperties:K,setDeviceName:H,reset:z}}exports.dataCapture=dataCapture;function edataCaptureWorkerFunction(){var e=dataCapture();onmessage=function(t){
// Creating context triggers license key verification and activation: delay until first frame processed
var r=t.data;switch(r.type){case"load-library":e.loadLibrary(r.deviceId,r.libraryLocation,r.path,r.preload,r.delayedRegistration,r.highEndBlurryRecognition,r.textRecognition,r.licenseKey,r.deviceModelName);break;case"scan-settings":e.setScanSettings(r.settings,r.blurryRecognitionAvailable,r.blurryRecognitionRequiresUpdate);break;case"image-settings":e.setImageSettings(r.imageSettings);break;case"scan-image":e.addScanWorkUnit({requestId:r.requestId,data:r.data,highQualitySingleFrameMode:r.highQualitySingleFrameMode});break;case"parse":e.addParseWorkUnit({requestId:r.requestId,dataFormat:r.dataFormat,data:r.data,options:r.options});break;case"clear-session":e.clearSession();break;case"create-blurry-table":e.createBlurryTable(r.symbology);break;case"camera-properties":e.setCameraProperties(r.cameraType,r.autofocus);break;case"device-name":e.setDeviceName(r.deviceName);break;case"reset":e.reset();break;default:break}}}exports.dataCaptureWorkerBlob=new Blob(["var Module;".concat(dataCapture.toString(),"(").concat(edataCaptureWorkerFunction.toString(),")()")],{type:"text/javascript"});