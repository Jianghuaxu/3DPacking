"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Controller=void 0;var tslib_1=require("tslib");var __1=require("..");var logger_1=require("../lib/logger");var lazyAttributeConverter_1=require("./lazyAttributeConverter");var propertyConverter_1=require("./propertyConverter");var schema_1=require("./schema");var tsHelper_1=require("./tsHelper");var validator_1=require("./validator");var Controller=function(){function t(t){this.view=t;this.viewConnected=false;this.trackAttributes=true;this.allSymbologies=Object.values(__1.Barcode.Symbology).filter(function(t){return typeof t==="string"})}t.prototype.viewConnectedCallback=function(){return(0,tslib_1.__awaiter)(this,void 0,void 0,function(){return(0,tslib_1.__generator)(this,function(t){switch(t.label){case 0:this.viewConnected=true;this.view.initializeDom();this.initializeAttributeConversionGetter();if(!this.lazyAttributeConverter[schema_1.Attribute.CONFIGURE])return[3,2];return[4,this.initPicker()];case 1:t.sent();t.label=2;case 2:return[2]}})})};t.prototype.attributeChangedCallback=function(t){if(!this.viewConnected||!this.trackAttributes){return}var e=this.view.getAttribute(t);if(e!=null&&!this.validateAttribute(t,e)){return}var r=this.attributeToCamelCase(t);this.applyChangeFromAttributeChange(r)};t.prototype.viewDisconnectedCallback=function(){this.viewConnected=false;this.picker.destroy();delete this.picker;delete this.scanSettings};t.prototype.applyChangeFromAttributeChange=function(t){var e=this;switch(t){case schema_1.Attribute.ACCESS_CAMERA:if(this.lazyAttributeConverter[schema_1.Attribute.ACCESS_CAMERA]){this.picker.accessCamera().catch(function(t){logger_1.Logger.log(logger_1.Logger.Level.WARN,"Error while accessing the camera:",t)})}else{this.picker.pauseCameraAccess()}break;case schema_1.Attribute.ENABLE_CAMERA_SWITCHER:this.picker.setCameraSwitcherEnabled(this.lazyAttributeConverter[schema_1.Attribute.ENABLE_CAMERA_SWITCHER]);break;case schema_1.Attribute.ENABLE_PINCH_TO_ZOOM:this.picker.setPinchToZoomEnabled(this.lazyAttributeConverter[schema_1.Attribute.ENABLE_PINCH_TO_ZOOM]);break;case schema_1.Attribute.ENABLE_TAP_TO_FOCUS:this.picker.setTapToFocusEnabled(this.lazyAttributeConverter[schema_1.Attribute.ENABLE_TAP_TO_FOCUS]);break;case schema_1.Attribute.ENABLE_TORCH_TOGGLE:this.picker.setTorchToggleEnabled(this.lazyAttributeConverter[schema_1.Attribute.ENABLE_TORCH_TOGGLE]);break;case schema_1.Attribute.GUI_STYLE:this.picker.setGuiStyle(this.lazyAttributeConverter[schema_1.Attribute.GUI_STYLE]);break;case schema_1.Attribute.LASER_AREA:this.picker.setLaserArea(this.lazyAttributeConverter[schema_1.Attribute.LASER_AREA]);break;case schema_1.Attribute.PLAY_SOUND_ON_SCAN:this.picker.setPlaySoundOnScanEnabled(this.lazyAttributeConverter[schema_1.Attribute.PLAY_SOUND_ON_SCAN]);break;case schema_1.Attribute.SCANNING_PAUSED:if(this.lazyAttributeConverter[schema_1.Attribute.SCANNING_PAUSED]){this.picker.pauseScanning();break}this.picker.resumeScanning().catch(function(t){logger_1.Logger.log(logger_1.Logger.Level.WARN,"Error while resuming scanning:",t)});break;case schema_1.Attribute.TARGET_SCANNING_FPS:this.picker.setTargetScanningFPS(this.lazyAttributeConverter[schema_1.Attribute.TARGET_SCANNING_FPS]);break;case schema_1.Attribute.VIBRATE_ON_SCAN:this.picker.setVibrateOnScanEnabled(this.lazyAttributeConverter[schema_1.Attribute.VIBRATE_ON_SCAN]);break;case schema_1.Attribute.VIDEO_FIT:this.picker.setVideoFit(this.lazyAttributeConverter[schema_1.Attribute.VIDEO_FIT]);break;case schema_1.Attribute.VIEWFINDER_AREA:this.picker.setViewfinderArea(this.lazyAttributeConverter[schema_1.Attribute.VIEWFINDER_AREA]);break;case schema_1.Attribute.VISIBLE:this.picker.setVisible(this.lazyAttributeConverter[schema_1.Attribute.VISIBLE]);break;case schema_1.Attribute.CAMERA:this.getCameraFromAttribute().then(function(t){e.picker.setActiveCamera(t).catch(function(t){logger_1.Logger.log(logger_1.Logger.Level.WARN,"Error while setting the active camera:",t)})}).catch(function(t){logger_1.Logger.log(logger_1.Logger.Level.WARN,"Error while getting the camera:",t)});break;case schema_1.Attribute.CAMERA_TYPE:this.picker.setCameraType(this.lazyAttributeConverter[schema_1.Attribute.CAMERA_TYPE]).catch(function(t){logger_1.Logger.log(logger_1.Logger.Level.WARN,"Error while setting camera type:",t)});break;case schema_1.Attribute.CAMERA_SETTINGS:this.picker.applyCameraSettings(this.lazyAttributeConverter[schema_1.Attribute.CAMERA_SETTINGS]).catch(function(t){logger_1.Logger.log(logger_1.Logger.Level.WARN,"Error while applying camera settings:",t)});break;case schema_1.Attribute.SCAN_SETTINGS_BLURRY_RECOGNITION:this.scanSettings.setBlurryRecognitionEnabled(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_BLURRY_RECOGNITION]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.SCAN_SETTINGS_CODE_DIRECTION_HINT:this.scanSettings.setCodeDirectionHint(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_CODE_DIRECTION_HINT]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.SCAN_SETTINGS_CODE_DUPLICATE_FILTER:this.scanSettings.setCodeDuplicateFilter(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_CODE_DUPLICATE_FILTER]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.SCAN_SETTINGS_DEVICE_NAME:this.scanSettings.setDeviceName(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_DEVICE_NAME]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.SCAN_SETTINGS_ENABLED_SYMBOLOGIES:this.onEnabledSymbologiesChanged();break;case schema_1.Attribute.SCAN_SETTINGS_GPU_ACCELERATION:this.scanSettings.setGpuAccelerationEnabled(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_GPU_ACCELERATION]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.SCAN_SETTINGS_MAX_NUMBER_OF_CODES_PER_FRAME:this.scanSettings.setMaxNumberOfCodesPerFrame(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_MAX_NUMBER_OF_CODES_PER_FRAME]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.SCAN_SETTINGS_RECOGNITION_MODE:this.scanSettings.setRecognitionMode(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_RECOGNITION_MODE]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.SCAN_SETTINGS_SEARCH_AREA:this.scanSettings.setSearchArea(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_SEARCH_AREA]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.SCAN_SETTINGS_TEXT_RECOGNITION_SETTINGS:this.scanSettings.setTextRecognitionSettings(this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_TEXT_RECOGNITION_SETTINGS]);this.picker.applyScanSettings(this.scanSettings);break;case schema_1.Attribute.CONFIGURE:if(this.lazyAttributeConverter[schema_1.Attribute.CONFIGURE]){this.initPicker().catch(function(t){logger_1.Logger.log(logger_1.Logger.Level.WARN,"Error while initializing barcode picker:",t)})}break;case schema_1.Attribute.SINGLE_IMAGE_MODE_SETTINGS:case schema_1.Attribute.CONFIGURE_ENGINE_LOCATION:case schema_1.Attribute.CONFIGURE_LICENSE_KEY:case schema_1.Attribute.CONFIGURE_HIGH_QUALITY_BLURRY_RECOGNITION:case schema_1.Attribute.CONFIGURE_LOAD_TEXT_RECOGNITION:case schema_1.Attribute.CONFIGURE_PRELOAD_BLURRY_RECOGNITION:case schema_1.Attribute.CONFIGURE_PRELOAD_ENGINE:break;default:(0,tsHelper_1.assertUnreachable)(t);break}};t.prototype.initPicker=function(){return(0,tslib_1.__awaiter)(this,void 0,void 0,function(){var t,e,r,i,a,s;var _;return(0,tslib_1.__generator)(this,function(n){switch(n.label){case 0:if(this.picker!=null){return[2]}this.validateAllAttributes();n.label=1;case 1:n.trys.push([1,6,,7]);return[4,(0,__1.configure)(this.lazyAttributeConverter[schema_1.Attribute.CONFIGURE_LICENSE_KEY],{engineLocation:this.lazyAttributeConverter[schema_1.Attribute.CONFIGURE_ENGINE_LOCATION],highQualityBlurryRecognition:this.lazyAttributeConverter[schema_1.Attribute.CONFIGURE_HIGH_QUALITY_BLURRY_RECOGNITION],loadTextRecognition:this.lazyAttributeConverter[schema_1.Attribute.CONFIGURE_LOAD_TEXT_RECOGNITION],preloadBlurryRecognition:this.lazyAttributeConverter[schema_1.Attribute.CONFIGURE_PRELOAD_BLURRY_RECOGNITION],preloadEngine:this.lazyAttributeConverter[schema_1.Attribute.CONFIGURE_PRELOAD_ENGINE]})];case 2:n.sent();t=this;e=Proxy.bind;i=(r=__1.BarcodePicker).create;a=[this.view.root];_={accessCamera:this.lazyAttributeConverter[schema_1.Attribute.ACCESS_CAMERA]};return[4,this.getCameraFromAttribute()];case 3:_.camera=n.sent(),_.cameraType=this.lazyAttributeConverter[schema_1.Attribute.CAMERA_TYPE],_.enableCameraSwitcher=this.lazyAttributeConverter[schema_1.Attribute.ENABLE_CAMERA_SWITCHER],_.enablePinchToZoom=this.lazyAttributeConverter[schema_1.Attribute.ENABLE_PINCH_TO_ZOOM],_.enableTapToFocus=this.lazyAttributeConverter[schema_1.Attribute.ENABLE_TAP_TO_FOCUS],_.enableTorchToggle=this.lazyAttributeConverter[schema_1.Attribute.ENABLE_TORCH_TOGGLE],_.playSoundOnScan=this.lazyAttributeConverter[schema_1.Attribute.PLAY_SOUND_ON_SCAN],_.vibrateOnScan=this.lazyAttributeConverter[schema_1.Attribute.VIBRATE_ON_SCAN],_.scanningPaused=this.lazyAttributeConverter[schema_1.Attribute.SCANNING_PAUSED],_.guiStyle=this.lazyAttributeConverter[schema_1.Attribute.GUI_STYLE],_.targetScanningFPS=this.lazyAttributeConverter[schema_1.Attribute.TARGET_SCANNING_FPS],_.videoFit=this.lazyAttributeConverter[schema_1.Attribute.VIDEO_FIT],_.visible=this.lazyAttributeConverter[schema_1.Attribute.VISIBLE],_.viewfinderArea=this.lazyAttributeConverter[schema_1.Attribute.VIEWFINDER_AREA],_.laserArea=this.lazyAttributeConverter[schema_1.Attribute.LASER_AREA];return[4,this.getSingleImageModeSettings()];case 4:return[4,i.apply(r,a.concat([(_.singleImageModeSettings=n.sent(),_)]))];case 5:t.picker=new(e.apply(Proxy,[void 0,n.sent(),this.getBarcodePickerProxyHandler()]));return[3,7];case 6:s=n.sent();return[2,this.handleException(s)];case 7:this.scanSettings=new __1.ScanSettings({textRecognitionSettings:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_TEXT_RECOGNITION_SETTINGS],recognitionMode:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_RECOGNITION_MODE],blurryRecognition:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_BLURRY_RECOGNITION],codeDirectionHint:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_CODE_DIRECTION_HINT],codeDuplicateFilter:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_CODE_DUPLICATE_FILTER],deviceName:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_DEVICE_NAME],enabledSymbologies:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_ENABLED_SYMBOLOGIES],gpuAcceleration:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_GPU_ACCELERATION],maxNumberOfCodesPerFrame:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_MAX_NUMBER_OF_CODES_PER_FRAME],searchArea:this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_SEARCH_AREA]});this.picker.applyScanSettings(this.scanSettings);this.picker.on("ready",this.dispatchPickerEvent.bind(this,"ready"));this.picker.on("submitFrame",this.dispatchPickerEvent.bind(this,"submitFrame"));this.picker.on("processFrame",this.dispatchPickerEvent.bind(this,"processFrame"));this.picker.on("scan",this.dispatchPickerEvent.bind(this,"scan"));this.picker.on("scanError",this.dispatchPickerEvent.bind(this,"scanError"));return[2]}})})};t.prototype.getBarcodePickerProxyHandler=function(){var t=this;var e;var r;var i=this;function a(t){if(e==null){e=new Proxy(t["gui"],{set:function(t,e,r){Reflect.set(t,e,r);i.onPickerPropertyUpdate.call(i,{origin:"gui",key:e,newValue:r});return true}})}return e}function s(t){if(r==null){r=new Proxy(t["cameraManager"],{set:function(t,e,r){Reflect.set(t,e,r);i.onPickerPropertyUpdate.call(i,{origin:"cameraManager",key:e,newValue:r});return true}})}return r}return{get:function(e,r){if(r==="gui"){return a(e)}if(r==="cameraManager"){return s(e)}if(r==="applyScanSettings"){return function(i){Reflect.apply(Reflect.get(e,r),e,[i]);t.onScannerNewScanSettings(i)}}return Reflect.get(e,r)},set:function(e,r,i){Reflect.set(e,r,i);t.onPickerPropertyUpdate({key:r,origin:"picker",newValue:i});return true}}};t.prototype.onScannerNewScanSettings=function(t){var e=this;var r=Object.values(__1.Barcode.Symbology).filter(function(t){return typeof t==="string"});var i=[{key:schema_1.Attribute.SCAN_SETTINGS_BLURRY_RECOGNITION,newValue:t.isBlurryRecognitionEnabled()},{key:schema_1.Attribute.SCAN_SETTINGS_CODE_DIRECTION_HINT,newValue:t.getCodeDirectionHint()},{key:schema_1.Attribute.SCAN_SETTINGS_CODE_DUPLICATE_FILTER,newValue:t.getCodeDuplicateFilter()},{key:schema_1.Attribute.SCAN_SETTINGS_DEVICE_NAME,newValue:t.getDeviceName()},{key:schema_1.Attribute.SCAN_SETTINGS_ENABLED_SYMBOLOGIES,newValue:r.reduce(function(e,r){if(t.isSymbologyEnabled(r)){e.push(__1.Barcode.Symbology.toJSONName(r))}return e},[])},{key:schema_1.Attribute.SCAN_SETTINGS_GPU_ACCELERATION,newValue:t.isGpuAccelerationEnabled()},{key:schema_1.Attribute.SCAN_SETTINGS_MAX_NUMBER_OF_CODES_PER_FRAME,newValue:t.getMaxNumberOfCodesPerFrame()},{key:schema_1.Attribute.SCAN_SETTINGS_RECOGNITION_MODE,newValue:t.getRecognitionMode()},{key:schema_1.Attribute.SCAN_SETTINGS_SEARCH_AREA,newValue:t.getSearchArea()},{key:schema_1.Attribute.SCAN_SETTINGS_TEXT_RECOGNITION_SETTINGS,newValue:t.getTextRecognitionSettings()}];i.forEach(function(t){e.onPickerPropertyUpdate((0,tslib_1.__assign)({origin:"scanner"},t))})};t.prototype.initializeAttributeConversionGetter=function(){this.lazyAttributeConverter=new lazyAttributeConverter_1.LazyAttributeConverter((0,schema_1.getSchema)(),this.view)};t.prototype.getCameraFromAttribute=function(){return(0,tslib_1.__awaiter)(this,void 0,void 0,function(){var t,e,r,i;return(0,tslib_1.__generator)(this,function(a){switch(a.label){case 0:e=this.lazyAttributeConverter[schema_1.Attribute.CAMERA];if(!((e===null||e===void 0?void 0:e.deviceId)!=null))return[3,2];return[4,__1.CameraAccess.getCameras()];case 1:r=a.sent();i=e.deviceId;t=r.find(function(t){return t.deviceId===i});if(t==null){logger_1.Logger.log(logger_1.Logger.Level.WARN,'Could not find camera with id "'.concat(i,'", will use default camera.'))}a.label=2;case 2:return[2,t]}})})};t.prototype.onEnabledSymbologiesChanged=function(){var t=this;var e=this.lazyAttributeConverter[schema_1.Attribute.SCAN_SETTINGS_ENABLED_SYMBOLOGIES];this.allSymbologies.forEach(function(r){var i=e.includes(r);t.scanSettings.getSymbologySettings(r).setEnabled(i)});this.picker.applyScanSettings(this.scanSettings)};t.prototype.onPickerPropertyUpdate=function(t){var e=this;var r,i;var a={gui:{customLaserArea:[schema_1.Attribute.LASER_AREA],customViewfinderArea:[schema_1.Attribute.VIEWFINDER_AREA]},cameraManager:{activeCamera:[schema_1.Attribute.CAMERA,schema_1.Attribute.CAMERA_TYPE],cameraSwitcherEnabled:[schema_1.Attribute.ENABLE_CAMERA_SWITCHER],torchToggleEnabled:[schema_1.Attribute.ENABLE_TORCH_TOGGLE],tapToFocusEnabled:[schema_1.Attribute.ENABLE_TAP_TO_FOCUS],pinchToZoomEnabled:[schema_1.Attribute.ENABLE_PINCH_TO_ZOOM]}};var s=(i=(r=a[t.origin])===null||r===void 0?void 0:r[t.key])!==null&&i!==void 0?i:[t.key];this.trackAttributes=false;s.forEach(function(r){if(schema_1.attributes.includes(r)){if(t.newValue==null){e.view.removeAttribute(r)}else{e.view.setAttribute(r,(0,propertyConverter_1.convertProperty)((0,schema_1.getSchema)()[r],t.newValue))}}});this.trackAttributes=true};t.prototype.getSingleImageModeSettings=function(){var t,e;return(0,tslib_1.__awaiter)(this,void 0,void 0,function(){var r;var i=this;return(0,tslib_1.__generator)(this,function(a){switch(a.label){case 0:r={};if(this.lazyAttributeConverter[schema_1.Attribute.SINGLE_IMAGE_MODE_SETTINGS]!=null){r.desktop=(0,tslib_1.__assign)((0,tslib_1.__assign)({},__1.SingleImageModeSettings.defaultDesktop),(t=this.lazyAttributeConverter[schema_1.Attribute.SINGLE_IMAGE_MODE_SETTINGS].desktop)!==null&&t!==void 0?t:{});r.mobile=(0,tslib_1.__assign)((0,tslib_1.__assign)({},__1.SingleImageModeSettings.defaultMobile),(e=this.lazyAttributeConverter[schema_1.Attribute.SINGLE_IMAGE_MODE_SETTINGS].mobile)!==null&&e!==void 0?e:{})}return[4,this.view.waitOnChildrenReady()];case 1:a.sent();["mobile","desktop"].forEach(function(t){["informationElement","buttonElement"].forEach(function(e){var a=i.view.querySelector('*[slot="singleImageModeSettings.'.concat(t,".").concat(e,'"]'));if(a!=null&&r[t]!=null){r[t][e]=a}})});return[2,r]}})})};t.prototype.dispatchPickerEvent=function(t,e){var r=new CustomEvent(t,{detail:e});this.view.dispatchCustomEvent(r)};t.prototype.validateAllAttributes=function(){var t=this;var e=Array.from(this.view.getAttributes());e.forEach(function(e){if(schema_1.attributes.includes(e.name)){t.validateAttribute(e.name,e.value)}})};t.prototype.validateAttribute=function(t,e){var r;var i=this.attributeToCamelCase(t);var a;switch(i){case schema_1.Attribute.ACCESS_CAMERA:case schema_1.Attribute.CONFIGURE:case schema_1.Attribute.CONFIGURE_HIGH_QUALITY_BLURRY_RECOGNITION:case schema_1.Attribute.CONFIGURE_LOAD_TEXT_RECOGNITION:case schema_1.Attribute.CONFIGURE_PRELOAD_BLURRY_RECOGNITION:case schema_1.Attribute.CONFIGURE_PRELOAD_ENGINE:case schema_1.Attribute.ENABLE_CAMERA_SWITCHER:case schema_1.Attribute.ENABLE_PINCH_TO_ZOOM:case schema_1.Attribute.ENABLE_TAP_TO_FOCUS:case schema_1.Attribute.ENABLE_TORCH_TOGGLE:case schema_1.Attribute.PLAY_SOUND_ON_SCAN:case schema_1.Attribute.SCANNING_PAUSED:case schema_1.Attribute.VIBRATE_ON_SCAN:case schema_1.Attribute.VISIBLE:case schema_1.Attribute.SCAN_SETTINGS_BLURRY_RECOGNITION:case schema_1.Attribute.SCAN_SETTINGS_GPU_ACCELERATION:a=validator_1.Validator.isBooleanAttribute;break;case schema_1.Attribute.TARGET_SCANNING_FPS:case schema_1.Attribute.SCAN_SETTINGS_CODE_DUPLICATE_FILTER:case schema_1.Attribute.SCAN_SETTINGS_MAX_NUMBER_OF_CODES_PER_FRAME:a=validator_1.Validator.isIntegerAttribute;break;case schema_1.Attribute.SCAN_SETTINGS_CODE_DIRECTION_HINT:a=validator_1.Validator.isValidCodeDirection;break;case schema_1.Attribute.SCAN_SETTINGS_RECOGNITION_MODE:a=validator_1.Validator.isValidRecognitionMode;break;case schema_1.Attribute.SCAN_SETTINGS_TEXT_RECOGNITION_SETTINGS:a=validator_1.Validator.isValidTextRecognitionSettingsObject;break;case schema_1.Attribute.CAMERA_TYPE:a=validator_1.Validator.isValidCameraType;break;case schema_1.Attribute.GUI_STYLE:a=validator_1.Validator.isValidGuiStyle;break;case schema_1.Attribute.VIDEO_FIT:a=validator_1.Validator.isValidVideoFit;break;case schema_1.Attribute.SCAN_SETTINGS_ENABLED_SYMBOLOGIES:a=validator_1.Validator.isValidJsonArray;break;case schema_1.Attribute.VIEWFINDER_AREA:case schema_1.Attribute.LASER_AREA:case schema_1.Attribute.SCAN_SETTINGS_SEARCH_AREA:a=validator_1.Validator.isValidSearchAreaAttribute;break;case schema_1.Attribute.CAMERA:a=validator_1.Validator.isValidCameraObject;break;case schema_1.Attribute.CAMERA_SETTINGS:a=validator_1.Validator.isValidCameraSettingsObject;break;case schema_1.Attribute.SINGLE_IMAGE_MODE_SETTINGS:a=validator_1.Validator.isValidSingleImageModeSettingsObject;break;case schema_1.Attribute.CONFIGURE_ENGINE_LOCATION:case schema_1.Attribute.CONFIGURE_LICENSE_KEY:case schema_1.Attribute.SCAN_SETTINGS_DEVICE_NAME:a=function(){return true};break;default:(0,tsHelper_1.assertUnreachable)(i);break}if(!a(e)){logger_1.Logger.log(logger_1.Logger.Level.WARN,'Invalid value for attribute "'.concat(i,'": "').concat(e,'". ').concat((r=validator_1.Validator.expectationMessage.get(a))!==null&&r!==void 0?r:""));return false}return true};t.prototype.attributeToCamelCase=function(t){var e=schema_1.attributes.findIndex(function(e){return e.toLowerCase()===t.toLowerCase()});return schema_1.attributes[e]};t.prototype.handleException=function(t){logger_1.Logger.log(logger_1.Logger.Level.ERROR,t)};return t}();exports.Controller=Controller;