"use strict";

var Big = require("big.js");

var decimal = function (input) {
  if (input && input.isBlank && input.toNotNegative) {
    return input;
  }

  if (typeof input === "string") {
    input = input.replace(/[\$, ]/g, "");
  }

  if (input === null || typeof input === "undefined" || input === "" || isNaN(input)) {
    return BLANK;
  }

  var big = (input instanceof Big) ? input : new Big(input);

  var thedecimal = {};

  ["abs", "sqrt"].forEach(function (member) {
    thedecimal[member] = function () {
      return decimal(big[member]());
    };
  });

  ["toExponential", "toJSON", "valueOf"].forEach(function (member) {
    thedecimal[member] = function () {
      return big[member]();
    };
  });

  ["toString"].forEach(function (member) {
    thedecimal[member] = function () {
      var suffix = "";
      var numberOfDecimalDigits = big.abs().mod(1).toString().length - "0.".length;
      if (numberOfDecimalDigits === 1) {
        suffix = "0";
      }
      return big[member]() + suffix;
    };
  });

  ["div", "mod", "pow", "round", "times"].forEach(function (member) {
    thedecimal[member] = function (arg) {
      if (arg && arg.isBlank && arg.isBlank()) {
        return BLANK;
      }
      return decimal(big[member](arg));
    };
  });

  ["minus", "plus"].forEach(function (member) {
    thedecimal[member] = function (arg) {
      if (arg && arg.isBlank && arg.isBlank()) {
        arg = ZERO;
      }
      return decimal(big[member](arg));
    };
  });

  ["cmp", "eq", "gt", "gte", "lt", "lte", "toFixed", "toPrecision"].forEach(function (member) {
    thedecimal[member] = function (arg) {
      return big[member](arg);
    };
  });

  thedecimal.isBlank = function () {
    return false;
  };

  thedecimal.toNotNegative = function () {
    if (thedecimal.lt(ZERO)) {
      return decimal(0);
    }
    return thedecimal;
  };

  thedecimal.roundDown = function (arg) {
    return thedecimal.minus(thedecimal.mod(arg));
  };

  return thedecimal;
};

var ZERO = new Big(0);

var BLANK = Object.freeze((function () {
  var blank = ZERO;

  blank.isBlank = function () {
    return true;
  };

  ["abs", "div", "minus", "mod", "plus", "pow", "round", "roundDown", "sqrt", "times", "toNotNegative"].forEach(function (member) {
    blank[member] = function () {
      return BLANK;
    };
  });

  ["minus", "plus"].forEach(function (member) {
    blank[member] = function (arg) {
      if (arg && arg.isBlank && arg.isBlank()) {
        return BLANK;
      }
      return decimal(0)[member](arg);
    };
  });

  ["toExponential", "toFixed", "toJSON", "toPrecision", "toString", "valueOf"].forEach(function (member) {
    blank[member] = function () {
      return "";
    };
  });

  return blank;
}()));

module.exports = decimal;
