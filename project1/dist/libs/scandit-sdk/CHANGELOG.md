# Change Log

## 5.9.3 (2022-01-20)

### Fixes

- Fixed camera initialization issues due to quick camera start/stop sequences causing the library to get stuck.

### Updates

- Updated _@babel/runtime-corejs2_ to version 7.16.7.

## 5.9.2 (2021-12-22)

### Changes

- The barcode picker now displays a message and accepts a tap/click from the user to recover camera access in cases where it is lost and cannot be automatically recovered.

### Fixes

- Fixed incorrect initial camera being accessed in _Chrome_ WebViews on some devices.
- Fixed library failing to load in some situations in _Firefox_ and _Safari_.

### Updates

- Updated _@babel/runtime-corejs2_ to version 7.16.5.

## 5.9.1 (2021-11-17)

### Fixes

- Fixed `BarcodePicker` resources (video elements, WebGL contexts) not being correctly released and cleaned up on destroy in some situations.

### Updates

- Updated _@babel/runtime-corejs2_ to version 7.16.3.
- Updated _csstype_ to version 3.0.10.

## 5.9.0 (2021-11-05)

### Additions

- Added a new `loadTextRecognition` option (disabled by default) to `ScanditSDK.configure()` to enable/disable text recognition, loading the appropriate more advanced version of the _external Scandit Data Capture library_ as needed.
- Added a new `textRecognitionSettings` option to `ScanSettings`'s constructor and relative functions `ScanSettings.getTextRecognitionSettings()` and `ScanSettings.setTextRecognitionSettings()` to control the settings being used for text recognition.
- Added a new `recognitionMode` option to `ScanSettings`'s constructor and relative functions `ScanSettings.getRecognitionMode()` and `ScanSettings.setRecognitionMode()` to control whether codes and/or text are recognized.
- Added a new `ScanSettings.RecognitionMode` enumeration (used inside `ScanSettings`) to list the different recognition mode (code/text combinations) available.
- Added a new `TextRecognitionSettings` class to handle configuration of text recognition settings.
- Added a new `texts` property to the `ScanResult` object, containing the list of texts found in the image (if any).
- Added a new `ScanResult.rejectText()` function to reject a text in listeners registered with `BarcodePicker.onProcessFrame()` or `BarcodePicker.onScan()`: if all codes and texts in the result are rejected, sound, vibration and GUI flashing will be suppressed.
- Added a new `logLevel` option to `ScanditSDK.configure()` to select the desired console log level of the library.
- Added a new `cameraAccessError` event to the `BarcodePicker`, emitted when an error with the access to the current camera is detected.

### Changes

- The rejection functionality has been expanded to now consider both codes and texts: only if all codes and texts in the result are rejected, sound, vibration and GUI flashing will be suppressed.
- The session clearing functionality has been expanded to be applied to both codes and texts: all recognized barcodes/texts are removed from the scanner session and are allowed to be scanned again in case a _codeDuplicateFilter_ and/or _textDuplicateFilter_ option was set in `ScanSettings` or `TextRecognitionSettings`.
- The `BarcodePicker` is no longer permanently stopped in case of a camera access error, if and when camera access is resumed, the barcode picker resumes its operations according to its current settings.

### Fixes

- Fixed rare camera initialization issues on some specific devices causing certain cameras to be inaccessible.
- Fixed rare camera initialization issues on some specific devices causing the library to get stuck.
- Fixed rare "Maximum call stack size exceeded" error when initializing a barcode picker in _Safari_.

### Updates

- Updated _external Scandit Data Capture library_ to version 6.10.0.
- Updated _@babel/runtime-corejs2_ to version 7.16.0.
- Updated _ua-parser-js_ to version 1.0.2.

## 5.8.2 (2021-10-26)

### Fixes

- Fixed failing bundling of library due to wrong required modules present in the final WebSDK browser bundles.

### Updates

- Updated _ua-parser-js_ to version 1.0.1.

## 5.8.1 (2021-10-21)

### Fixes

- Fixed incorrect initial camera being accessed in _Chrome_ WebViews in some situations.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.15.4.
- Updated _csstype_ library to version 3.0.9.
- Updated _js-cookie_ library to version 3.0.1.

## 5.8.0 (2021-08-26)

### Fixes

- Fixed incorrect cameras' video feed being sometimes briefly shown before showing the correct main camera's video feed, when initializing a `BarcodePicker` with default camera access.

### Updates

- Updated _external Scandit Data Capture library_ to version 6.9.1.
- Updated _@babel/runtime-corejs2_ library to version 7.15.3.
- Updated _howler_ library to version 2.2.3.
- Updated _js-cookie_ library to version 3.0.0.
- Updated _tslib_ library to version 2.3.1.

## 5.7.1 (2021-07-01)

### Fixes

- Fixed browser bug preventing the library to correctly load on the very first page load on _iOS_ 14.6.

## 5.7.0 (2021-06-28)

### Changes

- Switched from _Scandit Engine_ to _Scandit Data Capture_.

### Fixes

- Fixed rare camera access freeze issues when switching or pausing/resuming access on some _Android_ mobile devices in _Chrome_.
- Fixed Web Component barcode picker UI not being correctly vertically centered in some situations.
- Fixed Web Component barcode picker UI moving slightly while switching cameras.
- Fixed browser bug preventing correct processing of the camera video feed in _Chrome_ WebViews.
- Fixed browser bug preventing the library to correctly load on the very first page load in _Safari_ 14.6.

### Updates

- Replaced _external Scandit Engine library_ with _external Scandit Data Capture library_ version 6.8.1.
- Updated _@babel/runtime-corejs2_ library to version 7.14.6.
- Updated _@juggle/resize-observer_ library to version 3.3.1.
- Updated _csstype_ to version 3.0.8.
- Updated _tslib_ library to version 2.3.0.
- Updated _ua-parser-js_ to version 0.7.28.

### External Scandit Data Capture Library Updates

- Added support for _Data Matrix_ Rectangular Extension (ISO/IEC21471:2020).
- Added blurry recognition support for _Codabar_, increasing the decode range by up to 60% (may vary by device).
- Added "strict" symbology extension for 1D symbologies. It enforces strict standard adherence to eliminate false positives in blurry, irregular or damaged barcodes at the cost of reduced scan performance.
- Added ECI (Extended Channel Interpretation) support for _Data Matrix_ codes.
- Added ECI (Extended Channel Interpretation) support for _Aztec_ codes.
- Added GS1 support for _Aztec_ codes.
- Improved 1D barcode scanning performance for codes with perspective distortion.
- Improved decoding performance of large _Data Matrix_ codes.
- Corrected encoding names to true IANA names, i.e. from "ASCII" to "US-ASCII", from "ISO8859-x" to "ISO-5589-x" and from "UTF8" to "UTF-8".
- Corrected reported encoding for _QR_ codes to "ISO-8859-1" if not explicitly specified otherwise. Previous to this release, when the character encoding is not explicitly specified, the _QR_ code reader would attempt to guess the encoding. This behaviour goes counter to what's written in the _QR_ code specification. The new default is to assume an encoding of ISO-8859-1 (latin-1).
- Corrected reported encoding for _(Micro)PDF417_ codes to "ISO-8859-1" if not explicitly specified with ECI. Previous to this release, in some cases "US-ASCII" was returned.

## 5.6.0 (2021-03-26)

### Additions

- Added a new `deviceName` option to `ScanSettings`'s constructor and relative functions `ScanSettings.getDeviceName()` and `ScanSettings.setDeviceName()` to control the descriptive device name to identify the current device when looking at analytics tools.
- Added new _Matrix 2 of 5_ symbology support and relative `Barcode.Symbology.MATRIX_2_OF_5` enumeration value.
- Added new _USPS Intelligent Mail_ symbology support and relative `Barcode.Symbology.USPS_INTELLIGENT_MAIL` enumeration value.

### Updates

- Updated _external Scandit Engine library_ to version 5.19.
- Updated _@babel/runtime-corejs2_ library to version 7.13.10.
- Updated _@juggle/resize-observer_ library to version 3.3.0.
- Updated _csstype_ to version 3.0.7.

## 5.5.3 (2021-02-18)

### Fixes

- Fixed incorrect NPM script setup preventing correct installation.

## 5.5.2 (2021-02-17)

### Updates

- Updated _external Scandit Engine library_ to version 5.18.3.
- Updated _@babel/runtime-corejs2_ library to version 7.12.13.
- Updated _objectFitPolyfill_ library to version 2.3.5.
- Updated _ua-parser-js_ to version 0.7.24.

## 5.5.1 (2021-02-01)

### Changes

- Added detection of camera device connection and removal events, resulting in an update of available device information and change in cameras returned from `CameraAccess.getCameras()`.
- Improved detection and identification of cameras on desktop/laptop devices, resulting in more accurate front/back property assignments (with related correct video mirroring choices) and faster initial camera access.
- Web Component now shows initialization errors as console error messages instead of HTML text.
- Improved documentation structure.

