(function(LogJS, global, undefined) {

    var ConsoleAppender = function() {
        LogJS.BaseAppender.call(this);
    };

    ConsoleAppender.prototype = Object.create(LogJS.BaseAppender.prototype);

    ConsoleAppender.prototype.name = 'ConsoleAppender';

    ConsoleAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {
        var method;
        switch (type) {
            case LogJS.ERROR:   method = global.console.error || global.console.log; break;
            case LogJS.WARN:    method = global.console.warn || global.console.log; break;
            default:            method = global.console.info || global.console.log; break;
        }

        var args = [];
        args.push(new Date(timestamp));
        if (message !== undefined) {
            args.push(message);
        }
        if (url !== undefined) {
            args.push(url);
        }
        if (lineNumber !== undefined) {
            args.push(lineNumber);
        }

        if (method !== undefined) {
            method.apply(global.console, args);
        }
    };

    if (global.console !== undefined) {
        LogJS.addAppender(ConsoleAppender);
    }

})(LogJS, this);