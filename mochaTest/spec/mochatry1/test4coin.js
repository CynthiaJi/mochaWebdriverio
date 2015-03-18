

var  totalPayable = 1487                                 // £14.87  (fourteen pounds and eighty-seven pence)
    ;
var cashPaid     = 10000                                // £100.00 (one hundred pounds)
    ;
var dfference    = 8513                                 // £85.13
    ;
var change       = [5000, 2000, 1000, 500, 10, 2, 1 ]   // £50, £20, £10, £5, 10p, 2p, 1p
;



var assert = require("assert"); // core module
var C = require('./../../cash1.js');  // our module

describe('Cash Register', function(){
    describe('Module C', function(){
        it('should have a getChange Method', function(){
            assert.equal(typeof C, 'object');
            assert.equal(typeof C.getChange, 'function');
        })
        it('getChange(210,300) should equal [50,20,20]', function(){
            assert.deepEqual(C.getChange(210,300), [50,20,20]);
        })
        it('getChange(486,1000) should equal [500, 10, 2, 2]', function(){
            assert.deepEqual(C.getChange(486,1000), [500, 10, 2, 2]);
        })
        it('getChange(1487,10000) should equal [5000, 2000, 1000, 500, 10, 2, 1 ]', function(){
            assert.deepEqual(C.getChange(1487,10000), [5000, 2000, 1000, 500, 10, 2, 1 ]);
        });
    })
});