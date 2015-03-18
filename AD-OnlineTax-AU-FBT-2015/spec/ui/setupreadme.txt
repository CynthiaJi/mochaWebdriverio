
//http://osdir.com/ml/selenium-users/2013-08/msg00553.html
// test-frameworks/mocha/setup.js
var assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    webdriver_remote = require('selenium-webdriver/remote'),
    test = require('selenium-webdriver/testing'),
    pathToSeleniumJar = '/home/online/webdriverio-test/selenium-server-standalone-2.44.0.jar';

    var server = new webdriver_remote.SeleniumServer(pathToSeleniumJar, {port: 4444});

    server.start();

    var    driver = new webdriver.Builder().
        usingServer(server.address()).
        withCapabilities(webdriver.Capabilities.firefox()).
        build();

    test.after(function() {
        driver.quit();
    });


    var tests = require('./tests');
        tests.run(test, driver);Enter code here...// test-frameworks/mocha/tests/index.js
exports.run = 
    function(test, driver) {
        require('./test1.js').run(test, driver);
        require('./test2.js').run(test, driver);
    };// test-frameworks/mocha/tests/test1.js


var assert = require('assert'),
    webdriver = require('selenium-webdriver');

exports.run = 
    function(test, driver) {
        test.describe('Google Search 1', function() {

            test.it('should work', function() {
                driver.get('http://www.google.com');
                var searchBox = driver.findElement(webdriver.By.name('q'));
                searchBox.sendKeys('Google Search 1');
                searchBox.getAttribute('value').then(function(value) {
                    assert.equal(value, 'Google Search 1');
                });
            });

        });
    };


// test-frameworks/mocha/test2.js
var assert = require('assert'),
    webdriver = require('selenium-webdriver');

exports.run =
    function(test, driver) {
        test.describe('Google Search 2', function() {

            test.it('should work', function() {
                driver.get('http://www.google.com');
                var searchBox = driver.findElement(webdriver.By.name('q'));
                searchBox.sendKeys('Google Search 2');
                searchBox.getAttribute('value').then(function(value) {
                    assert.equal(value, 'Google Search 2');
                });
            });

        });
    };
