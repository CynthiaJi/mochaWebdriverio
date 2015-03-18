/**
 * Created by online on 24/02/15.
 */
//https://github.com/alexyoung/async-testing-tutorial/blob/master/index.js
var assert = require('assert')
  , nextPrime = require('../methods/mathprime').nextPrime
  , asyncPrime = require('../methods/mathprime').asyncPrime;

describe('nextPrime', function() {
  it('nextPrime should return the next prime number', function() {
    assert.equal(11, nextPrime(7));
  });

  it('zero and one are not prime numbers', function() {
    assert.equal(2, nextPrime(0));
    assert.equal(2, nextPrime(1));
  });


});
describe('asyncPrime', function() {
  it('asyncPrime should return the next prime number', function(done) {
    asyncPrime(128, function(n) {
      assert.equal(131, n, 'Wrong number');
      done();
    });
  });
});
