 
//sucess to run and take screenshot

var assert = require('assert'),
    fs = require('fs'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

function writeScreenshot(data, name) {
    name = name || 'ss.png';
    var screenshotPath = '/home/online/webdriverio-test/AD-OnlineTax-AU-FBT-2015/screenshot/';
    ///home/online/webdriverio-test/AD-OnlineTax-AU-FBT-2015/spec/ui

    fs.writeFileSync(screenshotPath + name, data, 'base64');
}
 

test.describe('Google Website', function(){
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

    test.it('google search', function(){
 
   
    driver.get('http://www.google.com');
    var searchBox = driver.findElement(webdriver.By.name('q'));
    searchBox.sendKeys('simple programmer');
    searchBox.getAttribute('value').then(function(value) {
    assert.equal(value, 'simple programmer');
    console.log(value);
    driver.takeScreenshot().then(function(data) {
            writeScreenshot(data, 'out1.png');
        });
 
       
    });

  
});
    test.it('webdriver search', function(){
    driver.get('http://www.google.com');
    driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
    driver.findElement(webdriver.By.name('btnG')).click();
    driver.wait(function() {
    return driver.getTitle().then(function(title) {
    return title === 'webdriver - Google Search';
    console.log(title);
    });
    }, 6000);

});
});
