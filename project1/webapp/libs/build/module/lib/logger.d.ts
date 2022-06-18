export declare namespace Logger {
    /**
     * Log level.
     */
    enum Level {
        DEBUG = "debug",
        INFO = "info",
        WARN = "warn",
        ERROR = "error",
        QUIET = "quiet"
    }
    /**
     * @hidden
     *
     * @param level The log level.
     */
    function setLevel(level: Level): void;
    /**
     * @hidden
     *
     * @param level The log level.
     * @param data The log contents.
     */
    function log(level: Exclude<Level, Level.QUIET>, ...data: any[]): void;
}
