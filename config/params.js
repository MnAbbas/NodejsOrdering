var define = require("node-constants")(exports);
var Joi = require('joi');


define({
  addToList :  Joi.object().keys({
    ifuel_requestId: Joi.required() ,
    iStationNo: Joi.required() ,
    iNozzleId: Joi.required() ,
    eFuelType: Joi.required() ,
    iFuelPrice: Joi.required() ,
    iVolume: Joi.required()
  }).unknown()
});

define({
  getStatus :  Joi.object().keys({
    ifuel_requestId: Joi.required(),
  }).unknown()
});
