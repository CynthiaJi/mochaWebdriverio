"use strict";

var messages = require("./messages")

module.exports = {
  "error" : function (errorcode, messagecode) {
    return {
      "errorcode": errorcode,
      "messagecode": messagecode,
      "message": messages[messagecode].message
    };
  },

  "isWholeAmount": function (value, maxDigits) {
    return new RegExp("^[0-9]{1," + maxDigits + "}$").test(value);
  },

  "isSignedWholeAmount": function (value, maxDigits) {
    return new RegExp("^[+-]?[0-9]{1," + maxDigits + "}$").test(value);
  },

  "isAmountWithCents": function (value, maxDigits) {
    return new RegExp("(^[0-9]{1," + maxDigits + "}$|^[0-9]{1," + (maxDigits - 1) + "}(\\.[0-9]{1})?$|^[0-9]{1," + (maxDigits - 2) + "}(\\.[0-9]{2})?$)").test(value);
  },

  "isSignedAmountWithCents": function (value, maxDigits) {
    return new RegExp("(^[+-]?[0-9]{1," + maxDigits + "}$|^[+-]?[0-9]{1," + (maxDigits - 1) + "}(\\.[0-9]{1})?$|^[+-]?[0-9]{1," + (maxDigits - 2) + "}(\\.[0-9]{2})?$)").test(value);
  },

  "isNumber": function (value, minDigits, maxDigits) {
    return new RegExp("^[0-9]{" + minDigits + "," + maxDigits + "}$").test(value);
  },

  "isName": function (value, minLength, maxLength) {
    return new RegExp("^[A-Za-z0-9 \.,\?\(){}:;'|\-_=\\\/@#$%\*=&\"]{" + minLength + "," + maxLength + "}$").test(value);
  },

  "nameContainsValidCharacters": function (value) {
    return /^[A-Za-z0-9 \.,\?(){}:;'|\-_=\\\/@#$%\*=&"]*$/.test(value);
  },

  "orgNameContainsValidCharacters": function (value) {
    return /^[A-Za-z0-9 \.,\?(){}:;'|\-_=\\\/@#$%\*=&+"]*$/.test(value);
  },

  "nameContainsSpaceHyphenSpace": function (value) {
    return / - /.test(value);
  },

  "nameContainsInvalidCharacterSequences": function (value) {
    return /(--|''|  )/.test(value);
  },

  "hasAtLeastOneAlphabet": function (value) {
    return /^(?=.*[a-zA-Z])(.*)$/.test(value);
  },

  "hasAtLeastOneAlphaOrNumber": function (value) {
    return /^(?=.*[a-zA-Z0-9])(.*)$/.test(value);
  },

  "isTfn": function (value) {
    var tfnString = value.replace(/\s+/g, '');
    if (!this.isNumber(tfnString, 8, 9)) {
      return false;
    }
    var tfn = value.split('').map(function(x){
      return parseInt(x)
    });
    var factor = [10,7,8,4,6,3,5,2,1];
    var tfnSum = tfn.reduce( function(total, tfnDigit, index) {
      return total + tfnDigit * factor[index];
    }, 0);

    return tfnSum % 11 === 0;
  },

  "isAbn": function (value) {
    var abnString = value.replace(/\s+/g, '');
    if (!this.isNumber(abnString, 11, 11)) {
      return false;
    }
    var abn = value.split('').map(function(x){
      return parseInt(x)
    });
    var factor = [10,1,3,5,7,9,11,13,15,17,19];
    var abnSum = abn.reduce( function(total, abnDigit, index) {
      if (index === 0) {
        --abnDigit;
      }
      return total + abnDigit * factor[index];
    }, 0);

    return abnSum % 89 === 0;
  },

  "isDateBeforeToday": function (value) {
    // Assume value is a date object
    return value < new Date().setHours(0,0,0,0);
  }

};
