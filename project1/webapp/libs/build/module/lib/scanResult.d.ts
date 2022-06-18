import { Barcode, BarcodeWASMResult } from "./barcode";
import { ImageSettings } from "./imageSettings";
import { RecognizedText, RecognizedTextWASMResult } from "./recognizedText";
/**
 * A result of a scanning operation on an image.
 */
export declare class ScanResult {
    /**
     * The list of barcodes found in the image (can be empty).
     */
    readonly barcodes: Barcode[];
    /**
     * The list of texts found in the image (can be empty).
     */
    readonly texts: RecognizedText[];
    /**
     * The image data given as a byte array, formatted accordingly to the set settings ([[imageSettings]]).
     */
    readonly imageData: Uint8Array;
    /**
     * The configuration object defining the properties of the processed image ([[imageData]]).
     */
    readonly imageSettings: ImageSettings;
    /**
     * @hidden
     *
     * The list of manually rejected barcodes.
     */
    readonly rejectedCodes: Set<Barcode>;
    /**
     * @hidden
     *
     * The list of manually rejected texts.
     */
    readonly rejectedTexts: Set<RecognizedText>;
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
    constructor(barcodes: BarcodeWASMResult[], texts: RecognizedTextWASMResult[], imageData: Uint8Array, imageSettings: ImageSettings);
    /**
     * Prevent playing a sound, vibrating or flashing the GUI for a particular code.
     * If all codes and texts in the result are rejected (or no barcode/text is present), sound, vibration and GUI
     * flashing will be suppressed.
     *
     * Rejected codes will still be part of the [[ScanResult.barcodes]] property like all other codes.
     *
     * @param barcode The barcode to be rejected.
     */
    rejectCode(barcode: Barcode): void;
    /**
     * Prevent playing a sound, vibrating or flashing the GUI for a particular text.
     * If all codes and texts in the result are rejected (or no barcode/text is present), sound, vibration and GUI
     * flashing will be suppressed.
     *
     * Rejected texts will still be part of the [[ScanResult.texts]] property like all other texts.
     *
     * @param text The text to be rejected.
     */
    rejectText(text: RecognizedText): void;
}
