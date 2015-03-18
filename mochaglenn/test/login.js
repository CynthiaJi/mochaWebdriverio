

//http://glenntaylor.co.uk/industry/automated-testing-with-nodejs-and-mocha#.VQj7Dp-jnCJ

var fs = require('fs'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();


    var urls='https://test.secure.myob.com/';
    var url1='https://qa5.addevcloudsites.myob.com';
    var mtitle='';
    var title1='MYOB Account - Sign in';
    var title2='Practice Online';


    test.describe('Online Tax', function(){
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



    test.it('Signin As Daad Smith', function(){


    //driver.get('http://www.google.com.au');
    driver.get(urls);
    	//ttps://test.secure.myob.com/oauth2/Account/Login?ReturnUrl=%2foauth2%2faccount%2fauthorize%3fresponse_type%3dcode%26redirect_uri%3dhttp%253A%252F%252Fqa5.addevcloudsites.myob.com%252Fauth%252Fmyob%252Fcallback%26scope%3dpractice.online%2520client.portal%2520mydot.contacts.read%2520mydot.assets.read%2520Assets%2520la.global%2520CompanyFile%2520AccountantsFramework%26client_id%3dPracticeOnline&response_type=code&redirect_uri=https%3A%2F%2Fqa5.addevcloudsites.myob.com%2Fauth%2Fmyob%2Fcallback&scope=practice.online%20client.portal%20mydot.contacts.read%20mydot.assets.read%20Assets%20la.global%20CompanyFile%20AccountantsFramework&client_id=PracticeOnline');
    driver.findElement(webdriver.By.id("Username")).clear();
    driver.findElement(webdriver.By.id("Username")).sendKeys("daad.smith@avistyle.com.au");
    driver.findElement(webdriver.By.id("Password")).clear();
    driver.findElement(webdriver.By.id("Password")).sendKeys("password1");
    mtitle = driver.getTitle();
    console.log(mtitle);
    
    //assert.equal(foo, 'bar', 'foo equal `bar`');
    //assert.equal(mtitle, 'MYOB Account - Sign in');
    //expect(foo).to.equal('bar');
    //expect(mtitle).to.equal(title1);


    driver.findElement(webdriver.By.id("submit")).click();
    driver.get("https://qa5.addevcloudsites.myob.com/");
    mtitle = driver.getTitle();
    //expect(mtitle).to.equal(title2);
    

    
    //driver.findElement(By.cssSelector("li.active > a")).click();
});
});

    /*
    webdriver.by.className('.my-class')
webdriver.by.css('#some-id')
webdriver.by.id('element-id')
webdriver.by.linkText('click me')
webdriver.by.js
webdriver.by.name('firstName')
webdriver.by.partialLinkText('click')
webdriver.by.tagName('a')
webdriver.by.xpath()
     driver.findElement(webdriver.By.name('name')).sendKeys('Glenn Taylor');
    driver.findElement(webdriver.By.name('email')).sendKeys('glenn@glenntaylor.co.uk');
    driver.findElement(webdriver.By.name('message')).sendKeys('This is a test message!');
    driver.findElement(webdriver.By.className('contact-form')).submit();
    baseUrl = "https://test.secure.myob.com/";
    // https://test.secure.myob.com/oauth2/Account/Login?ReturnUrl=%2foauth2%2faccount%2fauthorize%3fresponse_type%3dcode%26redirect_uri%3dhttp%253A%252F%252Fqa5-clientportalweb.elasticbeanstalk.com%252Fauth%252Fmyob%252Fcallback%26scope%3dpractice.online%2520client.portal%2520mydot.contacts.read%2520AccountantsFramework%26client_id%3dClientPortal&response_type=code&redirect_uri=http%3A%2F%2Fqa5-clientportalweb.elasticbeanstalk.com%2Fauth%2Fmyob%2Fcallback&scope=practice.online%20client.portal%20mydot.contacts.read%20AccountantsFramework&client_id=ClientPortal
    driver.get("https://test.secure.myob.com/oauth2/Account/Login?ReturnUrl=%2foauth2%2faccount%2fauthorize%3fresponse_type%3dcode%26redirect_uri%3dhttp%253A%252F%252Fqa5.addevcloudsites.myob.com%252Fauth%252Fmyob%252Fcallback%26scope%3dpractice.online%2520client.portal%2520mydot.contacts.read%2520mydot.assets.read%2520Assets%2520la.global%2520CompanyFile%2520AccountantsFramework%26client_id%3dPracticeOnline&response_type=code&redirect_uri=http%3A%2F%2Fqa5.addevcloudsites.myob.com%2Fauth%2Fmyob%2Fcallback&scope=practice.online%20client.portal%20mydot.contacts.read%20mydot.assets.read%20Assets%20la.global%20CompanyFile%20AccountantsFramework&client_id=PracticeOnline");
    driver.findElement(By.id("Username")).clear();
    driver.findElement(By.id("Username")).sendKeys("daad.smith@avistyle.com.au");
    driver.findElement(By.id("Password")).clear();
    driver.findElement(By.id("Password")).sendKeys("password1");
    String MYOB Account - Sign in = driver.getTitle();
    for (int second = 0;; second++) {
    	if (second >= 60) fail("timeout");
    	try { if ("MYOB Account - Sign in".equals(driver.getTitle())) break; } catch (Exception e) {}
    	Thread.sleep(1000);
    }

    for (int second = 0;; second++) {
    	if (second >= 60) fail("timeout");
    	try { if ("Remember me".equals(driver.findElement(By.cssSelector("label.checkbox")).getText())) break; } catch (Exception e) {}
    	Thread.sleep(1000);
    }

    driver.findElement(By.id("submit")).click();
    driver.get("https://qa5.addevcloudsites.myob.com/");
    for (int second = 0;; second++) {
    	if (second >= 60) fail("timeout");
    	try { if ("Practice Online".equals(driver.getTitle())) break; } catch (Exception e) {}
    	Thread.sleep(1000);
    }

    driver.findElement(By.cssSelector("li.active > a")).click();
  }
    */