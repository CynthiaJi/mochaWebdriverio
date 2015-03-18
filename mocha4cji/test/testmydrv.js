

var webdriver = require('selenium-webdriver');
var client = new webdriver.Builder().withCapabilities({
  'browserName': 'chrome'
}).build();
var chai = require('chai');
var expect = chai.expect;

describe('from Homepage', function() {
  var url = 'http://www.google.com.au';

  beforeEach(function(done) {
    client.get(url).then(function() {
      done();
    });
  });

  after(function(done) {
    client.quit().then(function(){
      done();
    });
  });

  it('return the title of the page', function(done) {
    client.getTitle().then(function(title){
      console.log(title);
      expect(title).to.equal('Browser testing');
      done();
    });
  })

  it('returns the header 1 of the page', function(done) {
    client.findElement(webdriver.By.id('q')).getText().then(function(text) {
      console.log(text);
  expect(text).to.equal('Hey there!');
  done();
});
});
})