var connect = require('connect'),
    http = require('http'),
    CORS = require('connect-xcors'),
    options = {
        methods: ['POST']
    }, logRef = 1;

var server = connect
    .createServer(
    connect.json(),
    CORS(options),
    function(req, res) {
        var buf = req.body;
        for (var idx = 0; idx < buf.length; idx++) {
            var msg = buf[idx],
                logMsg = '#' + logRef + ' [' + msg.t + '] ' + new Date(msg.ts).toString() + ': ' + msg.m;

            if (msg.u) {
                logMsg += ' (' + msg.u + ')';
            }

            if (msg.l) {
                logMsg += ' @' + msg.l;
            }

            console.log(logMsg);
            logRef++;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end('LogJS Server');
    }).listen(3000);

