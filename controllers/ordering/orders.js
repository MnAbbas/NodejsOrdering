var express = require('express')
  , router = express.Router()
  , order = MODELES.order;
  fuel_request = MODELES.fuel_request;




  router.get('/', function(req, res) {
    let page = req.param.page;
    let limit=req.params.limit
  
    order.getAllOrders({
      page : page,
      limit: limit ,
    }, function(err , affectedrows){
      console.log(err , affectedrows)
      if (err){
        res.status(500).send(JSON.stringify({
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

        res.status(200).send(JSON.stringify(reformattedArray));  
    
      }
  
    })
    });

module.exports = router
