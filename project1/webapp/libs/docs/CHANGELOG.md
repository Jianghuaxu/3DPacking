<html><head><link rel="stylesheet" href="assets/css/main.css"><style>body{margin:20px}</style></head><body>
<h1 id="change-log">Change Log</h1>
<h2 id="5120-2022-06-03">5.12.0 (2022-06-03)</h2>
<h3 id="updates">Updates</h3>
<ul>
<li>Updated <em>external Scandit Data Capture library</em> to version 6.13.0.</li>
<li>Updated <em>@babel/runtime-corejs2</em> to version 7.18.3.</li>
<li>Updated <em>csstype</em> to version 3.1.0.</li>
</ul>
<h3 id="external-scandit-data-capture-library-updates">External Scandit Data Capture Library Updates</h3>
<ul>
<li>GS1 parser: Added support for AIs in the 400-427, including checksum support.</li>
<li>Fixed Aztec false positives that happened where data miscodes and erasures exceeded the error correction capacity.</li>
<li>Fixed a crash where MRZ documents have an empty name or surname field.</li>
</ul>
<h2 id="5111-2022-05-16">5.11.1 (2022-05-16)</h2>
<h3 id="changes">Changes</h3>
<ul>
<li>Improved <em>external Scandit Data Capture library</em> loading behaviour: faster loading with no unnecessary requests when WebAssembly files are served with the wrong MIME type.</li>
</ul>
<h3 id="fixes">Fixes</h3>
<ul>
<li>Fixed camera access failures in some rare situations when switching between apps on <em>iOS</em>.</li>
</ul>
<h3 id="updates-1">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> to version 7.17.11.</li>
<li>Updated <em>tslib</em> library to version 2.4.0.</li>
</ul>
<h2 id="5110-2022-03-31">5.11.0 (2022-03-31)</h2>
<h3 id="updates-2">Updates</h3>
<ul>
<li>Updated <em>external Scandit Data Capture library</em> to version 6.12.0.</li>
<li>Updated <em>@babel/runtime-corejs2</em> to version 7.17.8.</li>
<li>Updated <em>csstype</em> to version 3.0.11.</li>
</ul>
<h3 id="external-scandit-data-capture-library-updates-1">External Scandit Data Capture Library Updates</h3>
<ul>
<li>When <em>QR</em> codes&#39; encoding isn&#39;t specified through Extended Channel Interpretation (ECI), revert back to guessing the encoding.</li>
<li>Right guard quiet zone requirements for <em>GS1 DataBar Limited</em> codes can be relaxed via the symbology extension <code>Extension.RELAXED_SHARP_QUIET_ZONE_CHECK</code>.</li>
<li>Improved 1D code highlighting accuracy when glare is present on the barcode.</li>
<li>For <em>KIX</em> codes, <code>X</code> used as a separator character in house number fields no longer count towards the maximal length of house numbers. Previously, some valid <em>KIX</em> codes were rejected incorrectly.</li>
<li>Fixed typos in some of the WMI regions of the VIN parser results.</li>
</ul>
<h2 id="5100-2022-03-02">5.10.0 (2022-03-02)</h2>
<h3 id="updates-3">Updates</h3>
<ul>
<li>Updated <em>external Scandit Data Capture library</em> to version 6.11.0.</li>
<li>Updated <em>@babel/runtime-corejs2</em> to version 7.16.5.</li>
</ul>
<h3 id="external-scandit-data-capture-library-updates-2">External Scandit Data Capture Library Updates</h3>
<ul>
<li>Improved 1D barcode reader performance with perspective distortion (pitch) and slight rotation angles.</li>
<li>Fixed Error 2 occurrence for unusual configurations with small barcode search areas.</li>
<li>Fixed the wording of some VIN parser error messages.</li>
</ul>
<h2 id="593-2022-01-20">5.9.3 (2022-01-20)</h2>
<h3 id="fixes-1">Fixes</h3>
<ul>
<li>Fixed camera initialization issues due to quick camera start/stop sequences causing the library to get stuck.</li>
</ul>
<h3 id="updates-4">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> to version 7.16.7.</li>
</ul>
<h2 id="592-2021-12-22">5.9.2 (2021-12-22)</h2>
<h3 id="changes-1">Changes</h3>
<ul>
<li>The barcode picker now displays a message and accepts a tap/click from the user to recover camera access in cases where it is lost and cannot be automatically recovered.</li>
</ul>
<h3 id="fixes-2">Fixes</h3>
<ul>
<li>Fixed incorrect initial camera being accessed in <em>Chrome</em> WebViews on some devices.</li>
<li>Fixed library failing to load in some situations in <em>Firefox</em> and <em>Safari</em>.</li>
</ul>
<h3 id="updates-5">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> to version 7.16.5.</li>
</ul>
<h2 id="591-2021-11-17">5.9.1 (2021-11-17)</h2>
<h3 id="fixes-3">Fixes</h3>
<ul>
<li>Fixed <code>BarcodePicker</code> resources (video elements, WebGL contexts) not being correctly released and cleaned up on destroy in some situations.</li>
</ul>
<h3 id="updates-6">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> to version 7.16.3.</li>
<li>Updated <em>csstype</em> to version 3.0.10.</li>
</ul>
<h2 id="590-2021-11-05">5.9.0 (2021-11-05)</h2>
<h3 id="additions">Additions</h3>
<ul>
<li>Added a new <code>loadTextRecognition</code> option (disabled by default) to <code>ScanditSDK.configure()</code> to enable/disable text recognition, loading the appropriate more advanced version of the <em>external Scandit Data Capture library</em> as needed.</li>
<li>Added a new <code>textRecognitionSettings</code> option to <code>ScanSettings</code>&#39;s constructor and relative functions <code>ScanSettings.getTextRecognitionSettings()</code> and <code>ScanSettings.setTextRecognitionSettings()</code> to control the settings being used for text recognition.</li>
<li>Added a new <code>recognitionMode</code> option to <code>ScanSettings</code>&#39;s constructor and relative functions <code>ScanSettings.getRecognitionMode()</code> and <code>ScanSettings.setRecognitionMode()</code> to control whether codes and/or text are recognized.</li>
<li>Added a new <code>ScanSettings.RecognitionMode</code> enumeration (used inside <code>ScanSettings</code>) to list the different recognition mode (code/text combinations) available.</li>
<li>Added a new <code>TextRecognitionSettings</code> class to handle configuration of text recognition settings.</li>
<li>Added a new <code>texts</code> property to the <code>ScanResult</code> object, containing the list of texts found in the image (if any).</li>
<li>Added a new <code>ScanResult.rejectText()</code> function to reject a text in listeners registered with <code>BarcodePicker.onProcessFrame()</code> or <code>BarcodePicker.onScan()</code>: if all codes and texts in the result are rejected, sound, vibration and GUI flashing will be suppressed.</li>
<li>Added a new <code>logLevel</code> option to <code>ScanditSDK.configure()</code> to select the desired console log level of the library.</li>
<li>Added a new <code>cameraAccessError</code> event to the <code>BarcodePicker</code>, emitted when an error with the access to the current camera is detected.</li>
</ul>
<h3 id="changes-2">Changes</h3>
<ul>
<li>The rejection functionality has been expanded to now consider both codes and texts: only if all codes and texts in the result are rejected, sound, vibration and GUI flashing will be suppressed.</li>
<li>The session clearing functionality has been expanded to be applied to both codes and texts: all recognized barcodes/texts are removed from the scanner session and are allowed to be scanned again in case a <em>codeDuplicateFilter</em> and/or <em>textDuplicateFilter</em> option was set in <code>ScanSettings</code> or <code>TextRecognitionSettings</code>.</li>
<li>The <code>BarcodePicker</code> is no longer permanently stopped in case of a camera access error, if and when camera access is resumed, the barcode picker resumes its operations according to its current settings.</li>
</ul>
<h3 id="fixes-4">Fixes</h3>
<ul>
<li>Fixed rare camera initialization issues on some specific devices causing certain cameras to be inaccessible.</li>
<li>Fixed rare camera initialization issues on some specific devices causing the library to get stuck.</li>
<li>Fixed rare &quot;Maximum call stack size exceeded&quot; error when initializing a barcode picker in <em>Safari</em>.</li>
</ul>
<h3 id="updates-7">Updates</h3>
<ul>
<li>Updated <em>external Scandit Data Capture library</em> to version 6.10.0.</li>
<li>Updated <em>@babel/runtime-corejs2</em> to version 7.16.0.</li>
<li>Updated <em>ua-parser-js</em> to version 1.0.2.</li>
</ul>
<h3 id="external-scandit-data-capture-library-updates-3">External Scandit Data Capture Library Updates</h3>
<ul>
<li>Improved scan performance of thin 1D barcodes at perspective, and 1D barcodes with glare because of reflective packaging material.</li>
<li>Improved scan performance of <em>Aztec</em> codes.</li>
<li>Added ECI (Extended Channel Interpretation) support for <em>MaxiCode</em> codes.</li>
<li>Improved recognition performance on low resolution and single region <em>Data Matrix</em> codes.</li>
<li>Improved speed and usability of MRZ scanning, as documents do not need to be aligned as precisely as before.</li>
<li>Corrected reported encoding for <em>MaxiCode</em> codes to &quot;ISO-8859-1&quot; if not explicitly specified with ECI for extended ASCII codes. Previous to this release, &quot;US-ASCII&quot; was returned.</li>
<li>Fixed a bug in <em>Aztec</em> codes that made it hard to scan some codes with little data / low number of elements.</li>
<li>Fixed binary data processing in the <em>DotCode</em> detector.</li>
<li>GS1 parser: fixed an issue that the returned GTIN (Global Trade Item Number) field omitted first and last character.</li>
<li>GS1 parser: fixed an issue that the returned GSRN (Global Service Relation Number) field omitted last character.</li>
<li>GS1 parser: fixed an issue that the returned SSCC (Serial Shipping Container Code) field omitted first and last character.</li>
<li>Fixed an issue with scanning El Salvador MRZ ID documents.</li>
</ul>
<h2 id="582-2021-10-26">5.8.2 (2021-10-26)</h2>
<h3 id="fixes-5">Fixes</h3>
<ul>
<li>Fixed failing bundling of library due to wrong required modules present in the final WebSDK browser bundles.</li>
</ul>
<h3 id="updates-8">Updates</h3>
<ul>
<li>Updated <em>ua-parser-js</em> to version 1.0.1.</li>
</ul>
<h2 id="581-2021-10-21">5.8.1 (2021-10-21)</h2>
<h3 id="fixes-6">Fixes</h3>
<ul>
<li>Fixed incorrect initial camera being accessed in <em>Chrome</em> WebViews in some situations.</li>
</ul>
<h3 id="updates-9">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.15.4.</li>
<li>Updated <em>csstype</em> library to version 3.0.9.</li>
<li>Updated <em>js-cookie</em> library to version 3.0.1.</li>
</ul>
<h2 id="580-2021-08-26">5.8.0 (2021-08-26)</h2>
<h3 id="fixes-7">Fixes</h3>
<ul>
<li>Fixed incorrect cameras&#39; video feed being sometimes briefly shown before showing the correct main camera&#39;s video feed, when initializing a <code>BarcodePicker</code> with default camera access.</li>
</ul>
<h3 id="updates-10">Updates</h3>
<ul>
<li>Updated <em>external Scandit Data Capture library</em> to version 6.9.1.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.15.3.</li>
<li>Updated <em>howler</em> library to version 2.2.3.</li>
<li>Updated <em>js-cookie</em> library to version 3.0.0.</li>
<li>Updated <em>tslib</em> library to version 2.3.1.</li>
</ul>
<h3 id="external-scandit-data-capture-library-updates-4">External Scandit Data Capture Library Updates</h3>
<ul>
<li>Improved scanning performance for <em>(Micro-)QR</em>, <em>(Micro-)PDF417</em>, and <em>Data Matrix</em> codes.</li>
<li>Fixed rare MSI Plessey false positives.</li>
<li>HIBC parser: fixed the issue that codes with space check digit were not parsed.</li>
</ul>
<h2 id="571-2021-07-01">5.7.1 (2021-07-01)</h2>
<h3 id="fixes-8">Fixes</h3>
<ul>
<li>Fixed browser bug preventing the library to correctly load on the very first page load on <em>iOS</em> 14.6.</li>
</ul>
<h2 id="570-2021-06-28">5.7.0 (2021-06-28)</h2>
<h3 id="changes-3">Changes</h3>
<ul>
<li>Switched from <em>Scandit Engine</em> to <em>Scandit Data Capture</em>.</li>
</ul>
<h3 id="fixes-9">Fixes</h3>
<ul>
<li>Fixed rare camera access freeze issues when switching or pausing/resuming access on some <em>Android</em> mobile devices in <em>Chrome</em>.</li>
<li>Fixed Web Component barcode picker UI not being correctly vertically centered in some situations.</li>
<li>Fixed Web Component barcode picker UI moving slightly while switching cameras.</li>
<li>Fixed browser bug preventing correct processing of the camera video feed in <em>Chrome</em> WebViews.</li>
<li>Fixed browser bug preventing the library to correctly load on the very first page load in <em>Safari</em> 14.6.</li>
</ul>
<h3 id="updates-11">Updates</h3>
<ul>
<li>Replaced <em>external Scandit Engine library</em> with <em>external Scandit Data Capture library</em> version 6.8.1.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.14.6.</li>
<li>Updated <em>@juggle/resize-observer</em> library to version 3.3.1.</li>
<li>Updated <em>csstype</em> to version 3.0.8.</li>
<li>Updated <em>tslib</em> library to version 2.3.0.</li>
<li>Updated <em>ua-parser-js</em> to version 0.7.28.</li>
</ul>
<h3 id="external-scandit-data-capture-library-updates-5">External Scandit Data Capture Library Updates</h3>
<ul>
<li>Added support for <em>Data Matrix</em> Rectangular Extension (ISO/IEC21471:2020).</li>
<li>Added blurry recognition support for <em>Codabar</em>, increasing the decode range by up to 60% (may vary by device).</li>
<li>Added &quot;strict&quot; symbology extension for 1D symbologies. It enforces strict standard adherence to eliminate false positives in blurry, irregular or damaged barcodes at the cost of reduced scan performance.</li>
<li>Added ECI (Extended Channel Interpretation) support for <em>Data Matrix</em> codes.</li>
<li>Added ECI (Extended Channel Interpretation) support for <em>Aztec</em> codes.</li>
<li>Added GS1 support for <em>Aztec</em> codes.</li>
<li>Improved 1D barcode scanning performance for codes with perspective distortion.</li>
<li>Improved decoding performance of large <em>Data Matrix</em> codes.</li>
<li>Corrected encoding names to true IANA names, i.e. from &quot;ASCII&quot; to &quot;US-ASCII&quot;, from &quot;ISO8859-x&quot; to &quot;ISO-5589-x&quot; and from &quot;UTF8&quot; to &quot;UTF-8&quot;.</li>
<li>Corrected reported encoding for <em>QR</em> codes to &quot;ISO-8859-1&quot; if not explicitly specified otherwise. Previous to this release, when the character encoding is not explicitly specified, the <em>QR</em> code reader would attempt to guess the encoding. This behaviour goes counter to what&#39;s written in the <em>QR</em> code specification. The new default is to assume an encoding of ISO-8859-1 (latin-1).</li>
<li>Corrected reported encoding for <em>(Micro)PDF417</em> codes to &quot;ISO-8859-1&quot; if not explicitly specified with ECI. Previous to this release, in some cases &quot;US-ASCII&quot; was returned.</li>
</ul>
<h2 id="560-2021-03-26">5.6.0 (2021-03-26)</h2>
<h3 id="additions-1">Additions</h3>
<ul>
<li>Added a new <code>deviceName</code> option to <code>ScanSettings</code>&#39;s constructor and relative functions <code>ScanSettings.getDeviceName()</code> and <code>ScanSettings.setDeviceName()</code> to control the descriptive device name to identify the current device when looking at analytics tools.</li>
<li>Added new <em>Matrix 2 of 5</em> symbology support and relative <code>Barcode.Symbology.MATRIX_2_OF_5</code> enumeration value.</li>
<li>Added new <em>USPS Intelligent Mail</em> symbology support and relative <code>Barcode.Symbology.USPS_INTELLIGENT_MAIL</code> enumeration value.</li>
</ul>
<h3 id="updates-12">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.19.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.13.10.</li>
<li>Updated <em>@juggle/resize-observer</em> library to version 3.3.0.</li>
<li>Updated <em>csstype</em> to version 3.0.7.</li>
</ul>
<h2 id="553-2021-02-18">5.5.3 (2021-02-18)</h2>
<h3 id="fixes-10">Fixes</h3>
<ul>
<li>Fixed incorrect NPM script setup preventing correct installation.</li>
</ul>
<h2 id="552-2021-02-17">5.5.2 (2021-02-17)</h2>
<h3 id="updates-13">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.18.3.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.12.13.</li>
<li>Updated <em>objectFitPolyfill</em> library to version 2.3.5.</li>
<li>Updated <em>ua-parser-js</em> to version 0.7.24.</li>
</ul>
<h2 id="551-2021-02-01">5.5.1 (2021-02-01)</h2>
<h3 id="changes-4">Changes</h3>
<ul>
<li>Added detection of camera device connection and removal events, resulting in an update of available device information and change in cameras returned from <code>CameraAccess.getCameras()</code>.</li>
<li>Improved detection and identification of cameras on desktop/laptop devices, resulting in more accurate front/back property assignments (with related correct video mirroring choices) and faster initial camera access.</li>
<li>Web Component now shows initialization errors as console error messages instead of HTML text.</li>
<li>Improved documentation structure.</li>
</ul>
<h3 id="fixes-11">Fixes</h3>
<ul>
<li>Fixed unnecessary camera access attempts being made when no camera is available.</li>
<li>Fixed unnecessary camera access attempts being made when the initial camera is already correctly accessed on desktop/laptop devices.</li>
<li>Fixed the same camera objects being incorrectly shared for different actual cameras in some rare situations.</li>
<li>Fixed camera front/back type property being incorrectly guessed and assigned on desktop/laptop devices in some situations.</li>
<li>Fixed incorrect detection of main front/back cameras on desktop/laptop devices in some situations.</li>
<li>Fixed rare camera access attempts being stopped and failing ahead of time when the camera could have been accessed correctly.</li>
<li>Fixed Web Component not correctly catching and displaying some errors on initialization.</li>
</ul>
<h3 id="updates-14">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.18.2.</li>
<li>Updated <em>csstype</em> library to version 3.0.6.</li>
<li>Updated <em>tslib</em> library to version 2.1.0.</li>
<li>Updated <em>ua-parser-js</em> to version 0.7.23.</li>
</ul>
<h2 id="550-2020-12-10">5.5.0 (2020-12-10)</h2>
<h3 id="additions-2">Additions</h3>
<ul>
<li>Added a new <code>codeDirectionHint</code> option to <code>ScanSettings</code>&#39;s constructor and relative functions <code>ScanSettings.getCodeDirectionHint()</code> and <code>ScanSettings.setCodeDirectionHint()</code> to control the code direction hint telling in what direction 1D codes are most likely orientated, used to locate/scan difficult codes in said directions differing from the default <em>left-to-right</em>.</li>
</ul>
<h3 id="changes-5">Changes</h3>
<ul>
<li>Improved decode/scan performance of difficult blurry codes when using cameras with no autofocus capabilities.</li>
</ul>
<h3 id="fixes-12">Fixes</h3>
<ul>
<li>Fixed newly created <code>Scanner</code> and <code>BarcodePicker</code> objects stopping to scan when (re-)created during or shortly after the destruction of another instance due to an incorrect <code>Scanner.isBusyProcessing()</code> reported status.</li>
</ul>
<h2 id="542-2020-11-19">5.4.2 (2020-11-19)</h2>
<h3 id="fixes-13">Fixes</h3>
<ul>
<li>Fixed camera access attempts immediately failing instead of retrying with lower video feed resolution requirements.</li>
</ul>
<h2 id="541-2020-11-19">5.4.1 (2020-11-19)</h2>
<h3 id="changes-6">Changes</h3>
<ul>
<li>Improved detection of small or rotated codes.</li>
</ul>
<h3 id="fixes-14">Fixes</h3>
<ul>
<li>Fixed camera reaccess failing in some rare situations when camera access is paused and resumed, and new device information results in no labels and modified device identifiers: the correct camera is now always identified and reaccessed when possible.</li>
<li>Fixed modified device identifiers scenarios resulting in the loss of previously stored information about inaccessible cameras.</li>
<li>Fixed modified device identifiers scenarios resulting in the new camera being accessed with lower video feed resolution compared to the previous state.</li>
<li>Fixed modified device identifiers scenarios resulting in wrong information being stored in old camera objects and new camera objects incorrectly being created: existing camera objects are now correctly kept and used, and all correctly reflect their current status.</li>
</ul>
<h3 id="updates-15">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.17.2.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.12.5.</li>
<li>Updated <em>csstype</em> library to version 3.0.5.</li>
</ul>
<h2 id="540-2020-11-03">5.4.0 (2020-11-03)</h2>
<h3 id="additions-3">Additions</h3>
<ul>
<li>Added a new optional argument (disabled by default) to the <code>CameraAccess.getCameras()</code> function, allowing to force updated available device information to be retrieved, instead of relying on cached information from previous calls.</li>
</ul>
<h3 id="changes-7">Changes</h3>
<ul>
<li>Improved camera listing via <code>CameraAccess.getCameras()</code> and in internal operations, resulting in faster camera access and possibly reduced camera access user permission requests.</li>
<li>Added automatic handling of unexpected camera video stream interruptions, now leading to camera reinitialization.</li>
</ul>
<h3 id="fixes-15">Fixes</h3>
<ul>
<li>Fixed non-standard camera access behaviour of some browsers causing camera initialization failures and black video feeds.</li>
<li>Fixed <code>BarcodePicker</code> visibility changes causing some UI elements to be incorrectly hidden.</li>
<li>Fixed <code>BarcodePicker</code> visibility changes not correctly maintaining its element&#39;s dimensions in some situations.</li>
</ul>
<h2 id="532-2020-10-27">5.3.2 (2020-10-27)</h2>
<h3 id="changes-8">Changes</h3>
<ul>
<li>Improved camera (re)access speed when the browser/tab comes back in foreground, gets focus or the screen is turned on again on mobile devices.</li>
</ul>
<h3 id="fixes-16">Fixes</h3>
<ul>
<li>Fixed camera access failing in some situations when switching between cameras or setting camera options.</li>
<li>Fixed camera (re)access failing and causing errors when the browser/tab goes into background, loses focus or the screen is turned off on mobile devices in <em>Chrome</em> and <em>Firefox mobile</em>.</li>
</ul>
<h3 id="updates-16">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.12.1.</li>
<li>Updated <em>csstype</em> library to version 3.0.4.</li>
<li>Updated <em>howler</em> library to version 2.2.1.</li>
<li>Updated <em>tslib</em> library to version 2.0.3.</li>
</ul>
<h2 id="531-2020-10-21">5.3.1 (2020-10-21)</h2>
<h3 id="updates-17">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.17.1.</li>
</ul>
<h2 id="530-2020-10-06">5.3.0 (2020-10-06)</h2>
<h3 id="additions-4">Additions</h3>
<ul>
<li>Added a new <code>BarcodePicker.setCameraType()</code> function to select a camera based on its camera type (facing mode/direction).</li>
<li>Added new possible <code>BrowserCompatibility.Feature</code> entries in the <code>missingFeatures</code> property of <code>BrowserCompatibility</code> regarding incorrect website / web application access: <code>HTTP_PROTOCOL</code> and <code>SECURE_CONTEXT</code>, referring respectively to direct local file access instead of using a web server (<em>file:</em> vs <em>http(s):</em> protocol) and an <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts">insecure context</a>.</li>
</ul>
<h3 id="changes-9">Changes</h3>
<ul>
<li><code>UnsupportedBrowserError</code>&#39; s <code>message</code> property now contains a summary of the missing browser features (coming from the included <code>BrowserCompatibility</code> in the <code>data</code> property) at its end.</li>
<li>The Web Component&#39;s <code>camera</code> attribute now reflects the currently active camera.</li>
<li>The Web Component&#39;s <code>cameraType</code> attribute can now be changed after initial creation to select a camera based on its camera type (facing mode/direction).</li>
</ul>
<h3 id="fixes-17">Fixes</h3>
<ul>
<li>Fixed <em>Safari</em> on <em>iOS</em> losing camera access a few seconds after the <code>BarcodePicker</code> element is hidden (externally or through the <code>BarcodePicker.setVisible()</code> function).</li>
<li>Fixed <em>Safari</em> on <em>iOS</em> not correctly resuming camera video feed after the the camera is paused due to different tabs accessing it or the user manually using the browser&#39;s camera access button.</li>
<li>Fixed occasional multiple camera access attempts being triggered and possibly causing errors when automatically resuming camera video feed after a pause.</li>
<li>Fixed Web Component not correctly reflecting internal status in some attributes and not updating on some attribute changes.</li>
</ul>
<h3 id="updates-18">Updates</h3>
<ul>
<li>Updated <em>ua-parser-js</em> library to version 0.7.22.</li>
</ul>
<h2 id="520-2020-09-01">5.2.0 (2020-09-01)</h2>
<h3 id="additions-5">Additions</h3>
<ul>
<li>The barcode picker can now be integrated as a <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Component</a>. The Component is in beta version, functionality could change at any time independently from major version changes. Please consult the README file for usage.</li>
</ul>
<h3 id="changes-10">Changes</h3>
<ul>
<li>Multiple calls to <code>configure()</code> without waiting on the returned promise will return the same promise object. In case <code>configure()</code> is called again after the promise returned successfully, arguments from subsequent calls are ignored and the same promise returned from the successful call will be returned. If <code>configure()</code> has failed, it may be retried after the rejection of the returned promise.</li>
</ul>
<h3 id="fixes-18">Fixes</h3>
<ul>
<li>Fixed <code>BarcodePicker.setActiveCamera()</code>, <code>BarcodePicker.resumeScanning()</code>, <code>BarcodePicker.accessCamera()</code>, <code>BarcodePicker.setCameraSwitcherEnabled()</code> function calls done after a successful camera access while the camera is not being accessed and <code>CameraAccess.getCameras()</code> function calls after the first one incorrectly triggering unnecessary camera access attempts and relative user permission requests (making the process slower) in <em>Firefox mobile</em>.</li>
<li>Fixed multiple <code>BarcodePicker</code> instances created at the same time having a different and incomplete list of available cameras.</li>
</ul>
<h3 id="updates-19">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.11.2.</li>
<li>Updated <em>csstype</em> library to version 3.0.3.</li>
<li>Updated <em>eventemitter3</em> library to version 4.0.7.</li>
<li>Updated <em>tslib</em> library to version 2.0.1.</li>
</ul>
<h2 id="514-2020-08-06">5.1.4 (2020-08-06)</h2>
<h3 id="fixes-19">Fixes</h3>
<ul>
<li>Fixed the <code>BarcodePicker</code> occasionally processing video frames buffered just before being hidden shortly after being shown again via external style changes in <em>Safari</em>.</li>
<li>Fixed the <code>BarcodePicker</code> not processing any video frames while the element is hidden but scanning is still enabled in <em>Safari</em> (hiding the element doesn&#39;t implicitly pause scanning, use <code>BarcodePicker.pauseScanning()</code> and <code>BarcodePicker.resumeScanning()</code> if needed).</li>
<li>Fixed TypeScript type definition in declaration file causing compilation failures for TypeScript versions &lt; 3.5.</li>
<li>Fixed incorrect sourcemaps for the provided minified browser files.</li>
</ul>
<h2 id="513-2020-08-04">5.1.3 (2020-08-04)</h2>
<h3 id="changes-11">Changes</h3>
<ul>
<li>Deprecated errors of type <code>NotSupportedError</code> that can happen on some older browsers when accessing the camera are now automatically mapped to the more recent type: <code>AbortError</code>.</li>
</ul>
<h3 id="fixes-20">Fixes</h3>
<ul>
<li>Fixed missing <em>emscripten</em> types causing compilation to fail when using the library as a TypeScript dependency.</li>
<li>Fixed non-standard camera access behaviour of some uncommon browsers causing uncaught errors instead of being handled gracefully.</li>
</ul>
<h3 id="updates-20">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.11.0.</li>
<li>Updated <em>csstype</em> library to version 3.0.2.</li>
</ul>
<h2 id="512-2020-07-24">5.1.2 (2020-07-24)</h2>
<h3 id="fixes-21">Fixes</h3>
<ul>
<li>Fixed <code>Parser.parseRawData()</code> failing to parse the given data when the byte array contains some specific values.</li>
</ul>
<h3 id="updates-21">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.16.1.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.10.5.</li>
</ul>
<h2 id="511-2020-07-13">5.1.1 (2020-07-13)</h2>
<h3 id="fixes-22">Fixes</h3>
<ul>
<li>Fixed <em>external Scandit Engine library</em> failing to load in <em>Edge</em> 16/17/18.</li>
</ul>
<h2 id="510-2020-07-07">5.1.0 (2020-07-07)</h2>
<h3 id="changes-12">Changes</h3>
<ul>
<li>Optimized IndexedDB storage calls for external Scandit Engine data storage.</li>
<li>Extended default symbol count ranges for several symbologies (Code 128: 6-40, Code 39: 6-40, Code 93: 6-40, MSI-Plessey: 6-32, Interleaved 2 of 5: 6-40).</li>
</ul>
<h3 id="fixes-23">Fixes</h3>
<ul>
<li>Fixed <em>external Scandit Engine library</em> registering a device activation already on initial configuration when preloading is enabled: a device is registered only at the time the first frame is processed (or a parse operation is performed).</li>
</ul>
<h3 id="updates-22">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.16.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.10.4.</li>
<li>Updated <em>csstype</em> library to version 2.6.11.</li>
</ul>
<h2 id="501-2020-06-10">5.0.1 (2020-06-10)</h2>
<h3 id="changes-13">Changes</h3>
<ul>
<li><code>CameraAccess.getCameras()</code>&#39;s promise now doesn&#39;t reject anymore on optional failed camera access (necessary in some situation for additional device data access), but instead returns a list of cameras with limited information.</li>
</ul>
<h3 id="fixes-24">Fixes</h3>
<ul>
<li>Fixed loss of WebGL context due to external factors causing external Scandit Engine errors about incorrect image data and failure to continue processing video frames; the context is now automatically recreated.</li>
<li>Fixed missing camera enumeration information in some scenarios (limited webviews) causing <code>BarcodePicker</code> creation and <code>CameraAccess.getCameras()</code> to fail.</li>
<li>Fixed rare camera initialization issues on some combinations of browsers/devices causing incorrect 0x0 video feed resolution to be reported and possible external Scandit Engine errors to be consequently triggered.</li>
</ul>
<h3 id="updates-23">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.10.2.</li>
<li>Updated <em>@juggle/resize-observer</em> library to version 3.2.0.</li>
<li>Updated <em>eventemitter3</em> library to version 4.0.4.</li>
<li>Updated <em>howler</em> library to version 2.2.0.</li>
<li>Updated <em>tslib</em> library to version 2.0.0.</li>
</ul>
<h2 id="500-2020-05-11">5.0.0 (2020-05-11)</h2>
<h3 id="additions-6">Additions</h3>
<ul>
<li><p>Implemented and enabled by default asynchronous preloading of the <em>external Scandit Engine library</em> (used by <code>BarcodePicker</code> and <code>Scanner</code> objects to perform scan operations).</p>
<p>If enabled, the <em>external Scandit Engine library</em> is preloaded (downloaded if needed, WebAssembly code compiled/instantiated and initialized) asynchronously via a separate WebWorker at library configuration time. Any <code>BarcodePicker</code> or <code>Scanner</code> object will then be ready to start processing video frames much faster, as the needed <em>external Scandit Engine library</em> will already be in a partially or fully initialized state thanks to it being preloaded.</p>
<p>If disabled (old behaviour), <code>BarcodePicker</code> and <code>Scanner</code> objects will load the <em>external Scandit Engine library</em> on creation (if it wasn&#39;t already loaded before by a previously created object), and will thus require more time to be initialized and ready.</p>
<p>In either case the loaded <em>external Scandit Engine library</em> will be reused whenever possible for later successive uses of the library.</p>
<p>Note also that preloading does not trigger a device activation for licensing purposes.</p>
</li>
<li><p>Implemented and enabled by default asynchronous preloading of barcode blurry recognition data (already in use before depending on <code>ScanSettings</code>&#39;s <code>blurryRecognition</code> option to allow accurate scanning capabilities for out-of-focus 1D codes).</p>
<p>If enabled, all the data necessary to process frames in this advanced way is generated (if needed) asynchronously via a separate WebWorker at library configuration time. Any <code>BarcodePicker</code> or <code>Scanner</code> object will then be able to start processing video frames much faster, as it won&#39;t need to generate barcode blurry recognition data lazily only when needed. If necessary, depending on given <code>ScanSettings</code> options and on readiness of the data, processing is also initially performed without barcode blurry recognition until this data becomes available, at which point the new data will be loaded and used.</p>
<p>If disabled (old behaviour), <code>BarcodePicker</code> and <code>Scanner</code> objects will load or generate barcode blurry recognition data lazily when needed to process the first frame, depending on given <code>ScanSettings</code> options, and will thus require more time the first time the library is actively used with the given active symbologies. As this needs to be done in the same WebWorker, the processing of the frame will then be blocked until the needed data is loaded or generated.</p>
<p>In either case the data for barcode blurry recognition will be cached for later successive uses of the library.</p>
<p>Note also that preloading does not trigger a device activation for licensing purposes.</p>
</li>
<li><p>Added a new <code>preloadEngine</code> option to <code>ScanditSDK.configure()</code> to enable/disable asynchronous preloading of the <em>external Scandit Engine library</em>.</p>
</li>
<li><p>Added a new <code>preloadBlurryRecognition</code> option to <code>ScanditSDK.configure()</code> to enable/disable asynchronous preloading of barcode blurry recognition data.</p>
</li>
<li><p>Improved and expanded Single Image Mode appearance and configuration options. The UI now looks different and contains information text and a button, with dynamic content depending on the platform. Configuration is now done via the <code>SingleImageModeSettings</code> interface on <code>BarcodePicker</code> creation.</p>
</li>
<li><p>Added a new <code>SingleImageModeSettings</code> interface defining options available for Single Image Mode configuration on each platform: it&#39;s now possible to set custom CSS style properties for the different elements of the UI, and to pass completely different HTML elements altogether (in addition to control usage strategy of the mode as previously possible).</p>
</li>
<li><p>Added a new <code>SingleImageModePlatformSettings</code> interface (used inside <code>SingleImageModeSettings</code>) to define the actual options for Single Image Mode for different platforms.</p>
</li>
<li><p>Added a new <code>SingleImageModeSettings.UsageStrategy</code> enumeration (used inside <code>SingleImageModeSettings</code>) to list the different types of usage strategies available for Single Image Mode.</p>
</li>
<li><p>Added a new <code>singleImageModeSettings</code> option to <code>BarcodePicker.create()</code> to set Single Image Mode settings, accepting a <code>SingleImageModeSettings</code> object.</p>
</li>
<li><p>Added a new <code>cameraType</code> option to <code>BarcodePicker.create()</code> to easily set the preferred initial camera type (facing mode/direction) to be used for video input and Single Image Mode (when available).</p>
</li>
<li><p>Added a new <code>Scanner.removeListener()</code> function to more easily remove <code>Scanner</code> event listeners in a standard way by passing event name and listener function.</p>
</li>
<li><p>Added a new <code>Scanner.removeAllListeners()</code> function to more easily remove all <code>Scanner</code> event listeners in a standard way by passing an event name.</p>
</li>
<li><p>It&#39;s now possible to remove listeners added for <code>Scanner</code>&#39;s <code>ready</code> event via the new <code>Scanner.removeListener(&quot;ready&quot;)</code> or <code>Scanner.removeAllListeners(&quot;ready&quot;)</code> functions.</p>
</li>
<li><p>Added new <em>IATA 2 of 5</em> symbology support and relative <code>Barcode.Symbology.IATA_2_OF_5</code> enumeration value.</p>
</li>
<li><p>Added new <code>Vehicle Identification Number (VIN)</code> support to <code>Parser</code> and relative <code>Parser.DataFormat.VIN</code> enumeration value.</p>
</li>
<li><p>Added support for <em>Ultra HD (4K)</em> camera video feed resolution and relative <code>CameraSettings.ResolutionPreference.ULTRA_HD</code> enumeration value.</p>
</li>
<li><p>Added dependency to <em>csstype</em> library.</p>
</li>
</ul>
<h3 id="changes-14">Changes</h3>
<ul>
<li><strong>BREAKING</strong>: Removed <code>BarcodePicker.create()</code>&#39;s <code>singleImageMode</code> option (replaced by the new <code>singleImageModeSettings</code> option).</li>
<li><strong>BREAKING</strong>: Single Image Mode&#39;s UI has been changed substantially.</li>
<li><strong>BREAKING</strong>: Data passed to <code>Scanner.processImage()</code> is &quot;detached&quot;/&quot;neutered&quot; becoming unusable as it&#39;s being passed to the <em>external Scandit Engine library</em>. Note that you can still access the same data once it&#39;s returned in the <code>ScanResult</code> object&#39;s <code>imageData</code> property as before.</li>
<li><strong>BREAKING</strong>: <code>ScanResult</code>&#39;s <code>imageData</code> property will now be overwritten with the next video frame data after being returned and made available in all <code>submitFrame</code>/<code>processFrame</code>/<code>scan</code> even listeners for the current frame (the underlying data structure is reused). If the data is needed after the listener has finished executing, a copy should be made.</li>
<li><strong>BREAKING</strong>: <code>ScanResult</code>&#39;s <code>imageData</code> property is now given as an <code>Uint8Array</code> (instead of <code>Uint8ClampedArray</code>). In case the old data format is required, the data view (type) can easily be changed with <code>new Uint8ClampedArray(imageData.buffer)</code>.</li>
<li><strong>BREAKING</strong>: <code>BarcodePicker.setTorchEnabled()</code> and <code>BarcodePicker.setZoom()</code> functions now return a promise resolving to the <code>BarcodePicker</code> object instance instead of directly the instance; this is due to the fact that the function needs to access the camera again.</li>
<li><strong>BREAKING</strong>: <code>SymbologySettings.getActiveSymbolCounts()</code> now always returns the full list of active symbol counts, also for the default cases.</li>
<li><strong>BREAKING</strong>: <code>SymbologySettings.getEnabledChecksums()</code> now returns all enabled optional checksums, including any default ones.</li>
<li><strong>BREAKING</strong>: <code>SymbologySettings.getEnabledExtensions()</code> now returns all enabled optional extensions, including any default ones.</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.onReady()</code> function (in favor of <code>BarcodePicker.on(&quot;ready&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.onScan()</code> function (in favor of <code>BarcodePicker.on(&quot;scan&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.onSubmitFrame()</code> function (in favor of <code>BarcodePicker.on(&quot;submitFrame&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.onProcessFrame()</code> function (in favor of <code>BarcodePicker.on(&quot;processFrame&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.onScanError()</code> function (in favor of <code>BarcodePicker.on(&quot;scanError&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.removeScanListener()</code> function (in favor of <code>BarcodePicker.removeListener(&quot;scan&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.removeSubmitFrameListener()</code> function (in favor of <code>BarcodePicker.removeListener(&quot;submitFrame&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.removeProcessFrameListener()</code> function (in favor of <code>BarcodePicker.removeListener(&quot;processFrame&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.removeScanErrorListener()</code> function (in favor of <code>BarcodePicker.removeListener(&quot;scanError&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.removeScanListeners()</code> function (in favor of <code>BarcodePicker.removeAllListeners(&quot;scan&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.removeSubmitFrameListeners()</code> function (in favor of <code>BarcodePicker.removeAllListeners(&quot;submitFrame&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.removeProcessFrameListeners()</code> function (in favor of <code>BarcodePicker.removeAllListeners(&quot;processFrame&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.removeScanErrorListeners()</code> function (in favor of <code>BarcodePicker.removeAllListeners(&quot;scanError&quot;)</code>).</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>Scanner.onReady()</code> function (in favor of <code>Scanner.on(&quot;ready&quot;)</code>).</li>
<li><code>Scanner.processImage()</code> now accepts image data passed as <code>Uint8Array</code> (data given as <code>Uint8ClampedArray</code> is still compatible).</li>
<li>The <em>external Scandit Engine library</em> used by <code>BarcodePicker</code> and <code>Scanner</code> objects is now reused whenever possible on object destruction and recreation instead of being in turn also uselessly destroyed and recreated.</li>
<li>Cameras that are found to be inaccessible are now blacklisted and not returned in subsequent <code>CameraAccess.getCameras()</code> calls, they will also be ignored on <code>BarcodePicker</code> creation and when switching cameras through the camera switcher button, where other available cameras will be used as fallback if possible.</li>
<li>Greatly improved <code>BarcodePicker</code> and <code>Scanner</code> initialization times for objects created later after library configuration or after a previous object&#39;s destruction, thanks to asynchronous preloading and reuse of the <em>external Scandit Engine library</em>.</li>
<li>Greatly improved <code>BarcodePicker</code> and <code>Scanner</code> initialization times on first usage of the library, thanks to asynchronous preloading of barcode blurry recognition data.</li>
<li>Greatly improved memory usage: no more repeated allocations of new video frame data structures causing rapid increases in memory consumption and need for frequent garbage collection executions; reuse of critical data structures brings much more stable continuous memory use.</li>
<li>Improved general frame processing speed.</li>
<li>Improved scanning performance smoothness between frames: more homogeneity between subsequent processing times.</li>
<li>Improved Single Image Mode scan accuracy.</li>
<li>Local Storage is now used to store (completely random) device IDs for licensing purposes instead of cookies.</li>
<li>Removed dependency to <em>webrtc-adapter</em> library.</li>
<li>Reduced main library code size.</li>
</ul>
<h3 id="fixes-25">Fixes</h3>
<ul>
<li>Fixed several out-of-memory crashes and improved memory usage stability while scanning.</li>
<li>Fixed rare temporary discrepancies between detected camera video feed resolution and effective processed video frame data size causing possible errors and memory access problems.</li>
<li>Fixed cameras that are found to be inaccessible causing <code>BarcodePicker</code> initialization to fail when they are selected as the automatic initial camera: if other cameras are available they will be used as fallback.</li>
<li>Fixed cameras that are found to be inaccessible causing no video stream to be shown when switching cameras through the GUI: if other cameras are available they will be used as fallback.</li>
<li>Fixed inaccessible infrared cameras being listed by <code>CameraAccess.getCameras()</code> and possibly causing failures to initialize <code>BarcodePicker</code> objects on some devices; these cameras are now ignored.</li>
<li>Fixed <code>BarcodePicker</code> and <code>Scanner</code> objects wrongfully emitting their <code>ready</code> events ahead of time: now the event more accurately represents the time when the objects can actually start being used without delay.</li>
<li>Fixed some specific <code>SymbologySettings</code> enabled by default optional checksums and extensions not being disabled via <code>SymbologySettings.disableChecksums()</code> and <code>SymbologySettings.disableExtensions()</code>.</li>
<li>Fixed the external Scandit Engine not processing given images if they were provided at a specific point in time right after library loading but before configuration was fully completed (and no further images were then given afterwards).</li>
<li>Fixed Single Image Mode UI incorrectly accepting further files while an image was already being processed in some situations.</li>
<li>Fixed Single Image Mode UI remaining disabled if a temporary error was encountered during the file loading process.</li>
<li>Fixed some <code>ScanditEngineError</code> objects with specific format originating from <code>Parser</code> operations causing uncaught errors instead of being returned as gracefully returned errors.</li>
<li>Fixed some camera access errors not being correctly handled and then causing other possible logical errors in <em>Edge</em>.</li>
<li>Fixed deprecated networking functions being used for analytics communication, triggering console warning messages in some situations.</li>
</ul>
<h3 id="updates-24">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.15.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.9.6.</li>
<li>Updated <em>@juggle/resize-observer</em> library to version 3.1.3.</li>
<li>Updated <em>csstype</em> library to version 2.6.10.</li>
<li>Updated <em>eventemitter3</em> library to version 4.0.1.</li>
<li>Updated <em>howler</em> library to version 2.1.3.</li>
<li>Updated <em>tslib</em> library to version 1.11.2.</li>
<li>Updated <em>ua-parser-js</em> library to version 0.7.21.</li>
</ul>
<h2 id="463-2020-03-05">4.6.3 (2020-03-05)</h2>
<h3 id="changes-15">Changes</h3>
<ul>
<li>Improved speed and stability of camera video feed frame data retrieval via GPU accelerated WebGL image processing.</li>
</ul>
<h3 id="fixes-26">Fixes</h3>
<ul>
<li>Fixed several out-of-memory crashes and improved memory usage stability while scanning.</li>
</ul>
<h3 id="updates-25">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.7.7.</li>
<li>Updated <em>@juggle/resize-observer</em> to version 3.1.0.</li>
</ul>
<h2 id="462-2020-01-15">4.6.2 (2020-01-15)</h2>
<h3 id="fixes-27">Fixes</h3>
<ul>
<li>Fixed camera video feed being incorrectly resized/fitted/mirrored in some rare situations in <code>Safari</code>.</li>
<li>Fixed camera video feed being incorrectly hidden on initialization in some rare situations.</li>
<li>Fixed active camera&#39;s information not being correctly updated on initialization in some rare situations.</li>
</ul>
<h2 id="461-2019-12-05">4.6.1 (2019-12-05)</h2>
<h3 id="additions-7">Additions</h3>
<ul>
<li>Added dependency to <em>@juggle/resize-observer</em> library.</li>
</ul>
<h3 id="changes-16">Changes</h3>
<ul>
<li>Switched to <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">ResizeObserver</a> to more accurately and efficiently monitor and react to changes in size of the <code>BarcodePicker</code> element and its contained camera video feed.</li>
<li>Specified library side effects (CSS styles only) for better tree-shaking size reductions.</li>
</ul>
<h3 id="fixes-28">Fixes</h3>
<ul>
<li>Fixed incorrect update of <code>BarcodePicker</code>&#39;s camera video feed element display caused by screen orientation changes in some scenarios.</li>
<li>Fixed incorrect/missing update of <code>BarcodePicker</code>&#39;s camera video feed resolution caused by screen orientation changes, which in turn might have resulted in wrong GUI being displayed and wrong/partial video frame data being processed.</li>
<li>Fixed active camera&#39;s <code>currentResolution</code> property not being updated when screen orientation changes.</li>
</ul>
<h3 id="updates-26">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.13.3.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.7.4.</li>
</ul>
<h2 id="460-2019-10-31">4.6.0 (2019-10-31)</h2>
<h3 id="additions-8">Additions</h3>
<ul>
<li>Added new <code>ScanSettings.setProperty()</code> and <code>ScanSettings.getProperty()</code> functions to control internal properties of the <em>external Scandit Engine library</em>.</li>
</ul>
<h3 id="changes-17">Changes</h3>
<ul>
<li>Default camera selection improved for devices with multiple environment/back facing cameras.</li>
</ul>
<h3 id="fixes-29">Fixes</h3>
<ul>
<li>Fixed domain name information retrieval on licensing <code>ScanditEngineError</code> throw triggering another error in <em>Firefox</em>.</li>
</ul>
<h3 id="updates-27">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.13.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.6.3.</li>
</ul>
<h2 id="451-2019-10-01">4.5.1 (2019-10-01)</h2>
<h3 id="additions-9">Additions</h3>
<ul>
<li>Added dependency to <em>js-cookie</em> library.</li>
<li>Added domain name information when the relative licensing <code>ScanditEngineError</code> is thrown.</li>
</ul>
<h3 id="fixes-30">Fixes</h3>
<ul>
<li>Fixed cookies for storing (completely random) device IDs for licensing purposes not being set at the root path of the website, possibly causing multiple cookies with different values to be set if the library was used on different paths. Note however that we still correctly cached when a device was being activated in IndexedDB, meaning that the different cookies would not be used.</li>
</ul>
<h3 id="updates-28">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.6.2.</li>
</ul>
<h2 id="450-2019-09-12">4.5.0 (2019-09-12)</h2>
<h3 id="additions-10">Additions</h3>
<ul>
<li>Device model usage information (when available) is now transmitted and accessible via the Scandit dashboard for analytics information.</li>
<li>Domain name usage information is now transmitted and accessible via the Scandit dashboard for analytics information.</li>
</ul>
<h3 id="changes-18">Changes</h3>
<ul>
<li>Greatly reduced main library code size.</li>
<li>Improved memory usage and WebWorker operations, leading to up to 25% processing performance improvements in <em>Firefox</em> (desktop/mobile).</li>
<li>Improved memory usage between <code>BarcodePicker</code>/<code>Scanner</code> and WebWorker in <code>Safari</code>, leading to lower memory requirements.</li>
</ul>
<h3 id="fixes-31">Fixes</h3>
<ul>
<li>Fixed rare out-of-memory generic JavaScript errors and improved memory usage in <em>Firefox mobile</em> and <em>Safari</em>.</li>
<li>Fixed bug causing an incorrect sleep of a few milliseconds after each processed frame even when not needed.</li>
<li>Fixed <code>BarcodePicker.create()</code>&#39;s <code>targetScanningFPS</code> option (including the default value of 30) and <code>BarcodePicker.setTargetScanningFPS()</code> function not correctly limiting the framerate to values higher or equal to 30 when the camera feed&#39;s framerate is higher than 30.</li>
<li>Fixed incorrect domain name detection and verification for IPv6 URLs.</li>
<li>Fixed incorrect hash checksum verification of fetched <em>external Scandit Engine library</em> JS/WASM files.</li>
<li>Fixed typo in humanized symbology name for <em>UPC-E</em>.</li>
</ul>
<h3 id="updates-29">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.12.</li>
<li>Updated <em>webrtc-adapter</em> library to version 7.3.0.</li>
</ul>
<h2 id="442-2019-08-06">4.4.2 (2019-08-06)</h2>
<h3 id="fixes-32">Fixes</h3>
<ul>
<li>Fixed missing type information in order to support older TypeScript versions.</li>
</ul>
<h3 id="updates-30">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.5.5.</li>
<li>Updated <em>webrtc-adapter</em> library to version 7.2.9.</li>
</ul>
<h2 id="441-2019-08-05">4.4.1 (2019-08-05)</h2>
<h3 id="fixes-33">Fixes</h3>
<ul>
<li>Fixed rare failure to obtain initial video frames right after the camera has been initialized in <em>Safari</em>.</li>
</ul>
<h2 id="440-2019-07-11">4.4.0 (2019-07-11)</h2>
<h3 id="additions-11">Additions</h3>
<ul>
<li><code>Scanner.processImage()</code> now accepts image data passed as an <code>HTMLImageElement</code> (<code>Image</code>) in addition to the already existing <code>Uint8ClampedArray</code> possibility.</li>
<li>Added new <code>BarcodePicker.on()</code> and <code>BarcodePicker.addListener()</code> (alternative name for the same functionality) functions to more easily add <code>BarcodePicker</code> event listeners in a standard way by passing event name and listener function.</li>
<li>Added a new <code>BarcodePicker.removeListener()</code> function to more easily remove <code>BarcodePicker</code> event listeners in a standard way by passing event name and listener function.</li>
<li>Added a new <code>BarcodePicker.removeAllListeners()</code> function to more easily remove all <code>BarcodePicker</code> event listeners in a standard way by passing an event name.</li>
<li>Added new <code>Scanner.on()</code> and <code>Scanner.addListener()</code> (alternative name for the same functionality) functions to more easily add <code>Scanner</code> event listeners in a standard way by passing event name and listener function.</li>
<li>It&#39;s now possible to remove listeners added for <code>BarcodePicker</code>&#39;s <code>ready</code> event via the new <code>BarcodePicker.removeListener(&quot;ready&quot;)</code> or <code>BarcodePicker.removeAllListeners(&quot;ready&quot;)</code> functions.</li>
</ul>
<h3 id="changes-19">Changes</h3>
<ul>
<li>Improved and simplified camera access on <em>iOS</em>, ensuring promises are resolved exactly when the camera is actually ready.</li>
<li>Removed explicit caching of compiled WebAssembly code: the needed features have been removed from all browsers (see <a href="https://developer.mozilla.org/en-US/docs/WebAssembly/Caching_modules">here</a>). Browsers already now support or will support implicit caching: automatic caching of compiled WebAssembly code when a correctly served (standard HTTP caching headers and statuses) <code>scandit-engine-sdk.wasm</code> file is used.</li>
<li>Improved <code>BarcodePicker</code> and <code>Scanner</code> events documentation.</li>
</ul>
<h3 id="fixes-34">Fixes</h3>
<ul>
<li>Fixed failure to compile <em>external Scandit Engine library</em> WebAssembly on the latest <em>iOS 13 beta</em> (and <em>Safari Technology Preview</em>).</li>
<li>Fixed <code>NoCameraAvailableError</code> rarely being thrown (with no actual consequences) while accessing or switching the camera.</li>
<li>Fixed active camera&#39;s <code>currentResolution</code> property not being set/updated yet in some situations when the camera was just accessed.</li>
</ul>
<h3 id="deprecations">Deprecations</h3>
<ul>
<li>Deprecated <code>BarcodePicker.onReady()</code> function in favor of <code>BarcodePicker.on(&quot;ready&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.onScan()</code> function in favor of <code>BarcodePicker.on(&quot;scan&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.onSubmitFrame()</code> function in favor of <code>BarcodePicker.on(&quot;submitFrame&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.onProcessFrame()</code> function in favor of <code>BarcodePicker.on(&quot;processFrame&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.onScanError()</code> function in favor of <code>BarcodePicker.on(&quot;scanError&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.removeScanListener()</code> function in favor of <code>BarcodePicker.removeListener(&quot;scan&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.removeSubmitFrameListener()</code> function in favor of <code>BarcodePicker.removeListener(&quot;submitFrame&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.removeProcessFrameListener()</code> function in favor of <code>BarcodePicker.removeListener(&quot;processFrame&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.removeScanErrorListener()</code> function in favor of <code>BarcodePicker.removeListener(&quot;scanError&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.removeScanListeners()</code> function in favor of <code>BarcodePicker.removeAllListeners(&quot;scan&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.removeSubmitFrameListeners()</code> function in favor of <code>BarcodePicker.removeAllListeners(&quot;submitFrame&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.removeProcessFrameListeners()</code> function in favor of <code>BarcodePicker.removeAllListeners(&quot;processFrame&quot;)</code>.</li>
<li>Deprecated <code>BarcodePicker.removeScanErrorListeners()</code> function in favor of <code>BarcodePicker.removeAllListeners(&quot;scanError&quot;)</code>.</li>
<li>Deprecated <code>Scanner.onReady()</code> function in favor of <code>Scanner.on(&quot;ready&quot;)</code>.</li>
</ul>
<h3 id="updates-31">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.5.4.</li>
<li>Updated <em>eventemitter3</em> library to version 4.0.0.</li>
<li>Updated <em>objectFitPolyfill</em> library to version 2.3.0.</li>
<li>Updated <em>tslib</em> library to version 1.10.0.</li>
<li>Updated <em>ua-parser-js</em> library to version 0.7.20.</li>
<li>Updated <em>webrtc-adapter</em> library to version 7.2.6.</li>
</ul>
<h2 id="430-2019-06-05">4.3.0 (2019-06-05)</h2>
<h3 id="additions-12">Additions</h3>
<ul>
<li>Added a new <code>ScanResult.rejectCode()</code> function to reject a barcode in listeners registered with <code>BarcodePicker.onProcessFrame()</code> or <code>BarcodePicker.onScan()</code>: if all codes in the result are rejected, sound, vibration and GUI flashing will be suppressed.</li>
</ul>
<h3 id="changes-20">Changes</h3>
<ul>
<li><code>ScanResult</code> is now a class instead of a simple object (with the same available properties as before).</li>
</ul>
<h3 id="updates-32">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.11.4.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.4.5.</li>
<li>Updated <em>eventemitter3</em> library to version 3.1.2.</li>
</ul>
<h2 id="422-2019-04-30">4.2.2 (2019-04-30)</h2>
<h3 id="changes-21">Changes</h3>
<ul>
<li>Improved initial camera access performance: <code>BarcodePicker</code> creation (or first delayed access to camera) will happen faster in most scenarios thanks to quicker camera video feed access. As an added bonus some browsers like <em>Firefox mobile</em> will also make less permission requests to the user.</li>
<li>Improved <em>external Scandit Engine library</em> loading behaviour: better error handling and automatic retry of network requests to retrieve the necessary files.</li>
</ul>
<h3 id="fixes-35">Fixes</h3>
<ul>
<li>Fixed the external Scandit Engine rarely stopping working immediately after initialization due to missing GPU features.</li>
<li>Fixed incorrect back camera identification on some devices.</li>
</ul>
<h3 id="updates-33">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.11.2.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.4.4.</li>
<li>Updated <em>webrtc-adapter</em> library to version 7.2.3.</li>
<li>Updated <em>howler</em> library to version 2.1.2.</li>
</ul>
<h2 id="421-2019-04-11">4.2.1 (2019-04-11)</h2>
<h3 id="fixes-36">Fixes</h3>
<ul>
<li>Fixed the external Scandit Engine rarely randomly stopping working immediately after initialization due to failed GPU access.</li>
<li>Fixed camera access sometimes causing the webpage / web application to crash and reload on some devices in <em>Safari</em>.</li>
<li>Fixed incorrect back camera identification on some devices.</li>
</ul>
<h3 id="updates-34">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.11.1.</li>
</ul>
<h2 id="420-2019-04-04">4.2.0 (2019-04-04)</h2>
<h3 id="additions-13">Additions</h3>
<ul>
<li>Implemented and enabled by default barcode blurry recognition to allow accurate scanning capabilities for out-of-focus 1D codes. If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order to successfully decode/scan difficult codes.</li>
<li>Added a new <code>blurryRecognition</code> option to <code>ScanSettings</code>&#39;s constructor and relative functions <code>ScanSettings.isBlurryRecognitionEnabled()</code> and <code>ScanSettings.setBlurryRecognitionEnabled()</code> to enable/disable barcode blurry recognition.</li>
<li>Added a new <code>laserArea</code> option to <code>BarcodePicker.create()</code> and relative function <code>BarcodePicker.setLaserArea()</code> to manually set the area of the laser displayed when the GUI style is set to <em>laser</em> (the laser will match the width and be vertically centered).</li>
<li>Added a new <code>viewfinderArea</code> option to <code>BarcodePicker.create()</code> and relative function <code>BarcodePicker.setViewfinderArea()</code> to manually set the area of the viewfinder displayed when the GUI style is set to <em>viewfinder</em>.</li>
</ul>
<h3 id="changes-22">Changes</h3>
<ul>
<li>Greatly reduced and stabilized memory usage in <em>Firefox</em>, also improved general memory usage in <em>Chrome</em>/<em>Edge</em>.</li>
<li>By default the <code>BarcodePicker</code>&#39;s laser will now automatically match the current <code>ScanSettings</code>&#39;s <code>searchArea</code> option, showing the area where codes are localized and scanned.</li>
<li>By default the <code>BarcodePicker</code>&#39;s viewfinder will now automatically match the current <code>ScanSettings</code>&#39;s <code>searchArea</code> option, showing the area where codes are localized and scanned.</li>
<li><code>BarcodePicker.reassignOriginElement()</code> now verifies the passed <em>originElement</em> and throws an error if it&#39;s invalid.</li>
</ul>
<h3 id="fixes-37">Fixes</h3>
<ul>
<li>Fixed several possible issues causing errors on failed GPU initialization.</li>
<li>Fixed <code>BrowserHelper</code> incorrectly instantiating/leaking new WebGL contexts on each call, which could result in &quot;Too many active WebGL contexts. Oldest context will be lost.&quot; warnings/errors depending on how often it was called.</li>
<li>Fixed some remaining rare errors of type <code>SourceUnavailableError</code> that can happen when accessing the camera not being correctly mapped to the more recent type: <code>NotReadableError</code>.</li>
<li>Fixed <code>BarcodePicker</code> failing to initialize in particular iframe context due to incorrect <em>originElement</em> validation.</li>
</ul>
<h3 id="updates-35">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.11.</li>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.4.3.</li>
<li>Updated <em>objectFitPolyfill</em> library to version 2.2.0.</li>
<li>Updated <em>webrtc-adapter</em> library to version 7.2.2.</li>
</ul>
<h2 id="411-2019-02-05">4.1.1 (2019-02-05)</h2>
<h3 id="fixes-38">Fixes</h3>
<ul>
<li>Fixed Single Image Mode not working correctly since the previous library version.</li>
</ul>
<h3 id="updates-36">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime-corejs2</em> library to version 7.3.1.</li>
<li>Updated <em>webrtc-adapter</em> library to version 7.2.0.</li>
</ul>
<h2 id="410-2019-01-22">4.1.0 (2019-01-22)</h2>
<h3 id="additions-14">Additions</h3>
<ul>
<li>Implemented GPU acceleration on browsers supporting <a href="https://caniuse.com/#feat=webgl">WebGL</a> and <a href="https://caniuse.com/#feat=offscreencanvas">OffscreenCanvas</a> (currently <em>Chrome</em> only), this allows for faster and more accurate barcode localization at challenging positions and angles. GPU acceleration is automatically used if the browser supports it.</li>
<li>Added a new <code>gpuAcceleration</code> option to <code>ScanSettings</code>&#39;s constructor and relative functions <code>ScanSettings.isGpuAccelerationEnabled()</code> and <code>ScanSettings.setGpuAccelerationEnabled()</code> to control GPU acceleration.</li>
<li>Added new possible <code>BrowserCompatibility.Feature</code> entries in the <code>missingFeatures</code> property of <code>BrowserCompatibility</code> regarding GPU acceleration: <code>WEBGL</code> and <code>OFFSCREEN_CANVAS</code>. Note that these do not affect compatibility with the general scanning process.</li>
<li>Exposed static <code>BrowserHelper.checkBrowserCompatibility()</code> function to manually retrieve a built <code>BrowserCompatibility</code> object for the used OS/Browser.</li>
<li>In case a common CDN URL (UNPKG, jsDelivr) is used for the external Scandit Engine location, the library now automatically generates the correct URL for the matching version. This ensures correct feature compatibility and also optimal resource caching thanks to direct links being used in all cases, resulting in much faster subsequent library loads.</li>
<li>Added a runtime check to verify hash checksum of fetched <em>external Scandit Engine library</em> JS/WASM files to ensure the correct version matching the main library is used.</li>
<li>Added new <code>Scanner.clearSession()</code> and <code>BarcodePicker.clearSession()</code> functions to remove all recognized barcodes from the scanner session and allow them to be scanned again in case a custom <code>codeDuplicateFilter</code> was set in the <code>ScanSettings</code>.</li>
</ul>
<h3 id="fixes-39">Fixes</h3>
<ul>
<li>Fixed library incorrectly depending on / polluting the browser global scope for some objects (like Promise) by correctly creating and using a sandboxed and polyfilled <em>core-js</em> environment.</li>
<li>Fixed the <code>BarcodePicker</code> occasionally processing video frames buffered just before being hidden shortly after being shown again (and possibly triggering &quot;old&quot; scan results) in <em>Safari</em>.</li>
<li>Fixed <code>BarcodePicker</code>&#39;s <code>submitFrame</code> event listeners being incorrectly called while scanning is paused.</li>
<li>Fixed <code>BarcodePicker</code> GUI incorrectly flashing when being shown after being hidden, if a code was previously scanned.</li>
</ul>
<h3 id="updates-37">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.10.1.</li>
<li>Switched <em>@babel/runtime</em> library with <em>@babel/runtime-corejs2</em>.</li>
<li>Updated <em>webrtc-adapter</em> library to version 7.1.1.</li>
<li>Updated <em>howler</em> library to version 2.1.1.</li>
</ul>
<h2 id="400-2018-12-07">4.0.0 (2018-12-07)</h2>
<h3 id="additions-15">Additions</h3>
<ul>
<li>Added new <em>Micro QR</em> symbology support and relative <code>Barcode.Symbology.MICRO_QR</code> enumeration value.</li>
<li>Added new <em>LAPA4SC</em> (Posti LAPA 4 State Code) symbology support and relative <code>Barcode.Symbology.LAPA4SC</code> enumeration value.</li>
<li>Added better error handling and clearer console error messages in case the <code>scandit-engine-sdk.wasm</code> file cannot be retrieved correctly.</li>
<li>Added new <code>Scanner.getImageSettings()</code> and <code>Scanner.getScanSettings()</code> functions to respectively get the currently used <code>ImageSettings</code> and <code>ScanSettings</code> objects (use <code>BarcodePicker.getScanner()</code> to retrieve its internally used <code>Scanner</code> intance).</li>
</ul>
<h3 id="changes-23">Changes</h3>
<ul>
<li><strong>BREAKING</strong>: Removed <code>ScanditSDK.configure()</code>&#39;s <code>preloadCameras</code> and <code>preloadEngineLibrary</code> options and <code>ScanditSDK.loadEngineLibrary()</code> function. Their functionality has been superseded by the (already previously existing) better possibility of calling <code>CameraAccess.getCameras()</code> (camera preloading) or creating and reusing a <code>BarcodePicker</code>/<code>Scanner</code> object in the background (engine library preloading); as explained in the README file.</li>
<li><strong>BREAKING</strong>: Replaced <code>CameraSettings.ResolutionPreference</code> numerical enumeration values in favor of string values for optional easier JavaScript usage (ex. <code>CameraSettings.ResolutionPreference.FULL_HD</code> is now <code>&quot;full-hd&quot;</code> instead of <code>0</code>).</li>
<li>Optimized <em>external Scandit Engine library</em> (WebAssembly) code size and structure, resulting in much faster loading times (more than twice as fast in some cases).</li>
<li>Optimized <code>scandit-engine-sdk.wasm</code> retrieval: in case the file is served with incorrect MIME type, an additional network request to the server is not needed anymore and previously downloaded data is reused for WebAssembply compilation.</li>
</ul>
<h3 id="fixes-40">Fixes</h3>
<ul>
<li>Fixed internal WebAssembly FileSystem sync issue causing increased resource usage and console messages to appear when under load.</li>
<li>Fixed incorrect video feed display when the <code>BarcodePicker</code>&#39;s containing element is changed or resized in <em>Edge</em>.</li>
<li>Fixed <code>BarcodePicker.isMirrorImageEnabled()</code> function to correctly return camera feed video mirroring status in all situations depending on camera access.</li>
<li>Fixed <code>BarcodePicker.setMirrorImageEnabled()</code> function to correctly apply and store camera feed video mirroring preferences per camera in all situations.</li>
</ul>
<h3 id="updates-38">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.10-beta.1.</li>
<li>Updated <em>@babel/runtime</em> library to version 7.2.0.</li>
<li>Updated <em>webrtc-adapter</em> library to version 6.4.8.</li>
</ul>
<h2 id="320-2018-10-26">3.2.0 (2018-10-26)</h2>
<h3 id="additions-16">Additions</h3>
<ul>
<li>Added new <em>Code 32</em> symbology support and relative <code>Barcode.Symbology.CODE32</code> enumeration value.</li>
</ul>
<h3 id="fixes-41">Fixes</h3>
<ul>
<li>Fixed failure to access the camera on mac OS in <em>Safari</em> 12.</li>
<li>Fixed failure to access the camera on some specific mobile devices in <em>Chrome</em>.</li>
<li>Fixed failure to correctly detect the browser as unsupported (and crashing instead) in some older browsers, like <em>Internet Explorer</em>.</li>
</ul>
<h3 id="updates-39">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.9.2.</li>
<li>Updated <em>webrtc-adapter</em> library to version 6.4.4.</li>
<li>Updated <em>ua-parser-js</em> library to version 0.7.19.</li>
</ul>
<h2 id="313-2018-10-12">3.1.3 (2018-10-12)</h2>
<h3 id="fixes-42">Fixes</h3>
<ul>
<li>Fixed <code>BarcodePicker.create()</code> resolving to the picker before the camera is accessed when camera access is enabled.</li>
<li>Fixed <code>BarcodePicker.resumeScanning()</code>, <code>BarcodePicker.accessCamera()</code>, <code>BarcodePicker.setActiveCamera()</code> and <code>BarcodePicker.applyCameraSettings()</code> triggering unnecessary camera access operations when called while the camera is currently being accessed for other reasons.</li>
<li>Fixed <code>CameraAccess.getCameras()</code> triggering unnecessary camera access operations when called while the camera is currently being accessed for other reasons.</li>
<li>Fixed incorrect or missing video feed display in some situations in <em>Edge</em>.</li>
</ul>
<h3 id="updates-40">Updates</h3>
<ul>
<li>Updated <em>@babel/runtime</em> library to version 7.1.2.</li>
<li>Updated <em>webrtc-adapter</em> library to version 6.4.0.</li>
<li>Updated <em>howler</em> library to version 2.0.15.</li>
</ul>
<h2 id="312-2018-08-29">3.1.2 (2018-08-29)</h2>
<h3 id="fixes-43">Fixes</h3>
<ul>
<li>Fixed important memory leak happening only in <em>Safari</em> that caused ever increasing memory usage and page crashes. Now memory usage remains stable and crashes are avoided.</li>
<li>Fixed <em>Safari</em> on <em>iOS</em> not correctly resuming camera video feed after the user exernally pauses and resumes the camera via the browser&#39;s camera access button.</li>
<li>Fixed <em>Safari</em> on <em>iOS</em> not correctly resuming camera video feed after an incoming call or other OS level interruption.</li>
<li>Fixed missing type information when trying to use the library in a TypeScript project.</li>
</ul>
<h2 id="311-2018-08-16">3.1.1 (2018-08-16)</h2>
<h3 id="additions-17">Additions</h3>
<ul>
<li>Added a new <code>example_background.html</code> file showing how to initialize a <code>BarcodePicker</code> object before it&#39;s needed and then start it on command.</li>
</ul>
<h3 id="changes-24">Changes</h3>
<ul>
<li>Online license key verification now only needs network calls on first usage of the library, subsequent loads use cached information and don&#39;t require network calls anymore. This also makes library loading faster.</li>
</ul>
<h3 id="fixes-44">Fixes</h3>
<ul>
<li>Fixed camera access sometimes failing in <em>Safari</em> with a generic &quot;Invalid constraint&quot; error.</li>
<li>Fixed incorrect camera being accessed in some situations by the <code>BarcodePicker</code> in <em>Firefox</em>.</li>
<li>Fixed <code>CameraAccess.getCameras()</code> returning camera objects with empty labels in <em>Firefox</em> when called multiple times.</li>
<li>Fixed <code>CameraAccess.getCameras()</code> not returning up-to-date camera objects.</li>
</ul>
<h3 id="updates-41">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.8.2.</li>
</ul>
<h2 id="310-2018-07-27">3.1.0 (2018-07-27)</h2>
<h3 id="additions-18">Additions</h3>
<ul>
<li>Added a new <code>BarcodePicker.onSubmitFrame()</code> function to register a listener to get a <code>ScanResult</code> whenever a frame is submitted for processing, making it possible to retrieve the frame before scanning is performed.</li>
<li>Added new <code>BarcodePicker.removeSubmitFrameListener()</code> and <code>BarcodePicker.removeSubmitFrameListeners()</code> functions to remove the new <code>submitFrame</code> event listeners.</li>
</ul>
<h3 id="changes-25">Changes</h3>
<ul>
<li>Improved scanning speed in Single Image Mode.</li>
<li>Improved barcode recognition for common large barcode scenarios in Single Image Mode.</li>
<li>Improved Single Image Mode button area for easier clicking/tapping.</li>
<li>Improved Single Image Mode button visibility in some situations.</li>
<li>Improved Single Image Mode button display and resizing at different dimensions.</li>
</ul>
<h3 id="fixes-45">Fixes</h3>
<ul>
<li>Fixed Single Image Mode occasionally triggering a <code>ScanResult</code> event result with empty <em>barcodes</em> and unexpected <em>imageData</em>/<em>imageSettings</em> followed by a correctly populated <code>ScanResult</code> event result when some barcodes are successfully scanned.</li>
<li>Fixed missing font color information for Single Image Mode button.</li>
<li>Fixed incorrect typing information for <code>BarcodePicker.removeScanErrorListener()</code>.</li>
<li>Fixed failure to compile TypeScript version of the library.</li>
</ul>
<h3 id="updates-42">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> with a fix for a rare bug that could cause the same barcode to be reported twice in the scan results.</li>
<li>Updated <em>webrtc-adapter</em> library to version 6.3.0.</li>
</ul>
<h2 id="300-2018-07-18">3.0.0 (2018-07-18)</h2>
<h3 id="additions-19">Additions</h3>
<ul>
<li>Implemented a new Single Image Mode for the <code>BarcodePicker</code> configured via the <code>singleImageMode</code> option on creation. This mode is meant as an alternative/fallback mode (provided by default as fallback) for a <code>BarcodePicker</code> to provide single camera pictures to be scanned. It still performs all operations locally in the browser, but trades off continuous camera stream access for (more high quality) single snapshot scanning; this results in less browser features needed for the library to work and extended browser support. In Single Image Mode a specially set UI is provided which enables users to click/tap to directly take a picture with the camera (mobile/tablet) or upload a file (desktop), this picture is then scanned and the results are provided. In this mode special camera access permissions don&#39;t have to be requested.</li>
</ul>
<h3 id="changes-26">Changes</h3>
<ul>
<li><strong>BREAKING</strong>: <code>UnsupportedBrowserError</code> now has a new <code>data</code> property containing more details regarding the compatibility of the used OS/browser in a new <code>BrowserCompatibility</code> object. The <code>message</code> property in the error object is now always the same generic message.</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.GUIStyle</code> numerical enumeration values.</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>Camera.Type</code> numerical enumeration values.</li>
<li>Deprecated errors of type <code>SourceUnavailableError</code> that can happen on some older browsers when accessing the camera are now automatically mapped to the more recent type: <code>NotReadableError</code>.</li>
<li>Improved handling of camera access failures in some situations to prevent unhandled exceptions.</li>
<li>Implemented cache busting mechanism to ensure the <em>external Scandit Engine library</em> JS and WASM files are refreshed and downloaded from the server when a new version of the library is released.</li>
</ul>
<h3 id="fixes-46">Fixes</h3>
<ul>
<li>Fixed very rare external Scandit Engine errors that could happen when converting between number representations (causing &quot;Out of bounds Trunc operation&quot; errors).</li>
<li>Fixed <code>BarcodePicker</code> GUI disappearing when the source element has a CSS transformation applied to it.</li>
<li>Fixed incorrect behaviour due to engine location configuration causing an error when trying to load cached compiled WebAssembly code.</li>
<li>Fixed rare condition where slow camera access could cause an error and stop the scanning process before it could start.</li>
</ul>
<h3 id="updates-43">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.8.1.</li>
<li>Updated <em>eventemitter3</em> library to version 3.1.0.</li>
<li>Updated <em>howler</em> library to version 2.0.13.</li>
<li>Updated <em>tslib</em> library to version 1.9.3.</li>
</ul>
<h2 id="251-2018-07-02">2.5.1 (2018-07-02)</h2>
<h3 id="fixes-47">Fixes</h3>
<ul>
<li>Fixed a bug that caused the library to fail when showing video output in some browsers.</li>
</ul>
<h3 id="updates-44">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> with a fix for a rare QR code bug.</li>
</ul>
<h2 id="250-2018-06-29">2.5.0 (2018-06-29)</h2>
<h3 id="additions-20">Additions</h3>
<ul>
<li>Added a new <code>BarcodePicker.setCameraSwitcherEnabled()</code> function to dynamically show or hide the GUI button to switch between different cameras, plus a relative <code>BarcodePicker.isCameraSwitcherEnabled()</code> function to get the current status.</li>
<li>Added a new <code>BarcodePicker.setTorchToggleEnabled()</code> function to dynamically show or hide a GUI button to toggle device torch on/off, plus a relative <code>BarcodePicker.isTorchToggleEnabled()</code> function to get the current status.</li>
<li>Added a new <code>BarcodePicker.setTapToFocusEnabled()</code> function to dynamically enable or disable manual camera focus when clicking/tapping on the video, plus a relative <code>BarcodePicker.isTapToFocusEnabled()</code> function to get the current status.</li>
<li>Added a new <code>BarcodePicker.setPinchToZoomEnabled()</code> function to dynamically enable or disable camera zoom control via pinching gesture on the video, plus a relative <code>BarcodePicker.isPinchToZoomEnabled()</code> function to get the current status.</li>
<li>Added a new <code>BarcodePicker.getScanner()</code> function to retrieve the initialized (and possibly configured) <code>Scanner</code> object internally used by the <code>BarcodePicker</code> instance.</li>
<li>Added a new <code>scanner</code> option to <code>BarcodePicker.create()</code> to pass and use an already initialized (and possibly configured) <code>Scanner</code> object on creation. Using this when needed can lead to faster component initalization thanks to the reuse of the already available <em>external Scandit Engine library</em> in the object.</li>
<li>Added a new <code>destroyScanner</code> optional argument (enabled by default) to the <code>BarcodePicker.destroy()</code> function, allowing to prevent <code>Scanner</code> destruction on <code>BarcodePicker</code> destruction.</li>
</ul>
<h3 id="changes-27">Changes</h3>
<ul>
<li>Changed <code>BarcodePicker.setActiveCamera()</code>&#39;s <code>camera</code> argument to be optional: when not provided the default camera is selected.</li>
<li>Improved error reporting when getting/setting symbology settings for invalid symbologies.</li>
<li>Documented new <em>Samsung Internet Browser 7+</em> support.</li>
</ul>
<h3 id="fixes-48">Fixes</h3>
<ul>
<li>Fixed <code>BarcodePicker.pauseScanning()</code> not pausing camera input if the relative argument is passed and the <code>BarcodePicker</code> is already in a paused state.</li>
<li>Fixed <code>BarcodePicker.accessCamera()</code> not reaccessing the camera when camera access was previously paused via <code>BarcodePicker.pauseScanning()</code>.</li>
</ul>
<h3 id="updates-45">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.8.0.</li>
</ul>
<h2 id="245-2018-06-13">2.4.5 (2018-06-13)</h2>
<h3 id="fixes-49">Fixes</h3>
<ul>
<li>Fixed an important bug causing the <em>external Scandit Engine library</em> to regularly block while making network requests on startup and regularly after scanning a barcode, this is now correctly handled in the background. Now startup times are slightly faster, online status is not required after library initialization and subsequent scans of barcodes are smoother and without interruptions (network conditions don&#39;t affect all these scenarios anymore).</li>
</ul>
<h2 id="244-2018-06-05">2.4.4 (2018-06-05)</h2>
<h3 id="changes-28">Changes</h3>
<ul>
<li>Correctly throw <code>UnsupportedBrowserError</code> in case one of the WebAssembly-bugged <em>iOS</em> versions is used (11.2.2/11.2.5/11.2.6).</li>
<li>Show alerts about external Scandit Engine errors by default only when running on a local IP address (still always logged to console).</li>
</ul>
<h3 id="updates-46">Updates</h3>
<ul>
<li>Updated <em>webrtc-adapter</em> library to version 6.2.1.</li>
<li>Updated <em>howler</em> library to version 2.0.12.</li>
<li>Updated <em>tslib</em> library to version 1.9.2.</li>
</ul>
<h2 id="243-2018-05-31">2.4.3 (2018-05-31)</h2>
<h3 id="changes-29">Changes</h3>
<ul>
<li>Removed automatic WebView classification as unsupported on <em>Android</em>, as actual support might work depending on the containing app.</li>
</ul>
<h2 id="242-2018-05-22">2.4.2 (2018-05-22)</h2>
<h3 id="changes-30">Changes</h3>
<ul>
<li>Reduced <em>external Scandit Engine library</em> (WebAssembly) code size.</li>
<li>Improved general frame processing speed.</li>
</ul>
<h3 id="updates-47">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.8-beta.2.</li>
</ul>
<h2 id="241-2018-04-27">2.4.1 (2018-04-27)</h2>
<h3 id="fixes-50">Fixes</h3>
<ul>
<li>Fixed incorrect behaviour of some browsers causing an error when trying to load cached compiled WebAssembly code.</li>
</ul>
<h3 id="updates-48">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.7.2.</li>
</ul>
<h2 id="240-2018-04-25">2.4.0 (2018-04-25)</h2>
<h3 id="additions-21">Additions</h3>
<ul>
<li>Implemented caching of compiled WebAssembly code on browsers that support this (currently only <em>Firefox</em>), this makes subsequent loads of the library much faster and don&#39;t require redownloading WebAssembly files.</li>
<li>Implemented functionality to retrieve image data information whenever a frame is processed by a <code>BarcodePicker</code>.</li>
<li>Added a new <code>imageData</code> property to the <code>ScanResult</code> object, containing the raw image byte data of the processed frame.</li>
<li>Added a new <code>imageSettings</code> property to the <code>ScanResult</code> object, containing the image settings used to parse the image data of the processed frame.</li>
<li>Added a new <code>BarcodePicker.onProcessFrame()</code> function to register a listener to get a <code>ScanResult</code> object whenever a frame is processed, independently from the number of recognized barcodes.</li>
<li>Added new <code>BarcodePicker.removeProcessFrameListener()</code> and <code>BarcodePicker.removeProcessFrameListeners()</code> functions to remove the new <code>processFrame</code> listeners.</li>
</ul>
<h3 id="changes-31">Changes</h3>
<ul>
<li>Improved detection of missing browser / OS functionality in WebView scenarios on <em>Android</em> devices.</li>
<li>Improved CHANGELOG format.</li>
</ul>
<h3 id="updates-49">Updates</h3>
<ul>
<li>Updated <em>webrtc-adapter</em> library to version 6.1.5.</li>
</ul>
<h2 id="230-2018-04-12">2.3.0 (2018-04-12)</h2>
<h3 id="additions-22">Additions</h3>
<ul>
<li>Implemented object fit options for <code>BarcodePicker</code> objects, to set the video feed to <em>cover</em> or <em>contain</em> and thus be resized differently inside the given origin element.</li>
<li>Added a new <code>videoFit</code> option to <code>BarcodePicker.create()</code> to set video element fit type on creation.</li>
<li>Added a new <code>BarcodePicker.setVideoFit()</code> function to set fit type dynamically for the video element.</li>
<li>Added a new <code>BarcodePicker.ObjectFit</code> enumeration to list the different types of object fit types available.</li>
</ul>
<h3 id="changes-32">Changes</h3>
<ul>
<li>Improved localization and scanning performance of challenging 1D codes in the center of the video frame.</li>
</ul>
<h3 id="fixes-51">Fixes</h3>
<ul>
<li>Fixed and improved camera enumeration and selection in <em>Firefox</em>.</li>
<li>Fixed incorrect video feed display in some situations in <em>Edge</em>.</li>
<li>Fixed incorrect application of scanning search area settings in some edge cases.</li>
</ul>
<h3 id="deprecations-1">Deprecations</h3>
<ul>
<li>Deprecated <code>BarcodePicker.GUIStyle</code> numerical enumeration values in favor of string values for optional easier JavaScript usage (ex. <code>BarcodePicker.GUIStyle.LASER</code> is now <code>&quot;laser&quot;</code> instead of <code>1</code>).</li>
<li>Deprecated <code>Camera.Type</code> numerical enumeration values in favor of string values for optional easier JavaScript usage (ex. <code>Camera.Type.FRONT</code> is now <code>&quot;front&quot;</code> instead of <code>0</code>).</li>
</ul>
<h2 id="221-2018-04-04">2.2.1 (2018-04-04)</h2>
<h3 id="fixes-52">Fixes</h3>
<ul>
<li>Fixed failing camera video feed recovery after unexpected camera identifier changes in <em>Safari</em>.</li>
</ul>
<h2 id="220-2018-03-28">2.2.0 (2018-03-28)</h2>
<h3 id="additions-23">Additions</h3>
<ul>
<li>Implemented scanning speed throttling functionality to allow tradeoffs between scan performance and power usage.</li>
<li>Added a new <code>targetScanningFPS</code> option to <code>BarcodePicker.create()</code> to set target frames per second to be processed/scanned.</li>
<li>Added a new <code>BarcodePicker.setTargetScanningFPS()</code> function to set target frames per second to be processed/scanned.</li>
</ul>
<h3 id="changes-33">Changes</h3>
<ul>
<li>Improved documentation.</li>
</ul>
<h2 id="211-2018-03-22">2.1.1 (2018-03-22)</h2>
<h3 id="fixes-53">Fixes</h3>
<ul>
<li>Fixed incorrect domain name detection and verification in some particular local testing environments.</li>
</ul>
<h3 id="updates-50">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.7.</li>
</ul>
<h2 id="210-2018-03-19">2.1.0 (2018-03-19)</h2>
<h3 id="additions-24">Additions</h3>
<ul>
<li>Implemented pinch-to-zoom camera functionality for devices supporting it (currently available only in <em>Chrome</em>).</li>
<li>Added a new <code>enablePinchToZoom</code> option to <code>BarcodePicker.create()</code> to enable/disable pinch-to-zoom (when available).</li>
<li>Added a new <code>BarcodePicker.setZoom()</code> function to manually set zoom level (when available).</li>
</ul>
<h3 id="fixes-54">Fixes</h3>
<ul>
<li>Fixed tap-to-focus functionality failing to work on some devices.</li>
</ul>
<h2 id="200-2018-03-15">2.0.0 (2018-03-15)</h2>
<h3 id="additions-25">Additions</h3>
<ul>
<li>Added functionalities for easier/better usage of single-instance background <code>BarcodePicker</code>s that don&#39;t acccess cameras all the time and are shared for different elements.</li>
<li>Added a new <code>pauseCamera</code> option to <code>BarcodePicker.pauseScanning()</code> to also pause camera input, allowing to interrupt (and later resume) the current camera stream.</li>
<li>Added a new <code>BarcodePicker.reassignOriginElement()</code> function to reassign the <code>BarcodePicker</code> to a different HTML element.</li>
</ul>
<h3 id="changes-34">Changes</h3>
<ul>
<li><strong>BREAKING</strong>: <code>BarcodePicker.resumeScanning()</code> function now returns a promise resolving to the <code>BarcodePicker</code> object instance instead of directly the instance; this is due to the fact that the function might need to access the camera again.</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.UIStyle</code> enumeration.</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.UIStyle.SCANLINE</code> enumeration value.</li>
<li><strong>BREAKING</strong>: Removed previously deprecated <code>BarcodePicker.create()</code>&#39;s <code>uiStyle</code> option.</li>
</ul>
<h3 id="updates-51">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.7-beta.1.</li>
<li>Updated <em>webrtc-adapter</em> library to version 6.1.4.</li>
</ul>
<h2 id="147-2018-03-05">1.4.7 (2018-03-05)</h2>
<h3 id="fixes-55">Fixes</h3>
<ul>
<li>Fixed <code>BarcodePicker</code> trying to access again the camera after being destroyed.</li>
<li>Fixed <code>BarcodePicker</code> still referencing the used camera as the active camera after being destroyed.</li>
</ul>
<h2 id="146-2018-02-23">1.4.6 (2018-02-23)</h2>
<h3 id="changes-35">Changes</h3>
<ul>
<li>Greatly improved <em>external Scandit Engine library</em> loading times, especially on <em>iOS</em> devices.</li>
<li>Reduced <em>external Scandit Engine library</em> (WebAssembly) code size.</li>
<li>Improved camera initialization for slower devices.</li>
</ul>
<h3 id="fixes-56">Fixes</h3>
<ul>
<li>Fixed <em>external Scandit Engine library</em> failing to load in <em>Edge</em>.</li>
</ul>
<h2 id="145-2018-02-22">1.4.5 (2018-02-22)</h2>
<h3 id="fixes-57">Fixes</h3>
<ul>
<li>Fixed camera initialization failing in <em>Edge</em>.</li>
<li>Fixed camera initialization failing for some combinations of browsers/devices incorrectly reporting camera failures.</li>
<li>Fixed <code>BarcodePicker</code> instances not being correctly destroyed when never accessing a camera.</li>
</ul>
<h2 id="144-2018-02-14">1.4.4 (2018-02-14)</h2>
<h3 id="updates-52">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.6.2.</li>
<li>Updated <em>webrtc-adapter</em> library to version 6.1.1.</li>
<li>Updated <em>howler</em> library to version 2.0.9.</li>
<li>Updated <em>tslib</em> library to version 1.9.0.</li>
</ul>
<h2 id="143-2018-02-08">1.4.3 (2018-02-08)</h2>
<h3 id="fixes-58">Fixes</h3>
<ul>
<li>Fixed incorrect back camera identification on some devices.</li>
</ul>
<h2 id="142-2018-01-12">1.4.2 (2018-01-12)</h2>
<h3 id="changes-36">Changes</h3>
<ul>
<li>Added documentation note about problems with <em>iOS</em> 11.2.2/11.2.5/11.2.6.</li>
</ul>
<h3 id="updates-53">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.6.</li>
</ul>
<h2 id="141-2018-01-11">1.4.1 (2018-01-11)</h2>
<h3 id="fixes-59">Fixes</h3>
<ul>
<li>Switched <em>external Scandit Engine library</em> to allow memory growth in order to prevent random memory allocation failures.</li>
</ul>
<h2 id="140-2018-01-08">1.4.0 (2018-01-08)</h2>
<h3 id="additions-26">Additions</h3>
<ul>
<li>Implemented Scandit Parser Library support to parse data string into structured data. For details refer to the new <code>Parser</code> object and the <a href="https://docs.scandit.com/parser/index.html">Scandit Parser Library&#39;s documentation</a>.</li>
<li>Added new <code>BarcodePicker.createParserForFormat()</code> and <code>Scanner.createParserForFormat()</code> functions to create and use <code>Parser</code> objects.</li>
</ul>
<h3 id="changes-37">Changes</h3>
<ul>
<li>Improved documentation.</li>
</ul>
<h2 id="132-2017-12-21">1.3.2 (2017-12-21)</h2>
<h3 id="fixes-60">Fixes</h3>
<ul>
<li>Fixed <em>external Scandit Engine library</em> still already registering a device activation already on initial configuration in some cases.</li>
<li>Fixed bug preventing scan settings to be changed after the initial setup for <code>Scanner</code> and <code>BarcodePicker</code> objects.</li>
<li>Improved memory usage and speed when modifying scan settings.</li>
</ul>
<h3 id="updates-54">Updates</h3>
<ul>
<li>Updated <em>external Scandit Engine library</em> to version 5.6-beta.2.</li>
<li>Updated <em>howler</em> library to version 2.0.7.</li>
</ul>
<h2 id="131-2017-12-19">1.3.1 (2017-12-19)</h2>
<h3 id="fixes-61">Fixes</h3>
<ul>
<li>Fixed <em>external Scandit Engine library</em> registering a device activation already on initial configuration: a device is registered only at the time the first frame is processed (or a parse operation is performed). This means that unused <code>Scanner</code> objects or <code>BarcodePicker</code> objects starting in a paused state or with no camera access will no longer trigger registrations.</li>
</ul>
<h2 id="130-2017-12-15">1.3.0 (2017-12-15)</h2>
<h3 id="additions-27">Additions</h3>
<ul>
<li>Implemented functionality to delay camera access (and thus possible user permission requests) to after a <code>BarcodePicker</code> has been created, allowing for early <em>external Scandit Engine library</em> initialization.</li>
<li>Added a new <code>accessCamera</code> option to <code>BarcodePicker.create()</code> to enable/disable camera access on <code>BarcodePicker</code> creation.</li>
<li>Added a new <code>BarcodePicker.accessCamera()</code> function to access the camera after creation (if disabled on creation).</li>
</ul>
<h3 id="updates-55">Updates</h3>
<ul>
<li>Updated <em>webrtc-adapter</em> library to version 6.0.3.</li>
<li>Updated <em>eventemitter3</em> library to version 3.0.0.</li>
<li>Updated <em>tslib</em> library to version 1.8.1.</li>
</ul>
<h2 id="122-2017-12-05">1.2.2 (2017-12-05)</h2>
<h3 id="fixes-62">Fixes</h3>
<ul>
<li>Fixed possible problems during camera detection for some older browsers.</li>
<li>Fixed camera initialization failing for some combinations of browsers/devices incorrectly reporting camera failures.</li>
<li>Fixed camera initialization sometimes failing in <em>Safari</em> on <em>iOS</em> 11.0 - 11.0.2.</li>
<li>Fixed <code>BarcodePicker</code> element sometimes overflowing its given origin element by 1 pixel.</li>
</ul>
<h2 id="121-2017-11-29">1.2.1 (2017-11-29)</h2>
<h3 id="fixes-63">Fixes</h3>
<ul>
<li>Fixed <code>BarcodePicker</code> not getting hidden when the relative option or function is provided/called.</li>
<li>Fixed incorrect <code>BarcodePicker</code> visibility option and function only partially hiding the containing element.</li>
<li>Fixed <code>BarcodePicker</code>&#39;s <code>originElement</code> being left in an inconsistent state after being destroyed.</li>
<li>Fixed incorrect camera front/back detection on some devices set to a system language different from english.</li>
</ul>
<h2 id="120-2017-11-27">1.2.0 (2017-11-27)</h2>
<h3 id="additions-28">Additions</h3>
<ul>
<li>Added a new <code>BarcodePicker.setGuiStyle()</code> function to set the GUI after creation.</li>
</ul>
<h3 id="changes-38">Changes</h3>
<ul>
<li>Improved README documentation.</li>
<li>Improved <code>BarcodePicker</code> documentation.</li>
</ul>
<h3 id="fixes-64">Fixes</h3>
<ul>
<li>Correctly detect failed camera initialization in various situations due to unforeseen hardware issues and reject promises with a <code>NotReadableError</code> error plus close the video stream when it&#39;s the case.</li>
<li>Fixed broken camera selection in <code>BarcodePicker</code> when one of the cameras cannot be accessed.</li>
</ul>
<h3 id="deprecations-2">Deprecations</h3>
<ul>
<li>Deprecated <code>BarcodePicker.UIStyle</code> in favor of <code>BarcodePicker.GuiStyle</code> to be consistent with other existing Scandit SDKs.</li>
<li>Deprecated <code>BarcodePicker.create()</code>&#39;s <code>uiStyle</code> option in favor of <code>guiStyle</code>.</li>
<li>Deprecated <code>BarcodePicker.UIStyle.SCANLINE</code> in favor of <code>BarcodePicker.GuiStyle.LASER</code> to be consistent with other existing Scandit SDKs.</li>
</ul>
<h2 id="110-2017-11-17">1.1.0 (2017-11-17)</h2>
<h3 id="additions-29">Additions</h3>
<ul>
<li>Implemented tap-to-focus camera functionality for devices supporting it (currently available only in <em>Chrome</em>).</li>
<li>Implemented device torch/torchlight toggle functionality and relative button for devices supporting it (currently available only in <em>Chrome</em>).</li>
<li>Added a new <code>enableTapToFocus</code> option to <code>BarcodePicker.create()</code> to enable/disable tap-to-focus (when available).</li>
<li>Added a new <code>enableTorchToggle</code> option to <code>BarcodePicker.create()</code> to enable/disable torch toggle button (when available).</li>
<li>Added a new <code>BarcodePicker.setTorchEnabled()</code> function to enable/disable torch (when available).</li>
</ul>
<h3 id="changes-39">Changes</h3>
<ul>
<li>Improved <code>BarcodePicker</code> buttons and touch events responsiveness.</li>
<li>Improved README documentation.</li>
<li>Improved CHANGELOG format.</li>
<li>Improved documentation navigation.</li>
</ul>
<h3 id="fixes-65">Fixes</h3>
<ul>
<li>Fixed missing camera switcher button when preselecting a camera on <code>BarcodePicker</code> creation.</li>
<li>Fixed incorrect domain name detection and verification in <em>Firefox</em>.</li>
<li>Fixed buttons and touch events sometimes not being triggered on mobile devices.</li>
</ul>
<h3 id="updates-56">Updates</h3>
<ul>
<li>Updated <em>webrtc-adapter</em> library to version 6.0.2.</li>
</ul>
<h2 id="108-2017-11-15">1.0.8 (2017-11-15)</h2>
<h3 id="additions-30">Additions</h3>
<ul>
<li>Implemented automatic regularly triggered focus procedure for cameras not supporting continuous focus mode (but supporting at least manual focus); this greatly increases usability and scanning performance. Currently available only in <em>Chrome</em>.</li>
</ul>
<h3 id="changes-40">Changes</h3>
<ul>
<li>Improved <code>BarcodePicker</code> documentation.</li>
</ul>
<h3 id="fixes-66">Fixes</h3>
<ul>
<li>Fixed incorrect domain name detection and verification in <em>Edge</em>.</li>
</ul>
<h2 id="107-2017-11-13">1.0.7 (2017-11-13)</h2>
<h3 id="fixes-67">Fixes</h3>
<ul>
<li>Fixed <code>ScanditSDK.configure()</code> not rejecting in case of unsupported browsers when not performing any of the preloading functions, now the promise is correctly rejected.</li>
<li>Fixed incorrect error thrown on <code>ScanditSDK.configure()</code> calls in case of unsupported browsers, now the promise is correctly rejected with said error.</li>
<li>Fixed incorrect error thrown on <code>ScanditSDK.loadEngineLibrary()</code> calls in case of unsupported browsers, now the promise is correctly rejected with said error.</li>
<li>Fixed incorrect error thrown when a code containing data in non-UTF-8 format is scanned, now the barcode result is correctly created with an empty parsed data string.</li>
</ul>
<h2 id="106-2017-11-10">1.0.6 (2017-11-10)</h2>
<h3 id="fixes-68">Fixes</h3>
<ul>
<li>Fixed incorrect camera initialization and metadata storage in <em>Firefox mobile</em>.</li>
</ul>
<h2 id="105-2017-11-10">1.0.5 (2017-11-10)</h2>
<h3 id="additions-31">Additions</h3>
<ul>
<li>Added a small shadow to the camera switcher button to make it more visible on bright backgrounds.</li>
</ul>
<h3 id="changes-41">Changes</h3>
<ul>
<li>Altered function call (same functionality) to make the library correctly parsable by <em>Internet Explorer 11</em>, and more graciously fail with built-in errors later.</li>
<li>Improved README documentation.</li>
<li>Minor CHANGELOG formatting changes.</li>
</ul>
<h2 id="104-2017-11-09">1.0.4 (2017-11-09)</h2>
<h3 id="fixes-69">Fixes</h3>
<ul>
<li>Fixed camera feed being interrupted in <em>Safari</em> when the <code>BarcodePicker</code> element or page loses and regains visibility.</li>
<li>Fixed rare broken camera access in <em>Safari</em> when switching between cameras or setting camera options in the <code>BarcodePicker</code>.</li>
</ul>
<h3 id="updates-57">Updates</h3>
<ul>
<li>Updated <em>webrtc-adapter</em> library to version 6.0.0.</li>
</ul>
<h2 id="103-2017-11-08">1.0.3 (2017-11-08)</h2>
<h3 id="fixes-70">Fixes</h3>
<ul>
<li>Fixed <code>BarcodePicker</code> video feed randomly freezing when switching between multiple cameras.</li>
<li>Fixed searchArea limitation not being correctly applied to all code types in <code>ScanSettings</code>.</li>
</ul>
<h2 id="102-2017-11-08">1.0.2 (2017-11-08)</h2>
<h3 id="changes-42">Changes</h3>
<ul>
<li>Improved <code>ScanSettings</code> documentation.</li>
<li>Improved README documentation.</li>
</ul>
<h3 id="fixes-71">Fixes</h3>
<ul>
<li>Fixed <code>Barcode</code> object to correctly contain location information as <code>Quadrilateral</code> object instead of array.</li>
</ul>
<h2 id="101-2017-11-07">1.0.1 (2017-11-07)</h2>
<h3 id="additions-32">Additions</h3>
<ul>
<li>Added missing <em>external Scandit Engine library</em> files to the build folder.</li>
</ul>
<h2 id="100-2017-11-07">1.0.0 (2017-11-07)</h2>
<ul>
<li>Initial release.</li>
</ul>

</body></html>
