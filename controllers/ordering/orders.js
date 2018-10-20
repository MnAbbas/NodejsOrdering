var express = require('express')
  , router = express.Router()
  , order = MODELES.order;
  fuel_request = MODELES.fuel_request;




  router.get('/', function(req, res) {
    let page = req.query.page || 0 ;
    let limit= req.query.limit || 0;

    if (limit ==0){
      res.status(400).send(JSON.stringify({
        error : 'Parameter_Not_valid'
      }));
      return 
    }

    console.log("req" , page , limit)
    order.getAllOrders({
      page : parseInt(page) -1 ,
      limit: parseInt(limit) ,
    }, function(err , affectedrows){
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
