export var RecognizedText;
(function (RecognizedText) {
    /**
     * @hidden
     *
     * Create a [[RecognizedText]] object from a partial object returned by the external Scandit Data Capture library.
     *
     * @param result The text result coming from the external Scandit Data Capture library.
     * @returns The generated [[RecognizedText]] object.
     */
    function createFromWASMResult(result) {
        return {
            location: {
                topLeft: { x: result.location[0][0], y: result.location[0][1] },
                topRight: { x: result.location[1][0], y: result.location[1][1] },
                bottomRight: { x: result.location[2][0], y: result.location[2][1] },
                bottomLeft: { x: result.location[3][0], y: result.location[3][1] },
            },
            value: result.value,
        };
    }
    RecognizedText.createFromWASMResult = createFromWASMResult;
})(RecognizedText || (RecognizedText = {}));
//# sourceMappingURL=recognizedText.js.map