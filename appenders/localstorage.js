(function(LogJS, global, undefined) {

    var LocalStorageAppender = function(config) {
        LogJS.BaseAppender.call(this);

        // Load the current log information from localStorage
        this.logRoll = JSON.parse(global.localStorage.getItem('LogJS')) || [];
        this.logRollSize = JSON.parse(global.localStorage.getItem('LogJS_size')) || 0;
        this.changed = false;
        this.config = {
            timeoutInterval: this.configOpt('timeoutInterval', config, 10000),
            maxSize: this.configOpt('maxSize', config, 2 * 1024 * 1024)
        };

        var LSAppender = this;
        global.setTimeout(function synchronizeLog() {
            // Serialize the log roll to localStorage every few seconds
            LSAppender.serialize();
            global.setTimeout(synchronizeLog, LSAppender.config.timeoutInterval);
        }, this.config.timeoutInterval);
    };

    LocalStorageAppender.prototype = Object.create(LogJS.BaseAppender.prototype);

    LocalStorageAppender.prototype.name = 'LocalStorageAppender';

    LocalStorageAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {

        var logObject = { 't': type, 'ts': timestamp, 'm': message, 'u': url, 'l': lineNumber};
        this.logRollSize += JSON.stringify(logObject).length;
        this.logRoll.push(logObject);

        // Keep the log roll to a maximum size of items
        while (this.logRollSize > this.config.maxSize) {
            var logMsg = this.logRoll.shift();
            this.logRollSize -= JSON.stringify(logMsg).length;
        }

        this.changed = true;
        if (type === LogJS.ERROR || type === LogJS.WARN) {
            this.serialize();
        }
    };

    LocalStorageAppender.prototype.serialize = function() {
        if (this.changed) {
            global.localStorage.setItem('LogJS', JSON.stringify(this.logRoll));
            global.localStorage.setItem('LogJS_size', this.logRollSize);
            this.changed = false;
        }
    };

    LocalStorageAppender.prototype.deserialize = function() {
        return JSON.parse(global.localStorage.getItem('LogJS'));
    };

    LocalStorageAppender.prototype.clear = function() {
        global.localStorage.removeItem('LogJS');
        global.localStorage.removeItem('LogJS_size');
        this.logRollSize = 0;
        this.logRoll.length = 0;
        this.changed = false;
    };

    if (global.localStorage) {
        LogJS.addAppender(LocalStorageAppender);
    }

})(LogJS, this);