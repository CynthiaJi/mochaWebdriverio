"use strict";

var run = require("./lib/run.js");

var input1 = require("./spec/input1.json");

var start = process.hrtime();
var result = run(input1);
var end = process.hrtime(start);

console.log(JSON.stringify(result, void 0, 2));

console.log("Execution time: %dms", end[0] * 1000 + end[1] / 1000000);
