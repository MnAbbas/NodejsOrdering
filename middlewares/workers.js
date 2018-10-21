
/**
 * worker will run the application as multi-process
 * it will run workers as much as number of cpu exists
 * it will add replacable worker if one of them goes down
 * @middleware
 */

var cluster = require('cluster');
var workers = [];

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;
     // var numWorkers =2 ;
    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
    	var worker=cluster.fork({RUN_CRON :  i === 0 , wid : i + 1 });
        workers.push(worker);
    }
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    worker.on('message', function(msg) {
		//	console.log('Worker: ' + msg.pid + ' using ' + msg.memory.rss + ' bytes of memory');
		});

    cluster.on('message', function( msg) {
    	// console.log('Worker: ' + msg.pid + ' using ' + msg.memory + ' bytes of memory');
    });

//			cache.put('mycacheis' , 'newoe');
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
          cluster.fork({RUN_CRON :  false , wid : worker.id });
    });

} else {
    // console.log('Hi Here I am ' , cluster.worker.process.env.RUN_CRON);
    require('./global').setglobal(function(err , done){
        require('../bin/www');
    });

}
