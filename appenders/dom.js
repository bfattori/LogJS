(function(LogJS, global, undefined) {

    function domEl(type, className, styles, attributes) {
        var el = global.document.createElement(type);
        el.className = className || '';
        styles = styles || {};
        attributes = attributes || {};
        for (var style in styles) {
            if (styles.hasOwnProperty(style)) {
                el.style[style] = styles[style];
            }
        }
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                el.setAttribute(attribute, attributes[attribute]);
            }
        }
        return el;
    }

    function addClass(el, className) {
        var classes = el.className.split(' ');
        if (classes.indexOf(className) == -1) {
            classes.push(className);
            el.className = classes.join(' ');
        }
    }

    function removeClass(el, className) {
        var classes = el.className.split(' '), classIdx = classes.indexOf(className);
        if (classIdx != -1) {
            classes.splice(classIdx, 1);
            el.className = classes.join(' ');
        }
    }

    function scrub(text) {
        return text.replace(/ /g, '&nbsp;').replace('>', '&gt;').replace('<', '&lt;').replace(/\n/g, '<br/>');
    }

    var DOMAppender = function(config) {
        LogJS.BaseAppender.call(this);

        this.config = {
            font: this.configOpt('font', config, '"Lucida Console", "Courier New", sans-serif'),
            fontSize: this.configOpt('fontSize', config, '10pt'),
            maxLogs: this.configOpt('maxLogs', config, 200)
        };

        this.lines = [];

        var logger = domEl('div', 'logjs_logger', {
            position: 'fixed', bottom: '0',
            height: '250px', left: '0',
            right: '0', backgroundColor: '#999'
        });
        logger.id = 'LogJSLoggerConsole';

        var hideButton = domEl('input', '', {
            position: 'absolute', top: '5px',
            right: '5px'            
        }, {
            'type': 'button', 'value': 'Hide'
        });
        hideButton.onclick = function() {
            if (this.value === 'Hide') {
                logger.style.height = '30px';
                this.value = 'Show';
            } else {
                logger.style.height = '250px';
                this.value = 'Hide';
            }
        };
        logger.appendChild(hideButton);

        var infoCheck = domEl('input','', {
            position: 'absolute', top: '5px',
            left: '5px'
        }, { 'type': 'checkbox' });
        infoCheck.checked = true;
        infoCheck.onchange = function() {
            var loggerConsole = global.document.querySelector('#LogJSLoggerConsole');
            if (!this.checked) {
                addClass(loggerConsole, 'infoHide');
            } else {
                removeClass(loggerConsole, 'infoHide');
            }
        };
        logger.appendChild(infoCheck);

        var infoLabel = domEl('div', '', {
            position: 'absolute', left: '25px',
            top: '5px'
        });
        infoLabel.innerHTML = 'Information';
        logger.appendChild(infoLabel);

        var warnCheck = domEl('input','', {
            position: 'absolute', left: '105px',
            top: '5px'
        }, { 'type': 'checkbox' });
        warnCheck.checked = true;
        warnCheck.onchange = function() {
            var loggerConsole = global.document.querySelector('#LogJSLoggerConsole');
            if (!this.checked) {
                addClass(loggerConsole, 'warnHide');
            } else {
                removeClass(loggerConsole, 'warnHide');
            }
        };
        logger.appendChild(warnCheck);

        var warnLabel = domEl('div', '', {
            position: 'absolute', left: '125px',
            top: '5px'
        });
        warnLabel.innerHTML = 'Warnings';
        logger.appendChild(warnLabel);

        var errorCheck = domEl('input','', {
            position: 'absolute', left: '195px',
            top: '5px'
        }, { 'type': 'checkbox' });
        errorCheck.checked = true;
        errorCheck.onchange = function() {
            var loggerConsole = global.document.querySelector('#LogJSLoggerConsole');
            if (!this.checked) {
                addClass(loggerConsole, 'errorHide');
            } else {
                removeClass(loggerConsole, 'errorHide');
            }
        };
        logger.appendChild(errorCheck);

        var errorLabel = domEl('div', '', {
            position: 'absolute', left: '215px',
            top: '5px'
        });
        errorLabel.innerHTML = 'Errors';
        logger.appendChild(errorLabel);

        var logDiv = domEl('div', '', {
            overflow: 'auto', position: 'absolute',
            top: '30px', left: '5px',
            right: '5px', bottom: '5px',
            border: '1px solid white', backgroundColor: '#333',
            fontFamily: this.config.font, fontSize: this.config.fontSize
        });
        logger.appendChild(logDiv);

        var styles = global.document.createElement('style');
        styles.setAttribute('type', 'text/css');
        styles.innerHTML = '.logjs_logger a { color: #aaf; } .logjs_logger a:visited { color: #88f; } ' +
            '.logjs_logger div.error { color: red; } .logjs_logger div.warning { color: yellow; } ' +
            '.logjs_logger div.info { color: white; } #LogJSLoggerConsole.infoHide div.info { display: none; } ' +
            '#LogJSLoggerConsole.warnHide div.warning { display: none; } ' +
            '#LogJSLoggerConsole.errorHide div.error { display: none; } ';

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

        var text = '[' + new Date(timestamp).toString() + '] ' + scrub(message) +
            (url !== undefined ? ' (<a href="' + url + '" target="_blank">' + url + '</a>) ' : '') +
            (lineNumber !== undefined ? '@ ' + lineNumber : '');
        this.logLine(classStr, text);
    };

    DOMAppender.prototype.logLine = function(styleClass, text) {
        var logLine = domEl('div', styleClass);
        logLine.innerHTML = text;
        this.logDiv.appendChild(logLine);
        this.lines.push(logLine);

        if (this.lines.length > this.config.maxLogs) {
            this.logDiv.removeChild(this.lines.shift());
        }
    };

    if (global.document.createElement) {
        LogJS.addAppender(DOMAppender);
    }

})(LogJS, this);