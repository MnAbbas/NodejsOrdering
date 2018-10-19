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
        // console.log('pid' , workers[0].process.pid , workers[0].process.env)
        if (workers[0].process.pid == worker.process.pid){
          var newworker = cluster.fork({RUN_CRON :  true , wid : worker.id });
          workers[0]=newworker;
        }else{
          cluster.fork({RUN_CRON :  false , wid : worker.id });
        }

        // console.log('Starting a new worker' , nnworker.env.RUN_CRON);

    });

} else {
    // console.log('Hi Here I am ' , cluster.worker.process.env.RUN_CRON);
    require('./global').setglobal(function(err , done){
      if (process.env.RUN_CRON === 'true') {
        console.log('process.env.RUN_CRON' , process.env.RUN_CRON)

      }else {
        require('../bin/www');
      }
    });

}
