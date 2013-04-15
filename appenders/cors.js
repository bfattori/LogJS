(function(LogJS, global, undefined) {

    var CORSAppender = function(config) {
        LogJS.BaseAppender.call(this);
        this.xhr = new global.XMLHttpRequest();

        this.config = {
            targetUrl: this.configOpt('targetUrl', config, '')
        };
    };

    CORSAppender.prototype = Object.create(LogJS.BaseAppender.prototype);

    CORSAppender.prototype.name = 'CORSAppender';

    CORSAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {
        var logObject = { 't': type, 'ts': timestamp, 'm': message, 'u': url, 'l': lineNumber};
        var jsonString = JSON.stringify(logObject);

        if (this.config.targetUrl !== '') {
            this.xhr.open('POST', this.config.targetUrl, true);
            this.xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            this.xhr.setRequestHeader("Content-length", jsonString.length);
            this.xhr.send(jsonString);
        }
    };

    if (global.XMLHttpRequest && ('withCredentials' in global.XMLHttpRequest)) {
        LogJS.addAppender(CORSAppender);
    }

})(LogJS, this);