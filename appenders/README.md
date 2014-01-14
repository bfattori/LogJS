Appender Configuration
===

Some appenders have a configuration that determines their behavior.  Below are the configuration keys which
affect these appenders.

## CORSAppender
* `targetUrl` - The URL where the server is located.  Does not need to be the same origin as the web app, but it must be able to accept connections from the web app's server.
* `timeoutInterval` - The interval, in milliseconds, at which items are spooled to the server.  This should be between half a second and, at most, three seconds.  Defaults to *3000*

## DOMAppender
* `font` - The font to use in the DOM element used to display log messages.  Default: *"Lucida Console", "Courier New", sans-serif*
* `fontSize` - The size of the font to use in the display. Default: *10pt*
* `maxLogs` - The maximum number of lines displayed.  The more lines displayed, the more time taken to render them.  Default: *200*

## LocalStorageAppender
* `timeoutInterval` - How often the logs are spooled to localStorage, in milliseconds. Default: *10000*
* `maxSize` - The maximum size of the log, in bytes.  Once the log exceeds this amount, old log messages are removed. Default *4Mb*

### Creating the Configuration

Some appenders require some configuration options to run, such as the `LocalStorageAppender`.  You can
set the interval between serializations and the maximum size of the buffer to maintain.  For example:

    <script type='text/javascript' src='log.js'></script>
    <script type='text/javascript'>
       LogJS.config.LocalStorageAppender.maxSize = 1 * 1024 * 1024;  // 1 megabyte
    </script>
    <script type='text/javascript' src='appenders/localstorage.js'></script>
