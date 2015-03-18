"use strict";

var utils = require("./utils");

module.exports = {

  "validatePhoneNumber" : function(options) {
    var errors = [];

    // Check field must present
    // NOTE: Mandatory field not testable here since validation is not triggered when empty
    // TODO: Will be handled differently for mandatory fields
    if (!options.fieldValue) {
      errors.push(utils.error("VR.ATO.GEN.432016", "CMN.ATO.GEN.432016"));
    }

    if (options.fieldValue.length > 15) {
      errors.push(utils.error("VR.ATO.FBT.010024", "CMN.ATO.GEN.001011"));
    }

    return errors;
  },

  "validateEmailAddress" : function(options) {
    var errors = [];

    if (/(^@|@$)/.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430222", "CMN.ATO.GEN.430222"));
    }
    if ((options.fieldValue.match(/@/g) || [] ).length > 1) {
      errors.push(utils.error("VR.ATO.GEN.430223", "CMN.ATO.GEN.430223"));
    }
    if (/(^\.|\.$)/.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430224", "CMN.ATO.GEN.430224"));
    }
    if (/\.{2,}/.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430226", "CMN.ATO.GEN.430226"));
    }
    if (/\.@/.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430227", "CMN.ATO.GEN.430227"));
    }
    if (/@\./.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430228", "CMN.ATO.GEN.430228"));
    }
    if (!/^[A-Za-z0-9-\.&#^*/+_!@$%=\? ']+$/.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430229", "CMN.ATO.GEN.430229"));
    }
    if (options.fieldValue && !(/@/.test(options.fieldValue))) {
      errors.push(utils.error("VR.ATO.GEN.430230", "CMN.ATO.GEN.430230"));
    }
    if (/\s\S/.test(options.fieldValue)) {
      errors.push(utils.error("VR.ATO.GEN.430231", "CMN.ATO.GEN.430231"));
    }
    if (options.fieldValue && !(/\./.test(options.fieldValue))) {
      errors.push(utils.error("VR.ATO.GEN.430232", "CMN.ATO.GEN.430232"));
    }

    return errors;
  }

};
