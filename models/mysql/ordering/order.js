
var key='fuel_request' ;
var utils=require('../../dbutils');

// add order to db 
exports.addOneOrder= function (params , callback){
  utils.performaction({
    sql : "INSERT INTO orderinfo (iDistance, vStatus) " +
          "VALUES ( ? , ? )" ,
    binds : [params.iDistance, params.vStatus]
  } , function (err , result){
    console.log(err ,result )

    if (err){
      callback(err , 0) ;
    }else{
      callback(err , result.insertId ) ;
    }
  })
}

exports.placeOneOrder= function (params , callback){
  console.log('update' , params)
  utils.performaction({
    sql : "update orderinfo set vStatus=? where iOrderId=? and vStatus=? " ,
    binds : [params.vStatus, params.iOrderId, params.notassigned] 
  } , function (err , result){
    if (err){
      callback(err , 0) ;
    }else{
      callback(err , result.affectedRows ) ;
    }
  })
}

exports.getAllOrders= function (params , callback){
  utils.performaction({
    sql : "select * from orderinfo limit ? , ?" ,
    binds : [params.page, params.limit ]
  } , function (err , result){
    callback(err , result) ;
  })
}
