

var C = {};                    // C Object simplifies exporting the moduel
C.coins = [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];


C.getChange = function () {    // enough to satisfy the test
    'use strict';
    return true;               // also passes JSLint
};
C.getChange = function (totalPayable, cashPaid) {
    'use strict';
    return [50, 20, 20];    // just enough to pass :-)
};
C.getChange = function (totalPayable, cashPaid) {
    'use strict';
    if(totalPayable == 486 && cashPaid == 1000)
        return [500, 10, 2, 2];
    else if(totalPayable == 210 && cashPaid == 300)
        return [50, 20, 20];
};
C.getChange = function (totalPayable, cashPaid) {
    'use strict';
    var change = [];
    var length = C.coins.length;
    var remaining = cashPaid - totalPayable;          // we reduce this below

    for (var i = 0; i < length; i++) { // loop through array of notes & coins:
        var coin = C.coins[i];

        if(remaining/coin >= 1) { // check coin fits into the remaining amount
            var times = Math.floor(remaining/coin);        // no partial coins

            for(var j = 0; j < times; j++) {     // add coin to change x times
                change.push(coin);
                remaining = remaining - coin;  // subtract coin from remaining
            }
        }
    }
    return change;
};
module.exports = C;            // export the module with a single method