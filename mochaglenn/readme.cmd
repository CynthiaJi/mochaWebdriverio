


GETTING STARTED


npm install mocha --save-dev

npm install selenium-webdriver --save-dev

npm install chai --save-dev

npm install chai-as promised --save-dev
 

Start your test file with some includes by using the nodeJS method require. We need access to assert, fs (filesystem), selenium testing and the selenium webdriver.

var assert = require('assert'),
    fs = require('fs'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');



To start with, this is how a basic test setup will look:

test.describe('My Website', function(){
    this.timeout(15000);
});
 

test.describe('My Website', function(){
    this.timeout(15000);
    var driver;

    test.before(function(){
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
    });

    test.after(function(){
        driver.quit();
    });
});

Under the test.before function we need to create a new function, test.it.

test.it('Contact form should return success', function(){
    driver.get('http://www.google.com.au');
});
 

mocha my_test.js
You should receive a test success message.

