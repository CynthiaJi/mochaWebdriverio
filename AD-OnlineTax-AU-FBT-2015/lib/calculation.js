"use strict";

var decimal = require("./decimal");

var isOverseasCountry = function(countryCode) {
  return !(/(^(\s+|AU)$|^$)/i.test(countryCode));
};

module.exports = {
  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23A
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Aa
      var employeeContribution = document.get("ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.EmployeeContribution.Amount");  // 23Ab
      return function () {
        return grossTaxable().minus(employeeContribution()).toNotNegative();
      };
    }
  },

  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23B
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Ba
      var employeeContribution = document.get("ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.EmployeeContribution.Amount");  // 23Bb
      return function () {
        return grossTaxable().minus(employeeContribution()).toNotNegative();
      };
    }
  },

  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23C
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Ca
      var valueOfReductions = document.get("ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount");  // 23Cc
      return function () {
        return grossTaxable().minus(valueOfReductions()).toNotNegative();
      };
    }
  },

  "ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23D
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Da
      return function () {
        return grossTaxable();
      };
    }
  },

  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23E
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Ea
      var employeeContribution = document.get("ReportingParty.ExpensePayment.Remuneration.FringeBenefits.EmployeeContribution.Amount");   // 23Eb
      var valueOfReductions = document.get("ReportingParty.ExpensePayment.Remuneration.FringeBenefits.Reduction.Amount");  // 23Ec
      return function () {
        return grossTaxable().minus(employeeContribution()).minus(valueOfReductions()).toNotNegative();
      };
    }
  },

  "ReportingParty.Housing.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23F
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.Housing.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Fa
      var employeeContribution = document.get("ReportingParty.Housing.Remuneration.FringeBenefits.EmployeeContribution.Amount");   // 23Fb
      return function () {
        return grossTaxable().minus(employeeContribution()).toNotNegative();
      };
    }
  },

  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23G
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Ga
      var valueOfReductions = document.get("ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.Reduction.Amount");  // 23Gc
      return function () {
        return grossTaxable().minus(valueOfReductions()).toNotNegative();
      };
    }
  },

  "ReportingParty.Board.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23J
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.Board.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Ja
      var employeeContribution = document.get("ReportingParty.Board.Remuneration.FringeBenefits.EmployeeContribution.Amount");   // 23Jb
      var valueOfReductions = document.get("ReportingParty.Board.Remuneration.FringeBenefits.Reduction.Amount");  // 23Jc
      return function () {
        return grossTaxable().minus(employeeContribution()).minus(valueOfReductions()).toNotNegative();
      };
    }
  },

  "ReportingParty.Property.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23K
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.Property.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Ka
      var employeeContribution = document.get("ReportingParty.Property.Remuneration.FringeBenefits.EmployeeContribution.Amount");   // 23Kb
      var valueOfReductions = document.get("ReportingParty.Property.Remuneration.FringeBenefits.Reduction.Amount");  // 23Kc
      return function () {
        return grossTaxable().minus(employeeContribution()).minus(valueOfReductions()).toNotNegative();
      };
    }
  },

  "ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23L
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23La
      return function () {
        return grossTaxable();
      };
    }
  },

  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23M
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Ma
      var employeeContribution = document.get("ReportingParty.OtherBenefits.Remuneration.FringeBenefits.EmployeeContribution.Amount");   // 23Mb
      var valueOfReductions = document.get("ReportingParty.OtherBenefits.Remuneration.FringeBenefits.Reduction.Amount");  // 23Mc
      return function () {
        return grossTaxable().minus(employeeContribution()).minus(valueOfReductions()).toNotNegative();
      };
    }
  },

  "ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23N
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Na
      var employeeContribution = document.get("ReportingParty.CarParking.Remuneration.FringeBenefits.EmployeeContribution.Amount");   // 23Nb
      return function () {
        return grossTaxable().minus(employeeContribution()).toNotNegative();
      };
    }
  },

  "ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23P
    "calculate": function (document) {
      var grossTaxable = document.get("ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount");   // 23Pa
      return function () {
        return grossTaxable();
      };
    }
  },

  "ReportingParty.FringeBenefitsTax.Type1Aggregate.Amount": { // 14A
    "calculate": function (document) {
      var type1BaseAmount = document.get("ReportingParty.Remuneration.FringeBenefits.Type1Aggregate.Amount");
      var type1Factor = decimal("2.0802");
      return function () {
        return type1BaseAmount().times(type1Factor).roundDown(1);
      };
    }
  },

  "ReportingParty.FringeBenefitsTax.Type2Aggregate.Amount": { // 14B
    "calculate": function (document) {
      var type2BaseAmount = document.get("ReportingParty.Remuneration.FringeBenefits.Type2Aggregate.Amount");
      var type2Factor = decimal("1.8868");
      return function () {
        return type2BaseAmount().times(type2Factor).roundDown(1);
      };
    }
  },

  "ReportingParty.Remuneration.FringeBenefits.TaxableTotal.Amount": { // 15
    "calculate": function (document) {
      var type1AggregateAmount = document.get("ReportingParty.FringeBenefitsTax.Type1Aggregate.Amount");  // 14A
      var type2AggregateAmount = document.get("ReportingParty.FringeBenefitsTax.Type2Aggregate.Amount");  // 14B
      var aggregateNonExemptAmount = document.get("ReportingParty.Remuneration.FringeBenefits.AggregateNonExempt.Amount");  // 14C
      return function () {
        return type1AggregateAmount().plus(type2AggregateAmount()).plus(aggregateNonExemptAmount());
      };
    }
  },

  "ReportingParty.FringeBenefitsTax.Payable.Amount": {  // 16
    "calculate": function (document) {
      var fringeBenefitsTaxableAmount = document.get("ReportingParty.Remuneration.FringeBenefits.TaxableTotal.Amount");  // 15
      var fbtTaxRate = decimal("0.47");
      return function () {
        return fringeBenefitsTaxableAmount().times(fbtTaxRate).round(2);
      };
    }
  },

  "ReportingParty.FringeBenefitsTax.Rebate.Amount": {  // 18
    "calculate": function (document) {
      var amountOfTaxPayable = document.get("ReportingParty.FringeBenefitsTax.Payable.Amount");  // 16
      var aggregateNonRebatableAmount = document.get("ReportingParty.FringeBenefitsTax.NonRebatableAggregate.Amount");  // 17
      var rebateRate = decimal("0.48");
      return function () {
        return amountOfTaxPayable().minus(aggregateNonRebatableAmount()).times(rebateRate).round(2);
      };
    }
  },

  "ReportingParty.FringeBenefitsTax.Liability.Amount": {  // 19
    "calculate": function (document) {
      var amountOfTaxPayable = document.get("ReportingParty.FringeBenefitsTax.Payable.Amount");  // 16
      var amountOfRebate = document.get("ReportingParty.FringeBenefitsTax.Rebate.Amount");  // 18
      return function () {
        return amountOfTaxPayable().minus(amountOfRebate());
      };
    }
  },

  "ReportingParty.FringeBenefitsTax.AdjustmentDue.Amount": {  // 21 (payment due, if positive), 22 (credit due, if negative)
    "calculate": function (document) {
      var subTotal = document.get("ReportingParty.FringeBenefitsTax.Liability.Amount");  // 19
      var instalmentAmounts = document.get("ReportingParty.FringeBenefitsTax.LiabilityInstalmentsTotal.Amount");  // 20
      return function () {
        return subTotal().minus(instalmentAmounts());
      };
    }
  },

  // Non-Amount calculations
  "ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator": {  // 5
    "calculate": function (document) {
      var countryCode = document.getString("ReportingParty.Employer.Postal.AddressDetails.Country.Code");
      return isOverseasCountry(countryCode);
    }
  },

  "ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator": {  // 6
    "calculate": function (document) {
      var countryCode = document.getString("ReportingParty.Employer.Previous.Postal.AddressDetails.Country.Code");
      return isOverseasCountry(countryCode);
    }
  },

  "ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator": {  // 7
    "calculate": function (document) {
      var countryCode = document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Country.Code");
      return isOverseasCountry(countryCode);
    }
  }

};