### Fixes

- Fixed unnecessary camera access attempts being made when no camera is available.
- Fixed unnecessary camera access attempts being made when the initial camera is already correctly accessed on desktop/laptop devices.
- Fixed the same camera objects being incorrectly shared for different actual cameras in some rare situations.
- Fixed camera front/back type property being incorrectly guessed and assigned on desktop/laptop devices in some situations.
- Fixed incorrect detection of main front/back cameras on desktop/laptop devices in some situations.
- Fixed rare camera access attempts being stopped and failing ahead of time when the camera could have been accessed correctly.
- Fixed Web Component not correctly catching and displaying some errors on initialization.

### Updates

- Updated _external Scandit Engine library_ to version 5.18.2.
- Updated _csstype_ library to version 3.0.6.
- Updated _tslib_ library to version 2.1.0.
- Updated _ua-parser-js_ to version 0.7.23.

## 5.5.0 (2020-12-10)

### Additions

- Added a new `codeDirectionHint` option to `ScanSettings`'s constructor and relative functions `ScanSettings.getCodeDirectionHint()` and `ScanSettings.setCodeDirectionHint()` to control the code direction hint telling in what direction 1D codes are most likely orientated, used to locate/scan difficult codes in said directions differing from the default _left-to-right_.

### Changes

- Improved decode/scan performance of difficult blurry codes when using cameras with no autofocus capabilities.

### Fixes

- Fixed newly created `Scanner` and `BarcodePicker` objects stopping to scan when (re-)created during or shortly after the destruction of another instance due to an incorrect `Scanner.isBusyProcessing()` reported status.

## 5.4.2 (2020-11-19)

### Fixes

- Fixed camera access attempts immediately failing instead of retrying with lower video feed resolution requirements.

## 5.4.1 (2020-11-19)

### Changes

- Improved detection of small or rotated codes.

### Fixes

- Fixed camera reaccess failing in some rare situations when camera access is paused and resumed, and new device information results in no labels and modified device identifiers: the correct camera is now always identified and reaccessed when possible.
- Fixed modified device identifiers scenarios resulting in the loss of previously stored information about inaccessible cameras.
- Fixed modified device identifiers scenarios resulting in the new camera being accessed with lower video feed resolution compared to the previous state.
- Fixed modified device identifiers scenarios resulting in wrong information being stored in old camera objects and new camera objects incorrectly being created: existing camera objects are now correctly kept and used, and all correctly reflect their current status.

### Updates

- Updated _external Scandit Engine library_ to version 5.17.2.
- Updated _@babel/runtime-corejs2_ library to version 7.12.5.
- Updated _csstype_ library to version 3.0.5.

## 5.4.0 (2020-11-03)

### Additions

- Added a new optional argument (disabled by default) to the `CameraAccess.getCameras()` function, allowing to force updated available device information to be retrieved, instead of relying on cached information from previous calls.

### Changes

- Improved camera listing via `CameraAccess.getCameras()` and in internal operations, resulting in faster camera access and possibly reduced camera access user permission requests.
- Added automatic handling of unexpected camera video stream interruptions, now leading to camera reinitialization.

### Fixes

- Fixed non-standard camera access behaviour of some browsers causing camera initialization failures and black video feeds.
- Fixed `BarcodePicker` visibility changes causing some UI elements to be incorrectly hidden.
- Fixed `BarcodePicker` visibility changes not correctly maintaining its element's dimensions in some situations.

## 5.3.2 (2020-10-27)

### Changes

- Improved camera (re)access speed when the browser/tab comes back in foreground, gets focus or the screen is turned on again on mobile devices.

### Fixes

- Fixed camera access failing in some situations when switching between cameras or setting camera options.
- Fixed camera (re)access failing and causing errors when the browser/tab goes into background, loses focus or the screen is turned off on mobile devices in _Chrome_ and _Firefox mobile_.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.12.1.
- Updated _csstype_ library to version 3.0.4.
- Updated _howler_ library to version 2.2.1.
- Updated _tslib_ library to version 2.0.3.

## 5.3.1 (2020-10-21)

### Updates

- Updated _external Scandit Engine library_ to version 5.17.1.

## 5.3.0 (2020-10-06)

### Additions

- Added a new `BarcodePicker.setCameraType()` function to select a camera based on its camera type (facing mode/direction).
- Added new possible `BrowserCompatibility.Feature` entries in the `missingFeatures` property of `BrowserCompatibility` regarding incorrect website / web application access: `HTTP_PROTOCOL` and `SECURE_CONTEXT`, referring respectively to direct local file access instead of using a web server (_file:_ vs _http(s):_ protocol) and an [insecure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).

### Changes

- `UnsupportedBrowserError`' s `message` property now contains a summary of the missing browser features (coming from the included `BrowserCompatibility` in the `data` property) at its end.
- The Web Component's `camera` attribute now reflects the currently active camera.
- The Web Component's `cameraType` attribute can now be changed after initial creation to select a camera based on its camera type (facing mode/direction).

### Fixes

- Fixed _Safari_ on _iOS_ losing camera access a few seconds after the `BarcodePicker` element is hidden (externally or through the `BarcodePicker.setVisible()` function).
- Fixed _Safari_ on _iOS_ not correctly resuming camera video feed after the the camera is paused due to different tabs accessing it or the user manually using the browser's camera access button.
- Fixed occasional multiple camera access attempts being triggered and possibly causing errors when automatically resuming camera video feed after a pause.
- Fixed Web Component not correctly reflecting internal status in some attributes and not updating on some attribute changes.

### Updates

- Updated _ua-parser-js_ library to version 0.7.22.

## 5.2.0 (2020-09-01)

### Additions

- The barcode picker can now be integrated as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components). The Component is in beta version, functionality could change at any time independently from major version changes. Please consult the README file for usage.

### Changes

- Multiple calls to `configure()` without waiting on the returned promise will return the same promise object. In case `configure()` is called again after the promise returned successfully, arguments from subsequent calls are ignored and the same promise returned from the successful call will be returned. If `configure()` has failed, it may be retried after the rejection of the returned promise.

### Fixes

- Fixed `BarcodePicker.setActiveCamera()`, `BarcodePicker.resumeScanning()`, `BarcodePicker.accessCamera()`, `BarcodePicker.setCameraSwitcherEnabled()` function calls done after a successful camera access while the camera is not being accessed and `CameraAccess.getCameras()` function calls after the first one incorrectly triggering unnecessary camera access attempts and relative user permission requests (making the process slower) in _Firefox mobile_.
- Fixed multiple `BarcodePicker` instances created at the same time having a different and incomplete list of available cameras.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.11.2.
- Updated _csstype_ library to version 3.0.3.
- Updated _eventemitter3_ library to version 4.0.7.
- Updated _tslib_ library to version 2.0.1.

## 5.1.4 (2020-08-06)

### Fixes

