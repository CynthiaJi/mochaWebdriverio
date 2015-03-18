//create by cynthia
//online@OnlineTax-L1:~/webdriverio-test$ java -jar selenium-server-standalone-2.44.0.jar
//mocha --slow 15000 --timeout 30000 --recursive spec/**/loginpg003.cjspec.js
/*
 online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015/spec/ui$ mocha loginpg003.cjspec.js

*/


'use strict';



var url0 = 'https://test.secure.myob.com/';
var url1='http://qa5.addevcloudsites.myob.com';

var url2= url1+'/clients';
//url1+'/clients/portals';
var urltax= url1+ '/tax/fbt';
var urltax2 = url1 + '/tax/edit/?client=4cccbc62-15b1-41e3-a9ed-0d93e7d05db2&duedate=2015-06-25';

var title0 ='MYOB Account - Sign in';
var uemail ='onlinetax005@gmail.com';
var pw ='Myob1234';
var  title2 ='Practice Online';
var mywait = 0;
//3000;

var expect = require('chai').expect;
var assertions = require('mocha').it;
var assert = require('assert');


  //webdriverio = require('webdriverjs-angular');

var webdriverio = require('webdriverjs-angular');
//var webdriverio = require('webdriverio');

describe('TaxOnlineTest', function () {

  //var client;
  this.timeout(99999999);
  var client = {};


  before(function (done) {
    //client = webdriverio.remote(require('../../conf/webdriver-chrome.conf'));
    client = webdriverio.remote({desiredCapabilities: {browserName: 'firefox'}});
    client.init(done);
  });
  after(function (done) {
    client.end(done);
  });


  var baseUrl = process.env.BASE_URL || +url1;

  it('SecurityPage', function (done) {

    client
      .withoutAngular()
      .url(url1)
      .pause(mywait)
      .getTitle().then(function (title) {
        console.log('Title was: ' + title);
        assert(title === title0);
        return this.url();
      })
      .call(done);
  });
  /*
   TaxOnlineTest
   Title was: MYOB Account - Sign in
   ok ✓ SecurityPage (6667ms)

   */

  it('MYOB Account - Sign in', function (done) {

    client
      .windowHandleMaximize()
      .withoutAngular()
      .setValue('#Username', uemail)
      .setValue('#Password', pw)
      .submitForm('#submit')
      .pause(mywait)
      .getTitle().then(function (title) {
        console.log('Title was: ' + title);
        assert(title === title2);
        console.log('URL was: ' + this.url);
        return this.url();
      })
      .pause(mywait)
      .call(done);
  });
  /*
   Title was: Practice Online
   ok ✓ MYOB Account - Sign in (11467ms)

   */
  it('Smoke - Tasks', function (done) {
    client
      .withoutAngular()
      .click('a[href="/tasks"]')
      .getText('a[href="/tasks"]', function (err, result) {
        //console.log(result);
        assert(result === 'Tasks');
      })
      .pause(mywait)
      .call(done);
  })
  it('Smoke - Accounting', function (done) {
    client
      .withoutAngular() 
      .click('a[href="/ledgers"]')
      .getText('a[href="/ledgers"]', function (err, result) {
        //console.log(result);
        assert(result === 'Accounting');
      })
      .pause(mywait)
      .call(done);
  })
  it('Smoke - Documents', function (done) {
    client
      .withoutAngular()
      .click('a[href="/documents"]')
      .getText('a[href="/documents"]', function (err, result) {
        //console.log(result);
        assert(result === 'Documents');
      })

      .pause(mywait)
      .call(done);
  });


});

/**
 *  
 ready to checkin
 2015 March 10

 online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015/spec/ui$ mocha smokeTest2.cjspec.js 


  TaxOnlineTest
 Title was: MYOB Account - Sign in
ok  ✓ SecurityPage (8932ms)
 Title was: Practice Online

  
 
  ✓ MYOB Account - Sign in (4968ms)
    ✓ Smoke - Tasks (463ms)
    ✓ Smoke - Accounting (498ms)
    ✓ Smoke - Documents (478ms)


  5 passing (18s)

online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015/spec/ui$ 

 */
