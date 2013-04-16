LogJS Testing Server for NodeJS
=====

## What is this?

A simple server for testing the CORS operation of the CORSAppender for LogJS.

## How do I use this?

In the `/server` folder, run the following:

    npm install connect
    npm install connect-xcors

Then you can run this server.  It is configured to listen for any connections from any
origins at the moment.  Not much of a concern because it's really just meant to be
a simple test.