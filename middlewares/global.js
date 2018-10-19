// catch 404 and forward to error handler

  //global variables
async = require('async') ,

exports.setglobal=function(callback){
  global.LOGGER= require('../helpers/general/winston');

  async.parallel([
        function(callback) {
          global.CONFIG = require('config');
          callback(null , CONFIG);
        } ,
        function(callback) {
          global.MODELES= require('../models');
          callback(null , MODELES);
        } ,
        function(callback) {
          global.HELPERS= require('../helpers');
          callback(null , HELPERS);
        }  ,
        function(callback) {
          global.CONSTANT = require('../config/constants');
          callback(null , CONSTANT);
        }  ,
        function(callback) {
          require('../models/mysql/db')(function(err , pool){
            global.POOL=pool;
            callback(err , POOL);
          });
        }] , function done(err, results) {
            LOGGER.info(err);
            callback(err , 'done');
        });

}
