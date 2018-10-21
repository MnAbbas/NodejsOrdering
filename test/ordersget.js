var expect  = require('chai').expect;
var request = require('request');

it('OrderGET , write answer needed', function(done) {
    request({ url: 'http://localhost:8080/orders?page=1&limit=3', method: 'GET', 
        json: {}} ,
         function(error, response, body) {
            expect(response.statusCode).to.equal(200);            
            done();
    });
});


it('OrderGET , Wrong Parameter', function(done) {
    request({ url: 'http://localhost:8080/orderss?pageN=1&limit=3', method: 'GET', 
        json: {}} ,
        function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
    });
});


it('OrderGET , Wrong Parameter Value', function(done) {
    request({ url: 'http://localhost:8080/orderss?pageN=1&limit=n', method: 'GET', 
        json: {}} ,
        function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
    });
});

it('OrderGET , Data Not Found', function(done) {
    request({ url: 'http://localhost:8080/orders?page=1000000&limit=10', method: 'GET', 
        json: {}} ,
        function(error, response, body) {
            expect(body.error).to.equal('DATA_NOT_FOUND');
            done();
    });
});

