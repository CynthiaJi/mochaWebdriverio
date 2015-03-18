var assert = require('assert');

var webdriverio = require('webdriverjs-angular');


  

describe('Promise-enabled WebDriver', function () {
  this.timeout(99999999);
  var client = {};


  before(function (done) {
    client = webdriverio.remote({desiredCapabilities: {browserName: 'firefox'}});
    client.init(done);
  });
  after(function (done) {
    client.end(done);
  });

  describe('injected browser executing a Google Search', function () {

    it('performs as expected', function (done) {
      var searchBox;
      
      client
         .withoutAngular()
        .url('http://google.com')
        .setValue('#lst-ib','webdriver')
        .pause(6000)
        //setValue(client.element('q'),'webdriver')
        //elementByName('q')
        .then(function (el) {
          searchBox = el;
          return searchBox.type('webdriver');
        })
        .then(function () {
          return searchBox.getAttribute('value');
        })
        .then(function (val) {
          return assert.equal(val, 'webdriver');
        })
        .call(done);
    });
  });


//partially working