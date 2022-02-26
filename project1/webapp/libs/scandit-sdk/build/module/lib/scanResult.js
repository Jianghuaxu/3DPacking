import { Barcode } from "./barcode";
import { RecognizedText } from "./recognizedText";
/**
 * A result of a scanning operation on an image.
 */
export class ScanResult {
    /**
     * The list of barcodes found in the image (can be empty).
     */
    barcodes;
    /**
     * The list of texts found in the image (can be empty).
     */
    texts;
    /**
     * The image data given as a byte array, formatted accordingly to the set settings ([[imageSettings]]).
     */
    imageData;
    /**
     * The configuration object defining the properties of the processed image ([[imageData]]).
     */
    imageSettings;
    /**
     * @hidden
     *
     * The list of manually rejected barcodes.
     */
    rejectedCodes;
    /**
     * @hidden
     *
     * The list of manually rejected texts.
     */
    rejectedTexts;
    /**
     * @hidden
     *
     * Create a ScanResult instance.
     *
     * @param barcodes The list of barcodes found in the image.
     * @param texts The list of texts found in the image.
     * @param imageData The image data given as a byte array, formatted accordingly to the set settings.
     * @param imageSettings The configuration object defining the properties of the processed image.
     */
    constructor(barcodes, texts, imageData, imageSettings) {
        this.barcodes = [];
        barcodes.forEach((barcode) => {
            this.barcodes.push(Barcode.createFromWASMResult(barcode));
        });
        this.texts = [];
        texts.forEach((text) => {
            this.texts.push(RecognizedText.createFromWASMResult(text));
        });
        this.imageData = imageData;
        this.imageSettings = imageSettings;
        this.rejectedCodes = new Set();
        this.rejectedTexts = new Set();
    }
    /**
     * Prevent playing a sound, vibrating or flashing the GUI for a particular code.
     * If all codes and texts in the result are rejected (or no barcode/text is present), sound, vibration and GUI
     * flashing will be suppressed.
     *
     * Rejected codes will still be part of the [[ScanResult.barcodes]] property like all other codes.
     *
     * @param barcode The barcode to be rejected.
     */
    rejectCode(barcode) {
        this.rejectedCodes.add(barcode);
    }
    /**
     * Prevent playing a sound, vibrating or flashing the GUI for a particular text.
     * If all codes and texts in the result are rejected (or no barcode/text is present), sound, vibration and GUI
     * flashing will be suppressed.
     *
     * Rejected texts will still be part of the [[ScanResult.texts]] property like all other texts.
     *
     * @param text The text to be rejected.
     */
    rejectText(text) {
        this.rejectedTexts.add(text);
    }
}
//# sourceMappingURL=scanResult.js.map