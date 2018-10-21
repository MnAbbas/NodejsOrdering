var express = require('express')
  , router = express.Router()
  , order = MODELES.order;
  fuel_request = MODELES.fuel_request;

/**
 * GET ORDERS will showw all orders and their status
 * two parameter , page ,imit will present the corresponding records
 * page will be started as 0 , so all page valiue will be -> page-1
 * @routermethod
 */
  router.get('/', function(req, res) {
    let page = req.query.page || 0 ;
    let limit= req.query.limit || 0;

    if (limit ==0){
      res.status(400).header("Content-Type", "application/json").send(JSON.stringify({
        error : 'Parameter_Not_valid'
      }));
      return 
    }

    order.getAllOrders({
      page : ( page==0 ? 0 : parseInt(page) -1 ) ,
      limit: parseInt(limit) ,
    }, function(err , affectedrows){
      if (err){
        res.status(500).header("Content-Type", "application/json").send(JSON.stringify({
          error : err
        }));
      }else{
        var reformattedArray = affectedrows.map(obj =>{ 
          var rObj = {};
          rObj['id'] = obj.iOrderId;
          rObj['distance'] = obj.iDistance;
          rObj['status'] = obj.vStatus;
          return rObj;
       });
       if (reformattedArray.length ==0 ){
        res.status(400).header("Content-Type", "application/json").send(JSON.stringify({
          error : 'DATA_NOT_FOUND'
        }));  
       }else{
        res.status(200).header("Content-Type", "application/json").send(JSON.stringify(reformattedArray));  
       }
    
      }
  
    })
    });

module.exports = router
