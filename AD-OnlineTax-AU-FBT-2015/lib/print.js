'use strict';

var hogan = require('hogan'),
  fs = require('fs'),
  path = require('path');

module.exports = function (form, callback) {
  fs.readFile(path.join(__dirname, '../browser/print.mustache'), 'utf8', function (err, data) {
    if (err) {
      console.error("Could not read template file for printing");
      callback(err, null);
    }
    var template = hogan.compile(data);
    var mustacheFriendlyForm = makeMustacheFriendly(form);
    callback(null, template.render({
      form: mustacheFriendlyForm,
      returnName: '2015 Fringe Benefits Tax Return'
    }));
  });
};

function makeMustacheFriendly(form) {
  var friendlyForm = JSON.parse(JSON.stringify(form));
  Object.keys(friendlyForm.fields).forEach(function (fieldIdWithDots) {
    var fieldIdWithoutDots = fieldIdWithDots.replace(/\./g, '_');
    friendlyForm.fields[fieldIdWithoutDots] = friendlyForm.fields[fieldIdWithDots];
    delete friendlyForm.fields[fieldIdWithDots];
  });
  return friendlyForm;
}
