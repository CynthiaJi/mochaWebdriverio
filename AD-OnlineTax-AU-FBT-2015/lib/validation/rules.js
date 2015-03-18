"use strict";

var utils = require("./utils")
  , nameRules = require("./nameRules")
  , addressRules = require("./addressRules")
  , phoneEmailRules = require("./phoneEmailRules");

// convenience function for the common case of amount validation
var validateAmount = function (options) {
  return function (document) {
    var errors = [];
    var value = document.getString(options.fieldId);
    if (!utils[options.fnname](value, options.maxdigits)) {
      errors.push(utils.error(options.errorcode, options.messagecode));
    }
    return errors;
  };
};

// convenience function for the common case of number (non-amount) validation
var validateNumber = function (options) {
  return function (document) {
    var errors = [];
    var value = document.getString(options.fieldId);
    if (!utils.isNumber(value, options.mindigits, options.maxdigits)) {
      errors.push(utils.error(options.errorcode, options.messagecode));
    }
    return errors;
  };
};
var validateBranchNumber = function (options) {
  return function (document) {
    var errors = [];
    var value = document.getString(options.fieldId);
    if (!utils.isNumber(value, options.mindigits, options.maxdigits) || value <= 12000) {
      errors.push(utils.error(options.errorcode, options.messagecode));
    }
    return errors;
  };
};
var validateAccountNumber = function (options) {
  return function (document) {
    var errors = [];
    var value = document.getString(options.fieldId);
    if (!(/^[A-Za-z0-9\.,\?(){}:;|\-_=\\\/@#$%\*=&+"]*$/.test(value))) {
      errors.push(utils.error("VR.ATO.GEN.432036", "CMN.ATO.GEN.432036"));
    }
    return errors;
  };
};

// convenience function for the common case of tfn, abn validation
var validateIdentifier = function (options) {
  return function (document) {
    var errors = [];
    var value = document.getString(options.fieldId);
    if (!utils[options.fnname](value)) {
      errors.push(utils.error(options.errorcode, options.messagecode));
    }
    return errors;
  };
};

// convenience function for the common case of string validation
var validateString = function (options) {
  return function (document) {
    var errors = [];
    var value = document.getString(options.fieldId);
    if (!utils[options.fnname](value, options.maxLength)) {
      errors.push(utils.error(options.errorcode, options.messagecode));
    }
    return errors;
  };
};

// convenience function for the common case of date validation
var validateDate = function (options) {
  return function (document) {
    var errors = [];
    var value = document.getString(options.fieldId);

    // assume date value in ddmmyyyy format
    if (value.length === 7) {
      value = "0" + value;
    }
    var dateValue = Date.parse(value.replace(/^(\d\d)(\d\d)(\d{4})$/,"$3-$2-$1"));

    if (isNaN(dateValue)) {
      errors.push(utils.error("VR.ATO.FBT", "CMN.ATO.GEN.001008"));
    } else {

      if (!utils[options.fnname](new Date(dateValue).setHours(0, 0, 0, 0))) {
        errors.push(utils.error(options.errorcode, options.messagecode));
      }
    }
    return errors;
  };
};

module.exports = {
  "ReportingParty.Identifiers.TaxFileNumber.Identifier": {  // 1
    "validate": validateIdentifier({
      "fieldId": "ReportingParty.Identifiers.TaxFileNumber.Identifier",
      "fnname": "isTfn",
      "errorcode": "VR.ATO.FBT.000418",
      "messagecode": "CMN.ATO.FBT.000418"
    })
  },

  "ReportingParty.Identifiers.AustralianBusinessNumber.Identifier": {  // 2
    "isOptional": function() {return true},
    "validate": validateIdentifier({
      "fieldId": "ReportingParty.Identifiers.AustralianBusinessNumber.Identifier",
      "fnname": "isAbn",
      "errorcode": "VR.ATO.GEN.000202",
      "messagecode": "CMN.ATO.GEN.200011"
    })
  },

  "Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual": {  // 3
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required");
    }
  },

  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.Title.Text": {  // 3
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameTitle({
        "fieldValue": document.getString("ReportingParty.TrusteeSeniorPartner.PersonNameDetails.Title.Text")
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.FamilyName.Text": {  // 3
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual") !== "Individual";
    },
    "validate": function (document) {
      var familyName = document.getString("ReportingParty.TrusteeSeniorPartner.PersonNameDetails.FamilyName.Text");
      return nameRules.validateFamilyName({
        "fieldValue": familyName,
        "fieldDisabled": this.isDisabled(document),
        "orgName": document.getString("ReportingParty.TrusteeSeniorPartner.OrganisationNameDetails.OrganisationalName.Text"),
        "maxLength": 30,
        "lengthErrorcode": "VR.ATO.FBT.010045",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.familyNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.GivenName.Text": {  // 3
    "isDisabled": function (document) {
      if(!document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual")){
        return;
      }
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var firstName = document.getString("ReportingParty.TrusteeSeniorPartner.PersonNameDetails.GivenName.Text");
      return nameRules.validateFirstName({
        "fieldValue": firstName,
        "otherNameValue": document.getString("ReportingParty.TrusteeSeniorPartner.PersonNameDetails.OtherGivenName.Text"),
        "maxLength": 15,
        "lengthErrorcode": "VR.ATO.FBT.010046",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.firstNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.OtherGivenName.Text": {  // 3
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var otherName = document.getString("ReportingParty.TrusteeSeniorPartner.PersonNameDetails.OtherGivenName.Text");
      return nameRules.validateOtherName({
        "fieldValue": otherName,
        "firstName" : document.getString("ReportingParty.TrusteeSeniorPartner.PersonNameDetails.GivenName.Text"),
        "maxLength": 30,
        "lengthErrorcode": "VR.ATO.FBT.010047",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.otherNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.NameSuffix.Text": {  // 3
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameSuffix({
        "fieldValue": document.getString("ReportingParty.TrusteeSeniorPartner.PersonNameDetails.NameSuffix.Text")
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.OrganisationNameDetails.OrganisationalName.Text": {  // 3
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required")
        || !document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual") === "Individual";
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual") === "Individual";
    },
    "validate": function (document) {
      var orgName = document.getString("ReportingParty.TrusteeSeniorPartner.OrganisationNameDetails.OrganisationalName.Text");
      return nameRules.validateOrgName({
        "fieldValue": orgName,
        "maxLength": 76,
        "lengthErrorcode": "VR.ATO.FBT.010056",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.orgNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.PersonNameDetails.Title.Text": {  // 4
    "isDisabled": function (document) {
      return document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameTitle({
        "fieldValue": document.getString("ReportingParty.Employer.PersonNameDetails.Title.Text")
      });
    }
  },

  "ReportingParty.Employer.PersonNameDetails.FamilyName.Text": {  // 4
    "isDisabled": function (document) {
      return document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function (document) {
      return document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual") !== "Individual";
    },
    "validate": function (document) {
      var familyName = document.getString("ReportingParty.Employer.PersonNameDetails.FamilyName.Text");
      return nameRules.validateFamilyName({
        "fieldValue": familyName,
        "fieldDisabled": this.isDisabled(document),
        "orgName": document.getString("ReportingParty.Employer.OrganisationNameDetails.OrganisationalName.Text"),
        "maxLength": 30,
        "lengthErrorcode": "VR.ATO.FBT.010036",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.familyNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.PersonNameDetails.GivenName.Text": {  // 4
    "isDisabled": function (document) {
      return document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var firstName = document.getString("ReportingParty.Employer.PersonNameDetails.GivenName.Text");
      return nameRules.validateFirstName({
        "fieldValue": firstName,
        "otherNameValue": document.getString("ReportingParty.Employer.PersonNameDetails.OtherGivenName.Text"),
        "maxLength": 15,
        "lengthErrorcode": "VR.ATO.FBT.010037",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.firstNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.PersonNameDetails.OtherGivenName.Text": {  // 4
    "isDisabled": function (document) {
      return document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var otherName = document.getString("ReportingParty.Employer.PersonNameDetails.OtherGivenName.Text");
      return nameRules.validateOtherName({
        "fieldValue": otherName,
        "firstName" : document.getString("ReportingParty.Employer.PersonNameDetails.GivenName.Text"),
        "maxLength": 30,
        "lengthErrorcode": "VR.ATO.FBT.010038",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.otherNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.PersonNameDetails.NameSuffix.Text": {  // 4
    "isDisabled": function (document) {
      return document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameSuffix({
        "fieldValue": document.getString("ReportingParty.Employer.PersonNameDetails.NameSuffix.Text")
      });
    }
  },

  "ReportingParty.Employer.OrganisationNameDetails.OrganisationalName.Text": {  // 4
    "isDisabled": function (document) {
      return !document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual")
        || document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual") === "Individual";
    },
    "isOptional": function (document) {
      return !document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual")
        || document.getString("Myob.ReportingParty.Employer.IndividualOrNonIndividual") === "Individual";
    },
    "validate": function (document) {
      var orgName = document.getString("ReportingParty.Employer.OrganisationNameDetails.OrganisationalName.Text");
      return nameRules.validateOrgName({
        "fieldValue": orgName,
        "maxLength": 76,
        "lengthErrorcode": "VR.ATO.FBT.010056",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.orgNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.Postal.AddressDetails.Line1.Text": {  // 5
    "validate": function (document) {
      return addressRules.validateAddressLine1({
        "fieldValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.Line1.Text"),
        "addr2Value": document.getString("ReportingParty.Employer.Postal.AddressDetails.Line2.Text"),
        "fieldDisabled": false,
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.Line2.Text": {  // 5
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine2({
        "fieldValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.Line2.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.Line3.Text": {  // 5
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine3(document.getString("ReportingParty.Employer.Postal.AddressDetails.Line3.Text"));
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.Line4.Text": {  // 5
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine4(document.getString("ReportingParty.Employer.Postal.AddressDetails.Line4.Text"));
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text": {  // 5
    "validate": function (document) {
      return addressRules.validateLocalityName({
        "fieldValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code": {  // 5
    "isOptional": function (document) {
      return document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateStateCode({
        "stateValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code"),
        "postcodeValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.Postcode.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.Postcode.Text": {  // 5
    "isOptional": function (document) {
      return document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateStateAndPostcode({
        "stateValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code"),
        "postcodeValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.Postcode.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator": {  // 5
    "validate": function (document) {
      return addressRules.validateOverseasIndicator({
        "fieldValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator"),
        "countryCode": document.getString("ReportingParty.Employer.Postal.AddressDetails.Country.Code"),
        "fieldDisabled": false,
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.Country.Code": {  // 5
    "isOptional": function (document) {
      return !document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateCountryCode({
        "fieldValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.Country.Code"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Postal.AddressDetails.CountryName.Text": {  // 5
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateCountryName({
        "fieldValue": document.getString("ReportingParty.Employer.Postal.AddressDetails.CountryName.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },

  "Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required");
    }
  },

  "ReportingParty.Employer.Previous.PersonNameDetails.Title.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required")
        || document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameTitle({
        "fieldValue": document.getString("ReportingParty.Employer.Previous.PersonNameDetails.Title.Text")
      });
    }
  },

  "ReportingParty.Employer.Previous.PersonNameDetails.FamilyName.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required")
        || document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required")
        || document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "validate": function (document) {
      var previousFamilyName = document.getString("ReportingParty.Employer.Previous.PersonNameDetails.FamilyName.Text");
      return nameRules.validateFamilyName({
        "fieldValue": previousFamilyName,
        "fieldDisabled": this.isDisabled(document),
        "orgName": document.getString("ReportingParty.Employer.Previous.OrganisationNameDetails.OrganisationalName.Text"),
        "maxLength": 30,
        "lengthErrorcode": "VR.ATO.FBT.010040",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.familyNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.Previous.PersonNameDetails.GivenName.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required")
        || document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var previousFirstName = document.getString("ReportingParty.Employer.Previous.PersonNameDetails.GivenName.Text");
      return nameRules.validateFirstName({
        "fieldValue": previousFirstName,
        "otherNameValue": document.getString("ReportingParty.Employer.Previous.PersonNameDetails.OtherGivenName.Text"),
        "maxLength": 15,
        "lengthErrorcode": "VR.ATO.FBT.010041",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.firstNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.Previous.PersonNameDetails.OtherGivenName.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required")
        || document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var previousOtherName = document.getString("ReportingParty.Employer.Previous.PersonNameDetails.OtherGivenName.Text");
      return nameRules.validateOtherName({
        "fieldValue": previousOtherName,
        "firstName" : document.getString("ReportingParty.Employer.Previous.PersonNameDetails.GivenName.Text"),
        "maxLength": 30,
        "lengthErrorcode": "VR.ATO.FBT.010042",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.otherNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.Previous.PersonNameDetails.NameSuffix.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required")
        || document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameSuffix({
        "fieldValue": document.getString("ReportingParty.Employer.Previous.PersonNameDetails.NameSuffix.Text")
      });
    }
  },

  "ReportingParty.Employer.Previous.OrganisationNameDetails.OrganisationalName.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required")
        || !document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual")
        || document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual") === "Individual";
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Name.Required")
        || document.getString("Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual") === "Individual";
    },
    "validate": function (document) {
      var previousOrgName = document.getString("ReportingParty.Employer.Previous.OrganisationNameDetails.OrganisationalName.Text");
      return nameRules.validateOrgName({
        "fieldValue": previousOrgName,
        "maxLength": 76,
        "lengthErrorcode": "VR.ATO.FBT.010056",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.orgNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Employer.Previous.AddressDetails.Line1.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "validate": function (document) {
      var prevAddr1 = document.getString("ReportingParty.Employer.Previous.AddressDetails.Line1.Text");
      var prevAddr2 = document.getString("ReportingParty.Employer.Previous.AddressDetails.Line2.Text");
      var prevSuburb = document.getString("ReportingParty.Employer.Previous.AddressDetails.LocalityName.Text");
      var prevPostcode = document.getString("ReportingParty.Employer.Previous.AddressDetails.Postcode.Text");
      var prevState = document.getString("ReportingParty.Employer.Previous.AddressDetails.StateOrTerritory.Code");
      var prevCountryCode = document.getString("ReportingParty.Employer.Previous.AddressDetails.Country.Code");

      var errors =  addressRules.validateAddressLine1({
        "fieldValue": prevAddr1,
        "addr2Value": prevAddr2,
        "fieldDisabled": this.isDisabled(document),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator")
      });

      var addr1 = document.getString("ReportingParty.Employer.Postal.AddressDetails.Line1.Text");
      var addr2 = document.getString("ReportingParty.Employer.Postal.AddressDetails.Line2.Text");
      var suburb = document.getString("ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text");
      var postcode = document.getString("ReportingParty.Employer.Postal.AddressDetails.Postcode.Text");
      var state = document.getString("ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code");
      var countryCode = document.getString("ReportingParty.Employer.Postal.AddressDetails.Country.Code");

      if (prevAddr1 == addr1 && prevAddr2 == addr2 && prevSuburb == suburb && prevPostcode == postcode && prevState == state && prevCountryCode == countryCode) {
        errors.push(utils.error("VR.ATO.FBT.000187", "CMN.ATO.FBT.000187"));
      }
      return errors;
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.Line2.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine2({
        "fieldValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.Line2.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.Line3.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine3(document.getString("ReportingParty.Employer.Previous.AddressDetails.Line3.Text"));
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.Line4.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine4(document.getString("ReportingParty.Employer.Previous.AddressDetails.Line4.Text"));
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.LocalityName.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "validate": function (document) {
      return addressRules.validateLocalityName({
        "fieldValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.LocalityName.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.StateOrTerritory.Code": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required")
        || document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateStateCode({
        "stateValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.StateOrTerritory.Code"),
        "postcodeValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.Postcode.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.Postcode.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required")
        || document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateStateAndPostcode({
        "stateValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.StateOrTerritory.Code"),
        "postcodeValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.Postcode.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "validate": function (document) {
      return addressRules.validateOverseasIndicator({
        "fieldValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator"),
        "countryCode": document.getString("ReportingParty.Employer.Previous.AddressDetails.Country.Code"),
        "fieldDisabled": this.isDisabled(document),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.Country.Code": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required")
        || !document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateCountryCode({
        "fieldValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.Country.Code"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.Employer.Previous.AddressDetails.CountryName.Text": {  // 6
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.Employer.Previous.Required");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateCountryName({
        "fieldValue": document.getString("ReportingParty.Employer.Previous.AddressDetails.CountryName.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },

  "ReportingParty.BusinessTradingName.OrganisationNameDetails.OrganisationalName.Text": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingName.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingName.Required");
    },
    "validate": function (document) {
      var orgName = document.getString("ReportingParty.BusinessTradingName.OrganisationNameDetails.OrganisationalName.Text");
      return nameRules.validateOrgName({
        "fieldValue": orgName,
        "maxLength": 76,
        "lengthErrorcode": "VR.ATO.FBT.010056",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.orgNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.BusinessTradingAddress.AddressDetails.Line1.Text": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "validate": function (document) {
      return addressRules.validateAddressLine1({
        "fieldValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Line1.Text"),
        "addr2Value": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Line2.Text"),
        "fieldDisabled": this.isDisabled(document),
        "isOverseasAddress": document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Line2.Text": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine2({
        "fieldValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Line2.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Line3.Text": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine3(document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Line3.Text"));
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Line4.Text": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateAddressLine4(document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Line4.Text"));
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.LocalityName.Text": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "validate": function (document) {
      return addressRules.validateLocalityName({
        "fieldValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.LocalityName.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.StateOrTerritory.Code": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required")
        || document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateStateCode({
        "stateValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.StateOrTerritory.Code"),
        "postcodeValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Postcode.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Postcode.Text": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required")
        || document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateStateAndPostcode({
        "stateValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.StateOrTerritory.Code"),
        "postcodeValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Postcode.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "validate": function (document) {
      return addressRules.validateOverseasIndicator({
        "fieldValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator"),
        "countryCode": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Country.Code"),
        "fieldDisabled": this.isDisabled(document),
        "isOverseasAddress": document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Country.Code": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required")
        || !document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator");
    },
    "validate": function (document) {
      return addressRules.validateCountryCode({
        "fieldValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.Country.Code"),
        "isOverseasAddress": document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.CountryName.Text": {  // 7
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.BusinessTradingAddress.Required");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return addressRules.validateCountryName({
        "fieldValue": document.getString("ReportingParty.BusinessTradingAddress.AddressDetails.CountryName.Text"),
        "isOverseasAddress": document.getBoolean("ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator")
      });
    }
  },

  "Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual": {  // 8
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required");
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required");
    }
  },

  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.Title.Text": {  // 8
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameTitle({
        "fieldValue": document.getString("ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.Title.Text")
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.FamilyName.Text": {  // 8
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "validate": function (document) {
      var previousFamilyName = document.getString("ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.FamilyName.Text");
      return nameRules.validateFamilyName({
        "fieldValue": previousFamilyName,
        "fieldDisabled": this.isDisabled(document),
        "orgName": document.getString("ReportingParty.TrusteeSeniorPartner.Previous.OrganisationNameDetails.OrganisationalName.Text"),
        "maxLength": 30,
        "lengthErrorcode": "VR.ATO.FBT.010048",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.familyNameErrorMessageCodes
      });
    }

  },

  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.GivenName.Text": {  // 8
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var previousFirstName = document.getString("ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.GivenName.Text");
      return nameRules.validateFirstName({
        "fieldValue": previousFirstName,
        "otherNameValue": document.getString("ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.OtherGivenName.Text"),
        "maxLength": 15,
        "lengthErrorcode": "VR.ATO.FBT.010049",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.firstNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.OtherGivenName.Text": {  // 8
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var previousOtherName = document.getString("ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.OtherGivenName.Text");
      return nameRules.validateOtherName({
        "fieldValue": previousOtherName,
        "firstName" : document.getString("ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.GivenName.Text"),
        "maxLength": 30,
        "lengthErrorcode": "VR.ATO.FBT.010050",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.otherNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.NameSuffix.Text": {  // 8
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual") !== "Individual";
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameSuffix({
        "fieldValue": document.getString("ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.NameSuffix.Text")
      });
    }
  },

  "ReportingParty.TrusteeSeniorPartner.Previous.OrganisationNameDetails.OrganisationalName.Text": {  // 8
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required")
        || !document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual") === "Individual";
    },
    "isOptional": function (document) {
      return !document.getBoolean("Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required")
        || document.getString("Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual") === "Individual";
    },
    "validate": function (document) {
      var previousOrgName = document.getString("ReportingParty.TrusteeSeniorPartner.Previous.OrganisationNameDetails.OrganisationalName.Text");
      return nameRules.validateOrgName({
        "fieldValue": previousOrgName,
        "maxLength": 76,
        "lengthErrorcode": "VR.ATO.FBT.010056",
        "lengthMessagecode": "CMN.ATO.GEN.001011",
        "errorMessageCodes": nameRules.orgNameErrorMessageCodes
      });
    }
  },

  "ReportingParty.Contact.Title.Text": {  // 9
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameTitle({
        "fieldValue": document.getString("ReportingParty.Contact.Title.Text")
      });
    }
  },

  "ReportingParty.Contact.FamilyName.Text": {  // 9
    "validate": function (document) {
      var familyName = document.getString("ReportingParty.Contact.FamilyName.Text");
      if (familyName) {
        return nameRules.validateFamilyName({
          "fieldValue": familyName,
          "fieldDisabled": false,
          "maxLength": 30,
          "lengthErrorcode": "VR.ATO.FBT.010052",
          "lengthMessagecode": "CMN.ATO.GEN.001011",
          "errorMessageCodes": nameRules.familyNameErrorMessageCodes
        });
      }
    }
  },

  "ReportingParty.Contact.GivenName.Text": {  // 9
    "isOptional": function() {return true},
    "validate": function (document) {
      var firstName = document.getString("ReportingParty.Contact.GivenName.Text");
      if (firstName) {
        return nameRules.validateFirstName({
          "fieldValue": firstName,
          "otherNameValue": document.getString("ReportingParty.Contact.OtherGivenName.Text"),
          "maxLength": 30,
          "lengthErrorcode": "VR.ATO.FBT.010053",
          "lengthMessagecode": "CMN.ATO.GEN.001011",
          "errorMessageCodes": nameRules.firstNameErrorMessageCodes
        });
      }
    }
  },

  "ReportingParty.Contact.OtherGivenName.Text": {  // 9
    "isOptional": function() {return true},
    "validate": function (document) {
      var otherName = document.getString("ReportingParty.Contact.OtherGivenName.Text");
      if (otherName) {
        return nameRules.validateOtherName({
          "fieldValue": otherName,
          "firstName" : document.getString("ReportingParty.Contact.GivenName.Text"),
          "maxLength": 30,
          "lengthErrorcode": "VR.ATO.FBT.010054",
          "lengthMessagecode": "CMN.ATO.GEN.001011",
          "errorMessageCodes": nameRules.otherNameErrorMessageCodes
        });
      }
    }
  },

  "ReportingParty.Contact.NameSuffix.Text": {  // 9
    "isOptional": function() {return true},
    "validate": function (document) {
      return nameRules.validateNameSuffix({
        "fieldValue": document.getString("ReportingParty.Contact.NameSuffix.Text")
      });
    }
  },

  "ReportingParty.ElectronicContact.Telephone.Area.Code": {  // 9
    "isOptional": function() {return true}
  },

  "ReportingParty.ElectronicContact.Telephone.Minimal.Number": {  // 9
    "isOptional": function (document) {
      this.lodgementError = utils.error("VR.ATO.FBT.000424", "CMN.ATO.FBT.000424");
      return document.getString("ReportingParty.ElectronicContact.Telephone.Minimal.Number")
        || document.getString("Intermediary.ElectronicContact.Telephone.Minimal.Number");
    },
    "validate": function (document) {
      var phone = document.getString("ReportingParty.ElectronicContact.Telephone.Minimal.Number");
      var errors =  phoneEmailRules.validatePhoneNumber({
        "fieldValue": phone
      });
      return errors;
    }
  },

  "ReportingParty.ElectronicContact.ElectronicMail.Address.Text": {  // 9
    "isOptional": function() {return true},
    "validate": function (document) {
      var email = document.getString("ReportingParty.ElectronicContact.ElectronicMail.Address.Text");
      var errors =  phoneEmailRules.validateEmailAddress({
        "fieldValue": email
      });
      if (email.length > 76) {
        errors.push(utils.error("VR.ATO.FBT.010027", "CMN.ATO.GEN.001011"));
      }
      return errors;
    }
  },

  "ReportingParty.Remuneration.FringeBenefits.Recipients.Count": {  // 10
    "isOptional": function() {return true},
    "validate": validateNumber({
      "fieldId": "ReportingParty.Remuneration.FringeBenefits.Recipients.Count",
      "mindigits": 0,
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010017",
      "messagecode": "CMN.ATO.GEN.400012"
    })
  },

  "ReportingParty.Report.CompletionHours.Number": {  // 11
    "isOptional": function() {return true},
    "validate": validateNumber({
      "fieldId": "ReportingParty.Report.CompletionHours.Number",
      "mindigits": 0,
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010019",
      "messagecode": "CMN.ATO.GEN.400012"
    })
  },

  "ReportingParty.Lodgment.FinalReturn.Indicator":{  // 12
  },

  "ReportingParty.FinancialInstitutionAccount.BankStateBranch.Number": {  // 13
    "isOptional": function (document) {
      return document.get("ReportingParty.FringeBenefitsTax.AdjustmentDue.Amount")().gte(0);
    },
    "validate": validateBranchNumber({
      "fieldId": "ReportingParty.FinancialInstitutionAccount.BankStateBranch.Number",
      "mindigits": 6,
      "maxdigits": 6,
      "errorcode": "VR.ATO.GEN.432035",
      "messagecode": "CMN.ATO.GEN.432035"
    })
  },

  "ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccount.Number": {  // 13
    "isOptional": function (document) {
      return document.get("ReportingParty.FringeBenefitsTax.AdjustmentDue.Amount")().gte(0);
    },
    "validate": validateAccountNumber({
        "fieldId": "ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccount.Number",
        "mindigits": 1,
        "maxdigits": 9,
        "errorcode": "VR.ATO.GEN.432035.1",
        "messagecode": "CMN.ATO.GEN.432035.1"
    })
  },

  "ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text": {  // 13
    "isOptional": function (document) {
      return document.get("ReportingParty.FringeBenefitsTax.AdjustmentDue.Amount")().gte(0);
    },
    "validate": function (document) {
      var errors = [];
      var accountName = document.getString("ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text");
      if (!/^[A-Za-z0-9-\.&#^*()/+<>\\ ]+$/.test(accountName)) {
        errors.push(utils.error("VR.ATO.GEN.432037", "CMN.ATO.GEN.432037"));
      }
      if (accountName.length > 32) {
        errors.push(utils.error("VR.ATO.GEN.432041", "CMN.ATO.GEN.432041"));
      }
      return errors;
    }
  },

  "ReportingParty.Remuneration.FringeBenefits.Type1Aggregate.Amount": {  // 14A (left value)
    "isDisabled": function (document) {
      return document.getBoolean("Myob.FringeBenefits.PublicBenevolentInstitution")
        && !document.getBoolean("Myob.FringeBenefits.RebatableEmployer");
    },
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Remuneration.FringeBenefits.Type1Aggregate.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010002",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.FringeBenefitsTax.Type1Aggregate.Amount": {  // 14A (right value)
    "isDisabled": function (document) {
      return document.getBoolean("Myob.FringeBenefits.PublicBenevolentInstitution")
        && !document.getBoolean("Myob.FringeBenefits.RebatableEmployer");
                                 Myob.FringeBenefits.RebatableEmployer
    },
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.FringeBenefitsTax.Type1Aggregate.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010003",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.Remuneration.FringeBenefits.Type2Aggregate.Amount": {  // 14B (left value)
    "isDisabled": function (document) {
      return document.getBoolean("Myob.FringeBenefits.PublicBenevolentInstitution")
        && !document.getBoolean("Myob.FringeBenefits.RebatableEmployer");
    },
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Remuneration.FringeBenefits.Type2Aggregate.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010004",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.FringeBenefitsTax.Type2Aggregate.Amount": {  // 14B (right value)
    "isDisabled": function (document) {
      return document.getBoolean("Myob.FringeBenefits.PublicBenevolentInstitution")
        && !document.getBoolean("Myob.FringeBenefits.RebatableEmployer");
    },
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.FringeBenefitsTax.Type2Aggregate.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010005",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.Remuneration.FringeBenefits.AggregateNonExempt.Amount": {  // 14C
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.FringeBenefits.PublicBenevolentInstitution");
    },
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Remuneration.FringeBenefits.AggregateNonExempt.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010006",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.Remuneration.FringeBenefits.TaxableTotal.Amount": {  // 15
    "validate": validateAmount({
      "fieldId": "ReportingParty.Remuneration.FringeBenefits.TaxableTotal.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010007",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.FringeBenefitsTax.Payable.Amount": {  // 16
    "validate": validateAmount({
      "fieldId": "ReportingParty.FringeBenefitsTax.Payable.Amount",
      "fnname": "isAmountWithCents",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010008",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.FringeBenefitsTax.NonRebatableAggregate.Amount": {  // 17
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.FringeBenefits.RebatableEmployer");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var errors = [];
      var value = document.getString("ReportingParty.FringeBenefitsTax.NonRebatableAggregate.Amount");
      if (!utils.isAmountWithCents(value, 11)) {
        errors.push(utils.error("VR.ATO.FBT.010009", "CMN.ATO.GEN.400011"));
      }

      var nonRebatable = document.getString("ReportingParty.FringeBenefitsTax.NonRebatableAggregate.Amount");
      var payable = document.getString("ReportingParty.FringeBenefitsTax.Payable.Amount");
      var rebate = document.getString("ReportingParty.FringeBenefitsTax.Rebate.Amount");

      if (nonRebatable && nonRebatable > payable) {
        errors.push(utils.error("VR.ATO.FBT.000336", "CMN.ATO.FBT.000336"));
      }
      if (nonRebatable && !rebate) {
        errors.push(utils.error("VR.ATO.FBT.000338", "CMN.ATO.FBT.000338"));
      }
      return errors;
    }
  },

  "ReportingParty.FringeBenefitsTax.Rebate.Amount": {  // 18
    "isDisabled": function (document) {
      return !document.getBoolean("Myob.FringeBenefits.RebatableEmployer");
    },
    "isOptional": function() {return true},
    "validate": function (document) {
      var errors = [];
      var value = document.getString("ReportingParty.FringeBenefitsTax.Rebate.Amount");
      if (!utils.isAmountWithCents(value, 11)) {
        errors.push(utils.error("VR.ATO.FBT.010010", "CMN.ATO.GEN.400011"));
      }

      var nonRebatable = document.getString("ReportingParty.FringeBenefitsTax.NonRebatableAggregate.Amount");
      var rebate = document.getString("ReportingParty.FringeBenefitsTax.Rebate.Amount");
      if (!nonRebatable && rebate) {
        errors.push(utils.error("VR.ATO.FBT.000337", "CMN.ATO.FBT.000337"));
      }
      return errors;
    }
  },

  "ReportingParty.FringeBenefitsTax.Liability.Amount": {  // 19
    "validate": validateAmount({
      "fieldId": "ReportingParty.FringeBenefitsTax.Liability.Amount",
      "fnname": "isAmountWithCents",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010015",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.FringeBenefitsTax.LiabilityInstalmentsTotal.Amount": {  // 20
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.FringeBenefitsTax.LiabilityInstalmentsTotal.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 11,
      "errorcode": "VR.ATO.FBT.010016",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.FringeBenefitsTax.AdjustmentDue.Amount": {  // 21 / 22
    "validate": function (document) {
      var errors = [];
      var value = document.getString("ReportingParty.FringeBenefitsTax.AdjustmentDue.Amount");
      if (!utils.isSignedAmountWithCents(value, 11)) {
        errors.push(utils.error("VR.ATO.FBT.010011", "CMN.ATO.GEN.400011"));
      }

      var creditIsDue = document.get("ReportingParty.FringeBenefitsTax.AdjustmentDue.Amount")().lt(0);
      var bankAccountIsNotProvided = document.getString("ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccount.Number") === "";
      if (creditIsDue && bankAccountIsNotProvided) {
        errors.push(utils.error("VR.ATO.FBT.100057", "CMN.ATO.GEN.432268"));
      }
      return errors;
    }
  },

  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.ItemsProvided.Number": {  // 23A
    "isOptional": function() {return true},
    "validate": validateNumber({
      "fieldId": "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.ItemsProvided.Number",
      "mindigits": 0,
      "maxdigits": 6,
      "errorcode": "VR.ATO.FBT.010018",
      "messagecode": "CMN.ATO.GEN.400012"
    })
  },
  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Aa
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.EmployeeContribution.Amount": {  // 23Ab
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.EmployeeContribution.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010013",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23A-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.ItemsProvided.Number": {  // 23B
    "isOptional": function() {return true},
    "validate": validateNumber({
      "fieldId": "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.ItemsProvided.Number",
      "mindigits": 0,
      "maxdigits": 6,
      "errorcode": "VR.ATO.FBT.010018",
      "messagecode": "CMN.ATO.GEN.400012"
    })
  },
  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Ba
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.EmployeeContribution.Amount": {  // 23Bb
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.EmployeeContribution.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010013",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23B-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number": {  // 23C
    "isOptional": function() {return true},
    "validate": validateNumber({
      "fieldId": "ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number",
      "mindigits": 0,
      "maxdigits": 6,
      "errorcode": "VR.ATO.FBT.010018",
      "messagecode": "CMN.ATO.GEN.400012"
    })
  },
  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Ca
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount": {  // 23Cc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010014",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23C-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Da
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23D-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Ea
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.EmployeeContribution.Amount": {  // 23Eb
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.EmployeeContribution.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010013",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.Reduction.Amount": {  // 23Ec
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.Reduction.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010014",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23E-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.Housing.Remuneration.FringeBenefits.ItemsProvided.Number": {  // 23F
    "isOptional": function() {return true},
    "validate": validateNumber({
      "fieldId": "ReportingParty.Housing.Remuneration.FringeBenefits.ItemsProvided.Number",
      "mindigits": 0,
      "maxdigits": 6,
      "errorcode": "VR.ATO.FBT.010018",
      "messagecode": "CMN.ATO.GEN.400012"
    })
  },
  "ReportingParty.Housing.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Fa
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Housing.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.Housing.Remuneration.FringeBenefits.EmployeeContribution.Amount": {  // 23Fb
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Housing.Remuneration.FringeBenefits.EmployeeContribution.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010013",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.Housing.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23F-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Housing.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.ItemsProvided.Number": {  // 23G
    "isOptional": function() {return true},
    "validate": validateNumber({
      "fieldId": "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.ItemsProvided.Number",
      "mindigits": 0,
      "maxdigits": 6,
      "errorcode": "VR.ATO.FBT.010018",
      "messagecode": "CMN.ATO.GEN.400012"
    })
  },
  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Ga
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.Reduction.Amount": {  // 23Gc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.Reduction.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010014",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23G-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.Board.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Ja
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Board.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.Board.Remuneration.FringeBenefits.EmployeeContribution.Amount": {  // 23Jb
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Board.Remuneration.FringeBenefits.EmployeeContribution.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010013",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.Board.Remuneration.FringeBenefits.Reduction.Amount": {  // 23Jc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Board.Remuneration.FringeBenefits.Reduction.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010014",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.Board.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23J-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Board.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.Property.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Ka
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Property.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.Property.Remuneration.FringeBenefits.EmployeeContribution.Amount": {  // 23Kb
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Property.Remuneration.FringeBenefits.EmployeeContribution.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010013",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.Property.Remuneration.FringeBenefits.Reduction.Amount": {  // 23Kc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Property.Remuneration.FringeBenefits.Reduction.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010014",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.Property.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23K-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.Property.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23La
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23L-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Ma
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.EmployeeContribution.Amount": {  // 23Mb
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.EmployeeContribution.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010013",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.Reduction.Amount": {  // 23Mc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.Reduction.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010014",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23M-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Na
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.CarParking.Remuneration.FringeBenefits.EmployeeContribution.Amount": {  // 23Nb
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarParking.Remuneration.FringeBenefits.EmployeeContribution.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010013",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23N-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {  // 23Pa
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010012",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },
  "ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {  // 23P-calc
    "isOptional": function() {return true},
    "validate": validateAmount({
      "fieldId": "ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitNetTaxable.Amount",
      "fnname": "isWholeAmount",
      "maxdigits": 10,
      "errorcode": "VR.ATO.FBT.010001",
      "messagecode": "CMN.ATO.GEN.400011"
    })
  },

  "Intermediary.Abn": {  // 24
    "isOptional": function() {return true},
    "validate": validateIdentifier({
      "fieldId": "Intermediary.Abn",
      "fnname": "isAbn",
      "errorcode": "VR.ATO.GEN.000202",
      "messagecode": "CMN.ATO.GEN.200011"
    })
  },

  "Intermediary.PersonUnstructuredName.FullName.Text": {  // 24
    "isOptional": function (document) {
      return !document.getString("Intermediary.Identifiers.TaxAgentNumber.Identifier");
    },
    "validate": function (document) {
      return nameRules.validateUnstructuredName({
        "fieldValue": document.getString("Intermediary.PersonUnstructuredName.FullName.Text"),
        "maxLength": 25,
        "lengthErrorcode": "VR.ATO.FBT.010026",
        "lengthMessagecode": "CMN.ATO.GEN.001011"
      });
    }
  },

  "Intermediary.ElectronicContact.Telephone.Area.Code": {  // 24
    "isOptional": function() {return true}
  },

  "Intermediary.ElectronicContact.Telephone.Minimal.Number": {  // 24
    "isOptional": function (document) {
      this.lodgementError = utils.error("VR.ATO.FBT.000424", "CMN.ATO.FBT.000424");
      return document.getString("ReportingParty.ElectronicContact.Telephone.Minimal.Number")
        || document.getString("Intermediary.ElectronicContact.Telephone.Minimal.Number");
    },
    "validate": function (document) {
      return phoneEmailRules.validatePhoneNumber({
        "fieldValue": document.getString("Intermediary.ElectronicContact.Telephone.Minimal.Number")
      });
    }
  },

  "Intermediary.Identifiers.TaxAgentClientReference.Text": {  // 24
    "isOptional": function() {return true},
    "validate": function (document) {
      var errors = [];
      var value = document.getString("Intermediary.Identifiers.TaxAgentClientReference.Text");
      if (value && value.length > 10) {
        errors.push(utils.error("VR.ATO.FBT.010025", "CMN.ATO.GEN.001011"));
      }
      return errors;
    }
  },

  "Intermediary.Identifiers.TaxAgentNumber.Identifier": {  // 24
    "validate": validateNumber({
      "fieldId": "Intermediary.Identifiers.TaxAgentNumber.Identifier",
      "mindigits": 0,
      "maxdigits": 8,
      "errorcode": "VR.ATO.FBT.000417",
      "messagecode": "CMN.ATO.FBT.000417"
    })
  },

  "Intermediary.Declaration.Signature.Date": {  // 24
    "isOptional": function (document) {
      this.lodgementError = utils.error("VR.ATO.FBT.000458", "CMN.ATO.FBT.000458");
      return document.getString("Intermediary.Declaration.Signature.Date")
        || document.getString("ReportingParty.Declaration.Signature.Date");
    },
    "validate": validateDate({
      "fieldId": "Intermediary.Declaration.Signature.Date",
      "fnname": "isDateBeforeToday",
      "errorcode": "VR.ATO.FBT.000457",
      "messagecode": "CMN.ATO.FBT.000457"
    })
  },

  "ReportingParty.Declaration.Signature.Date": {  // 25
    "isOptional": function (document) {
      this.lodgementError = utils.error("VR.ATO.FBT.000458", "CMN.ATO.FBT.000458");
      return document.getString("Intermediary.Declaration.Signature.Date")
        || document.getString("ReportingParty.Declaration.Signature.Date");
    },
    "validate": validateDate({
      "fieldId": "ReportingParty.Declaration.Signature.Date",
      "fnname": "isDateBeforeToday",
      "errorcode": "VR.ATO.FBT.000457",
      "messagecode": "CMN.ATO.FBT.000457"
    })
  }


};
