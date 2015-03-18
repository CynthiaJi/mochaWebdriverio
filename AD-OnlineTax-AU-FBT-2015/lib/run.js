"use strict";

var documentWrapper = require("./document");

var run = function(fbtdoc, scope) {
  var document = documentWrapper(fbtdoc);
  document.calculate(scope);
  document.validate(scope);
  return document.data();
};

module.exports = run;