- Fixed the `BarcodePicker` occasionally processing video frames buffered just before being hidden shortly after being shown again via external style changes in _Safari_.
- Fixed the `BarcodePicker` not processing any video frames while the element is hidden but scanning is still enabled in _Safari_ (hiding the element doesn't implicitly pause scanning, use `BarcodePicker.pauseScanning()` and `BarcodePicker.resumeScanning()` if needed).
- Fixed TypeScript type definition in declaration file causing compilation failures for TypeScript versions < 3.5.
- Fixed incorrect sourcemaps for the provided minified browser files.

## 5.1.3 (2020-08-04)

### Changes

- Deprecated errors of type `NotSupportedError` that can happen on some older browsers when accessing the camera are now automatically mapped to the more recent type: `AbortError`.

### Fixes

- Fixed missing _emscripten_ types causing compilation to fail when using the library as a TypeScript dependency.
- Fixed non-standard camera access behaviour of some uncommon browsers causing uncaught errors instead of being handled gracefully.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.11.0.
- Updated _csstype_ library to version 3.0.2.

## 5.1.2 (2020-07-24)

### Fixes

- Fixed `Parser.parseRawData()` failing to parse the given data when the byte array contains some specific values.

### Updates

- Updated _external Scandit Engine library_ to version 5.16.1.
- Updated _@babel/runtime-corejs2_ library to version 7.10.5.

## 5.1.1 (2020-07-13)

### Fixes

- Fixed _external Scandit Engine library_ failing to load in _Edge_ 16/17/18.

## 5.1.0 (2020-07-07)

### Changes

- Optimized IndexedDB storage calls for external Scandit Engine data storage.
- Extended default symbol count ranges for several symbologies (Code 128: 6-40, Code 39: 6-40, Code 93: 6-40, MSI-Plessey: 6-32, Interleaved 2 of 5: 6-40).

### Fixes

- Fixed _external Scandit Engine library_ registering a device activation already on initial configuration when preloading is enabled: a device is registered only at the time the first frame is processed (or a parse operation is performed).

### Updates

- Updated _external Scandit Engine library_ to version 5.16.
- Updated _@babel/runtime-corejs2_ library to version 7.10.4.
- Updated _csstype_ library to version 2.6.11.

## 5.0.1 (2020-06-10)

### Changes

- `CameraAccess.getCameras()`'s promise now doesn't reject anymore on optional failed camera access (necessary in some situation for additional device data access), but instead returns a list of cameras with limited information.

### Fixes

- Fixed loss of WebGL context due to external factors causing external Scandit Engine errors about incorrect image data and failure to continue processing video frames; the context is now automatically recreated.
- Fixed missing camera enumeration information in some scenarios (limited webviews) causing `BarcodePicker` creation and `CameraAccess.getCameras()` to fail.
- Fixed rare camera initialization issues on some combinations of browsers/devices causing incorrect 0x0 video feed resolution to be reported and possible external Scandit Engine errors to be consequently triggered.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.10.2.
- Updated _@juggle/resize-observer_ library to version 3.2.0.
- Updated _eventemitter3_ library to version 4.0.4.
- Updated _howler_ library to version 2.2.0.
- Updated _tslib_ library to version 2.0.0.

## 5.0.0 (2020-05-11)

### Additions

- Implemented and enabled by default asynchronous preloading of the _external Scandit Engine library_ (used by `BarcodePicker` and `Scanner` objects to perform scan operations).

  If enabled, the _external Scandit Engine library_ is preloaded (downloaded if needed, WebAssembly code compiled/instantiated and initialized) asynchronously via a separate WebWorker at library configuration time. Any `BarcodePicker` or `Scanner` object will then be ready to start processing video frames much faster, as the needed _external Scandit Engine library_ will already be in a partially or fully initialized state thanks to it being preloaded.

  If disabled (old behaviour), `BarcodePicker` and `Scanner` objects will load the _external Scandit Engine library_ on creation (if it wasn't already loaded before by a previously created object), and will thus require more time to be initialized and ready.

  In either case the loaded _external Scandit Engine library_ will be reused whenever possible for later successive uses of the library.

  Note also that preloading does not trigger a device activation for licensing purposes.

- Implemented and enabled by default asynchronous preloading of barcode blurry recognition data (already in use before depending on `ScanSettings`'s `blurryRecognition` option to allow accurate scanning capabilities for out-of-focus 1D codes).

  If enabled, all the data necessary to process frames in this advanced way is generated (if needed) asynchronously via a separate WebWorker at library configuration time. Any `BarcodePicker` or `Scanner` object will then be able to start processing video frames much faster, as it won't need to generate barcode blurry recognition data lazily only when needed. If necessary, depending on given `ScanSettings` options and on readiness of the data, processing is also initially performed without barcode blurry recognition until this data becomes available, at which point the new data will be loaded and used.

  If disabled (old behaviour), `BarcodePicker` and `Scanner` objects will load or generate barcode blurry recognition data lazily when needed to process the first frame, depending on given `ScanSettings` options, and will thus require more time the first time the library is actively used with the given active symbologies. As this needs to be done in the same WebWorker, the processing of the frame will then be blocked until the needed data is loaded or generated.

  In either case the data for barcode blurry recognition will be cached for later successive uses of the library.

  Note also that preloading does not trigger a device activation for licensing purposes.

- Added a new `preloadEngine` option to `ScanditSDK.configure()` to enable/disable asynchronous preloading of the _external Scandit Engine library_.
- Added a new `preloadBlurryRecognition` option to `ScanditSDK.configure()` to enable/disable asynchronous preloading of barcode blurry recognition data.
- Improved and expanded Single Image Mode appearance and configuration options. The UI now looks different and contains information text and a button, with dynamic content depending on the platform. Configuration is now done via the `SingleImageModeSettings` interface on `BarcodePicker` creation.
- Added a new `SingleImageModeSettings` interface defining options available for Single Image Mode configuration on each platform: it's now possible to set custom CSS style properties for the different elements of the UI, and to pass completely different HTML elements altogether (in addition to control usage strategy of the mode as previously possible).
- Added a new `SingleImageModePlatformSettings` interface (used inside `SingleImageModeSettings`) to define the actual options for Single Image Mode for different platforms.
- Added a new `SingleImageModeSettings.UsageStrategy` enumeration (used inside `SingleImageModeSettings`) to list the different types of usage strategies available for Single Image Mode.
- Added a new `singleImageModeSettings` option to `BarcodePicker.create()` to set Single Image Mode settings, accepting a `SingleImageModeSettings` object.
- Added a new `cameraType` option to `BarcodePicker.create()` to easily set the preferred initial camera type (facing mode/direction) to be used for video input and Single Image Mode (when available).
- Added a new `Scanner.removeListener()` function to more easily remove `Scanner` event listeners in a standard way by passing event name and listener function.
- Added a new `Scanner.removeAllListeners()` function to more easily remove all `Scanner` event listeners in a standard way by passing an event name.
- It's now possible to remove listeners added for `Scanner`'s `ready` event via the new `Scanner.removeListener("ready")` or `Scanner.removeAllListeners("ready")` functions.
- Added new _IATA 2 of 5_ symbology support and relative `Barcode.Symbology.IATA_2_OF_5` enumeration value.
- Added new `Vehicle Identification Number (VIN)` support to `Parser` and relative `Parser.DataFormat.VIN` enumeration value.
- Added support for _Ultra HD (4K)_ camera video feed resolution and relative `CameraSettings.ResolutionPreference.ULTRA_HD` enumeration value.
- Added dependency to _csstype_ library.

### Changes

- **BREAKING**: Removed `BarcodePicker.create()`'s `singleImageMode` option (replaced by the new `singleImageModeSettings` option).
- **BREAKING**: Single Image Mode's UI has been changed substantially.
- **BREAKING**: Data passed to `Scanner.processImage()` is "detached"/"neutered" becoming unusable as it's being passed to the _external Scandit Engine library_. Note that you can still access the same data once it's returned in the `ScanResult` object's `imageData` property as before.
- **BREAKING**: `ScanResult`'s `imageData` property will now be overwritten with the next video frame data after being returned and made available in all `submitFrame`/`processFrame`/`scan` even listeners for the current frame (the underlying data structure is reused). If the data is needed after the listener has finished executing, a copy should be made.
- **BREAKING**: `ScanResult`'s `imageData` property is now given as an `Uint8Array` (instead of `Uint8ClampedArray`). In case the old data format is required, the data view (type) can easily be changed with `new Uint8ClampedArray(imageData.buffer)`.
- **BREAKING**: `BarcodePicker.setTorchEnabled()` and `BarcodePicker.setZoom()` functions now return a promise resolving to the `BarcodePicker` object instance instead of directly the instance; this is due to the fact that the function needs to access the camera again.
- **BREAKING**: `SymbologySettings.getActiveSymbolCounts()` now always returns the full list of active symbol counts, also for the default cases.
- **BREAKING**: `SymbologySettings.getEnabledChecksums()` now returns all enabled optional checksums, including any default ones.
- **BREAKING**: `SymbologySettings.getEnabledExtensions()` now returns all enabled optional extensions, including any default ones.
- **BREAKING**: Removed previously deprecated `BarcodePicker.onReady()` function (in favor of `BarcodePicker.on("ready")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.onScan()` function (in favor of `BarcodePicker.on("scan")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.onSubmitFrame()` function (in favor of `BarcodePicker.on("submitFrame")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.onProcessFrame()` function (in favor of `BarcodePicker.on("processFrame")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.onScanError()` function (in favor of `BarcodePicker.on("scanError")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.removeScanListener()` function (in favor of `BarcodePicker.removeListener("scan")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.removeSubmitFrameListener()` function (in favor of `BarcodePicker.removeListener("submitFrame")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.removeProcessFrameListener()` function (in favor of `BarcodePicker.removeListener("processFrame")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.removeScanErrorListener()` function (in favor of `BarcodePicker.removeListener("scanError")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.removeScanListeners()` function (in favor of `BarcodePicker.removeAllListeners("scan")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.removeSubmitFrameListeners()` function (in favor of `BarcodePicker.removeAllListeners("submitFrame")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.removeProcessFrameListeners()` function (in favor of `BarcodePicker.removeAllListeners("processFrame")`).
- **BREAKING**: Removed previously deprecated `BarcodePicker.removeScanErrorListeners()` function (in favor of `BarcodePicker.removeAllListeners("scanError")`).
- **BREAKING**: Removed previously deprecated `Scanner.onReady()` function (in favor of `Scanner.on("ready")`).
- `Scanner.processImage()` now accepts image data passed as `Uint8Array` (data given as `Uint8ClampedArray` is still compatible).
- The _external Scandit Engine library_ used by `BarcodePicker` and `Scanner` objects is now reused whenever possible on object destruction and recreation instead of being in turn also uselessly destroyed and recreated.
- Cameras that are found to be inaccessible are now blacklisted and not returned in subsequent `CameraAccess.getCameras()` calls, they will also be ignored on `BarcodePicker` creation and when switching cameras through the camera switcher button, where other available cameras will be used as fallback if possible.
- Greatly improved `BarcodePicker` and `Scanner` initialization times for objects created later after library configuration or after a previous object's destruction, thanks to asynchronous preloading and reuse of the _external Scandit Engine library_.
- Greatly improved `BarcodePicker` and `Scanner` initialization times on first usage of the library, thanks to asynchronous preloading of barcode blurry recognition data.
- Greatly improved memory usage: no more repeated allocations of new video frame data structures causing rapid increases in memory consumption and need for frequent garbage collection executions; reuse of critical data structures brings much more stable continuous memory use.
- Improved general frame processing speed.
- Improved scanning performance smoothness between frames: more homogeneity between subsequent processing times.
- Improved Single Image Mode scan accuracy.
- Local Storage is now used to store (completely random) device IDs for licensing purposes instead of cookies.
- Removed dependency to _webrtc-adapter_ library.
- Reduced main library code size.

### Fixes

- Fixed several out-of-memory crashes and improved memory usage stability while scanning.
- Fixed rare temporary discrepancies between detected camera video feed resolution and effective processed video frame data size causing possible errors and memory access problems.
- Fixed cameras that are found to be inaccessible causing `BarcodePicker` initialization to fail when they are selected as the automatic initial camera: if other cameras are available they will be used as fallback.
- Fixed cameras that are found to be inaccessible causing no video stream to be shown when switching cameras through the GUI: if other cameras are available they will be used as fallback.
- Fixed inaccessible infrared cameras being listed by `CameraAccess.getCameras()` and possibly causing failures to initialize `BarcodePicker` objects on some devices; these cameras are now ignored.
- Fixed `BarcodePicker` and `Scanner` objects wrongfully emitting their `ready` events ahead of time: now the event more accurately represents the time when the objects can actually start being used without delay.
- Fixed some specific `SymbologySettings` enabled by default optional checksums and extensions not being disabled via `SymbologySettings.disableChecksums()` and `SymbologySettings.disableExtensions()`.
- Fixed the external Scandit Engine not processing given images if they were provided at a specific point in time right after library loading but before configuration was fully completed (and no further images were then given afterwards).
- Fixed Single Image Mode UI incorrectly accepting further files while an image was already being processed in some situations.
- Fixed Single Image Mode UI remaining disabled if a temporary error was encountered during the file loading process.
- Fixed some `ScanditEngineError` objects with specific format originating from `Parser` operations causing uncaught errors instead of being returned as gracefully returned errors.
- Fixed some camera access errors not being correctly handled and then causing other possible logical errors in _Edge_.
- Fixed deprecated networking functions being used for analytics communication, triggering console warning messages in some situations.

### Updates

- Updated _external Scandit Engine library_ to version 5.15.
- Updated _@babel/runtime-corejs2_ library to version 7.9.6.
- Updated _@juggle/resize-observer_ library to version 3.1.3.
- Updated _csstype_ library to version 2.6.10.
- Updated _eventemitter3_ library to version 4.0.1.
- Updated _howler_ library to version 2.1.3.
- Updated _tslib_ library to version 1.11.2.
- Updated _ua-parser-js_ library to version 0.7.21.

## 4.6.3 (2020-03-05)

### Changes

- Improved speed and stability of camera video feed frame data retrieval via GPU accelerated WebGL image processing.

### Fixes

- Fixed several out-of-memory crashes and improved memory usage stability while scanning.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.7.7.
- Updated _@juggle/resize-observer_ to version 3.1.0.

## 4.6.2 (2020-01-15)

### Fixes

- Fixed camera video feed being incorrectly resized/fitted/mirrored in some rare situations in `Safari`.
- Fixed camera video feed being incorrectly hidden on initialization in some rare situations.
- Fixed active camera's information not being correctly updated on initialization in some rare situations.

## 4.6.1 (2019-12-05)

### Additions

- Added dependency to _@juggle/resize-observer_ library.

### Changes

- Switched to [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to more accurately and efficiently monitor and react to changes in size of the `BarcodePicker` element and its contained camera video feed.
- Specified library side effects (CSS styles only) for better tree-shaking size reductions.

### Fixes

- Fixed incorrect update of `BarcodePicker`'s camera video feed element display caused by screen orientation changes in some scenarios.
- Fixed incorrect/missing update of `BarcodePicker`'s camera video feed resolution caused by screen orientation changes, which in turn might have resulted in wrong GUI being displayed and wrong/partial video frame data being processed.
- Fixed active camera's `currentResolution` property not being updated when screen orientation changes.

### Updates

- Updated _external Scandit Engine library_ to version 5.13.3.
- Updated _@babel/runtime-corejs2_ library to version 7.7.4.

## 4.6.0 (2019-10-31)

### Additions

- Added new `ScanSettings.setProperty()` and `ScanSettings.getProperty()` functions to control internal properties of the _external Scandit Engine library_.

### Changes

- Default camera selection improved for devices with multiple environment/back facing cameras.

### Fixes

- Fixed domain name information retrieval on licensing `ScanditEngineError` throw triggering another error in _Firefox_.

### Updates

- Updated _external Scandit Engine library_ to version 5.13.
- Updated _@babel/runtime-corejs2_ library to version 7.6.3.

## 4.5.1 (2019-10-01)

### Additions

- Added dependency to _js-cookie_ library.
- Added domain name information when the relative licensing `ScanditEngineError` is thrown.

### Fixes

- Fixed cookies for storing (completely random) device IDs for licensing purposes not being set at the root path of the website, possibly causing multiple cookies with different values to be set if the library was used on different paths. Note however that we still correctly cached when a device was being activated in IndexedDB, meaning that the different cookies would not be used.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.6.2.

## 4.5.0 (2019-09-12)

### Additions

- Device model usage information (when available) is now transmitted and accessible via the Scandit dashboard for analytics information.
- Domain name usage information is now transmitted and accessible via the Scandit dashboard for analytics information.

### Changes

- Greatly reduced main library code size.
- Improved memory usage and WebWorker operations, leading to up to 25% processing performance improvements in _Firefox_ (desktop/mobile).
- Improved memory usage between `BarcodePicker`/`Scanner` and WebWorker in `Safari`, leading to lower memory requirements.

### Fixes

- Fixed rare out-of-memory generic JavaScript errors and improved memory usage in _Firefox mobile_ and _Safari_.
- Fixed bug causing an incorrect sleep of a few milliseconds after each processed frame even when not needed.
- Fixed `BarcodePicker.create()`'s `targetScanningFPS` option (including the default value of 30) and `BarcodePicker.setTargetScanningFPS()` function not correctly limiting the framerate to values higher or equal to 30 when the camera feed's framerate is higher than 30.
- Fixed incorrect domain name detection and verification for IPv6 URLs.
- Fixed incorrect hash checksum verification of fetched _external Scandit Engine library_ JS/WASM files.
- Fixed typo in humanized symbology name for _UPC-E_.

### Updates

- Updated _external Scandit Engine library_ to version 5.12.
- Updated _webrtc-adapter_ library to version 7.3.0.

## 4.4.2 (2019-08-06)

### Fixes

- Fixed missing type information in order to support older TypeScript versions.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.5.5.
- Updated _webrtc-adapter_ library to version 7.2.9.

## 4.4.1 (2019-08-05)

### Fixes

- Fixed rare failure to obtain initial video frames right after the camera has been initialized in _Safari_.

## 4.4.0 (2019-07-11)

### Additions

- `Scanner.processImage()` now accepts image data passed as an `HTMLImageElement` (`Image`) in addition to the already existing `Uint8ClampedArray` possibility.
- Added new `BarcodePicker.on()` and `BarcodePicker.addListener()` (alternative name for the same functionality) functions to more easily add `BarcodePicker` event listeners in a standard way by passing event name and listener function.
- Added a new `BarcodePicker.removeListener()` function to more easily remove `BarcodePicker` event listeners in a standard way by passing event name and listener function.
- Added a new `BarcodePicker.removeAllListeners()` function to more easily remove all `BarcodePicker` event listeners in a standard way by passing an event name.
- Added new `Scanner.on()` and `Scanner.addListener()` (alternative name for the same functionality) functions to more easily add `Scanner` event listeners in a standard way by passing event name and listener function.
- It's now possible to remove listeners added for `BarcodePicker`'s `ready` event via the new `BarcodePicker.removeListener("ready")` or `BarcodePicker.removeAllListeners("ready")` functions.

### Changes

- Improved and simplified camera access on _iOS_, ensuring promises are resolved exactly when the camera is actually ready.
- Removed explicit caching of compiled WebAssembly code: the needed features have been removed from all browsers (see [here](https://developer.mozilla.org/en-US/docs/WebAssembly/Caching_modules)). Browsers already now support or will support implicit caching: automatic caching of compiled WebAssembly code when a correctly served (standard HTTP caching headers and statuses) `scandit-engine-sdk.wasm` file is used.
- Improved `BarcodePicker` and `Scanner` events documentation.

### Fixes

- Fixed failure to compile _external Scandit Engine library_ WebAssembly on the latest _iOS 13 beta_ (and _Safari Technology Preview_).
- Fixed `NoCameraAvailableError` rarely being thrown (with no actual consequences) while accessing or switching the camera.
- Fixed active camera's `currentResolution` property not being set/updated yet in some situations when the camera was just accessed.

### Deprecations

- Deprecated `BarcodePicker.onReady()` function in favor of `BarcodePicker.on("ready")`.
- Deprecated `BarcodePicker.onScan()` function in favor of `BarcodePicker.on("scan")`.
- Deprecated `BarcodePicker.onSubmitFrame()` function in favor of `BarcodePicker.on("submitFrame")`.
- Deprecated `BarcodePicker.onProcessFrame()` function in favor of `BarcodePicker.on("processFrame")`.
- Deprecated `BarcodePicker.onScanError()` function in favor of `BarcodePicker.on("scanError")`.
- Deprecated `BarcodePicker.removeScanListener()` function in favor of `BarcodePicker.removeListener("scan")`.
- Deprecated `BarcodePicker.removeSubmitFrameListener()` function in favor of `BarcodePicker.removeListener("submitFrame")`.
- Deprecated `BarcodePicker.removeProcessFrameListener()` function in favor of `BarcodePicker.removeListener("processFrame")`.
- Deprecated `BarcodePicker.removeScanErrorListener()` function in favor of `BarcodePicker.removeListener("scanError")`.
- Deprecated `BarcodePicker.removeScanListeners()` function in favor of `BarcodePicker.removeAllListeners("scan")`.
- Deprecated `BarcodePicker.removeSubmitFrameListeners()` function in favor of `BarcodePicker.removeAllListeners("submitFrame")`.
- Deprecated `BarcodePicker.removeProcessFrameListeners()` function in favor of `BarcodePicker.removeAllListeners("processFrame")`.
- Deprecated `BarcodePicker.removeScanErrorListeners()` function in favor of `BarcodePicker.removeAllListeners("scanError")`.
- Deprecated `Scanner.onReady()` function in favor of `Scanner.on("ready")`.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.5.4.
- Updated _eventemitter3_ library to version 4.0.0.
- Updated _objectFitPolyfill_ library to version 2.3.0.
- Updated _tslib_ library to version 1.10.0.
- Updated _ua-parser-js_ library to version 0.7.20.
- Updated _webrtc-adapter_ library to version 7.2.6.

## 4.3.0 (2019-06-05)

### Additions

- Added a new `ScanResult.rejectCode()` function to reject a barcode in listeners registered with `BarcodePicker.onProcessFrame()` or `BarcodePicker.onScan()`: if all codes in the result are rejected, sound, vibration and GUI flashing will be suppressed.

### Changes

- `ScanResult` is now a class instead of a simple object (with the same available properties as before).

### Updates

- Updated _external Scandit Engine library_ to version 5.11.4.
- Updated _@babel/runtime-corejs2_ library to version 7.4.5.
- Updated _eventemitter3_ library to version 3.1.2.

## 4.2.2 (2019-04-30)

### Changes

- Improved initial camera access performance: `BarcodePicker` creation (or first delayed access to camera) will happen faster in most scenarios thanks to quicker camera video feed access. As an added bonus some browsers like _Firefox mobile_ will also make less permission requests to the user.
- Improved _external Scandit Engine library_ loading behaviour: better error handling and automatic retry of network requests to retrieve the necessary files.

### Fixes

- Fixed the external Scandit Engine rarely stopping working immediately after initialization due to missing GPU features.
- Fixed incorrect back camera identification on some devices.

### Updates

- Updated _external Scandit Engine library_ to version 5.11.2.
- Updated _@babel/runtime-corejs2_ library to version 7.4.4.
- Updated _webrtc-adapter_ library to version 7.2.3.
- Updated _howler_ library to version 2.1.2.

## 4.2.1 (2019-04-11)

### Fixes

- Fixed the external Scandit Engine rarely randomly stopping working immediately after initialization due to failed GPU access.
- Fixed camera access sometimes causing the webpage / web application to crash and reload on some devices in _Safari_.
- Fixed incorrect back camera identification on some devices.

### Updates

- Updated _external Scandit Engine library_ to version 5.11.1.

## 4.2.0 (2019-04-04)

### Additions

- Implemented and enabled by default barcode blurry recognition to allow accurate scanning capabilities for out-of-focus 1D codes. If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order to successfully decode/scan difficult codes.
- Added a new `blurryRecognition` option to `ScanSettings`'s constructor and relative functions `ScanSettings.isBlurryRecognitionEnabled()` and `ScanSettings.setBlurryRecognitionEnabled()` to enable/disable barcode blurry recognition.
- Added a new `laserArea` option to `BarcodePicker.create()` and relative function `BarcodePicker.setLaserArea()` to manually set the area of the laser displayed when the GUI style is set to _laser_ (the laser will match the width and be vertically centered).
- Added a new `viewfinderArea` option to `BarcodePicker.create()` and relative function `BarcodePicker.setViewfinderArea()` to manually set the area of the viewfinder displayed when the GUI style is set to _viewfinder_.

### Changes

- Greatly reduced and stabilized memory usage in _Firefox_, also improved general memory usage in _Chrome_/_Edge_.
- By default the `BarcodePicker`'s laser will now automatically match the current `ScanSettings`'s `searchArea` option, showing the area where codes are localized and scanned.
- By default the `BarcodePicker`'s viewfinder will now automatically match the current `ScanSettings`'s `searchArea` option, showing the area where codes are localized and scanned.
- `BarcodePicker.reassignOriginElement()` now verifies the passed _originElement_ and throws an error if it's invalid.

### Fixes

- Fixed several possible issues causing errors on failed GPU initialization.
- Fixed `BrowserHelper` incorrectly instantiating/leaking new WebGL contexts on each call, which could result in "Too many active WebGL contexts. Oldest context will be lost." warnings/errors depending on how often it was called.
- Fixed some remaining rare errors of type `SourceUnavailableError` that can happen when accessing the camera not being correctly mapped to the more recent type: `NotReadableError`.
- Fixed `BarcodePicker` failing to initialize in particular iframe context due to incorrect _originElement_ validation.

### Updates

- Updated _external Scandit Engine library_ to version 5.11.
- Updated _@babel/runtime-corejs2_ library to version 7.4.3.
- Updated _objectFitPolyfill_ library to version 2.2.0.
- Updated _webrtc-adapter_ library to version 7.2.2.

## 4.1.1 (2019-02-05)

### Fixes

- Fixed Single Image Mode not working correctly since the previous library version.

### Updates

- Updated _@babel/runtime-corejs2_ library to version 7.3.1.
- Updated _webrtc-adapter_ library to version 7.2.0.

## 4.1.0 (2019-01-22)

### Additions

- Implemented GPU acceleration on browsers supporting [WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas) (currently _Chrome_ only), this allows for faster and more accurate barcode localization at challenging positions and angles. GPU acceleration is automatically used if the browser supports it.
- Added a new `gpuAcceleration` option to `ScanSettings`'s constructor and relative functions `ScanSettings.isGpuAccelerationEnabled()` and `ScanSettings.setGpuAccelerationEnabled()` to control GPU acceleration.
- Added new possible `BrowserCompatibility.Feature` entries in the `missingFeatures` property of `BrowserCompatibility` regarding GPU acceleration: `WEBGL` and `OFFSCREEN_CANVAS`. Note that these do not affect compatibility with the general scanning process.
- Exposed static `BrowserHelper.checkBrowserCompatibility()` function to manually retrieve a built `BrowserCompatibility` object for the used OS/Browser.
- In case a common CDN URL (UNPKG, jsDelivr) is used for the external Scandit Engine location, the library now automatically generates the correct URL for the matching version. This ensures correct feature compatibility and also optimal resource caching thanks to direct links being used in all cases, resulting in much faster subsequent library loads.
- Added a runtime check to verify hash checksum of fetched _external Scandit Engine library_ JS/WASM files to ensure the correct version matching the main library is used.
- Added new `Scanner.clearSession()` and `BarcodePicker.clearSession()` functions to remove all recognized barcodes from the scanner session and allow them to be scanned again in case a custom `codeDuplicateFilter` was set in the `ScanSettings`.

### Fixes

- Fixed library incorrectly depending on / polluting the browser global scope for some objects (like Promise) by correctly creating and using a sandboxed and polyfilled _core-js_ environment.
- Fixed the `BarcodePicker` occasionally processing video frames buffered just before being hidden shortly after being shown again (and possibly triggering "old" scan results) in _Safari_.
- Fixed `BarcodePicker`'s `submitFrame` event listeners being incorrectly called while scanning is paused.
- Fixed `BarcodePicker` GUI incorrectly flashing when being shown after being hidden, if a code was previously scanned.

### Updates

- Updated _external Scandit Engine library_ to version 5.10.1.
- Switched _@babel/runtime_ library with _@babel/runtime-corejs2_.
- Updated _webrtc-adapter_ library to version 7.1.1.
- Updated _howler_ library to version 2.1.1.

## 4.0.0 (2018-12-07)

### Additions

- Added new _Micro QR_ symbology support and relative `Barcode.Symbology.MICRO_QR` enumeration value.
- Added new _LAPA4SC_ (Posti LAPA 4 State Code) symbology support and relative `Barcode.Symbology.LAPA4SC` enumeration value.
- Added better error handling and clearer console error messages in case the `scandit-engine-sdk.wasm` file cannot be retrieved correctly.
- Added new `Scanner.getImageSettings()` and `Scanner.getScanSettings()` functions to respectively get the currently used `ImageSettings` and `ScanSettings` objects (use `BarcodePicker.getScanner()` to retrieve its internally used `Scanner` intance).

### Changes

- **BREAKING**: Removed `ScanditSDK.configure()`'s `preloadCameras` and `preloadEngineLibrary` options and `ScanditSDK.loadEngineLibrary()` function. Their functionality has been superseded by the (already previously existing) better possibility of calling `CameraAccess.getCameras()` (camera preloading) or creating and reusing a `BarcodePicker`/`Scanner` object in the background (engine library preloading); as explained in the README file.
- **BREAKING**: Replaced `CameraSettings.ResolutionPreference` numerical enumeration values in favor of string values for optional easier JavaScript usage (ex. `CameraSettings.ResolutionPreference.FULL_HD` is now `"full-hd"` instead of `0`).
- Optimized _external Scandit Engine library_ (WebAssembly) code size and structure, resulting in much faster loading times (more than twice as fast in some cases).
- Optimized `scandit-engine-sdk.wasm` retrieval: in case the file is served with incorrect MIME type, an additional network request to the server is not needed anymore and previously downloaded data is reused for WebAssembply compilation.

### Fixes

- Fixed internal WebAssembly FileSystem sync issue causing increased resource usage and console messages to appear when under load.
- Fixed incorrect video feed display when the `BarcodePicker`'s containing element is changed or resized in _Edge_.
- Fixed `BarcodePicker.isMirrorImageEnabled()` function to correctly return camera feed video mirroring status in all situations depending on camera access.
- Fixed `BarcodePicker.setMirrorImageEnabled()` function to correctly apply and store camera feed video mirroring preferences per camera in all situations.

### Updates

- Updated _external Scandit Engine library_ to version 5.10-beta.1.
- Updated _@babel/runtime_ library to version 7.2.0.
- Updated _webrtc-adapter_ library to version 6.4.8.

## 3.2.0 (2018-10-26)

### Additions

- Added new _Code 32_ symbology support and relative `Barcode.Symbology.CODE32` enumeration value.

### Fixes

- Fixed failure to access the camera on mac OS in _Safari_ 12.
- Fixed failure to access the camera on some specific mobile devices in _Chrome_.
- Fixed failure to correctly detect the browser as unsupported (and crashing instead) in some older browsers, like _Internet Explorer_.

### Updates

- Updated _external Scandit Engine library_ to version 5.9.2.
- Updated _webrtc-adapter_ library to version 6.4.4.
- Updated _ua-parser-js_ library to version 0.7.19.

## 3.1.3 (2018-10-12)

### Fixes

- Fixed `BarcodePicker.create()` resolving to the picker before the camera is accessed when camera access is enabled.
- Fixed `BarcodePicker.resumeScanning()`, `BarcodePicker.accessCamera()`, `BarcodePicker.setActiveCamera()` and `BarcodePicker.applyCameraSettings()` triggering unnecessary camera access operations when called while the camera is currently being accessed for other reasons.
- Fixed `CameraAccess.getCameras()` triggering unnecessary camera access operations when called while the camera is currently being accessed for other reasons.
- Fixed incorrect or missing video feed display in some situations in _Edge_.

### Updates

- Updated _@babel/runtime_ library to version 7.1.2.
- Updated _webrtc-adapter_ library to version 6.4.0.
- Updated _howler_ library to version 2.0.15.

## 3.1.2 (2018-08-29)

### Fixes

- Fixed important memory leak happening only in _Safari_ that caused ever increasing memory usage and page crashes. Now memory usage remains stable and crashes are avoided.
- Fixed _Safari_ on _iOS_ not correctly resuming camera video feed after the user exernally pauses and resumes the camera via the browser's camera access button.
- Fixed _Safari_ on _iOS_ not correctly resuming camera video feed after an incoming call or other OS level interruption.
- Fixed missing type information when trying to use the library in a TypeScript project.

## 3.1.1 (2018-08-16)

### Additions

- Added a new `example_background.html` file showing how to initialize a `BarcodePicker` object before it's needed and then start it on command.

### Changes

- Online license key verification now only needs network calls on first usage of the library, subsequent loads use cached information and don't require network calls anymore. This also makes library loading faster.

### Fixes

- Fixed camera access sometimes failing in _Safari_ with a generic "Invalid constraint" error.
- Fixed incorrect camera being accessed in some situations by the `BarcodePicker` in _Firefox_.
- Fixed `CameraAccess.getCameras()` returning camera objects with empty labels in _Firefox_ when called multiple times.
- Fixed `CameraAccess.getCameras()` not returning up-to-date camera objects.

### Updates

- Updated _external Scandit Engine library_ to version 5.8.2.

## 3.1.0 (2018-07-27)

### Additions

- Added a new `BarcodePicker.onSubmitFrame()` function to register a listener to get a `ScanResult` whenever a frame is submitted for processing, making it possible to retrieve the frame before scanning is performed.
- Added new `BarcodePicker.removeSubmitFrameListener()` and `BarcodePicker.removeSubmitFrameListeners()` functions to remove the new `submitFrame` event listeners.

### Changes

- Improved scanning speed in Single Image Mode.
- Improved barcode recognition for common large barcode scenarios in Single Image Mode.
- Improved Single Image Mode button area for easier clicking/tapping.
- Improved Single Image Mode button visibility in some situations.
- Improved Single Image Mode button display and resizing at different dimensions.

### Fixes

- Fixed Single Image Mode occasionally triggering a `ScanResult` event result with empty _barcodes_ and unexpected _imageData_/_imageSettings_ followed by a correctly populated `ScanResult` event result when some barcodes are successfully scanned.
- Fixed missing font color information for Single Image Mode button.
- Fixed incorrect typing information for `BarcodePicker.removeScanErrorListener()`.
- Fixed failure to compile TypeScript version of the library.

### Updates

- Updated _external Scandit Engine library_ with a fix for a rare bug that could cause the same barcode to be reported twice in the scan results.
- Updated _webrtc-adapter_ library to version 6.3.0.

## 3.0.0 (2018-07-18)

### Additions

- Implemented a new Single Image Mode for the `BarcodePicker` configured via the `singleImageMode` option on creation. This mode is meant as an alternative/fallback mode (provided by default as fallback) for a `BarcodePicker` to provide single camera pictures to be scanned. It still performs all operations locally in the browser, but trades off continuous camera stream access for (more high quality) single snapshot scanning; this results in less browser features needed for the library to work and extended browser support. In Single Image Mode a specially set UI is provided which enables users to click/tap to directly take a picture with the camera (mobile/tablet) or upload a file (desktop), this picture is then scanned and the results are provided. In this mode special camera access permissions don't have to be requested.

### Changes

- **BREAKING**: `UnsupportedBrowserError` now has a new `data` property containing more details regarding the compatibility of the used OS/browser in a new `BrowserCompatibility` object. The `message` property in the error object is now always the same generic message.
- **BREAKING**: Removed previously deprecated `BarcodePicker.GUIStyle` numerical enumeration values.
- **BREAKING**: Removed previously deprecated `Camera.Type` numerical enumeration values.
- Deprecated errors of type `SourceUnavailableError` that can happen on some older browsers when accessing the camera are now automatically mapped to the more recent type: `NotReadableError`.
- Improved handling of camera access failures in some situations to prevent unhandled exceptions.
- Implemented cache busting mechanism to ensure the _external Scandit Engine library_ JS and WASM files are refreshed and downloaded from the server when a new version of the library is released.

### Fixes

- Fixed very rare external Scandit Engine errors that could happen when converting between number representations (causing "Out of bounds Trunc operation" errors).
- Fixed `BarcodePicker` GUI disappearing when the source element has a CSS transformation applied to it.
- Fixed incorrect behaviour due to engine location configuration causing an error when trying to load cached compiled WebAssembly code.
- Fixed rare condition where slow camera access could cause an error and stop the scanning process before it could start.

### Updates

- Updated _external Scandit Engine library_ to version 5.8.1.
- Updated _eventemitter3_ library to version 3.1.0.
- Updated _howler_ library to version 2.0.13.
- Updated _tslib_ library to version 1.9.3.

## 2.5.1 (2018-07-02)

### Fixes

- Fixed a bug that caused the library to fail when showing video output in some browsers.

### Updates

- Updated _external Scandit Engine library_ with a fix for a rare QR code bug.

## 2.5.0 (2018-06-29)

### Additions

- Added a new `BarcodePicker.setCameraSwitcherEnabled()` function to dynamically show or hide the GUI button to switch between different cameras, plus a relative `BarcodePicker.isCameraSwitcherEnabled()` function to get the current status.
- Added a new `BarcodePicker.setTorchToggleEnabled()` function to dynamically show or hide a GUI button to toggle device torch on/off, plus a relative `BarcodePicker.isTorchToggleEnabled()` function to get the current status.
- Added a new `BarcodePicker.setTapToFocusEnabled()` function to dynamically enable or disable manual camera focus when clicking/tapping on the video, plus a relative `BarcodePicker.isTapToFocusEnabled()` function to get the current status.
- Added a new `BarcodePicker.setPinchToZoomEnabled()` function to dynamically enable or disable camera zoom control via pinching gesture on the video, plus a relative `BarcodePicker.isPinchToZoomEnabled()` function to get the current status.
- Added a new `BarcodePicker.getScanner()` function to retrieve the initialized (and possibly configured) `Scanner` object internally used by the `BarcodePicker` instance.
- Added a new `scanner` option to `BarcodePicker.create()` to pass and use an already initialized (and possibly configured) `Scanner` object on creation. Using this when needed can lead to faster component initalization thanks to the reuse of the already available _external Scandit Engine library_ in the object.
- Added a new `destroyScanner` optional argument (enabled by default) to the `BarcodePicker.destroy()` function, allowing to prevent `Scanner` destruction on `BarcodePicker` destruction.

### Changes

- Changed `BarcodePicker.setActiveCamera()`'s `camera` argument to be optional: when not provided the default camera is selected.
- Improved error reporting when getting/setting symbology settings for invalid symbologies.
- Documented new _Samsung Internet Browser 7+_ support.

### Fixes

- Fixed `BarcodePicker.pauseScanning()` not pausing camera input if the relative argument is passed and the `BarcodePicker` is already in a paused state.
- Fixed `BarcodePicker.accessCamera()` not reaccessing the camera when camera access was previously paused via `BarcodePicker.pauseScanning()`.

### Updates

- Updated _external Scandit Engine library_ to version 5.8.0.

## 2.4.5 (2018-06-13)

### Fixes

- Fixed an important bug causing the _external Scandit Engine library_ to regularly block while making network requests on startup and regularly after scanning a barcode, this is now correctly handled in the background. Now startup times are slightly faster, online status is not required after library initialization and subsequent scans of barcodes are smoother and without interruptions (network conditions don't affect all these scenarios anymore).

## 2.4.4 (2018-06-05)

### Changes

- Correctly throw `UnsupportedBrowserError` in case one of the WebAssembly-bugged _iOS_ versions is used (11.2.2/11.2.5/11.2.6).
- Show alerts about external Scandit Engine errors by default only when running on a local IP address (still always logged to console).

### Updates

- Updated _webrtc-adapter_ library to version 6.2.1.
- Updated _howler_ library to version 2.0.12.
- Updated _tslib_ library to version 1.9.2.

## 2.4.3 (2018-05-31)

### Changes

- Removed automatic WebView classification as unsupported on _Android_, as actual support might work depending on the containing app.

## 2.4.2 (2018-05-22)

### Changes

- Reduced _external Scandit Engine library_ (WebAssembly) code size.
- Improved general frame processing speed.

### Updates

- Updated _external Scandit Engine library_ to version 5.8-beta.2.

## 2.4.1 (2018-04-27)

### Fixes

- Fixed incorrect behaviour of some browsers causing an error when trying to load cached compiled WebAssembly code.

### Updates

- Updated _external Scandit Engine library_ to version 5.7.2.

## 2.4.0 (2018-04-25)

### Additions

- Implemented caching of compiled WebAssembly code on browsers that support this (currently only _Firefox_), this makes subsequent loads of the library much faster and don't require redownloading WebAssembly files.
- Implemented functionality to retrieve image data information whenever a frame is processed by a `BarcodePicker`.
- Added a new `imageData` property to the `ScanResult` object, containing the raw image byte data of the processed frame.
- Added a new `imageSettings` property to the `ScanResult` object, containing the image settings used to parse the image data of the processed frame.
- Added a new `BarcodePicker.onProcessFrame()` function to register a listener to get a `ScanResult` object whenever a frame is processed, independently from the number of recognized barcodes.
- Added new `BarcodePicker.removeProcessFrameListener()` and `BarcodePicker.removeProcessFrameListeners()` functions to remove the new `processFrame` listeners.

### Changes

- Improved detection of missing browser / OS functionality in WebView scenarios on _Android_ devices.
- Improved CHANGELOG format.

### Updates

- Updated _webrtc-adapter_ library to version 6.1.5.

## 2.3.0 (2018-04-12)

### Additions

- Implemented object fit options for `BarcodePicker` objects, to set the video feed to _cover_ or _contain_ and thus be resized differently inside the given origin element.
- Added a new `videoFit` option to `BarcodePicker.create()` to set video element fit type on creation.
- Added a new `BarcodePicker.setVideoFit()` function to set fit type dynamically for the video element.
- Added a new `BarcodePicker.ObjectFit` enumeration to list the different types of object fit types available.

### Changes

- Improved localization and scanning performance of challenging 1D codes in the center of the video frame.

### Fixes

- Fixed and improved camera enumeration and selection in _Firefox_.
- Fixed incorrect video feed display in some situations in _Edge_.
- Fixed incorrect application of scanning search area settings in some edge cases.

### Deprecations

- Deprecated `BarcodePicker.GUIStyle` numerical enumeration values in favor of string values for optional easier JavaScript usage (ex. `BarcodePicker.GUIStyle.LASER` is now `"laser"` instead of `1`).
- Deprecated `Camera.Type` numerical enumeration values in favor of string values for optional easier JavaScript usage (ex. `Camera.Type.FRONT` is now `"front"` instead of `0`).

## 2.2.1 (2018-04-04)

### Fixes

- Fixed failing camera video feed recovery after unexpected camera identifier changes in _Safari_.

## 2.2.0 (2018-03-28)

### Additions

- Implemented scanning speed throttling functionality to allow tradeoffs between scan performance and power usage.
- Added a new `targetScanningFPS` option to `BarcodePicker.create()` to set target frames per second to be processed/scanned.
- Added a new `BarcodePicker.setTargetScanningFPS()` function to set target frames per second to be processed/scanned.

### Changes

- Improved documentation.

## 2.1.1 (2018-03-22)

### Fixes

- Fixed incorrect domain name detection and verification in some particular local testing environments.

### Updates

- Updated _external Scandit Engine library_ to version 5.7.

## 2.1.0 (2018-03-19)

### Additions

- Implemented pinch-to-zoom camera functionality for devices supporting it (currently available only in _Chrome_).
- Added a new `enablePinchToZoom` option to `BarcodePicker.create()` to enable/disable pinch-to-zoom (when available).
- Added a new `BarcodePicker.setZoom()` function to manually set zoom level (when available).

### Fixes

- Fixed tap-to-focus functionality failing to work on some devices.

## 2.0.0 (2018-03-15)

### Additions

- Added functionalities for easier/better usage of single-instance background `BarcodePicker`s that don't acccess cameras all the time and are shared for different elements.
- Added a new `pauseCamera` option to `BarcodePicker.pauseScanning()` to also pause camera input, allowing to interrupt (and later resume) the current camera stream.
- Added a new `BarcodePicker.reassignOriginElement()` function to reassign the `BarcodePicker` to a different HTML element.

### Changes

- **BREAKING**: `BarcodePicker.resumeScanning()` function now returns a promise resolving to the `BarcodePicker` object instance instead of directly the instance; this is due to the fact that the function might need to access the camera again.
- **BREAKING**: Removed previously deprecated `BarcodePicker.UIStyle` enumeration.
- **BREAKING**: Removed previously deprecated `BarcodePicker.UIStyle.SCANLINE` enumeration value.
- **BREAKING**: Removed previously deprecated `BarcodePicker.create()`'s `uiStyle` option.

### Updates

- Updated _external Scandit Engine library_ to version 5.7-beta.1.
- Updated _webrtc-adapter_ library to version 6.1.4.

## 1.4.7 (2018-03-05)

### Fixes

- Fixed `BarcodePicker` trying to access again the camera after being destroyed.
- Fixed `BarcodePicker` still referencing the used camera as the active camera after being destroyed.

## 1.4.6 (2018-02-23)

### Changes

- Greatly improved _external Scandit Engine library_ loading times, especially on _iOS_ devices.
- Reduced _external Scandit Engine library_ (WebAssembly) code size.
- Improved camera initialization for slower devices.

### Fixes

- Fixed _external Scandit Engine library_ failing to load in _Edge_.

## 1.4.5 (2018-02-22)

### Fixes

- Fixed camera initialization failing in _Edge_.
- Fixed camera initialization failing for some combinations of browsers/devices incorrectly reporting camera failures.
- Fixed `BarcodePicker` instances not being correctly destroyed when never accessing a camera.

## 1.4.4 (2018-02-14)

### Updates

- Updated _external Scandit Engine library_ to version 5.6.2.
- Updated _webrtc-adapter_ library to version 6.1.1.
- Updated _howler_ library to version 2.0.9.
- Updated _tslib_ library to version 1.9.0.

## 1.4.3 (2018-02-08)

### Fixes

- Fixed incorrect back camera identification on some devices.

## 1.4.2 (2018-01-12)

### Changes

- Added documentation note about problems with _iOS_ 11.2.2/11.2.5/11.2.6.

### Updates

- Updated _external Scandit Engine library_ to version 5.6.

## 1.4.1 (2018-01-11)

### Fixes

- Switched _external Scandit Engine library_ to allow memory growth in order to prevent random memory allocation failures.

## 1.4.0 (2018-01-08)

### Additions

- Implemented Scandit Parser Library support to parse data string into structured data. For details refer to the new `Parser` object and the [Scandit Parser Library's documentation](https://docs.scandit.com/parser/index.html).
- Added new `BarcodePicker.createParserForFormat()` and `Scanner.createParserForFormat()` functions to create and use `Parser` objects.

### Changes

- Improved documentation.

## 1.3.2 (2017-12-21)

### Fixes

- Fixed _external Scandit Engine library_ still already registering a device activation already on initial configuration in some cases.
- Fixed bug preventing scan settings to be changed after the initial setup for `Scanner` and `BarcodePicker` objects.
- Improved memory usage and speed when modifying scan settings.

### Updates

- Updated _external Scandit Engine library_ to version 5.6-beta.2.
- Updated _howler_ library to version 2.0.7.

## 1.3.1 (2017-12-19)

### Fixes

- Fixed _external Scandit Engine library_ registering a device activation already on initial configuration: a device is registered only at the time the first frame is processed (or a parse operation is performed). This means that unused `Scanner` objects or `BarcodePicker` objects starting in a paused state or with no camera access will no longer trigger registrations.

## 1.3.0 (2017-12-15)

### Additions

- Implemented functionality to delay camera access (and thus possible user permission requests) to after a `BarcodePicker` has been created, allowing for early _external Scandit Engine library_ initialization.
- Added a new `accessCamera` option to `BarcodePicker.create()` to enable/disable camera access on `BarcodePicker` creation.
- Added a new `BarcodePicker.accessCamera()` function to access the camera after creation (if disabled on creation).

### Updates

- Updated _webrtc-adapter_ library to version 6.0.3.
- Updated _eventemitter3_ library to version 3.0.0.
- Updated _tslib_ library to version 1.8.1.

## 1.2.2 (2017-12-05)

### Fixes

- Fixed possible problems during camera detection for some older browsers.
- Fixed camera initialization failing for some combinations of browsers/devices incorrectly reporting camera failures.
- Fixed camera initialization sometimes failing in _Safari_ on _iOS_ 11.0 - 11.0.2.
- Fixed `BarcodePicker` element sometimes overflowing its given origin element by 1 pixel.

## 1.2.1 (2017-11-29)

### Fixes

- Fixed `BarcodePicker` not getting hidden when the relative option or function is provided/called.
- Fixed incorrect `BarcodePicker` visibility option and function only partially hiding the containing element.
- Fixed `BarcodePicker`'s `originElement` being left in an inconsistent state after being destroyed.
- Fixed incorrect camera front/back detection on some devices set to a system language different from english.

## 1.2.0 (2017-11-27)

### Additions

- Added a new `BarcodePicker.setGuiStyle()` function to set the GUI after creation.

### Changes

- Improved README documentation.
- Improved `BarcodePicker` documentation.

### Fixes

- Correctly detect failed camera initialization in various situations due to unforeseen hardware issues and reject promises with a `NotReadableError` error plus close the video stream when it's the case.
- Fixed broken camera selection in `BarcodePicker` when one of the cameras cannot be accessed.

### Deprecations

- Deprecated `BarcodePicker.UIStyle` in favor of `BarcodePicker.GuiStyle` to be consistent with other existing Scandit SDKs.
- Deprecated `BarcodePicker.create()`'s `uiStyle` option in favor of `guiStyle`.
- Deprecated `BarcodePicker.UIStyle.SCANLINE` in favor of `BarcodePicker.GuiStyle.LASER` to be consistent with other existing Scandit SDKs.

## 1.1.0 (2017-11-17)

### Additions

- Implemented tap-to-focus camera functionality for devices supporting it (currently available only in _Chrome_).
- Implemented device torch/torchlight toggle functionality and relative button for devices supporting it (currently available only in _Chrome_).
- Added a new `enableTapToFocus` option to `BarcodePicker.create()` to enable/disable tap-to-focus (when available).
- Added a new `enableTorchToggle` option to `BarcodePicker.create()` to enable/disable torch toggle button (when available).
- Added a new `BarcodePicker.setTorchEnabled()` function to enable/disable torch (when available).

### Changes

- Improved `BarcodePicker` buttons and touch events responsiveness.
- Improved README documentation.
- Improved CHANGELOG format.
- Improved documentation navigation.

### Fixes

- Fixed missing camera switcher button when preselecting a camera on `BarcodePicker` creation.
- Fixed incorrect domain name detection and verification in _Firefox_.
- Fixed buttons and touch events sometimes not being triggered on mobile devices.

### Updates

- Updated _webrtc-adapter_ library to version 6.0.2.

## 1.0.8 (2017-11-15)

### Additions

- Implemented automatic regularly triggered focus procedure for cameras not supporting continuous focus mode (but supporting at least manual focus); this greatly increases usability and scanning performance. Currently available only in _Chrome_.

### Changes

- Improved `BarcodePicker` documentation.

### Fixes

- Fixed incorrect domain name detection and verification in _Edge_.

## 1.0.7 (2017-11-13)

### Fixes

- Fixed `ScanditSDK.configure()` not rejecting in case of unsupported browsers when not performing any of the preloading functions, now the promise is correctly rejected.
- Fixed incorrect error thrown on `ScanditSDK.configure()` calls in case of unsupported browsers, now the promise is correctly rejected with said error.
- Fixed incorrect error thrown on `ScanditSDK.loadEngineLibrary()` calls in case of unsupported browsers, now the promise is correctly rejected with said error.
- Fixed incorrect error thrown when a code containing data in non-UTF-8 format is scanned, now the barcode result is correctly created with an empty parsed data string.

## 1.0.6 (2017-11-10)

### Fixes

- Fixed incorrect camera initialization and metadata storage in _Firefox mobile_.

## 1.0.5 (2017-11-10)

### Additions

- Added a small shadow to the camera switcher button to make it more visible on bright backgrounds.

### Changes

- Altered function call (same functionality) to make the library correctly parsable by _Internet Explorer 11_, and more graciously fail with built-in errors later.
- Improved README documentation.
- Minor CHANGELOG formatting changes.

## 1.0.4 (2017-11-09)

### Fixes

- Fixed camera feed being interrupted in _Safari_ when the `BarcodePicker` element or page loses and regains visibility.
- Fixed rare broken camera access in _Safari_ when switching between cameras or setting camera options in the `BarcodePicker`.

### Updates

- Updated _webrtc-adapter_ library to version 6.0.0.

## 1.0.3 (2017-11-08)

### Fixes

- Fixed `BarcodePicker` video feed randomly freezing when switching between multiple cameras.
- Fixed searchArea limitation not being correctly applied to all code types in `ScanSettings`.

## 1.0.2 (2017-11-08)

### Changes

- Improved `ScanSettings` documentation.
- Improved README documentation.

### Fixes

- Fixed `Barcode` object to correctly contain location information as `Quadrilateral` object instead of array.

## 1.0.1 (2017-11-07)

### Additions

- Added missing _external Scandit Engine library_ files to the build folder.

## 1.0.0 (2017-11-07)

- Initial release.
