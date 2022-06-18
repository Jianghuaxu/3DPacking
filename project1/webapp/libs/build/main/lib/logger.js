"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var tslib_1 = require("tslib");
/* tslint:disable:no-console */
var Logger;
(function (Logger) {
    /**
     * Log level.
     */
    var Level;
    (function (Level) {
        Level["DEBUG"] = "debug";
        Level["INFO"] = "info";
        Level["WARN"] = "warn";
        Level["ERROR"] = "error";
        Level["QUIET"] = "quiet";
    })(Level = Logger.Level || (Logger.Level = {}));
    var levelToNumber = new Map([
        [Level.DEBUG, 1],
        [Level.INFO, 2],
        [Level.WARN, 3],
        [Level.ERROR, 4],
        [Level.QUIET, 5],
    ]);
    var currentLevel = Level.DEBUG;
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
    function log(level) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        // tslint:disable-next-line: no-non-null-assertion
        if (levelToNumber.get(currentLevel) > levelToNumber.get(level)) {
            return;
        }
        switch (level) {
            case Level.DEBUG:
                console.debug.apply(console, tslib_1.__spreadArray([], tslib_1.__read(data), false));
                break;
            case Level.INFO:
                console.log.apply(console, tslib_1.__spreadArray([], tslib_1.__read(data), false));
                break;
            case Level.WARN:
                console.warn.apply(console, tslib_1.__spreadArray([], tslib_1.__read(data), false));
                break;
            case Level.ERROR:
                console.error.apply(console, tslib_1.__spreadArray([], tslib_1.__read(data), false));
                break;
            default:
                break;
        }
    }
    Logger.log = log;
})(Logger = exports.Logger || (exports.Logger = {}));
//# sourceMappingURL=logger.js.map