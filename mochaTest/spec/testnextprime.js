/**
 * Created by online on 6/02/15.
 */


var assert = require('assert')
    , nextPrime = require('../nextprime').nextPrime
    , asyncPrime = require('../nextprime').asyncPrime;

describe('nextPrime', function() {
    it('nextPrime should return the next prime number', function() {
        assert.equal(11, nextPrime(7));
    });
    it('zero and one are not prime numbers', function() {
        assert.equal(2, nextPrime(0));
        assert.equal(2, nextPrime(1));
    });
    it('nextPrime should return the next prime number', function(done) {
        assert.equal(11, nextPrime(7));

        // Tell Mocha the test has finished
        done();
    })
    it('asyncPrime should return the next prime number', function(done) {
        asyncPrime(128, function(n) {
            assert.equal(131, n, 'Wrong number');
            done();
        });
    });
});