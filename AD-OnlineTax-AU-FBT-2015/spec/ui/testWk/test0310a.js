//http://glenntaylor.co.uk/industry/automated-testing-with-nodejs-and-mocha#.VP6Epp-jnCI
// working


var assert = require('assert'),
    fs = require('fs'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

function writeScreenshot(data, name) {
    name = name || 'ss.png';
    var screenshotPath = '/home/online/webdriverio-test/';
    ///home/online/webdriverio-test/AD-OnlineTax-AU-FBT-2015/spec/ui

    fs.writeFileSync(screenshotPath + name, data, 'base64');
};
 

test.describe('My Website', function(){
    this.timeout(15000);
    var driver;

    test.before(function(){
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).
            build();
    });

    test.after(function(){
        driver.quit();
    });

     test.it('should show home page', function() {
 
   
        //driver.get('http://www.vapidspace.com');
        driver.get('http://www.google.com');
       
 
 
        driver.takeScreenshot().then(function(data) {
            writeScreenshot(data, 'out1.png');
        });
 
       
    });

    test.it('Contact form should return success', function(){
    driver.get('http://yourwebsite.co.uk/contact-page');
    driver.findElement(webdriver.By.name('name')).sendKeys('Glenn Taylor');
    driver.findElement(webdriver.By.name('email')).sendKeys('glenn@glenntaylor.co.uk');
    driver.findElement(webdriver.By.name('message')).sendKeys('This is a test message!');
    driver.findElement(webdriver.By.className('contact-form')).submit();

    driver.wait(function(){
        return driver.isElementPresent(webdriver.By.className('success-flash'));
    }, 3000);

});
});