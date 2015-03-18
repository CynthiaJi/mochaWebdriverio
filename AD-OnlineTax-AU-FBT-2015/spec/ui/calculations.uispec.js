'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect,
  webdriverio = require('webdriverjs-angular');

describe('Calculations', function () {

  var client;

  before(function (done) {
    client = webdriverio.remote(require('../../conf/webdriver-chrome.conf'));  // move this line to 00_local.uispec.js and export client global?
    client.init(done);
  });

  after(function (done) {
    client.end(done);
  });

  it('should calculate Type 1 aggregate amount', function (done) {
    var baseUrl = process.env.BASE_URL || 'http://127.0.0.1:' + (global.serverPort || '4000');
    client
      .url(baseUrl + '/?client=dummyClientId')
      .click('=Return Calculation Details')
      .setValue('[ng-model="form.fields[\'ReportingParty.Remuneration.FringeBenefits.Type1Aggregate.Amount\'].value"]', '123')  // simplify selectors when element ID fix is deployed
      .getValue('[ng-model="form.fields[\'ReportingParty.FringeBenefitsTax.Type1Aggregate.Amount\'].value"]')
      .then(function (value) {
        expect(value).to.equal('255');
      })
      .end(done);
  });
});
