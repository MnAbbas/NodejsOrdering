
var key='fuel_request' ;
var utils=require('../../dbutils');

/**
 * addOneOrder is for add one order to table in mysql
 * needed two parameter iDistance, vStatus
 * @modelmethod
 */
exports.addOneOrder= function (params , callback){
  utils.performaction({
    sql : "INSERT INTO orderinfo (iDistance, vStatus) " +
          "VALUES ( ? , ? )" ,
    binds : [params.iDistance, params.vStatus]
  } , function (err , result){
    if (err){
      callback(err , 0) ;
    }else{
      callback(err , result.insertId ) ;
    }
  })
}
/**
 * placeOneOrder is for take one order to table in mysql
 * needed two parameter iOrderId, vStatus and will check the noassigned order
 * @modelmethod
 */
exports.placeOneOrder= function (params , callback){
  checkitemexist(params,function(err , rest){
    if(err){
      callback(err , -1) ;  
    }else if (rest==0) {
      callback(err , -1) ;  
    }else{
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
    
  })
}
/**
 * checkitemexist is for check the orderid in orderinfo table
 * needed one parameter iOrderId
 * @modelmethod
 */
function checkitemexist (params , callback){
  utils.performaction({
    sql : "select iOrderId  from orderinfo where iOrderId=?" ,
    binds : [params.iOrderId] 
  } , function (err , result){
    if (err){
      callback(err , 0) ;
    }else{
      callback(err , result.length) ;
    }
  })
}
/**
 * getAllOrders is for retrieve all records in orderinfo
 * needed two parameter page, limit
 * @modelmethod
 */
exports.getAllOrders= function (params , callback){
  console.info(params)
  utils.performaction({
    sql : "select * from orderinfo order by iOrderId limit ? , ?" ,
    binds : [params.page*params.limit, params.limit ]
  } , function (err , result){
    callback(err , result) ;
  })
}
