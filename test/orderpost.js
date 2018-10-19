var expect  = require('chai').expect;
var request = require('request');

it('OrderPOST , write answer needed', function(done) {
    request({ url: 'http://localhost:8080/order', method: 'POST', 
        json: {origin : ["40.7421","-73.9914"], destination : ["41.8337329","-87.7321554"]}} ,
         function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
    });
});


it('OrderPOST ,  Wrong Parameter', function(done) {
    request({ url: 'http://localhost:8080/order', method: 'POST', 
        json: {originN: "['51.122','35.232']", destination: "['51.122','35.232']"}} ,
         function(error, response, body) {
            expect(response.statusCode).to.equal(409);
            done();
    });
});

