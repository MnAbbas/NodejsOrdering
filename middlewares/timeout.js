
/**
 * timeout will catch the time-out request 
 * inside and outside
 * @middleware
 */

module.exports = function (req, res, next){
  if (!req.timedout) {
	  next();
  }else{
    res.status(400).send(JSON.stringify({
      error : "Timeout exceeded"
    }));

		logger.error('timeout exceeded :', req.url , req.body);
  }
}
