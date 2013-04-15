describe('LogJS', function() {

    it('should exist', function() {
        expect(LogJS).toBeDefined();
    });

    it('should have 4 logging levels', function() {
        expect(LogJS.ERROR).toBe('ERROR');
        expect(LogJS.WARN).toBe('WARN');
        expect(LogJS.INFO).toBe('INFO');
        expect(LogJS.TRACE).toBe('TRACE');
    });

    it('should have 3 logging methods', function() {
        expect(LogJS.error).toBeDefined();
        expect(LogJS.warn).toBeDefined();
        expect(LogJS.info).toBeDefined();
    });

    it('should have methods to add, remove, and get appenders', function() {
        expect(LogJS.addAppender).toBeDefined();
        expect(LogJS.removeAppender).toBeDefined();
        expect(LogJS.getAppender).toBeDefined();
        expect(LogJS.getRegisteredAppenders).toBeDefined();
    });

    it('should provide an appender class to extend from', function() {
        expect(LogJS.BaseAppender).toBeDefined();
    });

    describe('Appender manipulation', function() {
        var DummyAppender;
        beforeEach(function() {
            DummyAppender = function() {};

            DummyAppender.prototype = Object.create(LogJS.BaseAppender.prototype);

            DummyAppender.prototype.name = "DummyAppender";

            DummyAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {
            };

            spyOn(LogJS, 'addAppender').andCallThrough();
            spyOn(LogJS, 'removeAppender').andCallThrough();
        });

        it('should register a new appender', function() {
            LogJS.addAppender(DummyAppender);
            expect(LogJS.addAppender).toHaveBeenCalled();
            expect(LogJS.getRegisteredAppenders().length).toBeGreaterThan(0);
        });

        it('should remove the new appender', function() {
            var dummy = LogJS.getAppender("DummyAppender");
            LogJS.removeAppender(dummy);
            expect(LogJS.removeAppender).toHaveBeenCalled();
            expect(LogJS.getRegisteredAppenders().length).toBe(0);
        });

        it('should NOT register a new appender', function() {
            var FakeAppender = function() {};

            FakeAppender.prototype.log = function(type, timestamp, message, url, lineNumber) {
            };

            LogJS.addAppender(FakeAppender);
            expect(LogJS.getRegisteredAppenders().length).toBe(0);
        });
    });
});