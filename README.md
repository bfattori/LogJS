LogJS
=====
Lightweight logging for JavaScript

## What is this?

Why would anyone want another logging framework for JavaScript?  What's the point when there are
perfectly good solutions such as Log4JS and Log4Javascript?  Well, that's always a complicated
answer, but my reasonsing was this:

The two projects mentioned are trying to emulate log4j for the Java platform.  Who needs all that
functionality when all that I really want to do is log messages?  If you need something which
carries a lot of weight, or has tons of features, go grab one of those projects.  However, if
you want something super lightweight, that doesn't require any third party libraries, then LogJS
is probably for you.


## Ok, so convince me!

LogJS is 3k uncompressed and less than 1k compressed and minified.  It doesn't require jQuery or any other
third party libraries.  It comes with three simple appenders which can be used together or standalone.
It's easy to write new appenders.  It's not carrying around baggage to make it compatible with old
browsers from days gone by.  It has a set of tests to make sure it keeps on working.


## What's an Appender?

LogJS can't do any logging itself - it needs an appender to do that.  Essentially, an appender
is the connection between the logger and the location for log messages to be sent.  LogJS
comes with a console appender to utilize the browser console, a DOM appender which will create
a window to show log messages, a local storage appender which saves messages to a persistent store,
and finally a CORS (Cross-Origin Resource Sharing) appender which can send messages to a server
for storage.

It is possible to run as many appenders, or as few as you want.  It's also possible to run without any
appenders so that no logging is performed.  This way, the logging can be left in the code without
violating JSLint rules such as 'console.log'.

## Enough already... How do I use this?

Simple.  Add the following to your `<head>` section:

`<script type='text/javascript' src='log.js'></script>`

Then, put one of the logging calls into your scripts:

    var x = 10;
    LogJS.info('The value of x is ' + x);

That's it!

## Wait a second, I didn't see anything!

Right.  This is where the Appenders come into play.  After your script for LogJS, add the following and
re-issue the logging statement:

`<script type='text/javascript' src='appenders/console.js'></script>`

Now you will see a log message in the console.  Try loading another appender, such as the DOM
appender, and you'll get a nifty in-page logging pane.  This is where Appenders come in really handy!
You can add as many, or as few, appenders as you want or need.

## Configuration of Appenders

Some appenders require some configuration options to run, such as the `LocalStorageAppender`.  You can
set the interval between serializations and the maximum size of the buffer to maintain.  For example:

    <script type='text/javascript' src='log.js'></script>
    <script type='text/javascript'>
       LogJS.config.LocalStorageAppender.maxSize = 1 * 1024 * 1024;  // 1 megabyte
    </script>
    <script type='text/javascript' src='appenders/localstorage.js'></script>
    
