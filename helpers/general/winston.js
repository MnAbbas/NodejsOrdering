/**
 * New node file
 */

var winston = require('winston');
var fs = require('fs');
var env = process.env.NODE_ENV || 'development';
var logDir = 'log';

var tsFormat = (new Date()).toLocaleTimeString();


// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
var logger = winston.createLogger({
  transports: [
   // colorize the output to the console
   new (winston.transports.Console)({
     timestamp: tsFormat,
     colorize: true,
     level: 'info'
   }),
    new (require('winston-daily-rotate-file'))({
      filename: logDir + '/results-',
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: false,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

function ignoreEpipe(err) {
    return err.code !== 'EPIPE';
  }

logger.exitOnError = ignoreEpipe;
module.exports = logger;
