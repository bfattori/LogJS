(function(LogJS, global, undefined) {

    var CORSAppender = function(config) {
        LogJS.BaseAppender.call(this);
        this.xhr = config.__xhr;
        this.config = {
            targetUrl: this.configOpt('targetUrl', config, ''),
            timeoutInterval: this.configOpt('timeoutInterval', config, 3000)
        };

        this.buffer = [];
        this.timeout = undefined;
    };

    CORSAppender.prototype = Object.create(LogJS.BaseAppender.prototype);

    CORSAppender.prototype.name = 'CORSAppender';

    CORSAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {
        var logObject = { 't': type, 'ts': timestamp, 'm': message, 'u': url, 'l': lineNumber};
        this.buffer.push(logObject);

        global.clearTimeout(this.timeout);
        var CAppender = this;
        this.timeout = global.setTimeout(function() {
            CAppender.sendBuffer();
            CAppender.timeout = undefined;
        }, this.timeoutInterval);
    };

    CORSAppender.prototype.sendBuffer = function() {
        var jsonString = JSON.stringify(this.buffer);

        if (this.config.targetUrl !== '') {
            this.xhr.open('POST', this.config.targetUrl, true);
            this.xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            this.xhr.send(jsonString);
        }

        this.buffer = [];
    };

    if (global.XMLHttpRequest) {
        var xhr = new global.XMLHttpRequest();
        if ("withCredentials" in xhr) {
            LogJS.config.__xhr = xhr;
            LogJS.addAppender(CORSAppender);
        }
    }

})(LogJS, this);