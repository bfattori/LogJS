(function(LogJS, global, undefined) {

    var CORSAppender = function() {
        LogJS.BaseAppender.call(this);
        this.targetUrl = 'http://foo.bar.com/cors_receiver';
        this.xhr = new global.XMLHttpRequest();
    };

    CORSAppender.prototype = Object.create(LogJS.BaseAppender.prototype);

    CORSAppender.prototype.name = 'CORSAppender';

    CORSAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {
        var logObject = { 't': type, 'ts': timestamp, 'm': message, 'u': url, 'l': lineNumber};
        var jsonString = JSON.stringify(logObject);

        this.xhr.open('POST', this.targetUrl, true);
        this.xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        this.xhr.setRequestHeader("Content-length", jsonString.length);
        this.xhr.onload = this.handleResult;
        this.xhr.send(jsonString);
    };

    CORSAppender.prototype.handleResult = function() {
        var result = JSON.parse(this.xhr.responseText);

    };

    if (global.XMLHttpRequest && ('withCredentials' in global.XMLHttpRequest)) {
        LogJS.addAppender(new CORSAppender());
    }

})(LogJS, this);