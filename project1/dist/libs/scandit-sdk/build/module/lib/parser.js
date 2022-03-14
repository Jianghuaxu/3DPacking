/**
 * A data string parser.
 *
 * Parsers are capable of parsing one particular data format, which is passed to them during construction.
 *
 * The parser is created through [[BarcodePicker.createParserForFormat]] or [[Scanner.createParserForFormat]].
 *
 * Note that you need to have a valid license key with the parsing feature enabled to use the parser functionalities.
 *
 * For documentation on the available formats, check the official parser library documentation here:
 * https://docs.scandit.com/parser/formats.html.
 */
export class Parser{scanner;dataFormat;options;constructor(t,a){this.scanner=t;this.dataFormat=a}setOptions(t){this.options=t}parseRawData(t){return this.scanner.parse(this.dataFormat,t,this.options)}
/**
     * Process the given string data with the parser, retrieving the result as a [[ParserResult]] object.
     *
     * Multiple requests done without waiting for previous results will be queued and handled in order.
     *
     * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
     *
     * Note that you should use [[parseRawData]] whenever possible: some codes, such as those found on driving licenses,
     * might have non-printable characters and will need to use [[Barcode.rawData]] information to be parsed correctly.
     *
     * @param data The string data to be parsed.
     * @returns A promise resolving to the [[ParserResult]] object.
     */parseString(t){return this.scanner.parse(this.dataFormat,t,this.options)}}(function(t){let a;(function(t){t[t["GS1_AI"]=1]="GS1_AI";t[t["HIBC"]=2]="HIBC";
/**
         * AAMVA Driver License/Identification (DL/ID).
         *
         * See: http://www.aamva.org.
         */t[t["DLID"]=3]="DLID";t[t["MRTD"]=4]="MRTD";t[t["SWISSQR"]=5]="SWISSQR";t[t["VIN"]=6]="VIN";t[t["US_USID"]=7]="US_USID"})(a=t.DataFormat||(t.DataFormat={}))})(Parser||(Parser={}));