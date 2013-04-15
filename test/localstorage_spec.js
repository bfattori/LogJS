describe('LocalStorage Appender', function() {

    it('should have 1 appender and be called LocalStorageAppender', function() {
        expect(LogJS.getRegisteredAppenders().length).toBe(1);
        var appender = LogJS.getAppender(LogJS.getRegisteredAppenders()[0]);
        expect(appender.name).toBe('LocalStorageAppender');
    });

    it('should call the logging method and serialize it immediately for an error', function() {
        spyOn(window.localStorage, 'setItem');

        var appender = LogJS.getAppender('LocalStorageAppender');
        spyOn(appender, 'serialize').andCallThrough();
        spyOn(appender, 'log').andCallThrough();

        LogJS.error('Error message');

        expect(appender.log).toHaveBeenCalled();
        expect(appender.serialize).toHaveBeenCalled();
        expect(window.localStorage.setItem).toHaveBeenCalledWith('LogJS', jasmine.any(String));
        expect(window.localStorage.setItem).toHaveBeenCalledWith('LogJS_size', jasmine.any(Number));
    });

    it('should call the logging method and NOT serialize it immediately for an info', function() {
        spyOn(window.localStorage, 'setItem');

        var appender = LogJS.getAppender(LogJS.getRegisteredAppenders()[0]);
        spyOn(appender, 'serialize');
        spyOn(appender, 'log').andCallThrough();

        LogJS.info('Info message');

        expect(appender.log).toHaveBeenCalled();
        expect(appender.serialize).not.toHaveBeenCalled();
    });
});