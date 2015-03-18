"use strict";

var utils = require("./utils");

module.exports = {

  "validateStateCode" : function(options) {
    var errors = this.validateStateAndPostcode(options);

    // If field is disabled, isOverseasAddress will be false
    if (!options.isOverseasAddress && options.stateValue && (!/^(ACT|NSW|NT|QLD|SA|VIC|WA|TAS|AAT)$/i.test(options.stateValue))) {
        errors.push(utils.error("VR.ATO.GEN.300003", "CMN.ATO.GEN.300003"));
    }

    return errors;
  },

  "validateStateAndPostcode" : function(options) {
    var errors = [];

    // If field is disabled, isOverseasAddress will be false
    if (!options.isOverseasAddress) {
      if (!options.stateValue || !options.postcodeValue) {
        errors.push(utils.error("VR.ATO.GEN.434147", "CMN.ATO.GEN.434147"));
      }
    }

    return errors;
  },

  "validateLocalityName" : function(options) {
    var errors = [];

    // Check field must present
    // NOTE: Mandatory field not testable here since validation is not triggered when empty
    // TODO: Will be handled differently for mandatory fields
    if (!options.fieldDisabled && !options.fieldValue) {
      errors.push(utils.error("VR.ATO.GEN.430245", "CMN.ATO.GEN.430245"));
    }

    if (options.fieldValue && options.fieldValue.length > 27) {
      errors.push(utils.error("VR.ATO.FBT.010023", "CMN.ATO.GEN.001011"));
    }

    if (/\b(ACT|NSW|NT|QLD|SA|VIC|WA|TAS)\b/i.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.428230", "CMN.ATO.GEN.000411"));
    }
    if (/(^|\s)UNKNOWN($|\s)/i.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.428256", "CMN.ATO.GEN.000409"));
    }
    if (!options.isOverseasAddress && /[0-9]/.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430246", "CMN.ATO.GEN.000410"));
    }

    return errors;
  },

  "validateAddressLine1" : function(options) {
    var errors = [];

    // Check field must present
    // NOTE: Mandatory field not testable here since validation is not triggered when empty
    // TODO: Will be handled differently for mandatory fields
    if (!options.fieldDisabled && !options.fieldValue) {
      errors.push(utils.error("VR.ATO.GEN.410214", "CMN.ATO.GEN.410214"));
    }

    if (/^(C\/-)/i.test(options.fieldValue) && !options.addr2Value) {
      errors.push(utils.error("VR.ATO.GEN.410002", "CMN.ATO.GEN.410002"));
    }
    if (options.fieldValue.length > 38) {
      errors.push(utils.error("VR.ATO.GEN.410194", "CMN.ATO.GEN.410194"));
    }
    if (/\b(AS ABOVE)\b/i.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.410205", "CMN.ATO.GEN.410001"));
    }
    // Negative lookahead, matches C/ but not C/- (any non-whitespace)
    if (/(\b^(C\/O|Care Of|CO)\b|\b^C\/(?!\S)\B)/i.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.428240", "CMN.ATO.GEN.000406"));
    }
    if (/(^|\s)UNKNOWN($|\s)/i.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.428254", "CMN.ATO.GEN.000405"));
    }

    return errors;
  },

  "validateAddressLine2" : function(options) {
    var errors = [];

    if (options.fieldValue.length > 38) {
      errors.push(utils.error("VR.ATO.GEN.410195", "CMN.ATO.GEN.410195"));
    }
    // Negative lookahead, matches C/ or C/- (not any non-whitespace)
    if (/(\b^(C\/O|Care Of|CO)\b|\b^(C\/|C\/-)(?!\S)\B)/i.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.428241", "CMN.ATO.GEN.000408"));
    }
    if (/(^|\s)UNKNOWN($|\s)/i.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.428255", "CMN.ATO.GEN.000407"));
    }

    return errors;
  },

  "validateAddressLine3" : function(value) {
    var errors = [];

    if (value) {
      errors.push(utils.error("VR.ATO.GEN.410008", "CMN.ATO.GEN.410008"));
    }

    return errors;
  },

  "validateAddressLine4" : function(value) {
    var errors = [];

    if (value) {
      errors.push(utils.error("VR.ATO.GEN.410013", "CMN.ATO.GEN.410013"));
    }

    return errors;
  },

  "validateCountryCode" : function(options) {
    var errors = [];

    if (options.fieldValue && !(/^(ad|ae|af|ag|ai|al|am|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)$/i.test(options.fieldValue))) {
      errors.push(utils.error("VR.ATO.GEN.410192", "CMN.ATO.GEN.410192"));
    }
    if (options.isOverseasAddress && options.fieldValue == 'au') {
      errors.push(utils.error("VR.ATO.GEN.410211", "CMN.ATO.GEN.410211"));
    }
    if (options.fieldValue && options.fieldValue != 'au' && !options.isOverseasAddress) {
      errors.push(utils.error("VR.ATO.GEN.410212", "CMN.ATO.GEN.410212"));
    }

    return errors;
  },

  "validateCountryName" : function(options) {
    var errors = [];

    if (options.fieldValue) {
      errors.push(utils.error("VR.ATO.GEN.410213", "CMN.ATO.GEN.410213"));
    }

    return errors;
  },

  "validateOverseasIndicator" : function(options) {
    var errors = [];

    // Check field must present
    // NOTE: Mandatory field not testable here since validation is not triggered when empty
    // TODO: Will be handled differently for mandatory fields
    if (!options.fieldDisabled && !options.fieldValue) {
      errors.push(utils.error("VR.ATO.GEN.410167", "CMN.ATO.GEN.410167"));
    }

    if (options.isOverseasAddress && !options.countryCode) {
      errors.push(utils.error("VR.ATO.GEN.410191", "CMN.ATO.GEN.410191"));
    }

    return errors;
  }

};
