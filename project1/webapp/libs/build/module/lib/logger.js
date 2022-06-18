/* tslint:disable:no-console */
export var Logger;
(function (Logger) {
    /**
     * Log level.
     */
    let Level;
    (function (Level) {
        Level["DEBUG"] = "debug";
        Level["INFO"] = "info";
        Level["WARN"] = "warn";
        Level["ERROR"] = "error";
        Level["QUIET"] = "quiet";
    })(Level = Logger.Level || (Logger.Level = {}));
    const levelToNumber = new Map([
        [Level.DEBUG, 1],
        [Level.INFO, 2],
        [Level.WARN, 3],
        [Level.ERROR, 4],
        [Level.QUIET, 5],
    ]);
    let currentLevel = Level.DEBUG;
    /**
     * @hidden
     *
     * @param level The log level.
     */
    function setLevel(level) {
        currentLevel = level;
    }
    Logger.setLevel = setLevel;
    /**
     * @hidden
     *
     * @param level The log level.
     * @param data The log contents.
     */
    // tslint:disable-next-line: no-any
    function log(level, ...data) {
        // tslint:disable-next-line: no-non-null-assertion
        if (levelToNumber.get(currentLevel) > levelToNumber.get(level)) {
            return;
        }
        switch (level) {
            case Level.DEBUG:
                console.debug(...data);
                break;
            case Level.INFO:
                console.log(...data);
                break;
            case Level.WARN:
                console.warn(...data);
                break;
            case Level.ERROR:
                console.error(...data);
                break;
            default:
                break;
        }
    }
    Logger.log = log;
})(Logger || (Logger = {}));
//# sourceMappingURL=logger.js.map