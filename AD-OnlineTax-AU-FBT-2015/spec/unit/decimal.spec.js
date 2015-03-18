"use strict";

var decimal = require("../../lib/decimal")
  , Big = require("big.js")
  , expect = require("chai").expect;

describe("Decimal", function () {

  describe("function", function () {

    it("should return object that can interoperate with big.js", function () {
      expect(decimal(3).eq(new Big(3))).to.equal(true);
      expect(decimal("2").plus(new Big("3")).eq(new Big("5"))).to.equal(true);
    });

    it("should return blank when input is empty string, null, or undefined", function () {
      expect(decimal("").isBlank()).to.equal(true);
      expect(decimal(null).isBlank()).to.equal(true);
      expect(decimal(void 0).isBlank()).to.equal(true);
    });

    it("should return non-blank value when input is number", function () {
      expect(decimal(0).isBlank()).to.equal(false);
      expect(decimal(1).isBlank()).to.equal(false);
      expect(decimal(-1).isBlank()).to.equal(false);
      expect(decimal(1000000).isBlank()).to.equal(false);
      expect(decimal(0.1).isBlank()).to.equal(false);
    });

    it("should return non-blank value when input is string containing number", function () {
      expect(decimal("0").isBlank()).to.equal(false);
      expect(decimal("1").isBlank()).to.equal(false);
      expect(decimal("-1").isBlank()).to.equal(false);
      expect(decimal("1000000").isBlank()).to.equal(false);
      expect(decimal("0.1").isBlank()).to.equal(false);
    });

    it("should return decimal value when input is string containing number", function () {
      expect(decimal("0").valueOf()).to.equal("0");
      expect(decimal("1").valueOf()).to.equal("1");
      expect(decimal("-1").valueOf()).to.equal("-1");
      expect(decimal("1000000").valueOf()).to.equal("1000000");
      expect(decimal("0.1").valueOf()).to.equal("0.1");
    });

    it("should ignore dollar signs, commas, and spaces in input string", function () {
      expect(decimal("$, ").valueOf()).to.equal("");
      expect(decimal("$1").valueOf()).to.equal("1");
      expect(decimal("$-1").valueOf()).to.equal("-1");
      expect(decimal("$1,000,000").valueOf()).to.equal("1000000");
      expect(decimal("0.1 ").valueOf()).to.equal("0.1");
    });

    it("should return blank for invalid input", function () {
      expect(decimal("abc").isBlank()).to.equal(true);
      expect(decimal("abc123").isBlank()).to.equal(true);
      expect(decimal("123abc").isBlank()).to.equal(true);
      expect(decimal("123abc123").isBlank()).to.equal(true);
      expect(decimal("$123abc123").isBlank()).to.equal(true);
      expect(decimal("-$123abc123").isBlank()).to.equal(true);
    });

  });

  describe("calculations", function () {

    it("should work as per big.js", function () {
      expect(decimal(3).abs().valueOf()).to.equal("3");
      expect(decimal(0).abs().valueOf()).to.equal("0");
      expect(decimal(-3).abs().valueOf()).to.equal("3");
      expect(decimal(10).div(decimal(2)).valueOf()).to.equal("5");
      expect(decimal(10).minus(decimal(2)).valueOf()).to.equal("8");
      expect(decimal(11).mod(decimal(2)).valueOf()).to.equal("1");
      expect(decimal(3).toNotNegative().valueOf()).to.equal("3");
      expect(decimal(0).toNotNegative().valueOf()).to.equal("0");
      expect(decimal(-3).toNotNegative().valueOf()).to.equal("0");
      expect(decimal(10).plus(decimal(2)).valueOf()).to.equal("12");
      expect(decimal(10).pow(2).valueOf()).to.equal("100");
      expect(decimal("3.49999").round().valueOf()).to.equal("3");
      expect(decimal("3.5").round().valueOf()).to.equal("4");
      expect(decimal(9).sqrt().valueOf()).to.equal("3");
      expect(decimal(10).times(decimal(2)).valueOf()).to.equal("20");
    });

    it("should round down to nearest cents", function () {
      expect(decimal("3.49").roundDown(0.05).valueOf()).to.equal("3.45");
      expect(decimal("3.49").roundDown(decimal("0.05")).valueOf()).to.equal("3.45");
      expect(decimal("3.45").roundDown(0.05).valueOf()).to.equal("3.45");
      expect(decimal("3.44").roundDown(0.05).valueOf()).to.equal("3.4");
      expect(decimal("3.49").roundDown(0.1).valueOf()).to.equal("3.4");
      expect(decimal("3.99").roundDown(1).valueOf()).to.equal("3");
      expect(decimal("").roundDown(0.05).valueOf()).to.equal("");
    });

    it("on blank values always return blank value except for plus and minus", function () {
      expect(decimal("").abs().valueOf()).to.equal("");
      expect(decimal("").div(decimal(2)).valueOf()).to.equal("");
      expect(decimal("").mod(decimal(2)).valueOf()).to.equal("");
      expect(decimal("").toNotNegative().valueOf()).to.equal("");
      expect(decimal("").pow(2).valueOf()).to.equal("");
      expect(decimal("").round().valueOf()).to.equal("");
      expect(decimal("").sqrt().valueOf()).to.equal("");
      expect(decimal("").times(decimal(2)).valueOf()).to.equal("");
    });

    it("on blank values assume blank is zero for plus and minus", function () {
      expect(decimal("").minus(decimal(2)).isBlank()).to.equal(false);
      expect(decimal("").minus(decimal(2)).valueOf()).to.equal("-2");
      expect(decimal("").plus(decimal(2)).isBlank()).to.equal(false);
      expect(decimal("").plus(decimal(2)).valueOf()).to.equal("2");
    });

    it("with blank values as arguments always return blank value except for plus and minus", function () {
      expect(decimal(10).div(decimal("")).valueOf()).to.equal("");
      expect(decimal(10).mod(decimal("")).valueOf()).to.equal("");
      expect(decimal(10).times(decimal("")).valueOf()).to.equal("");
    });

    it("with blank values as arguments assume blank is zero for plus and minus", function () {
      expect(decimal(10).minus(decimal("")).valueOf()).to.equal("10");
      expect(decimal(10).plus(decimal("")).valueOf()).to.equal("10");
    });

    it("on blank values and with blank values as arguments always return blank value", function () {
      expect(decimal("").div(decimal("")).valueOf()).to.equal("");
      expect(decimal("").minus(decimal("")).valueOf()).to.equal("");
      expect(decimal("").mod(decimal("")).valueOf()).to.equal("");
      expect(decimal("").plus(decimal("")).valueOf()).to.equal("");
      expect(decimal("").times(decimal("")).valueOf()).to.equal("");
    });

  });

  describe("comparisons", function () {

    it("should work as per big.js", function () {
      expect(decimal(3).cmp(decimal(3))).to.equal(0);
      expect(decimal(3).cmp(decimal(2))).to.equal(1);
      expect(decimal(3).cmp(decimal(4))).to.equal(-1);
      expect(decimal(3).eq(decimal(3))).to.equal(true);
      expect(decimal(3).eq(decimal(2))).to.equal(false);
      expect(decimal(3).eq(decimal(-3))).to.equal(false);
      expect(decimal(3).gt(decimal(3))).to.equal(false);
      expect(decimal(3).gt(decimal(2))).to.equal(true);
      expect(decimal(3).gt(decimal(4))).to.equal(false);
      expect(decimal(3).gte(decimal(3))).to.equal(true);
      expect(decimal(3).gte(decimal(2))).to.equal(true);
      expect(decimal(3).gte(decimal(4))).to.equal(false);
      expect(decimal(3).lt(decimal(3))).to.equal(false);
      expect(decimal(3).lt(decimal(2))).to.equal(false);
      expect(decimal(3).lt(decimal(4))).to.equal(true);
      expect(decimal(3).lte(decimal(3))).to.equal(true);
      expect(decimal(3).lte(decimal(2))).to.equal(false);
      expect(decimal(3).lte(decimal(4))).to.equal(true);
    });

    it("on blank values assume that blank is zero", function () {
      expect(decimal("").cmp(decimal(0))).to.equal(0);
      expect(decimal("").cmp(decimal(2))).to.equal(-1);
      expect(decimal("").cmp(decimal(-2))).to.equal(1);
      expect(decimal("").eq(decimal(0))).to.equal(true);
      expect(decimal("").eq(decimal(2))).to.equal(false);
      expect(decimal("").eq(decimal(-1))).to.equal(false);
      expect(decimal("").gt(decimal(0))).to.equal(false);
      expect(decimal("").gt(decimal(2))).to.equal(false);
      expect(decimal("").gt(decimal(-2))).to.equal(true);
      expect(decimal("").gte(decimal(0))).to.equal(true);
      expect(decimal("").gte(decimal(2))).to.equal(false);
      expect(decimal("").gte(decimal(-2))).to.equal(true);
      expect(decimal("").lt(decimal(0))).to.equal(false);
      expect(decimal("").lt(decimal(2))).to.equal(true);
      expect(decimal("").lt(decimal(-2))).to.equal(false);
      expect(decimal("").lte(decimal(0))).to.equal(true);
      expect(decimal("").lte(decimal(2))).to.equal(true);
      expect(decimal("").lte(decimal(-2))).to.equal(false);
    });

    it("with blank values as arguments assume that blank is zero", function () {
      expect(decimal(0).cmp(decimal(""))).to.equal(0);
      expect(decimal(2).cmp(decimal(""))).to.equal(1);
      expect(decimal(-2).cmp(decimal(""))).to.equal(-1);
      expect(decimal(0).eq(decimal(""))).to.equal(true);
      expect(decimal(2).eq(decimal(""))).to.equal(false);
      expect(decimal(-2).eq(decimal(""))).to.equal(false);
      expect(decimal(0).gt(decimal(""))).to.equal(false);
      expect(decimal(2).gt(decimal(""))).to.equal(true);
      expect(decimal(-2).gt(decimal(""))).to.equal(false);
      expect(decimal(0).gte(decimal(""))).to.equal(true);
      expect(decimal(2).gte(decimal(""))).to.equal(true);
      expect(decimal(-2).gte(decimal(""))).to.equal(false);
      expect(decimal(0).lt(decimal(""))).to.equal(false);
      expect(decimal(2).lt(decimal(""))).to.equal(false);
      expect(decimal(-2).lt(decimal(""))).to.equal(true);
      expect(decimal(0).lte(decimal(""))).to.equal(true);
      expect(decimal(2).lte(decimal(""))).to.equal(false);
      expect(decimal(-2).lte(decimal(""))).to.equal(true);
    });

  });

  describe("conversions", function () {

    it("should work as per big.js", function () {
      expect(decimal("1.23456").toJSON()).to.equal("1.23456");
      expect(decimal("1.23456").valueOf()).to.equal("1.23456");
      expect(decimal("1.23456").toString()).to.equal("1.23456");
      expect(decimal("1.23456").toExponential()).to.equal("1.23456e+0");
      expect(decimal("1.23456").toFixed(3)).to.equal("1.235");
      expect(decimal("1.23456").toPrecision(3)).to.equal("1.23");
    });

    it("toString should return two decimal digits if number only has one decimal digit", function () {
      expect(decimal("1.2").toJSON()).to.equal("1.2");
      expect(decimal("1.23").toJSON()).to.equal("1.23");
      expect(decimal("1.234").toJSON()).to.equal("1.234");
      expect(decimal("1.2").toString()).to.equal("1.20");
      expect(decimal("1.23").toString()).to.equal("1.23");
      expect(decimal("1.234").toString()).to.equal("1.234");
      expect(decimal("1.2").valueOf()).to.equal("1.2");
      expect(decimal("1.23").valueOf()).to.equal("1.23");
      expect(decimal("1.234").valueOf()).to.equal("1.234");
    });

    it("should return empty strings for blank values", function () {
      expect(decimal("").toJSON()).to.equal("");
      expect(decimal("").valueOf()).to.equal("");
      expect(decimal("").toString()).to.equal("");
      expect(decimal("").toExponential()).to.equal("");
      expect(decimal("").toFixed(3)).to.equal("");
      expect(decimal("").toPrecision(3)).to.equal("");
    });

  });

});
