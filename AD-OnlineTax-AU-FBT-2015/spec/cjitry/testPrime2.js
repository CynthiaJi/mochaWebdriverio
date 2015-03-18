/**
 * Created by online on 24/02/15.
 */
  //https://github.com/alexyoung/async-testing-tutorial/blob/master/index.js
var assert = require('assert')
  , nextPrime = require('../methods/mathprime').nextPrime;

describe('nextPrime', function() {
  it('nextPrime should return the next prime number', function(done) {
    assert.equal(11, nextPrime(7));

    // Tell Mocha the test has finished
    done();
  });
});
