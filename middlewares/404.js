/**
 * catch 404 and forward to error handler
 * @middleware
 */

module.exports =  function( req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  res.status(404).send(JSON.stringify({
    error : " Path is not founded"
  }));

};
