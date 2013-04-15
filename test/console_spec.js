describe('Console Appender', function() {

    it('should have 1 appender and be called ConsoleAppender', function() {
        expect(LogJS.getRegisteredAppenders().length).toBe(1);
        var appender = LogJS.getAppender(LogJS.getRegisteredAppenders()[0]);
        expect(appender.name).toBe('ConsoleAppender');
    });

    it('should log messages to the console, if available', function() {
        spyOn(window.console, 'error');
        spyOn(window.console, 'warn');
        spyOn(window.console, 'info');

        LogJS.error('Error message');
        LogJS.warn('Warning message');
        LogJS.info('Info message');

        expect(window.console.error).toHaveBeenCalledWith(jasmine.any(Date), 'Error message');
        expect(window.console.warn).toHaveBeenCalledWith(jasmine.any(Date), 'Warning message');
        expect(window.console.info).toHaveBeenCalledWith(jasmine.any(Date), 'Info message');
    });
});