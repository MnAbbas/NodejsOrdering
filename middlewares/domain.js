/**
 * check catch all unwanted error and not handled errors here
 * @middleware
 */

var domain = require('domain');
module.exports = function(req, res, next) {
  var reqd = domain.create();
  domain.active = reqd;
  reqd.add(req);
  reqd.add(res);
  reqd.on('error', function(err) {
    if (typeof req.next == 'function'){
      req.next(err);
    }
    LOGGER.error('Error occured' , typeof req.next , req.baseUrl);
    // res.status(err.status || 500);
    // res.render('error');

    // res.status(400).send(JSON.stringify({
    //   error : "Something happened"
    // }));

    // console.error(err);

  });
  res.on('end', function() {
    // console.log('disposing domain for url ' + req.url);
    // logger.error('disposing domain for url ' + req.url);
    reqd.dispose();
  });
  reqd.run(next);
}
