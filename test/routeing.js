var expect  = require('chai').expect;
var request = require('request');

it('Routers , not founded must appears', function(done) {
    request({ url: 'http://localhost:8080/Norders', method: 'POST', 
        json: {page : 1 , limit: 3}} ,
         function(error, response, body) {
            expect(response.statusCode).to.equal(404);            
            done();
    });
});
