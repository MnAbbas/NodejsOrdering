/**
 * check the parameter and if it comply with schema 
 * it will let it pass
 * using JOI package
 * @middleware
 */

var Joi = require('joi');

module.exports =  function( req, res, next) {
  let url = req._parsedUrl.pathname || req.baseUrl  || req.originalUrl || req.url;
  url=url.replace('/' , '').split('/')[0];
  let method =req.method ;

  let schema = Joi.object().keys({
  }).unknown()

  switch (url + method){
    case 'orderPOST':
      schema = Joi.object().keys({
        origin: Joi.required(),
        destination: Joi.required(),
      }).unknown()
      break;
    case 'orderPUT':
      schema =  Joi.object().keys({
        status: Joi.valid(['taken','UNASSIGN']).required()
      }).unknown()
      break
    case 'ordersGET':
      schema = Joi.object().keys({
      }).unknown()
      break
    default :
      schema =  Joi.object().keys({
      }).unknown()
    break
  }

  Joi.validate(req.body, schema, function (err, value){
    if (err){
      // err = CONSTANT.check_inputs.failure_1
      res.status(409).header("Content-Type", "application/json").send(JSON.stringify({
        error : err
      }));
    }else{
      next();
    }
  });
};
