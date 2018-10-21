var expect  = require('chai').expect;
var request = require('request');

it('OrderPUT, write answer needed', function(done) {
    request({ url: 'http://localhost:8080/order/1', method: 'PUT', 
        json: {status: 'taken'}} ,
         function(error, response, body) {
            expect(body.error).to.equal('ORDER_ALREADY_BEEN_TAKEN');
            done();
    });
});


it('OrderPUT, wromg parameter value', function(done) {
    request({ url: 'http://localhost:8080/order/1', method: 'PUT', 
        json: {status: 'taken'}} ,
         function(error, response, body) {
            expect(response.statusCode).to.equal(409);
            done();
    });
});


it('OrderPUT, Wrong Parameter', function(done) {
    request({ url: 'http://localhost:8080/order/1', method: 'PUT', 
        json: {statuN: 'taken'}} ,
         function(error, response, body) {
            expect(response.statusCode).to.equal(409);
            done();
    });
});




it('OrderPUT, Wrong Orderid', function(done) {
    request({ url: 'http://localhost:8080/order/19090909111', method: 'PUT', 
        json: {status: 'taken'}} ,
         function(error, response, body) {
            expect(body.error).to.equal('ORDERID_NOT_FOUND');
            done();
    });
});
