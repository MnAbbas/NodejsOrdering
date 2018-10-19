var config = require('config');
var dbConfig = config.get('db.mysqlConfig');

var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : dbConfig.connectionLimit,
  // queueLimit      : dbConfig.connectionLimit ,
  host            : dbConfig.host,
  port            : dbConfig.port,
  user            : dbConfig.user,
  password        : dbConfig.password,
  database        : dbConfig.database ,
  // connectTimeout  : dbConfig.connectTimeout ,
  debug           : false
});

pool.on('connection', function (connection) {
	  // LOGGER.info("Connection"  , connection.threadId , connection.writable );
});

pool.on('enqueue', function () {
	  LOGGER.warn("enqueue"  , "Waiting for available connection slot");
});

pool.on('acquire', function (connection) {
  // LOGGER.info('Connection %d acquired', connection.threadId);
});

pool.on('release', function (connection) {
  // LOGGER.info('Connection %d released', connection.threadId);
});

module.exports = function (callback){
  callback(null , pool);
}
