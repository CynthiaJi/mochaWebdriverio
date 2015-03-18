"use strict";

var decimal = require("./decimal");

var aggregateFields = require("./calculation");
var fieldsToValidate = require("./validation/rules");

var isDocumentValid = function (doc) {
  return doc && doc.fields;
};

var document = function (doc) {
  if (!isDocumentValid(doc)) {
    throw "Invalid document: " + doc;
  }

  var isDisabled = function (fieldId) {
    return fieldsToValidate[fieldId] && fieldsToValidate[fieldId].isDisabled && fieldsToValidate[fieldId].isDisabled(thedocument);
  };

  var get = function (fieldId) {
    if (isDisabled(fieldId)) {
      return function () {
        return decimal();  // treat disabled values as blank
      };
    }
    if (aggregateFields[fieldId]) {
      return aggregateFields[fieldId].calculate(thedocument);
    }
    if (doc.fields[fieldId] && doc.fields[fieldId].value) {
      return function () {
        return decimal(doc.fields[fieldId].value);
      };
    }
    return function () {
      return decimal();
    };
  };

  // missing boolean value is assumed to be false
  var getBoolean = function (fieldId) {
    if (isDisabled(fieldId)) {
      return false;
    }
    if (doc.fields[fieldId] && doc.fields[fieldId].value && typeof doc.fields[fieldId].value === "boolean") {
        return doc.fields[fieldId].value;
    }
    if (doc.fields[fieldId] && doc.fields[fieldId].value && typeof doc.fields[fieldId].value === "string" && doc.fields[fieldId].value.toLowerCase().trim() === "true") {
        return true;
    }
    return false;
  };

  var getString = function (fieldId) {
    if (isDisabled(fieldId)) {
      return "";
    }
    if (doc.fields[fieldId] && doc.fields[fieldId].value && typeof doc.fields[fieldId].value === "string") {
        return doc.fields[fieldId].value.trim();
    }
    if (doc.fields[fieldId] && doc.fields[fieldId].value && doc.fields[fieldId].value.toString && typeof doc.fields[fieldId].value.toString === "function") {
        return doc.fields[fieldId].value.toString();
    }
    return "";
  };

  var set = function (fieldId, value) {
    doc.fields[fieldId] = doc.fields[fieldId] || {};
    if (typeof value === "function") {
      value = value();
    }
    if (typeof value !== 'string' && value.toString) {
      doc.fields[fieldId].value = value.toString();
    } else {
      doc.fields[fieldId].value = value;
    }
    doc.fields[fieldId].source = "calculation";
  };

  var disable = function (fieldId, disabled) {
    doc.fields[fieldId] = doc.fields[fieldId] || {};
    doc.fields[fieldId].disabled = disabled;
  };

  var setOptional = function (fieldId, optional) {
    doc.fields[fieldId] = doc.fields[fieldId] || {};
    doc.fields[fieldId].optional = optional;
  };

  var calculate = function () {
    Object.keys(aggregateFields).forEach(function (fieldId) {
      set(fieldId, get(fieldId));
    });
  };

  var validateField = function (fieldId) {
    doc.fields[fieldId] = doc.fields[fieldId] || {};
    if (fieldsToValidate[fieldId].validate) {
      var errors = [];
      if (getString(fieldId)) {
        errors = fieldsToValidate[fieldId].validate(thedocument);
      }
      if (errors.length === 0) {
        delete doc.fields[fieldId].errors;
      } else {
        doc.fields[fieldId].errors = errors;
      }
    }
  };

  var validate = function () {
    Object.keys(fieldsToValidate).forEach(function (fieldId) {
      if (fieldsToValidate[fieldId].isDisabled) {
        disable(fieldId, fieldsToValidate[fieldId].isDisabled(thedocument));
      }
    });
    Object.keys(fieldsToValidate).forEach(function (fieldId) {
      if (fieldsToValidate[fieldId].isOptional) {
        setOptional(fieldId, fieldsToValidate[fieldId].isOptional(thedocument));
      }
    });
    Object.keys(fieldsToValidate).forEach(function (fieldId) {
      validateField(fieldId);
    });
  };

  var validateForLodgement = function () {
    var lodgementErrors = {};
    Object.keys(fieldsToValidate).forEach(function (fieldId) {
      if (doc.fields[fieldId] && !doc.fields[fieldId].disabled && doc.fields[fieldId].errors && doc.fields[fieldId].errors.length > 0) {
        lodgementErrors[fieldId] = doc.fields[fieldId].errors;
      }
      if (doc.fields[fieldId] && !doc.fields[fieldId].disabled && !doc.fields[fieldId].optional && !getString(fieldId)) {
        lodgementErrors[fieldId] = lodgementErrors[fieldId] || [];
        lodgementErrors[fieldId].push(fieldsToValidate[fieldId].lodgementError || {
          "errorcode": "MANDATORY",
          "messagecode": "MANDATORY",
          "message": "Mandatory"
        });
      }
    });
    Object.getPrototypeOf(lodgementErrors).hasErrors = function () {
      return Object.keys(lodgementErrors).length > 0;
    };
    doc.lodgementErrors = lodgementErrors;
    return lodgementErrors;
  };

  var thedocument = {
    "data": function () {
      return doc;
    },
    "get": get,
    "getBoolean": getBoolean,
    "getString": getString,
    "calculate": calculate,
    "validate": validate,
    "validateForLodgement": validateForLodgement
  };

  return thedocument;
};

module.exports = document;
