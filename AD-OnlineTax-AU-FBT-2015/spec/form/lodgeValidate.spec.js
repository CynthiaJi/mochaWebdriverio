"use strict";

var fs = require("fs");
var expect = require("chai").expect;
var csv = require("csv");
var document = require("../../lib/document.js");
var $ = require("jquery");


function lodgeValidation(ruleData) {
  describe("Ready to Lodge Validations", function () {

    csv.parse(ruleData, {columns: true}, function (err, allRows) {
      if (err) {
        throw err;
      }
      var sbrEditableRow = allRows[1];
      var userInputRow = allRows[2];
      var dataRows = allRows.slice(3);
      dataRows.forEach(function (row, index) {
        if (!row["MYOB Name"] || row["MYOB Name"].match(/^IGNORE(.*)$/)) return;  // skip if no name or IGNORE

        it("AU FBT 2015 Validation for Lodgement Row " + (index + 5) + ": " + row["MYOB Name"], function () {
          var inputFields = {};
          var expectedOutputFields = {};

          var expectedErrorCodes = {};
          var expectedMessageCodes = {};

          // Get all field values
          Object.keys(row).forEach(function (fieldId) {
            var fieldValue = {
              value: row[fieldId]
            };
            if (userInputRow[fieldId].toLowerCase() === "true") {
              inputFields[fieldId] = fieldValue;
            }
            if (sbrEditableRow[fieldId].toLowerCase() === "true") {
              expectedOutputFields[fieldId] = fieldValue;
            }
          });

          // Do Validation
          var doc = {};
          if (row["MYOB Name"].match(/^USE_EXPECT_VALUE(.*)$/)) {
            doc = document({"fields": expectedOutputFields});
          } else {
            doc = document({"fields": inputFields});
          }
          // Skip calculation to test raw data
          if (!(row["MYOB Name"].match(/^SKIP_CALC(.*)$/)) && !(row["MYOB Name"].match(/^USE_EXPECT_VALUE(.*)$/))) {
            // Need to do calculation first for calculation validation
            doc.calculate();
          }
          doc.validate();
          var lodgeErrors = doc.validateForLodgement();
          var actualOutputFields = doc.data().fields;

          // If next 2 rows are available & have no name
          // Assume to be Error Code & Message Code
          //       Can have multiple errors & messages per field
          //       by having all error codes in the single error code cell
          //       with corresponding message codes in the single message code cell
          //       separated by a separator "|"
          if (index + 2 <= dataRows.length && !dataRows[index + 1]["MYOB Name"] && !dataRows[index + 2]["MYOB Name"]) {
            expectedErrorCodes = dataRows[index + 1];
            delete expectedErrorCodes["MYOB Name"];
            expectedMessageCodes = dataRows[index + 2];
            delete expectedMessageCodes["MYOB Name"];

            // Skip test if Number of Error Codes <> Number of Message Codes
            if (expectedErrorCodes.length !== expectedMessageCodes.length) {
              return;
            }

            // Actual errors
            var actualErrorFields =  Object.keys(actualOutputFields).filter(function(fieldId) {
              if (lodgeErrors[fieldId] && !expectedErrorCodes[fieldId]) {
                return fieldId;
              }
            });

            // Combine expected and actual errors
            var allErrorFields = Object.keys(expectedErrorCodes).filter(function(fieldId) {
              if (expectedErrorCodes[fieldId]) {
                return fieldId;
              }
            });
            allErrorFields = allErrorFields.concat(actualErrorFields);

            // Check all errors
            allErrorFields.forEach(function (fieldId) {
              if (!expectedErrorCodes[fieldId] && !lodgeErrors[fieldId]) {
                return;
              }
              else {
                var expectedErrorCode = [];
                var expectedMessageCode = [];
                var expectedErrorLength = 0;
                if (expectedErrorCodes[fieldId]) {
                  expectedErrorCode = Array.prototype.slice.call(expectedErrorCodes[fieldId].split("|"));
                  expectedMessageCode = expectedMessageCodes[fieldId] && expectedMessageCodes[fieldId].split("|");
                  expectedErrorLength = expectedErrorCode.length;
                }
                expect(lodgeErrors[fieldId], "Missing mandatory error for " + fieldId).to.exist;
                expect(expectedErrorCodes[fieldId], "Missing expected errors for " + fieldId).to.exist;
                expect(lodgeErrors[fieldId], "Missing errors for " + fieldId).to.have.length(expectedErrorLength);
                var actualErrorCode = [];
                var actualMessageCode = [];
                lodgeErrors[fieldId].forEach(function(mandatoryError) {
                  actualErrorCode.push(mandatoryError.errorcode);
                  actualMessageCode.push(mandatoryError.messagecode);
                });
                expect(expectedErrorCode).to.include.members(actualErrorCode);
                expect(expectedMessageCode).to.include.members(actualMessageCode);
              }
            });
          } else {
            // No error code & message code specified
            // Validate should not cause any error
            Object.keys(actualOutputFields).forEach(function (fieldId) {
              // if fields are valid, errors should not exist
              expect(lodgeErrors[fieldId]).to.not.exist;
            });
          }
        });

      });
    });

  });
}

describe("Validate for Lodgement ", function () {
  var lodgeData = fs.readFileSync(__dirname + "/lodgeData.csv");
  lodgeValidation(lodgeData, this.title);
});

