"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextRecognitionSettings = void 0;
/**
 * A configuration object for text recognition options.
 *
 * Text recognition settings need to be assigned (once) to scanning options via
 * [[ScanSettings.setTextRecognitionSettings]] and said modified [[ScanSettings]] (due to [[TextRecognitionSettings]]
 * changes) need to be applied to a scanner via [[BarcodePicker.applyScanSettings]] or [[Scanner.applyScanSettings]] to
 * take effect.
 */
var TextRecognitionSettings = /** @class */ (function () {
    /**
     * @hidden
     *
     * @param recognizer <div class="tsd-signature-symbol">Default =&nbsp;"mrzFullScreen"</div>
     * The text recognition backend.
     */
    /**
     * @hidden Not functional for MRZ OCR
     *
     * @param characterWhitelist <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The whitelist of recognizable characters. If the whitelist is defined and not empty, a recognition result will
     * never contain characters that are not included in the list.
     */
    /**
     * Create a TextRecognitionSettings instance.
     *
     * @param regex <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The regular expression for filtering the recognized characters. Text that does not match the regular expression is
     * ignored. You must set a regex in order for text recognition to work.
     * @param textDuplicateFilter <div class="tsd-signature-symbol">Default =&nbsp;0</div>
     * The duplicate filter specifying how often a text can be scanned.
     * When the filter is set to -1, each unique text is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     * When the same text is scanned within the specified interval it is filtered out as a duplicate.
     */
    function TextRecognitionSettings(_a) {
        var _b = _a === void 0 ? {} : _a, 
        /**
         * @hidden
         */
        _c = _b.recognizer, 
        /**
         * @hidden
         */
        recognizer = _c === void 0 ? "mrzFullScreen" : _c, regex = _b.regex, 
        /**
         * @hidden
         */
        characterWhitelist = _b.characterWhitelist, _d = _b.textDuplicateFilter, textDuplicateFilter = _d === void 0 ? 0 : _d;
        this.recognizer = recognizer;
        this.regex = regex instanceof RegExp ? regex.source : regex;
        this.characterWhitelist = characterWhitelist;
        this.textDuplicateFilter = textDuplicateFilter;
        this.properties = new Map();
    }
    /**
     * @returns The configuration object as a JSON string.
     */
    TextRecognitionSettings.prototype.toJSONString = function () {
        var properties = {};
        this.properties.forEach(function (value, key) {
            properties[key] = value;
        });
        return JSON.stringify({
            recognizer: this.recognizer,
            regex: this.regex,
            characterWhitelist: this.characterWhitelist,
            duplicateFilter: this.textDuplicateFilter,
            properties: properties,
        });
    };
    /**
     * Get the regular expression for filtering the recognized characters.
     *
     * By default, no regex is set. You must set a regex in order for text recognition to work.
     *
     * @returns The regular expression.
     */
    TextRecognitionSettings.prototype.getRegex = function () {
        return this.regex;
    };
    /**
     * Set the regular expression for filtering the recognized characters.
     *
     * Text that does not match the regular expression is ignored.
     *
     * Using a regex with a capture group will make results contain only the text matching the capture group. To return
     * the full text matching the regex, use a non-capturing group.
     *
     * By default, no regex is set. You must set a regex in order for text recognition to work.
     *
     * @param regex The new regular expression.
     * @returns The updated [[TextRecognitionSettings]] object.
     */
    TextRecognitionSettings.prototype.setRegex = function (regex) {
        this.regex = regex instanceof RegExp ? regex.source : regex;
        return this;
    };
    /**
     * @hidden Not functional for MRZ OCR
     *
     * Get the whitelist of recognizable characters.
     *
     * By default there is no whitelist and all characters will be recognized.
     *
     * @returns The character whitelist.
     */
    TextRecognitionSettings.prototype.getCharacterWhitelist = function () {
        return this.characterWhitelist;
    };
    /**
     * @hidden Not functional for MRZ OCR
     *
     * Set the whitelist of recognizable characters.
     *
     * If the whitelist is defined and not empty, a recognition result will never contain characters that are not included
     * in the list.
     *
     * By default there is no whitelist and all characters will be recognized.
     *
     * @param characterWhitelist The new character whitelist.
     * @returns The updated [[TextRecognitionSettings]] object.
     */
    TextRecognitionSettings.prototype.setCharacterWhitelist = function (characterWhitelist) {
        this.characterWhitelist = characterWhitelist;
        return this;
    };
    /**
     * Get the text duplicate filter value.
     *
     * By default duplicate filtering is disabled.
     *
     * @returns The text duplicate filter value.
     */
    TextRecognitionSettings.prototype.getTextDuplicateFilter = function () {
        return this.textDuplicateFilter;
    };
    /**
     * Set the text duplicate filter value.
     *
     * When the filter is set to -1, each unique text is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     *
     * By default duplicate filtering is disabled.
     *
     * @param durationMilliseconds The new value (-1, 0, or positive integer).
     * @returns The updated [[TextRecognitionSettings]] object.
     */
    TextRecognitionSettings.prototype.setTextDuplicateFilter = function (durationMilliseconds) {
        this.textDuplicateFilter = durationMilliseconds;
        return this;
    };
    /**
     * Get a Scandit Data Capture library text recognition property.
     *
     * This function is for internal use only and any functionality that can be accessed through it can and will vanish
     * without public notice from one version to the next. Do not call this function unless you specifically have to.
     *
     * @param key The property name.
     * @returns The property value. For properties not previously set, -1 is returned.
     */
    TextRecognitionSettings.prototype.getProperty = function (key) {
        if (this.properties.has(key)) {
            return this.properties.get(key);
        }
        return -1;
    };
    /**
     * Set a Scandit Data Capture library text recognition property.
     *
     * This function is for internal use only and any functionality that can be accessed through it can and will vanish
     * without public notice from one version to the next. Do not call this function unless you specifically have to.
     *
     * @param key The property name.
     * @param value The property value.
     * @returns The updated [[TextRecognitionSettings]] object.
     */
    TextRecognitionSettings.prototype.setProperty = function (key, value) {
        this.properties.set(key, value);
        return this;
    };
    return TextRecognitionSettings;
}());
exports.TextRecognitionSettings = TextRecognitionSettings;
//# sourceMappingURL=textRecognitionSettings.js.map