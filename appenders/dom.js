(function(LogJS, global, undefined) {

    var DOMAppender = function() {
        LogJS.BaseAppender.call(this);

        var logger = global.document.createElement("div");
        logger.id = 'LogJSLoggerConsole';
        logger.className = 'logjs_logger';
        logger.style.position = 'fixed';
        logger.style.bottom = '0';
        logger.style.height = '250px';
        logger.style.left = '0';
        logger.style.right = '0';
        logger.style.backgroundColor = '#999';

        var hideButton = global.document.createElement("input");
        hideButton.setAttribute('type', 'button');
        hideButton.setAttribute('value', 'Hide');
        hideButton.onclick = function() {
            if (this.value === 'Hide') {
                logger.style.height = '30px';
                this.value = 'Show';
            } else {
                logger.style.height = '250px';
                this.value = 'Hide';
            }
        };
        hideButton.style.position = 'absolute';
        hideButton.style.top = '5px';
        hideButton.style.right = '5px';
        logger.appendChild(hideButton);

        var logDiv = global.document.createElement("div");
        logDiv.style.overFlow = 'auto';
        logDiv.style.position = 'absolute';
        logDiv.style.top = '30px';
        logDiv.style.left = '5px';
        logDiv.style.right = '5px';
        logDiv.style.bottom = '5px';
        logDiv.style.border = '1px solid white';
        logDiv.style.backgroundColor = '#333';
        logDiv.style.fontFamily = '"Lucida Console", "Courier New", sans-serif';
        logDiv.style.fontSize = '12pt';
        logger.appendChild(logDiv);

        var styles = global.document.createElement('style');
        styles.setAttribute('type', 'text/css');
        styles.innerHTML = '.logjs_logger div.error { color: red; } .logjs_logger div.warning { color: yellow; } .logjs_logger div.info { color: white; }';

        global.document.getElementsByTagName("head")[0].appendChild(styles);

        this.logDiv = logDiv;
        global.document.addEventListener('DOMContentLoaded', function() {
            global.document.body.appendChild(logger);
        });
    };

    DOMAppender.prototype = Object.create(LogJS.BaseAppender.prototype);

    DOMAppender.prototype.name = 'DOMAppender';

    DOMAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {
        var classStr;
        switch (type) {
            case LogJS.ERROR:   classStr = 'error'; break;
            case LogJS.WARN:    classStr = 'warning'; break;
            case LogJS.INFO:    classStr = 'info'; break;
        }

        var text = '[' + new Date(timestamp).toString() + '] ' + message + (url !== undefined ? ' (' + url + ') ' : '') +
            (lineNumber !== undefined ? '@ ' + lineNumber : '');
        this.logLine(classStr, text);
    };

    DOMAppender.prototype.logLine = function(styleClass, text) {
        var logLine = global.document.createElement('div');
        logLine.className = styleClass;
        logLine.innerHTML = text;
        this.logDiv.appendChild(logLine);
    };

    if (global.document.createElement) {
        LogJS.addAppender(DOMAppender);
    }

})(LogJS, this);