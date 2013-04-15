(function(global, undefined){

    var LogJS = {
        ERROR: 'ERROR',
        WARN: 'WARN',
        INFO: 'INFO',
        TRACE: 'TRACE'
    };

    var appenders = {};

    // This is the method for logging.  It passes off to the
    // appenders to perform the actual logging.
    var log = function (type, message, url, lineNumber) {
        var now = new Date().getTime();
        for (var appender in appenders) {
            if (appenders.hasOwnProperty(appender)) {
                appenders[appender].log(type, now, message, url, lineNumber);
            }
        }
    };

    // Redirect the onerror handler for the global object (if it exists)
    var gErrorHandler;
    if (global.onerror !== undefined) {
        gErrorHandler = global.onerror;
    }

    global.onerror = function(message, url, lineNumber) {
        log(LogJS.ERROR, message, url, lineNumber);
        gErrorHandler(message, url, lineNumber);
    };

    // --------------------------------------------------------------------------------------------------

    LogJS.error = function(message, url, lineNumber) {
        log(LogJS.ERROR, message, url, lineNumber);
    };

    LogJS.warn = function(message, url, lineNumber) {
        log(LogJS.WARN, message, url, lineNumber);
    };

    LogJS.info = function(message, url, lineNumber) {
        log(LogJS.INFO, message, url, lineNumber);
    };

    LogJS.addAppender = function(appender) {
        if (appender !== undefined && appender.LOGJSAPPENDER) {
            appenders[appender.name] = appender;
        }
    };

    LogJS.removeAppender = function(appender) {
        if (appender !== undefined) {
            delete appenders[appender.name];
        }
    };

    LogJS.getAppender = function(appenderName) {
        return appenders[appenderName];
    };

    LogJS.getRegisteredAppenders = function() {
        var registered = [];
        for (var appender in appenders) {
            if (appenders.hasOwnProperty(appender)) {
                registered.push(appender);
            }
        }
        return registered;
    };

    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------

    LogJS.BaseAppender = function() {
    };

    LogJS.BaseAppender.prototype.log = function(type, message, url, lineNumber) {
    };

    Object.defineProperty(LogJS.BaseAppender.prototype, 'LOGJSAPPENDER', {
        configurable: false,
        value: true,
        writable: false,
        enumerable: false
    });

    Object.defineProperty(LogJS.BaseAppender.prototype, 'name', {
        configurable: false,
        value: 'LogJSBaseAppender',
        writable: true,
        enumerable: false
    });

    global.LogJS = LogJS;
})(this);