var expect  = require('chai').expect;
var request = require('request');

it('OrderGET , write anser needed', function(done) {
    request({ url: 'http://localhost:8080/orders', method: 'GET', 
        json: {page : 1 , limit: 3}} ,
         function(error, response, body) {
            expect(response.statusCode).to.equal(200);            
            done();
    });
});


it('OrderGET , Wrong Parameter', function(done) {
    request({ url: 'http://localhost:8080/orderss', method: 'GET', 
        json: {pageN : 1 , limit: 3}} ,
        function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
    });
});


it('OrderGET , Wrong Parameter Value', function(done) {
    request({ url: 'http://localhost:8080/orderss', method: 'GET', 
        json: {pageN : 1 , limit: 'n'}} ,
        function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
    });
});

