"use strict";

var utils = require("./utils");

module.exports = {

  "familyNameErrorMessageCodes": {
    "invalidErrorcode": "VR.ATO.GEN.410040",
    "invalidMessagecode": "CMN.ATO.GEN.400011",
    "noAlphabetErrorcode": "VR.ATO.GEN.410040",
    "noAlphabetMessagecode": "CMN.ATO.GEN.410040",
    "spaceHyphenSpaceErrorcode": "VR.ATO.GEN.428262",
    "spaceHyphenSpaceMessagecode": "CMN.ATO.GEN.000423",
    "sequenceErrorcode": "VR.ATO.GEN.428263",
    "sequenceMessagecode": "CMN.ATO.GEN.000427",
    "suffixErrorcode": "VR.ATO.GEN.428231",
    "suffixMessagecode": "CMN.ATO.GEN.000422",
    "forErrorcode": "VR.ATO.GEN.410200",
    "forMessagecode": "CMN.ATO.GEN.000424",
    "mrErrorcode": "VR.ATO.GEN.410201",
    "mrMessagecode": "CMN.ATO.GEN.000426"
  },

  "firstNameErrorMessageCodes": {
    "invalidErrorcode": "VR.ATO.GEN.410063",
    "invalidMessagecode": "CMN.ATO.GEN.400011",
    "noAlphabetErrorcode": "VR.ATO.GEN.410063",
    "noAlphabetMessagecode": "CMN.ATO.GEN.410063",
    "spaceHyphenSpaceErrorcode": "VR.ATO.GEN.428264",
    "spaceHyphenSpaceMessagecode": "CMN.ATO.GEN.000434",
    "sequenceErrorcode": "VR.ATO.GEN.428265",
    "sequenceMessagecode": "CMN.ATO.GEN.000439",
    "suffixErrorcode": "VR.ATO.GEN.410202",
    "suffixMessagecode": "CMN.ATO.GEN.000436",
    "forErrorcode": "VR.ATO.GEN.410203",
    "forMessagecode": "CMN.ATO.GEN.000437",
    "mrErrorcode": "VR.ATO.GEN.410204",
    "mrMessagecode": "CMN.ATO.GEN.000438"
  },

  "otherNameErrorMessageCodes": {
    "invalidErrorcode": "VR.ATO.GEN.410131",
    "invalidMessagecode": "CMN.ATO.GEN.400011",
    "noAlphabetErrorcode": "VR.ATO.GEN.410131",
    "noAlphabetMessagecode": "CMN.ATO.GEN.410131",
    "spaceHyphenSpaceErrorcode": "VR.ATO.GEN.428266",
    "spaceHyphenSpaceMessagecode": "CMN.ATO.GEN.000446",
    "sequenceErrorcode": "VR.ATO.GEN.428267",
    "sequenceMessagecode": "CMN.ATO.GEN.000451",
    "suffixErrorcode": "VR.ATO.GEN.410207",
    "suffixMessagecode": "CMN.ATO.GEN.000448",
    "forErrorcode": "VR.ATO.GEN.410208",
    "forMessagecode": "CMN.ATO.GEN.000449",
    "mrErrorcode": "VR.ATO.GEN.410209",
    "mrMessagecode": "CMN.ATO.GEN.000450"
  },

  // convenience function for the common case of name validation
  "validateName": function (options) {
    var errors = [];
    if (options.fieldValue.length > options.maxLength) {
      errors.push(utils.error(options.lengthErrorcode, options.lengthMessagecode));
    }
    if (!utils.nameContainsValidCharacters(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.invalidErrorcode, options.errorMessageCodes.invalidMessagecode));
    }
    if (!utils.hasAtLeastOneAlphabet(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.noAlphabetErrorcode, options.errorMessageCodes.noAlphabetMessagecode));
    }
    if (utils.nameContainsSpaceHyphenSpace(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.spaceHyphenSpaceErrorcode, options.errorMessageCodes.spaceHyphenSpaceMessagecode));
    }
    if (utils.nameContainsInvalidCharacterSequences(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.sequenceErrorcode, options.errorMessageCodes.sequenceMessagecode));
    }
    // Suffix not allowed anywhere as a word within name
    if (/\b(ESQ|II|III|IV|JNR|JP|MHA|MHR|MLA|MLC|MP|QC|SNR)\b/i.test(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.suffixErrorcode, options.errorMessageCodes.suffixMessagecode));
    }
    // xxxx for not allowed
    if (/\b(Exec for|Rep for|Trustee for)\b/i.test(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.forErrorcode, options.errorMessageCodes.forMessagecode));
    }
    // Mxx not allowed
    if (/\b(MR|MRS|MISS|MS)\b/i.test(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.mrErrorcode, options.errorMessageCodes.mrMessagecode));
    }
    return errors;
  },

  "validateFamilyName" : function(options) {
    var errors = [];

    // Check field must present
    // NOTE: Mandatory field not testable here since validation is not triggered when empty
    // TODO: Will be handled differently for mandatory fields
    if (!options.fieldDisabled && !options.fieldValue) {
      errors.push(utils.error("VR.ATO.GEN.410217", "CMN.ATO.GEN.410217"));
    } else {
      errors = this.validateName(options);
    }

    // Check both family name and organisation name fields have value
    // However, not able to validate
    // since one of the field will be disabled
    // and disabled field would always return blank
    if (options.fieldValue && options.orgName) {
      errors.push(utils.error("VR.ATO.FBT.000017", "CMN.ATO.FBT.000017"));
    }

    return errors;
  },

  "validateFirstName" : function(options) {
    var errors = this.validateName(options);

    // Check if other name is entered, then first name must be entered
    // Rule moved to other name validation
    // Since If field is empty, no validation will be triggered
    //if (options.otherNameValue && !options.fieldValue) {
    //  errors.push(utils.error("VR.ATO.GEN.410218", "CMN.ATO.GEN.410218"));
    //}

    return errors;
  },

  "validateOtherName" : function(options) {
    var errors = this.validateName(options);

    // Check if other name is entered, then first name must be entered
    if (options.fieldValue && !options.firstName) {
      errors.push(utils.error("VR.ATO.GEN.410218", "CMN.ATO.GEN.410218"));
    }

    return errors;
  },

  "validateNameSuffix" : function(options) {
    var errors = [];
    // Only Suffix allowed
    if (!(/\b(ESQ|II|III|IV|JNR|JP|MHA|MHR|MLA|MLC|MP|QC|SNR)\b/i.test(options.fieldValue))) {
      errors.push(utils.error("VR.ATO.GEN.000458", "CMN.ATO.GEN.000458"));
    }
    return errors;
  },

  "validateNameTitle" : function(options) {
    var errors = [];
    // Only Title allowed
    if (!(/\b(2LT|AB|ABBOT|AC|ACM|ADM|AIR CDRE|ALDERMAN|AM|ARCHBISHOP|ARCHDEACON|ASSOC PROF|AVM|BARON|BARONESS|BISHOP|BR|BRIG|CANON|CAPT|CARDINAL|CDRE|CDT|CHAP|CMDR|CMM|COL|CONST|COUNT|COUNTESS|CPL|CPO|DAME|DEACON|DEACONESS|DEAN|DEPUTY SUPT|DR|DUCHESS|DUKE|EARL|EF|FLGOFF|FLT LT|FR|FSGT|GEN|GNR|GP CAPT|HON|HON JUDGE|HON JUST|HRH|INSP|JUDGE|JUST|LAC|LACW|LADY|LBDR|LCPL|LORD|LS|LT|LT CMDR|LT COL|LT GEN|MADAM|MAJ|MAJ GEN|MASTER|MATRON|MAYOR|MAYORESS|MIDN|MISS|MON|MOST REV|MR|MRS|MS|PASTOR|PATRIARCH|PLT OFF|PO|PRIOR|PROF|PTE|RABBI|RADM|RECTOR|REV|RF|RT HON|RT REV|RT REV BISHOP|RT REV MON|SBLT|SEN|SGT|SIR|SMN|SNR CONST|SQN LDR|SR|SSGT|SUPR|SWAMI|TF|VADM|VERY REV|VICAR|VISCOUNT|WG CDR|WO|WO1|WO2)\b/i.test(options.fieldValue))) {
      errors.push(utils.error("VR.ATO.GEN.000459", "CMN.ATO.GEN.000459"));
    }
    return errors;
  },

  "orgNameErrorMessageCodes": {
    "invalidErrorcode": "VR.ATO.GEN.410039",
    "invalidMessagecode": "CMN.ATO.GEN.400011",
    "noAlphaNumErrorcode": "VR.ATO.GEN.410039",
    "noAlphaNumMessagecode": "CMN.ATO.GEN.410039",
    "spaceHyphenSpaceErrorcode": "VR.ATO.GEN.428258",
    "spaceHyphenSpaceMessagecode": "CMN.ATO.GEN.000413",
    "sequenceErrorcode": "VR.ATO.GEN.428260",
    "sequenceMessagecode": "CMN.ATO.GEN.000416",
    "plErrorcode": "VR.ATO.GEN.428259",
    "plMessagecode": "CMN.ATO.GEN.000414",
    "pshipErrorcode": "VR.ATO.GEN.410038",
    "pshipMessagecode": "CMN.ATO.GEN.410038",
    "tteErrorcode": "VR.ATO.GEN.410206",
    "tteMessagecode": "CMN.ATO.GEN.428042",
    "suffixErrorcode": "VR.ATO.GEN.428261",
    "suffixMessagecode": "CMN.ATO.GEN.000417"
  },

  // convenience function for the common case of organisation name validation
  "validateOrgName" : function (options) {
    var errors = [];

    // Check field must present
    // NOTE: Mandatory field not testable here since validation is not triggered when empty
    // TODO: Will be handled differently for mandatory fields
    if (!options.fieldDisabled && !options.fieldValue) {
      errors.push(utils.error("VR.ATO.GEN.410215", "CMN.ATO.GEN.410215"));
    }

    if (options.fieldValue.length > options.maxLength) {
      errors.push(utils.error(options.lengthErrorcode, options.lengthMessagecode));
    }
    if (!utils.orgNameContainsValidCharacters(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.invalidErrorcode, options.errorMessageCodes.invalidMessagecode));
    }
    if (!utils.hasAtLeastOneAlphaOrNumber(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.noAlphaNumErrorcode, options.errorMessageCodes.noAlphaNumMessagecode));
    }
    if (utils.nameContainsSpaceHyphenSpace(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.spaceHyphenSpaceErrorcode, options.errorMessageCodes.spaceHyphenSpaceMessagecode));
    }
    if (utils.nameContainsInvalidCharacterSequences(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.sequenceErrorcode, options.errorMessageCodes.sequenceMessagecode));
    }
    // P/L not allowed
    if (/\b(P\/L)\b/i.test(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.plErrorcode, options.errorMessageCodes.plMessagecode));
    }
    // Starts with T/A and ends with Pship not allowed
    if (/^(T\/A)( .*)\b(Pship|P'ship|P\/ship)\b$/i.test(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.pshipErrorcode, options.errorMessageCodes.pshipMessagecode));
    }
    // trustee or exec not allowed
    if (/\b(The trustee| The Exec|exec|the TTE)\b/i.test(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.tteErrorcode, options.errorMessageCodes.tteMessagecode));
    }
    // Suffix not allowed
    if (/\b(T\/A|T\/A P'ship|T\/A Pship|T\/A P\/ship|T\/A Partnership)\b$/i.test(options.fieldValue)) {
      errors.push(utils.error(options.errorMessageCodes.suffixErrorcode, options.errorMessageCodes.suffixMessagecode));
    }
    return errors;
  },

  // convenience function for the common case of unstructured name validation
  "validateUnstructuredName" : function (options) {
    var errors = [];

    if (options.fieldValue.length > (options.maxLength || 200)) {
      errors.push(utils.error(options.lengthErrorcode || "VR.ATO.GEN.430252", options.lengthMessagecode || "CMN.ATO.GEN.430252"));
    }
    if (utils.nameContainsSpaceHyphenSpace(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.408010", "CMN.ATO.GEN.408010"));
    }
    if (!/^[A-Za-z0-9- ]+$/.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430253", "CMN.ATO.GEN.430253"));
    }

    return errors;
  }

};
