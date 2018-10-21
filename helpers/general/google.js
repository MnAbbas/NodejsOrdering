var distance = require('google-distance-matrix');
// distance.key(CONFIG.google.apikey);
distance.mode(CONFIG.google.mode); //driving | walking | bicycling
distance.units(CONFIG.google.units);

exports.calcvalues= function(origins, destinations, callback){
  distance.key(CONFIG.google.apikey);

   // console.info('origins' , origins  );
   // console.info('destinations'  , destinations );
/**
 * matrix is a endpoint to google apis
 * this function will return the distance and duration bettween two points
 * @helpermethod
 */
distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
        callback(err);
    }
    if(!distances) {
        callback('no distances');
    }
    var distance = 0 ;
    var duration=0 ;
    if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    distance += parseFloat(distances.rows[i].elements[j].distance.text.split(" ")[0]);
                    duration += parseFloat(distances.rows[i].elements[j].duration.text.split(" ")[0]);
                    //   callback(null , {distance :distance , duration:duration }  );
                } else {
                    callback('is not reachable by land from')
                }
            }
        }
        callback(null , {distance :distance , duration:duration }  );
    }else{
        callback('not ok') ;
    }
});
};