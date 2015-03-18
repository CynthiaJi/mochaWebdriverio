
var assert = require('assert'),
    fs = require('fs'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');


    test.describe('My Website', function(){
    this.timeout(15000);
 
 var driver;

    test.before(function(){
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).
            build();
    });
//chrome
    test.after(function(){
        driver.quit();
    });

    test.it('Contact form should return success', function(){
    driver.get('http://www.google.com.au');
});
});