var express = require('express')
  , router = express.Router()
  , google = HELPERS.google
  , order = MODELES.order;

/**
 * POST ORDER is for putting order 
 * it will connect to google api , retrive the distnce and put an order
 * @routermethod
 */
router.post('/', function(req, res) {
 let origin = req.params.origin || req.body.origin ;
 let destination = req.params.destination || req.body.destination ;

 console.log('cordinate',origin[0] , destination[0])


let finalorigin = origin[0] +','+origin[1];
let finaldestination =  destination[0]+','+destination[1]; ;


// to call google api and get distance  
google.calcvalues([finalorigin] ,[finaldestination] , function(err , resp){
  if (err){
    res.status(500).header("Content-Type", "application/json").send(JSON.stringify({
      error : err
    }));
  }else{
    //call database to add order
    order.addOneOrder({
      iDistance : resp.distance ,
      vStatus : 'UNASSIGN'
    }, function(err , Orderid){
      if (err){
        res.status(500).header("Content-Type", "application/json").send(JSON.stringify({
          error : err
        }));
    
      }else{
      }
      var returnto = {
        id : Orderid ,
        distance : resp.distance || 0 ,
        status : 'UNASSIGN'
      }
      res.status(200).header("Content-Type", "application/json").send(JSON.stringify(returnto));  

    })
  }
})

});

/**
 * PUT ORDER will take an order and change the status of order
 * it will recieve the status and change the status as taken one
 * @routermethod
 */
router.put('/:id', function(req, res) {
  console.log('param' , req.query , req.params)
  let id = req.params.id ;
  let status= req.query.status  || req.body.status
  

  order.placeOneOrder({
    vStatus : status,
    iOrderId: id ,
    notassigned : 'UNASSIGN'
  }, function(err , affectedrows){
    console.log(err , affectedrows)
    if (err){
      res.status(500).header("Content-Type", "application/json").send(JSON.stringify({
        error : err
      }));
    }else if (affectedrows==0){
      res.status(409).header("Content-Type", "application/json").send(JSON.stringify({
        error : "ORDER_ALREADY_BEEN_TAKEN"
      }));
    }else if (affectedrows==-1){
      res.status(409).header("Content-Type", "application/json").send(JSON.stringify({
        error : "ORDERID_NOT_FOUND"
      }));

    }else{
      var returnto = {
        status: "SUCCESS"
      }
      res.status(200).header("Content-Type", "application/json").send(JSON.stringify(returnto));  
  
    }

  })


  });


module.exports = router
