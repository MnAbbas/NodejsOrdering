// catch 404 and forward to error handler
// var exception =['/WS/show_pass' ] ;
var Joi = require('joi');

module.exports =  function( req, res, next) {
  let url = req._parsedUrl.pathname || req.baseUrl  || req.originalUrl || req.url;
  url=url.replace('/' , '').split('/')[0];
  let method =req.method ;

  let schema = Joi.object().keys({
  }).unknown()

  console.log("rul" , url)

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
        page: Joi.number().required(),
        limit: Joi.number().required()
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
      res.status(409).send(JSON.stringify({
        error : err
      }));
    }else{
      next();
    }
  });
};
