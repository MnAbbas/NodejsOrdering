exports.performaction= function (params , callback){
  DBselect(params , function(err , dbresult){
    if (err){
      callback(err);
    }else{
      callback(null , dbresult)
    }
  });
}

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
