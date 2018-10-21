/**
 * performaction will call DBselect and it is a single point which you add redis connection as well
 * for the places you need to do something more thatn mysql action you will added here
 * this is a middleware method will will manage all request at one place
 * @modelaccelaretor
 */
exports.performaction= function (params , callback){
  DBselect(params , function(err , dbresult){
    if (err){
      callback(err);
    }else{
      callback(null , dbresult)
    }
  });
}
/**
 * DBselect will manage all request to database
 * this is a middleware method will will manage all request at one place
 * @modelaccelaretor
 */
function DBselect(params , dbresult){
POOL.getConnection(function(err, connection) {
  if (err){
    LOGGER.error(err);
    dbresult('Something Happend');
  }else{
    connection.query({
        sql : params.sql,
        timeout : 40000,
        values : params.binds
      }, function (error, results, fields) {
       if (error){
         connection.release();
         LOGGER.error(params.sql ,params.binds ,  error);
         dbresult('Something Happend');
       }
       else{
         connection.release();
         dbresult(null , results) ;
       }
      });
  }
});
};

// function DBselect(params , dbresult){
//   POOL.getConnection(function(err, connection) {
//     connection.execute(
//       params.sql,
//       params.binds,  // bind value for :id
//       function(err, result)
//       {
//         if (err) {
//            connection.close();
//            dbresult(err);
//          }
//          connection.close();
//           dbresult(null , result) ;
//       });
//   });
// }
