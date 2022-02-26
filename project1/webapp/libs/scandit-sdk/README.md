# Scandit Barcode Scanner SDK for the Web<!-- omit in toc -->

Enterprise barcode/text scanning performance in your browser via JavaScript and WebAssembly.

_Made by [Scandit](https://www.scandit.com/)_

![npm](https://img.shields.io/npm/v/scandit-sdk.svg) ![npm](https://img.shields.io/npm/dm/scandit-sdk.svg) ![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/scandit-sdk.svg) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/scandit-sdk.svg)

![main library size](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/scandit-sdk/build/browser/index.min.js.svg?compression=gzip&label=Main%20Library%20Size)
![scandit data capture js size](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/scandit-sdk/build/scandit-engine-sdk.min.js.svg?compression=gzip&label=Scandit%20Data%20Capture%20JS%20Size)
![scandit data capture wasm size](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/scandit-sdk/build/scandit-engine-sdk.wasm.svg?compression=gzip&label=Scandit%20Data%20Capture%20WASM%20Size)

Access cameras available on the devices for video input, display a picker interface, configure in-depth settings for barcodes, text and performance, and let users easily scan barcodes and text in your web application.

Try out our live demo [here](http://websdk.scandit.com).

Find out more information on our product [here](https://www.scandit.com/products/sdk-web/).

To use this library you must possess a valid Scandit account and license key. You can register for a free trial [here](https://ssl.scandit.com/customers/new?p=test&source=websdk).

This library is meant to be used natively in a web browser, if you are instead looking for a Cordova/PhoneGap plugin, please go [here](https://github.com/Scandit/barcodescanner-sdk-cordova).

**Table of Contents:**

- [Quick Start: Web Application](#quick-start-web-application)
- [Getting Started: Web Application](#getting-started-web-application)
- [Getting Started: Local Development](#getting-started-local-development)
- [Configuration](#configuration)
- [Usage](#usage)
- [Example Applications](#example-applications)
- [Web Component Integration](#web-component-integration)
- [Advanced Components and Sample Apps](#advanced-components-and-sample-apps)
- [Browser Support and Requirements](#browser-support-and-requirements)
- [Documentation](#documentation)
- [FAQ](#faq)
- [Important Notes](#important-notes)
- [Support](#support)
- [Project Commands](#project-commands)
- [Changelog / Release Notes and Versioning](#changelog--release-notes-and-versioning)
- [Built, Tested and Documented With](#built-tested-and-documented-with)
- [Authors](#authors)
- [License](#license)

## Quick Start: Web Application

Import the library first:

```html
<script src="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x"></script>
```

Add an HTML element to host barcode picker UI:

```html
<div id="scandit-barcode-picker"></div>
```

Configure the library and start scanning:

```js
ScanditSDK.configure("YOUR_LICENSE_KEY_IS_NEEDED_HERE", {
  engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
})
  .then(() => {
    return ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
      // enable some common symbologies
      scanSettings: new ScanditSDK.ScanSettings({ enabledSymbologies: ["ean8", "ean13", "upca", "upce"] }),
    });
  })
  .then((barcodePicker) => {
    // barcodePicker is ready here, show a message every time a barcode is scanned
    barcodePicker.on("scan", (scanResult) => {
      alert(scanResult.barcodes[0].data);
    });
  });
```

Alternatively you can use our Web Component (currently beta), please check the [Integrate with the Web Component](#integrate-with-the-web-component) section.

That's it! You will find below more details about library [loading/setup](#getting-started-web-application), [configuration](#configuration) and [usage](#usage).

## Getting Started: Web Application

These instructions will help you set up the library for a quick and simple deployment as a JavaScript script included in your webpage / web application.

You can use the [jsDelivr](https://jsdelivr.com) or [UNPKG](https://unpkg.com) CDN to easily [specify a certain version (range)](https://semver.npmjs.com) and include our library as follows (example for `5.9.2`: the current version automatically retrieved when specifying a `5.x` version; check our latest available library [here](https://docs.scandit.com/stable/web/CHANGELOG.md)):

```html
<script src="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x"></script>
```

or

```html
<script src="https://unpkg.com/scandit-sdk@5.x"></script>
```

Or download the library with [npm](https://github.com/npm/npm) / [Yarn](https://github.com/yarnpkg/yarn), save it and include it from your local files.

Via NPM:

```bash
npm install scandit-sdk --save
```

Via Yarn:

```bash
yarn add scandit-sdk
```

Include as [UMD module](https://github.com/umdjs/umd) (this is most probably what you need):

```html
<script src="/node_modules/scandit-sdk/build/browser/index.min.js"></script>
```

Include as [ES module](https://jakearchibald.com/2017/es-modules-in-browsers/):

```html
<script type="module" src="/node_modules/scandit-sdk/build/browser/index.esm.min.js"></script>
```

Non-minified modules are also available if needed: just include the non-".min" file.

The library will then be accessible via the global `ScanditSDK` object.

## Getting Started: Local Development

These instructions will help you set up the library for local development and testing purposes, include it in a more complex JavaScript or TypeScript project and make it part of your final deployed code later built and bundled via tools like [Webpack](https://github.com/webpack/webpack), [Rollup](https://github.com/rollup/rollup) or [Browserify](https://github.com/browserify/browserify).

Download the library with [npm](https://github.com/npm/npm) / [Yarn](https://github.com/yarnpkg/yarn).

Via NPM:

```bash
npm install scandit-sdk --save
```

Via Yarn:

```bash
yarn add scandit-sdk
```

We provide two different bundled versions of the library depending on your needs:

- [CommonJS module](http://www.commonjs.org/specs/modules/1.0/) (with type definitions) - `build/main`
- [ES6 module](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) (with type definitions) - `build/module`

For reference, you also have the following browser bundles:

- [UMD module](https://github.com/umdjs/umd) - `build/browser/index.js`
- [ES module](https://jakearchibald.com/2017/es-modules-in-browsers/) - `build/browser/index.esm.js`

The library can be included in your code via either CommonJS or ES imports.

ES2015 (ES6):

```javascript
import * as ScanditSDK from "scandit-sdk";
```

CommonJS:

```javascript
var ScanditSDK = require("scandit-sdk");
```

With ES imports it's also possible to use single components. For example:

```javascript
import { Barcode, BarcodePicker, ScanSettings, configure } from "scandit-sdk";
```

## Configuration

The first thing that is needed to use the library is to do an initial configuration of the `ScanditSDK` object, this is required before instantiating the main library components (`BarcodePicker` and `Scanner` objects).

For optimal performance, this configuration/initialization should be done as soon as possible in your application (even before scanning is actually required) to ensure needed components are preloaded and initialized ahead of time.

The configuration function returns a promise and looks as follows:

```javascript
ScanditSDK.configure(licenseKey, {
  engineLocation: "/path",
});
```

The first required configuration option is a valid Scandit license key - this is necessary for the library to work and is verified at configuration time. In order to get your license key you must [register and login to your account](https://ssl.scandit.com/customers/new?p=test&source=websdk). The key will be available (and configurable) in your personal dashboard and is tied to your website / web application.

The next (often required) optional configuration option is the location of the Scandit Data Capture library location (external WebAssembly files): `scandit-engine-sdk.min.js` and `scandit-engine-sdk.wasm`. WebAssembly requires these separate files which are loaded by our main library at runtime. They can be found inside the `build` folder in the library you either download or access via a CDN; if you download the library, these files should be put in a path that's accessible to be downloaded by the running library script. The configuration option that you provide should then point to the folder containing these files, either as a path of your website or an absolute URL (like the CDN one). By default the library will look at the root of your website. If you use a CDN to access the library, you will want to set this to `"https://cdn.jsdelivr.net/npm/scandit-sdk/build"`, `"https://unpkg.com/scandit-sdk/build"`, or similar. Please ensure that the version of the main library that you set up in the "Getting Started" section corresponds to the version of the external Scandit Data Capture library retrieved via the `engineLocation` option, either by ensuring the served files are up-to-date or the path/URL specifies a specific version. In case a common CDN is used here (_jsDelivr_ or _UNPKG_) the library will automatically internally set up the correct URLs pointing directly at the files needed for the matching library version. It is highly recommended to handle the serving of these files yourself on your website/server, ensuring optimal compression, no request redirections and correct caching headers usage; thus resulting in faster loading.

A configuration call could look as follows:

```typescript
ScanditSDK.configure("YOUR_LICENSE_KEY_IS_NEEDED_HERE", {
  engineLocation: "build/",
}).then(() => {
  // ... ready to instantiate a BarcodePicker or Scanner here
});
```

Here is the same code snippet using `async`/`await`:

```typescript
// inside an async function
await ScanditSDK.configure("YOUR_LICENSE_KEY_IS_NEEDED_HERE", {
  engineLocation: "build/",
});
// ... ready to instantiate a BarcodePicker or Scanner here
```

Note that camera access requests are done lazily only when needed by a `BarcodePicker` (or `Scanner`) object. To make the loading process faster when scanning is actually needed, it is recommended depending on the use case to create in advance a (hidden and paused) `BarcodePicker` or `Scanner` object, to later show and unpause it when needed. You can also eagerly ask only for camera access permissions by calling the `ScanditSDK.CameraAccess.getCameras()` function. An example of this advanced usage can be found in the `example_background.html` file. More details are also given in the next section.

Check the documentation for additional options available on configuration.

## Usage

Once the library has been configured, there are two main ways to interact with it: via the `BarcodePicker` object, providing an easy to use high-level UI and API to setup barcode scanning via cameras, or via the `Scanner` object, providing only low level methods to process image data.

In order to use the `BarcodePicker`, an HTML element must be provided to act as (parent) container for the UI. You can configure size and other styling properties/restrictions by simply setting rules on this element - the picker will fit inside it. A sample element could look as follows:

```html
<div id="scandit-barcode-picker" style="max-width: 1280px; max-height: 80%;"></div>
```

The `BarcodePicker` can then be created by simply passing the previous HTML element plus optional settings; this will show the UI, access the camera, initialize the Scandit Data Capture library and start scanning.

JavaScript:

```javascript
ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
  playSoundOnScan: true,
  vibrateOnScan: true,
}).then(function (barcodePicker) {
  // barcodePicker is ready here to be used (rest of the tutorial code should go here)
});
```

Typescript:

```typescript
BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
  playSoundOnScan: true,
  vibrateOnScan: true,
}).then((barcodePicker) => {
  // barcodePicker is ready here to be used (rest of the tutorial code should go here)
});
```

By default, no symbology is enabled for recognition so nothing special will happen; we can now quickly set up `ScanSettings` to enable wanted symbologies plus other more advanced options if needed (we could and should already have done it via the previous constructor). Setting up some sample configuration looks as follows.

JavaScript:

```javascript
const scanSettings = new ScanditSDK.ScanSettings({
  enabledSymbologies: [ScanditSDK.Barcode.Symbology.EAN8, ScanditSDK.Barcode.Symbology.EAN13],
  codeDuplicateFilter: 1000, // Minimum delay between duplicate results
});
barcodePicker.applyScanSettings(scanSettings);
```

TypeScript:

```typescript
const scanSettings = new ScanSettings({
  enabledSymbologies: [Barcode.Symbology.EAN8, Barcode.Symbology.EAN13],
  codeDuplicateFilter: 1000, // Minimum delay between duplicate results
});
barcodePicker.applyScanSettings(scanSettings);
```

The picker is now actively scanning the selected symbologies (detecting the same barcode a maximum of one time per second), if we later want to change the settings we just have to modify the object and apply it again to the picker. In order to react to a successful `scan` event with your code you can attach one or more listener functions to the picker.

JavaScript:

```javascript
barcodePicker.on("scan", (scanResult) => {
  alert(
    scanResult.barcodes.reduce((string, barcode) => {
      return string + `${ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${barcode.data}\n`;
    }, "")
  );
});
```

TypeScript:

```typescript
barcodePicker.on("scan", (scanResult) => {
  alert(
    scanResult.barcodes.reduce((string, barcode) => {
      return string + `${Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${barcode.data}\n`;
    }, "")
  );
});
```

That's it!

Please refer to the [documentation](#documentation) for all the other available configuration options and functions, as well as more advanced `ScanSettings` and `Scanner` usage.

### Text Recognition (OCR) Configuration<!-- omit in toc -->

Text recognition (OCR) is available for passports and ID cards via their Machine Readable Zone (MRZ); these are also called Machine Readable Travel Documents (MRTD). Note that this functionality is disabled by default and requires specific license features in order to be usable. In order to make use of this functionality, two new and alternative sets of _external Scandit Data Capture library_ JS/WASM (external WebAssembly) files is used: `scandit-engine-sdk-ocr.min.js`/`scandit-engine-sdk-ocr.wasm` and `scandit-engine-sdk-ocr-simd.min.js`/`scandit-engine-sdk-ocr-simd.wasm`. These files must be set up to be copied from the `build` folder and be available to be downloaded as needed, similarly to the existing set of files (nothing needs to be done when using a CDN). Depending on the dynamically detected browser features, one of the sets will be used.

The following are the changes needed in order to make use of text recognition capabilities.

First of all the library has to be initially configured to load the necessary OCR version of the library as follows.

```javascript
ScanditSDK.configure(licenseKey, {
  engineLocation: "/path",
  loadTextRecognition: true,
});
```

Then we create a sample regular expression deciding what will be recognized as text, in this case we are interested in Machine Readable Travel Documents (MRTD) text data:

```javascript
const mrtdRegex =
  /[AIC][A-Z0-9<]{29}\n[A-Z0-9<]{30}\n[A-Z0-9<]{30}\n?|[A-Z0-9<]{36}\n[A-Z0-9<]{36}\n?|P[A-Z0-9<]{43}\n[A-Z0-9<]{44}\n?|V[A-Z0-9<]{43}\n[A-Z0-9<]{44}\n?|V[A-Z0-9<]{35}\n[A-Z0-9<]{36}\n?|[A-Z0-9<]{7}<<\n[A-Z0-9<]{30}\n[A-Z0<]{30}\n?/;
```

We can now create new `TextRecognitionSettings` to configure the text recognition behaviour as follows.

JavaScript:

```javascript
const textRecognitionSettings = new ScanditSDK.TextRecognitionSettings({
  regex: mrtdRegex,
});
```

TypeScript:

```typescript
const textRecognitionSettings = new TextRecognitionSettings({
  regex: mrtdRegex,
});
```

Afterwards, `ScanSettings` need to be set to switch from the default `CODE` recognition mode to `TEXT` and the new `TextRecognitionSettings` are also passed as follows.

JavaScript:

```javascript
const scanSettings = new ScanditSDK.ScanSettings({
  recognitionMode: ScanditSDK.ScanSettings.RecognitionMode.TEXT,
  textRecognitionSettings: textRecognitionSettings,
});
```

TypeScript:

```typescript
const scanSettings = new ScanSettings({
  recognitionMode: ScanSettings.RecognitionMode.TEXT,
  textRecognitionSettings: textRecognitionSettings,
});
```

In order to react to obtain the new text recognition results, the `scan` event listener can be modified as follows:

```javascript
barcodePicker.on("scan", (scanResult) => {
  alert(
    scanResult.texts.reduce((string, text) => {
      return `${string}${text.value}\n\n`;
    }, "")
  );
});
```

That's it!

Please refer to the [documentation](#documentation) for all the other available configuration options and functions, as well as more advanced `ScanSettings` and `TextRecognitionSettings` usage.

## Example Applications

You can have a look at the `example.html` file for a (almost) ready to use webpage using the library. You only need to serve the folder containing it for it to run. Note that it depends on the `build` folder contents.

You can also find a more advanced sample webpage in the `example_background.html` file, showing how to create a `BarcodePicker` object which loads the library in the background and how to start/show it at will. This is the recommended way to use the library in many situations.

If you want to see the [Web Component](#integrate-with-the-web-component) in action, you can have a look at `example_web_component.html`.

To see an example of text recognition (OCR), check out `example_ocr.html`.

Note that all these examples require a valid license key to be inserted replacing `"YOUR_LICENSE_KEY_IS_NEEDED_HERE"` in the html file.

You can use your own tools to serve the example pages, or the following proposed simple way to quickly set up a local server.

Globally install the `http-server` JavaScript package.

Via NPM:

```bash
npm install http-server -g
```

Via Yarn:

```bash
yarn global add http-server
```

Run the new package from this project's root folder with:

```bash
http-server
```

_Please note that this simple server will not compress files thus resulting in slower loading times than normal._

Finally, access the webpage via your favourite (and supported) browser at either:

- [http://127.0.0.1:8080/example.html](http://127.0.0.1:8080/example.html)
- [http://127.0.0.1:8080/example_background.html](http://127.0.0.1:8080/example_background.html)
- [http://127.0.0.1:8080/example_ocr.html](http://127.0.0.1:8080/example_ocr.html)
- [http://127.0.0.1:8080/example_web_component.html](http://127.0.0.1:8080/example_web_component.html)

## Web Component Integration

Please note that the Web Component is still in beta: functionality could change at any time independently from major version changes.

Import the library first (see the [Getting Started: Web Application](#getting-started-web-application) section for more details):

```html
<script src="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x"></script>
```

The Web Component is now available for use:

```html
<scandit-barcode-picker
  id="barcodePicker"
  configure.licenseKey="YOUR_LICENSE_KEY_IS_NEEDED_HERE"
  configure.engineLocation="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/"
  playSoundOnScan="true"
  scanSettings.enabledSymbologies='["ean8", "ean13", "upca", "upce"]'
></scandit-barcode-picker>
```

You can listen to its events like with any other standard DOM element ([see the BarcodePicker available events](https://docs.scandit.com/stable/web/classes/barcodepicker.html)). Note that you need to get the [event's "detail" property](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) in order to access the event's data. This is how you set up a listener for the [`"scan"`](https://docs.scandit.com/stable/web/classes/barcodepicker.html#scan) event:

```javascript
const barcodePickerElement = document.getElementById("barcodePicker");
barcodePickerElement.addEventListener("scan", function (event) {
  const scanResult = event.detail;
  alert(
    scanResult.barcodes.reduce(function (string, barcode) {
      return string + ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "\n";
    }, "")
  );
});
```

The modification of the attributes will be reflected on the underlying `BarcodePicker` and its `ScanSettings` object.

These are the available attributes of the `BarcodePicker`. They match the parameters that you pass to [BarcodePicker.create](https://docs.scandit.com/stable/web/classes/barcodepicker.html#create):

- accessCamera
- camera
- cameraSettings
- cameraType
- enableCameraSwitcher
- enablePinchToZoom
- enableTapToFocus
- enableTorchToggle
- guiStyle
- laserArea
- playSoundOnScan
- scanningPaused
- singleImageModeSettings
- targetScanningFPS
- vibrateOnScan
- videoFit
- viewfinderArea
- visible

Attributes to configure the library (see details in the [Configuration](#configuration) section):

- configure.engineLocation
- configure.licenseKey
- configure.highQualityBlurryRecognition
- configure.loadTextRecognition
- configure.preloadBlurryRecognition
- configure.preloadEngine

Attributes used by the `ScanSettings` object of the `BarcodePicker`:

- scanSettings.blurryRecognition
- scanSettings.codeDirectionHint
- scanSettings.codeDuplicateFilter
- scanSettings.deviceName
- scanSettings.enabledSymbologies
- scanSettings.gpuAcceleration
- scanSettings.maxNumberOfCodesPerFrame
- scanSettings.recognitionMode
- scanSettings.searchArea
- scanSettings.textRecognitionSettings

Attribute values not of type string, number or boolean should be passed as a [valid JSON string](https://www.json.org/json-en.html) (i.e. with keys surrounded by double quotes):

```html
<scandit-barcode-picker
  ...
  scanSettings.searchArea='{"x":0.2,"y":0.2,"width":0.6,"height":0.6}'
></scandit-barcode-picker>
```

As soon as a `<scandit-barcode-picker>` is found in the page, the library will automatically load itself. If you need to delay this initialization, use the `configure` attribute and set its value to `false`. Setting it later to `true` will trigger the library initialization.

Note that you can also use `ScanditSDK.configure()` to load the library yourself manually, the Web Component will not repeat the initialization if a previous call was successful. For optimal performance, it is actually recommended to configure the library as soon as possible (even before scanning is actually required or the Web Component is added) in your webpage / web application to ensure needed components are preloaded and initialized ahead of time.

If you need more control over the `BarcodePicker` object used by the Web Component, you can get the `barcodePicker` property from the element itself:

```js
const barcodePicker = barcodePickerElement.barcodePicker;
// modify barcodePicker settings
barcodePicker.setPlaySoundOnScanEnabled(false);
// access and modify the scan settings
const scanSettings = barcodePicker.getScanner().getScanSettings();
scanSettings.setSearchArea({ x: 0.2, y: 0.2, width: 0.6, height: 0.6 });
barcodePicker.applyScanSettings(scanSettings);
```

Changes operated on the `barcodePicker` will be reflected in the attributes.

The Web Component also supports Single Image Mode (see `singleImageModeSettings` parameters of [BarcodePicker.create](https://docs.scandit.com/stable/web/classes/barcodepicker.html#create)) through the `singleImageModeSettings` attribute. Note that however in HTML you cannot pass a reference to an element in an attribute, to achieve the same result here when a custom element is needed, you need to put the element in the Web Component body, respecting the right name for the `slot` attribute's value. Here is an example where `buttonElement` and `informationElement` are customized:

```html
<scandit-barcode-picker ...>
  <svg slot="singleImageModeSettings.desktop.buttonElement" height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
  <p slot="singleImageModeSettings.desktop.informationElement">Click the red circle</p>
</scandit-barcode-picker>
```

## Advanced Components and Sample Apps

For the _Angular_ framework you can either use our [scandit-sdk-angular](https://www.npmjs.com/package/scandit-sdk-angular) component, or use the [Web Component](#integrate-with-the-web-component). When choosing the latter, do not forget to add the CUSTOM_ELEMENTS_SCHEMA in your module:

```js
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  ...
})
```

For the _React_ framework you can use our [scandit-sdk-react](https://www.npmjs.com/package/scandit-sdk-react) component.

You can find online further sample applications making use of this library at [https://github.com/Scandit/barcodescanner-sdk-for-web-samples](https://github.com/Scandit/barcodescanner-sdk-for-web-samples).

## Browser Support and Requirements

Due to the advanced features required and some limitations imposed by operating systems, only the browsers listed below are able to correctly use this library.

The following is a list of the main required browser features together with links to updated support statistics:

- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) - [current support?](https://caniuse.com/#feat=blobbuilder)
- [URL/createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) - [current support?](https://caniuse.com/#feat=bloburls)
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) - [current support?](https://caniuse.com/#feat=webworkers)
- [WebAssembly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/WebAssembly) - [current support?](https://caniuse.com/#feat=wasm)
- [MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) - [current support?](https://caniuse.com/#feat=stream) (optional, required for camera video streaming)
- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) - [current support?](https://caniuse.com/#feat=webgl) (optional, allows for GPU acceleration in Web Worker)
- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) - [current support?](https://caniuse.com/#feat=offscreencanvas) (optional, allows for GPU acceleration in Web Worker)
- [WebAssembly SIMD](https://www.chromestatus.com/feature/6533147810332672) - (optional, allows for OCR computation acceleration)
- [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) - [current support?](https://caniuse.com/#feat=custom-elementsv1) (optional, required for the Web Component)
- [Shadow DOM v1](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) - [current support?](https://caniuse.com/#feat=shadowdomv1) (optional, required for the Web Component)
- [Slot element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) - [current support?](https://caniuse.com/#feat=mdn-api_htmlslotelement) (optional, required for the Web Component)

This results in the current browser compatibility list:

- Desktop
  - Chrome 57+
  - Firefox 52+ _(except ESR 52)_
  - Opera 44+
  - Safari 11+
  - Edge 16+
- Mobile - Android
  - Chrome 59+
  - Firefox 55+
  - Samsung Internet 7+
  - Opera 46+
- Mobile - iOS

  _iOS 13.4+ / 14.3+ required for camera video streaming in PWAs / Chrome, Firefox or webviews_

  - Safari 11+
  - Chrome 59+
  - Firefox 55+

## Documentation

An updated in-depth documentation of all of the libraries' specifications and functionalities can be generated/found in the `docs` folder or can also be accessed online at [https://docs.scandit.com/stable/web](https://docs.scandit.com/stable/web).

## FAQ

You can find answers in our list of [frequently asked questions (FAQs)](https://support.scandit.com/hc/en-us/categories/115000369292-Barcode-Scanner-SDK-for-the-Web).

## Important Notes

- File serving

  You must serve your final web application / website via a web server for correct dynamic retrieval of WebAssembly files by the library, due to browser restrictions this isn't possible by simply trying to directly opening and loading your local HTML file in the browser.

- HTTPS deployment / Secure context

  You must serve your final web application / website via a secure HTTPS connection: due to browser security restrictions, camera video streaming access is only granted if a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) is used. The secure connection requirement does not apply for Single Image Mode (no camera video streaming needed) or if using local IP addresses during development, however note that depending on the browser camera permissions could be asked every time in this case. During development you can also circumvent these restrictions on your own browser by doing the following: on _Chrome_ you can enable the `chrome://flags/#unsafely-treat-insecure-origin-as-secure` flag, on _Firefox_ you can enable the `media.devices.insecure.enabled` and `media.getusermedia.insecure.enabled` flags, on _Safari_ you can enable the menu item `Develop > WebRTC > Allow Media Capture on Insecure Sites`.

- WASM file format

  Please make sure that your webserver serves the `scandit-engine-sdk.wasm` file with `Content-Type: application/wasm` (it should be the default correct MIME type), failure to do so will result in some browsers failing to execute the external library or loading it more slowly.

- Cookies for device identification

  For licensing purposes we use cookies to assign and store/retrieve completely random device IDs of end users of the library. This may change in the future, but currently it cannot be disabled.

- Analytics data

  Our Scandit Data Capture library makes several different requests at initialization and during usage of the scanning library to our servers, in order to store and provide analytics data about the usage of the SDK. This request/information is the same as what we collect for other SDKs.

- License key

  A Scandit license key for this particular library is required. The license key is verified at runtime with each library usage and is linked/limited to your specified domain names to prevent abuse. Local addresses and private IPs are also allowed for testing independently from the domain name restriction in a valid license key.

- Camera performance

  On desktop or Android devices, the Chrome browser provides more advanced camera controls and results in better performance than other browsers. At the moment, it is also the only browser to support manual camera focus operations (via tapping the screen) and mobile torch toggling, where available. More browsers are expected to support these advanced features soon.

- Scanning performance

  The performance of the scanner depends on the device and camera being used. Nonetheless for optimal speed/quality, please keep in mind the following guidelines/tips:

  - Enable only the symbologies you really need to scan (1D code scanning is usually faster than 2D code scanning, only having 1D codes enabled is faster).
  - Only increase the maximum amount of codes per single frame from the default of 1 if it's really needed.
  - If possible, restrict the scanning search area to be less than the default full frame.
  - Depending on your use case, it might be worth to enable Full HD or Ultra HD video quality, resulting in slower frame processing times but higher resolution recognition.
  - Single Image Mode internally uses higher quality settings to scan images, this results in slower but better scanning performance, with the limitation of having to take and provide single pictures from the camera.
  - The first Single Image Mode scan might be slower than subsequent ones depending on the network condition as the Scandit Data Capture Library has to first verify the license key online before proceeding.
  - GPU acceleration allows for faster and more accurate barcode localization at challenging positions and angles but is only available if the browser supports it.
  - Blurry code recognition (enabled by default) allows for accurate scanning capabilities for out-of-focus 1D codes at the expense of more computationally expensive frame analysis: check and adjust scan settings according to your needs.

- Library performance

  In order to provide the best possible experience in your web application, please follow these guidelines to guarantee optimal performance of this library:

  - Configure the library as soon as possible in your webpage / web application to ensure needed components are preloaded and initialized ahead of time.
  - Ensure the JavaScript assets and the `scandit-engine-sdk.min.js` and `scandit-engine-sdk.wasm` files are served compressed, without redirections and with caching headers enabled by your web server. Note that some CDN services do not offer compression or, depending on used settings/URLs, implement redirections that don't allow for correct caching of assets.
  - Ensure that the `scandit-engine-sdk.wasm` file is served with the `Content-Type` HTTP header set to `application/wasm` to ensure the correct and fast loading of the WebAssembly library component.
  - Re-use `BarcodePicker` instances whenever possible by reassigning, hiding and showing them instead of destroying and recreating them to avoid useless multiple loads of libraries and resources. Ideally only one instance should be used.
  - If possible, create a (hidden and paused) `BarcodePicker` in the background and simply resume scanning by switching its visibility to `"show"` when needed, instead of creating it on the fly to provide instant scanning capabilities. You can also set it up to not access the camera immediately (`cameraAccess` option set to `false` on creation) and lazily do that later when needed (`BarcodePicker.accessCamera()` function call), or also pause and resume camera access when necessary. For a sample application, please refer to the `example_background.html` file.
  - Remember to use `destroy()` methods on the `Scanner` or `BarcodePicker` objects when they are not needed anymore, before they are automatically garbage collected by JavaScript. This will ensure all needed resources are correctly cleaned up.
  - Camera permissions can be asked to the user in advance via this library (background `BarcodePicker` creation or `ScanditSDK.CameraAccess.getCameras()` function call) or other external methods to ensure a more fluid experience depending on the situation. Remember that usually these permissions are stored forever and need only to be asked once. As an alternative you can consider Single Image Mode.
  - Blurry code recognition requires data structures to be initialized eagerly, asynchronously at library configuration (by default) or lazily, synchronously at scan time: check configuration options according to your needs and ensure the library and/or barcode picker are initialized as soon as possible.

- Scandit logo

  In accordance with our license terms, the Scandit logo displayed in the bottom right corner of the barcode picker must be displayed and cannot be hidden by any method. Workarounds are not allowed.

- iOS 11.2.2 / 11.2.5 / 11.2.6 support

  Apple released iOS version 11.2.2 on January 8, 2018, as an emergency update meant to mitigate the effects of the widespread _Spectre_ vulnerability. This update also included changes related to _WebKit_ and the _Safari_ browser, as documented [here](https://webkit.org/blog/8048/what-spectre-and-meltdown-mean-for-webkit/). Unfortunately this update also introduced a critical _WebAssembly_ bug, which caused this and many other libraries relying on this technology to randomly crash and fail to access memory with `Out of bounds memory access` or `None: abort(6)` errors on iOS versions 11.2.2, 11.2.5 and 11.2.6. This problem cannot be solved by us or other library developers; the issue has already been reported to Apple by multiple sources and a fix for it has been released in iOS 11.3. We suggest to conditionally use the library or show alerts to the affected users by utilizing the OS version information available in the browser via the _user agent_ string.

- iOS camera video streaming

  Due to operating system restrictions, access to the camera video stream is not given in older iOS version in cases where the library is loaded via a PWA, webview or browser other than Safari. This results in the Single Image Mode fallback being used (unless configured to fail instead). Starting from iOS 13.4 the camera video stream can be correctly accessed in PWAs, while starting from iOS 14.3 also in any other browser or webview as well.

## Support

For questions or support please use the form you can find [here](https://support.scandit.com/hc/en-us/requests/new) or send us an email to [support@scandit.com](mailto:support@scandit.com).

## Project Commands

If you want to work on this project, the following is a list of the most useful [Yarn](https://github.com/yarnpkg/yarn) commands you can run in this project (here shown with Yarn).

You should use `yarn` instead of `npm` to handle project dependencies to make use of the existing `yarn.lock` file.

Build (rebuild) and create all output modules:

```bash
yarn build
```

Remove build and test output folders:

```bash
yarn clean
```

Lint all source files:

```bash
yarn lint
```

Try to automatically fix all linting problems:

```bash
yarn fix
```

Build (rebuild) main library and run unit tests:

```bash
yarn test
```

Run tests, generate HTML coverage report, and open it in a browser:

```bash
yarn coverage
```

Generate HTML API documentation and open it in a browser:

```bash
yarn docs
```

Generate LICENSE file with copyright and licenses of dependencies:

```bash
yarn license
```

Delete all untracked files, reset the repo to the last commit and install all needed packages:

```bash
yarn reset
```

Build (rebuild) browser UMD library and show bundle size information:

```bash
yarn size-info
```

Show all available commands:

```bash
yarn info
```

## Changelog / Release Notes and Versioning

We use [Semantic Versioning (SemVer)](https://semver.org/) for versioning. A log of the project's releases over time with their features and changes can be found in the [CHANGELOG.md](https://docs.scandit.com/stable/web/CHANGELOG.md) file (also found inside the project).

## Built, Tested and Documented With

- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [AVA](https://github.com/avajs/ava)
- [Babel](https://github.com/babel/babel)
- [cssnano](https://github.com/ben-eb/cssnano)
- [gulp](https://github.com/gulpjs/gulp)
- [Istanbul](https://github.com/istanbuljs/nyc)
- [jsdom](https://github.com/jsdom/jsdom)
- [Nightwatch](https://github.com/nightwatchjs/nightwatch)
- [PostCSS](https://github.com/postcss/postcss)
- [Prettier](https://github.com/prettier/prettier)
- [Rollup](https://github.com/rollup/rollup)
- [Sass](https://github.com/sass/sass)
- [Sinon.JS](https://github.com/sinonjs/sinon)
- [stylelint](https://github.com/stylelint/stylelint)
- [Terser](https://github.com/terser-js/terser)
- [TSLint](https://github.com/palantir/tslint)
- [TypeDoc](https://github.com/TypeStrong/typedoc)
- [TypeScript Starter](https://github.com/bitjson/typescript-starter)
- [TypeScript](https://github.com/Microsoft/TypeScript)

## Authors

- Lorenzo Wölckner (Scandit)
- Sébastien Roch (Scandit)

## License

This project is licensed under a custom license - see the [LICENSE](https://docs.scandit.com/stable/web/LICENSE) file for details (also found inside the project).
