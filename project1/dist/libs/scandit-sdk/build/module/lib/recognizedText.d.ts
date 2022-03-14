import { Quadrilateral } from "./quadrilateral";
/**
 * A text result.
 */
export interface RecognizedText {
    /**
     * The location of the text.
     */
    readonly location: Quadrilateral;
    /**
     * The value of the text.
     */
    readonly value: string;
}
/**
 * @hidden
 */
export declare type RecognizedTextWASMResult = {
    readonly location: number[][];
    readonly value: string;
};
export declare namespace RecognizedText {
    /**
     * @hidden
     *
     * Create a [[RecognizedText]] object from a partial object returned by the external Scandit Data Capture library.
     *
     * @param result The text result coming from the external Scandit Data Capture library.
     * @returns The generated [[RecognizedText]] object.
     */
    function createFromWASMResult(result: RecognizedTextWASMResult): RecognizedText;
}
