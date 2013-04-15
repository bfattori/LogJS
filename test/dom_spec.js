describe('DOM Appender', function() {

    it('should have 1 appender and be called DOMAppender', function() {
        expect(LogJS.getRegisteredAppenders().length).toBe(1);
        var appender = LogJS.getAppender(LogJS.getRegisteredAppenders()[0]);
        expect(appender.name).toBe('DOMAppender');
    });

    it('should create a DOM logging console', function() {
        var logConsole = document.getElementById('LogJSLoggerConsole');
        expect(logConsole).toBeDefined();
    });

    it('should log a message to the DOM console', function() {
        var appender = LogJS.getAppender('DOMAppender');
        spyOn(appender, 'logLine');

        LogJS.error('An error');
        expect(appender.logLine).toHaveBeenCalledWith('error', jasmine.any(String));
    });
});