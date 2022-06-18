import { textRecognition } from "..";
import { Barcode } from "./barcode";
import { Logger } from "./logger";
import { SymbologySettings } from "./symbologySettings";
import { TextRecognitionSettings } from "./textRecognitionSettings";
/**
 * A configuration object for scanning options.
 *
 * Modified [[ScanSettings]] need to be applied to a scanner via
 * [[BarcodePicker.applyScanSettings]] or [[Scanner.applyScanSettings]] to take effect.
 */
export class ScanSettings {
    symbologySettings;
    properties;
    textRecognitionSettings;
    recognitionMode;
    codeDuplicateFilter;
    maxNumberOfCodesPerFrame;
    baseSearchArea;
    searchArea;
    gpuAcceleration;
    blurryRecognition;
    codeDirectionHint;
    deviceName;
    /**
     * Create a ScanSettings instance.
     *
     * @param textRecognitionSettings <div class="tsd-signature-symbol">Default =&nbsp;new TextRecognitionSettings()</div>
     * The configuration object for text recognition options (text recognition disabled by default).
     * @param recognitionMode <div class="tsd-signature-symbol">Default =&nbsp;RecognitionMode.CODE</div>
     * The recognition mode deciding whether codes and/or text are recognized.
     * @param enabledSymbologies <div class="tsd-signature-symbol">Default =&nbsp;[]</div>
     * The single symbology or list/set of symbologies that should be initialized as enabled for recognition.
     * @param codeDuplicateFilter <div class="tsd-signature-symbol">Default =&nbsp;0</div>
     * The duplicate filter specifying how often a code can be scanned.
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     * When the same code (data/symbology) is scanned within the specified interval it is filtered out as a duplicate.
     * @param maxNumberOfCodesPerFrame <div class="tsd-signature-symbol">Default =&nbsp;1</div>
     * The maximum number of barcodes to be recognized every frame.
     * @param searchArea <div class="tsd-signature-symbol">Default =&nbsp;{ x: 0, y: 0, width: 1.0, height: 1.0 }</div>
     * The area of the image in which barcodes/texts are searched.
     * @param gpuAcceleration <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to enable/disable GPU support via WebGL, to provide faster and more accurate barcode localization.
     * The GPU can and will be used only if the browser also supports the needed technologies
     * ([WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas)).
     * @param blurryRecognition <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to enable/disable barcode blurry recognition, to allow accurate scanning capabilities for out-of-focus (1D)
     * codes. If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order
     * to successfully locate/scan difficult codes.
     * @param codeDirectionHint <div class="tsd-signature-symbol">Default =&nbsp;CodeDirection.LEFT_TO_RIGHT</div>
     * The code direction hint telling in what direction 1D codes are most likely orientated.
     * More advanced algorithms are executed (and more resources/time is spent) every frame in order to successfully
     * locate/scan difficult codes for each of the possible directions resulting by the direction hint. Note that this
     * results in slow performance for `none` hints, average performance for `horizontal` and `vertical` hints and fast
     * performance for the remaining hints.
     * @param deviceName <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The descriptive device name to identify the current device when looking at analytics tools.
     */
    constructor({ textRecognitionSettings = new TextRecognitionSettings(), recognitionMode = ScanSettings.RecognitionMode.CODE, enabledSymbologies = [], codeDuplicateFilter = 0, maxNumberOfCodesPerFrame = 1, searchArea = { x: 0, y: 0, width: 1.0, height: 1.0 }, gpuAcceleration = true, blurryRecognition = true, codeDirectionHint = ScanSettings.CodeDirection.LEFT_TO_RIGHT, deviceName, } = {}) {
        this.symbologySettings = new Map();
        this.textRecognitionSettings = textRecognitionSettings;
        this.setRecognitionMode(recognitionMode);
        this.enableSymbologies(enabledSymbologies);
        this.codeDuplicateFilter = codeDuplicateFilter;
        this.maxNumberOfCodesPerFrame = maxNumberOfCodesPerFrame;
        this.baseSearchArea = { x: 0, y: 0, width: 1.0, height: 1.0 };
        this.searchArea = searchArea;
        this.gpuAcceleration = gpuAcceleration;
        this.blurryRecognition = blurryRecognition;
        this.codeDirectionHint = codeDirectionHint;
        this.deviceName = deviceName;
        this.properties = new Map([["advanced_localization", 0]]);
    }
    /**
     * @returns The configuration object as a JSON string.
     */
    toJSONString() {
        const symbologies = {};
        this.symbologySettings.forEach((symbologySettings, symbology) => {
            symbologies[Barcode.Symbology.toJSONName(symbology)] = symbologySettings;
        });
        const properties = {};
        this.properties.forEach((value, key) => {
            properties[key] = value;
        });
        const combinedSearchArea = {
            x: Math.max(0, Math.min(1, this.baseSearchArea.x + this.searchArea.x * this.baseSearchArea.width)),
            y: Math.max(0, Math.min(1, this.baseSearchArea.y + this.searchArea.y * this.baseSearchArea.height)),
            width: Math.max(0, Math.min(1, this.baseSearchArea.width * this.searchArea.width)),
            height: Math.max(0, Math.min(1, this.baseSearchArea.height * this.searchArea.height)),
        };
        const isFullSearchArea = Math.round(combinedSearchArea.x * 100) === 0 &&
            Math.round(combinedSearchArea.y * 100) === 0 &&
            Math.round(combinedSearchArea.width * 100) === 100 &&
            Math.round(combinedSearchArea.height * 100) === 100;
        return JSON.stringify({
            textRecognitionSettings: this.textRecognitionSettings.toJSONString(),
            recognitionMode: this.recognitionMode,
            symbologies,
            codeDuplicateFilter: this.codeDuplicateFilter,
            maxNumberOfCodesPerFrame: this.maxNumberOfCodesPerFrame,
            searchArea: combinedSearchArea,
            codeLocation1d: isFullSearchArea
                ? undefined
                : {
                    area: {
                        x: combinedSearchArea.x,
                        y: combinedSearchArea.y + (combinedSearchArea.height * 0.75) / 2,
                        width: combinedSearchArea.width,
                        height: combinedSearchArea.height * 0.25,
                    },
                },
            codeLocation2d: isFullSearchArea
                ? undefined
                : {
                    area: combinedSearchArea,
                },
            gpuAcceleration: this.gpuAcceleration,
            blurryRecognition: this.blurryRecognition,
            codeDirectionHint: this.codeDirectionHint,
            properties,
        });
    }
    /**
     * Get the current text recognition settings.
     *
     * @returns The text recognition settings.
     */
    getTextRecognitionSettings() {
        return this.textRecognitionSettings;
    }
    /**
     * Set the text recognition settings.
     *
     * Note that modified [[ScanSettings]] (due to [[TextRecognitionSettings]] changes) need to be applied to a scanner
     * via [[BarcodePicker.applyScanSettings]] or [[Scanner.applyScanSettings]] to take effect.
     *
     * @param textRecognitionSettings The new text recognition settings.
     * @returns The updated [[ScanSettings]] object.
     */
    setTextRecognitionSettings(textRecognitionSettings) {
        this.textRecognitionSettings = textRecognitionSettings;
        return this;
    }
    /**
     * Get the recognition mode deciding whether codes and/or text are recognized.
     *
     * @returns The recognition mode.
     */
    getRecognitionMode() {
        return this.recognitionMode;
    }
    /**
     * Set the recognition mode deciding whether codes and/or text are recognized.
     *
     * @param recognitionMode The new recognition mode.
     * @returns The updated [[ScanSettings]] object.
     */
    setRecognitionMode(recognitionMode) {
        this.recognitionMode = recognitionMode;
        if (recognitionMode.includes("text") && !textRecognition) {
            Logger.log(Logger.Level.WARN, "The library has not been configured to load text recognition (ScanditSDK.configure() - loadTextRecognition option): ScanSettings' recognition mode for text will be ignored");
        }
        return this;
    }
    /**
     * Get the configuration object for a symbology (which can then be modified).
     *
     * @param symbology The symbology for which to retrieve the configuration.
     * @returns The symbology configuration object for the specified symbology.
     */
    getSymbologySettings(symbology) {
        if (this.symbologySettings.has(symbology)) {
            return this.symbologySettings.get(symbology);
        }
        else {
            if (symbology in Barcode.Symbology || Object.values(Barcode.Symbology).includes(symbology)) {
                this.symbologySettings.set(symbology, new SymbologySettings(symbology));
                return this.symbologySettings.get(symbology);
            }
            else {
                throw new TypeError(`Invalid symbology "${symbology}"`);
            }
        }
    }
    /**
     * Get the recognition enabled status for a symbology.
     *
     * By default no symbologies are enabled.
     *
     * @param symbology The symbology for which to retrieve the recognition enabled status.
     * @returns Whether the symbology enabled for recognition.
     */
    isSymbologyEnabled(symbology) {
        return (this.symbologySettings.has(symbology) && this.symbologySettings.get(symbology).isEnabled());
    }
    /**
     * Enable recognition of a symbology or list/set of symbologies.
     *
     * By default no symbologies are enabled.
     *
     * @param symbology The single symbology or list/set of symbologies to enable.
     * @returns The updated [[ScanSettings]] object.
     */
    enableSymbologies(symbology) {
        return this.setSymbologiesEnabled(symbology, true);
    }
    /**
     * Disable recognition of a symbology or list/set of symbologies.
     *
     * By default no symbologies are enabled.
     *
     * @param symbology The single symbology or list/set of symbologies to disable.
     * @returns The updated [[ScanSettings]] object.
     */
    disableSymbologies(symbology) {
        return this.setSymbologiesEnabled(symbology, false);
    }
    /**
     * Get the code duplicate filter value.
     *
     * By default duplicate filtering is disabled.
     *
     * @returns The code duplicate filter value.
     */
    getCodeDuplicateFilter() {
        return this.codeDuplicateFilter;
    }
    /**
     * Set the code duplicate filter value.
     *
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     *
     * By default duplicate filtering is disabled.
     *
     * @param durationMilliseconds The new value (-1, 0, or positive integer).
     * @returns The updated [[ScanSettings]] object.
     */
    setCodeDuplicateFilter(durationMilliseconds) {
        this.codeDuplicateFilter = durationMilliseconds;
        return this;
    }
    /**
     * Get the maximum number of barcodes to be recognized every frame.
     *
     * By default the maximum number of barcodes per frame is 1.
     *
     * @returns The maximum number of barcodes per frame.
     */
    getMaxNumberOfCodesPerFrame() {
        return this.maxNumberOfCodesPerFrame;
    }
    /**
     * Set the maximum number of barcodes to be recognized every frame.
     *
     * By default the maximum number of barcodes per frame is 1.
     *
     * @param limit The new maximum number of barcodes per frame alue (non-zero positive integer).
     * @returns The updated [[ScanSettings]] object.
     */
    setMaxNumberOfCodesPerFrame(limit) {
        this.maxNumberOfCodesPerFrame = limit;
        return this;
    }
    /**
     * Get the area of the image in which barcodes/texts are searched.
     *
     * By default the whole area is searched.
     *
     * @returns The search area.
     */
    getSearchArea() {
        return this.searchArea;
    }
    /**
     * Set the area of the image in which barcodes/texts are searched.
     *
     * By default the whole area is searched.
     *
     * @param searchArea The new search area.
     * @returns The updated [[ScanSettings]] object.
     */
    setSearchArea(searchArea) {
        this.searchArea = searchArea;
        return this;
    }
    /**
     * @hidden
     *
     * @returns The base area of the image in which barcodes/texts are searched.
     */
    getBaseSearchArea() {
        return this.baseSearchArea;
    }
    /**
     * @hidden
     *
     * Set the base area of the image in which barcodes/texts are searched, this is set automatically by a
     * [[BarcodePicker]] and is combined with the searchArea to obtain the final combined search area.
     *
     * @param baseSearchArea The new base search area.
     * @returns The updated [[ScanSettings]] object.
     */
    setBaseSearchArea(baseSearchArea) {
        this.baseSearchArea = baseSearchArea;
        return this;
    }
    /**
     * Get the GPU acceleration enabled status.
     *
     * By default GPU acceleration is enabled.
     *
     * @returns Whether GPU acceleration is configured to be enabled ot not.
     */
    isGpuAccelerationEnabled() {
        return this.gpuAcceleration;
    }
    /**
     * Enable or disable GPU acceleration.
     *
     * By default GPU acceleration is enabled.
     *
     * Provide faster and more accurate barcode localization.
     * The GPU will in any case be used only if the browser also supports the needed technologies
     * ([WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas)).
     *
     * @param enabled Whether to enable or disable GPU acceleration.
     * @returns The updated [[ScanSettings]] object.
     */
    setGpuAccelerationEnabled(enabled) {
        this.gpuAcceleration = enabled;
        return this;
    }
    /**
     * Get the barcode blurry recognition enabled status.
     *
     * By default barcode blurry recognition is enabled.
     *
     * @returns Whether barcode blurry recognition is configured to be enabled ot not.
     */
    isBlurryRecognitionEnabled() {
        return this.blurryRecognition;
    }
    /**
     * Enable or disable barcode blurry recognition.
     *
     * Allow accurate scanning capabilities for out-of-focus (1D) codes.
     * If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order
     * to successfully locate/scan difficult codes.
     *
     * By default barcode blurry recognition is enabled.
     *
     * @param enabled Whether to enable or disable barcode blurry recognition.
     * @returns The updated [[ScanSettings]] object.
     */
    setBlurryRecognitionEnabled(enabled) {
        this.blurryRecognition = enabled;
        return this;
    }
    /**
     * Get the code direction hint telling in what direction 1D codes are most likely orientated.
     *
     * By default `left-to-right` is used.
     *
     * @returns The code direction hint.
     */
    getCodeDirectionHint() {
        return this.codeDirectionHint;
    }
    /**
     * Set the code direction hint telling in what direction 1D codes are most likely orientated.
     *
     * More advanced algorithms are executed (and more resources/time is spent) every frame in order to successfully
     * locate/scan difficult codes for each of the possible directions resulting by the direction hint. Note that this
     * results in slow performance for `none` hints, average performance for `horizontal` and `vertical` hints and fast
     * performance for the remaining hints.
     *
     * By default `left-to-right` is used.
     *
     * @param codeDirectionHint The new code direction hint.
     * @returns The updated [[ScanSettings]] object.
     */
    setCodeDirectionHint(codeDirectionHint) {
        this.codeDirectionHint = codeDirectionHint;
        return this;
    }
    /**
     * Get the descriptive device name to identify the current device when looking at analytics tools.
     *
     * By default no name is used (the device is identified by its unique ID only).
     *
     * @returns The device name.
     */
    getDeviceName() {
        return this.deviceName;
    }
    /**
     * Set the descriptive device name to identify the current device when looking at analytics tools.
     *
     * By default no name is used (the device is identified by its unique ID only).
     *
     * @param deviceName The new device name.
     * @returns The updated [[ScanSettings]] object.
     */
    setDeviceName(deviceName) {
        this.deviceName = deviceName;
        return this;
    }
    /**
     * Get a Scandit Data Capture library scanning property.
     *
     * This function is for internal use only and any functionality that can be accessed through it can and will vanish
     * without public notice from one version to the next. Do not call this function unless you specifically have to.
     *
     * @param key The property name.
     * @returns The property value. For properties not previously set, -1 is returned.
     */
    getProperty(key) {
        if (this.properties.has(key)) {
            return this.properties.get(key);
        }
        return -1;
    }
    /**
     * Set a Scandit Data Capture library scanning property.
     *
     * This function is for internal use only and any functionality that can be accessed through it can and will vanish
     * without public notice from one version to the next. Do not call this function unless you specifically have to.
     *
     * @param key The property name.
     * @param value The property value.
     * @returns The updated [[ScanSettings]] object.
     */
    setProperty(key, value) {
        this.properties.set(key, value);
        return this;
    }
    setSingleSymbologyEnabled(symbology, enabled) {
        if (symbology in Barcode.Symbology || Object.values(Barcode.Symbology).includes(symbology)) {
            if (this.symbologySettings.has(symbology)) {
                this.symbologySettings.get(symbology).setEnabled(enabled);
            }
            else {
                this.symbologySettings.set(symbology, new SymbologySettings(symbology, enabled));
            }
        }
        else {
            throw new TypeError(`Invalid symbology "${symbology}"`);
        }
    }
    setMultipleSymbologiesEnabled(symbology, enabled) {
        for (const s of symbology) {
            if (!(s in Barcode.Symbology || Object.values(Barcode.Symbology).includes(s))) {
                throw new TypeError(`Invalid symbology "${s}"`);
            }
        }
        for (const s of symbology) {
            if (this.symbologySettings.has(s)) {
                this.symbologySettings.get(s).setEnabled(enabled);
            }
            else {
                this.symbologySettings.set(s, new SymbologySettings(s, enabled));
            }
        }
    }
    setSymbologiesEnabled(symbology, enabled) {
        if (typeof symbology === "object") {
            this.setMultipleSymbologiesEnabled(symbology, enabled);
        }
        else {
            this.setSingleSymbologyEnabled(symbology, enabled);
        }
        return this;
    }
}
// istanbul ignore next
(function (ScanSettings) {
    /**
     * Scanning recognition mode.
     */
    let RecognitionMode;
    (function (RecognitionMode) {
        /**
         * Codes only.
         */
        RecognitionMode["CODE"] = "code";
        /**
         * Text only.
         */
        RecognitionMode["TEXT"] = "text";
        /**
         * Codes and text at the same time.
         */
        RecognitionMode["CODE_AND_TEXT"] = "code-and-text";
    })(RecognitionMode = ScanSettings.RecognitionMode || (ScanSettings.RecognitionMode = {}));
    /**
     * Code direction used to hint 1D codes' orientation.
     */
    let CodeDirection;
    (function (CodeDirection) {
        /**
         * Left to right.
         */
        CodeDirection["LEFT_TO_RIGHT"] = "left-to-right";
        /**
         * Right to left.
         */
        CodeDirection["RIGHT_TO_LEFT"] = "right-to-left";
        /**
         * Bottom to top.
         */
        CodeDirection["BOTTOM_TO_TOP"] = "bottom-to-top";
        /**
         * Top to bottom.
         */
        CodeDirection["TOP_TO_BOTTOM"] = "top-to-bottom";
        /**
         * Left to right or right to left.
         */
        CodeDirection["HORIZONTAL"] = "horizontal";
        /**
         * Bottom to top or top to bottom.
         */
        CodeDirection["VERTICAL"] = "vertical";
        /**
         * Unknown.
         */
        CodeDirection["NONE"] = "none";
    })(CodeDirection = ScanSettings.CodeDirection || (ScanSettings.CodeDirection = {}));
})(ScanSettings || (ScanSettings = {}));
//# sourceMappingURL=scanSettings.js.map