var express = require('express');
var compression = require('compression');
var helmet = require('helmet');
var timeout = require('connect-timeout');
var morgan = require('morgan');

  //  swaggerDocument = require('./swagger.json');
//var sqlinjection = require('sql-injection');
var checkparam= require('./checkparams');

var notfound = require('./404') ;
var app = express();

// error handler
// app.use(require('./error_handler'));
// global.LOGGER= require('../helpers/general/winston');

app.use(require('./timeout'));
app.use(require('./domain'));
app.use(timeout('60s'));
// app.use(opbeat.middleware.express())

// app.use(expressValidator());

// app.use(sqlinjection);  // add sql-injection middleware here

app.use(compression());
app.use(helmet());
app.use(morgan('short'));

var bodyParser = require('body-parser');
// var limiter = require('./limiter');
var controler = require('../controllers') ;
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.all('*', function(req, res, next) {
//     setTimeout(function() {
//         next();
//     }, 60000); // 120 seconds
// });

// app.use('/WS/*', limiter);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('public'));
app.use('/' , checkparam) ;
app.use('/' , controler)
app.use(notfound)

module.exports = app;
