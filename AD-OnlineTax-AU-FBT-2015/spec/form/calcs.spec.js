"use strict";

var fs = require("fs"),
  path = require("path"),
  expect = require("chai").expect,
  csv = require("csv"),
  decimal = require("../../lib/decimal.js"),
  document = require("../../lib/document.js");

describe("Calculations", function () {

  var data = fs.readFileSync(path.join(__dirname, "./calcData.csv"));

  csv.parse(data, {columns: true}, function (err, allRows) {
    console.log(allRows.length);
    if (err) {
      throw err;
    }
    var sbrEditableRow = allRows[1];
    var userInputRow = allRows[2];
    var dataRows = allRows.slice(3);
    dataRows.forEach(function (row, index) {
      if (!row["MYOB Name"]) return;  // skip if no name

      it("AU FBT 2015 Row " + (index + 5) + ": " + row["MYOB Name"], function () {
        var inputFields = {};
        var expectedOutputFields = {};
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
        var doc = document({"fields": inputFields});
        doc.calculate();
        var actualOutputFields = doc.data().fields;
        Object.keys(actualOutputFields).forEach(function (fieldId) {
          // skip fields not expecting value
          if (!expectedOutputFields[fieldId] || !expectedOutputFields[fieldId].value) return;
          // TODO: Extract custom matcher for decimal
          var actualValue = decimal(actualOutputFields[fieldId].value).toString();
          var expectedValue = decimal(expectedOutputFields[fieldId].value).toString();
          expect(actualValue).to.equal(expectedValue, fieldId);
        });
      });

    });
  });

});
