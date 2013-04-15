(function(LogJS, global, undefined) {

    var LocalStorageAppender = function() {
        LogJS.BaseAppender.call(this);

        // Load the current log information from localStorage
        this.logRoll = JSON.parse(global.localStorage.getItem('LogJS')) || [];
        this.logRollSize = JSON.parse(global.localStorage.getItem('LogJS_size')) || 0;
        this.timeoutInterval = 10000;
        this.changed = false;
        this.maxSize = 4 * 1024 * 1024; // 4 megabytes

        var LSAppender = this;
        global.setTimeout(function synchronizeLog() {
            // Serialize the log roll to localStorage every few seconds
            LSAppender.serialize();
            global.setTimeout(synchronizeLog, LSAppender.timeoutInterval);
        }, this.timeoutInterval);
    };

    LocalStorageAppender.prototype = Object.create(LogJS.BaseAppender.prototype);

    LocalStorageAppender.prototype.name = 'LocalStorageAppender';

    LocalStorageAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {

        var logObject = { 't': type, 'ts': timestamp, 'm': message, 'u': url, 'l': lineNumber};
        this.logRollSize += JSON.stringify(logObject).length;
        this.logRoll.push(logObject);

        // Keep the log roll to a maximum size of items
        while (this.logRollSize > this.maxSize) {
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

    if (global.localStorage) {
        LogJS.addAppender(new LocalStorageAppender());
    }

})(LogJS, this);