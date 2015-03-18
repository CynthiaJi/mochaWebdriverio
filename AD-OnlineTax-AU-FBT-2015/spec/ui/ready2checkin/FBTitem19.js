//create by cynthia


//verify value before set value , only blank then set value. 2015/03/14
//it('Tax - Postal Address', function (done) working as 2015 March 14

/*
online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015/spec/ui$ mocha FBTitem19.js 


  TaxOnlineTest
Title was: MYOB Account - Sign in
    ✓ SecurityPage (4615ms)
Title was: Practice Online
    ✓ MYOB Account - Sign in (5285ms)
Tasks
    ✓ Smoke - Tasks (8540ms)
Accounting
    ✓ Smoke - Accounting (8024ms)
Documents
    ✓ Smoke - Documents (8029ms)
Add FBT Return
    ✓ Tax - Add FBT Return (11377ms)
Create Return
    ✓ Tax - Create FBT Return (19998ms)
{ title: 
   { sessionId: '868ccef4-3d7a-478b-bcdf-8ddb8e06eb5b',
     status: 0,
     state: 'success',
     value: 'Practice Online',
     class: 'org.openqa.selenium.remote.Response',
     hCode: 1432896397 } }
    ✓ Tax - Pick Exsit FBT Return (17745ms)
42656503
    ✓ Tax - FBT Item TFN (15180ms)
17088268884
    ✓ Tax - FBT Item ABN (15004ms)
    ✓ Tax - Postal Address (14910ms)


  11 passing (2m)

online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015/spec/ui$ 

*/
'use strict';



var url0 = 'https://test.secure.myob.com/';
var url1='http://qa5.addevcloudsites.myob.com';
var url1s='https://qa5.addevcloudsites.myob.com';

var url2= url1+'/clients';
//url1+'/clients/portals';
var urltax= url1+ '/tax/fbt';


var title0 ='MYOB Account - Sign in';
var uemail ='onlinetax005@gmail.com';
var pw ='Myob1234';
pw='onlinetax789';
uemail ='onlinetax006@gmail.com';
pw ='Myob1234';


var  title2 ='Practice Online';
var mywait = 0;

var expect = require('chai').expect;
var assertions = require('mocha').it;
var assert = require('assert');

//data tax file number
var mystr ='';
var mytfn = '128383836';
var mytfn01 ='128383836';
var mytfn02 ='999999558';
var mytfn03 ='999999566';
var mytfn04 ='999999574';
var mytfn05 ='121231537';
var mytfn06 ='112432335';
var mytfn07 ='141125165';
var mytfn08 ='212231186';
var mytfn09 ='111154144';
var mytfn10 ='321131236';


//data abn
var myabn  = '78928626495';
var myabn01 = '78928626495';
var myabn02 = '111235114';
var myabn03 = '999999507';
var myabn04 = '999999523';
var myabn05 = '84111122223';
var myabn06 = '98111133334';
var myabn07 = '23111144445';
var myabn08 = '37111155556';
var myabn09 = '51111166667';

//data address
var myaddr ='97 Broadway'; 
var mysuburb ='nedlands';
var mystate ='WA';
var myPostcode ='6009';

var myaddr1 ='2 Holt Street'; 
var mysuburb1 ='Surry Hills';
var mystate1 ='NSW';
var myPostcode1 ='2010';

var myaddr2 ='60 City Road'; 
var mysuburb2 ='Southbank';
var mystate2 ='VIC';
var myPostcode2 ='3006';

var myaddr3 ='34 Stirling Street'; 
var mysuburb3 ='Perth';
var mystate3 ='WA';
var myPostcode3 ='6000';

var myaddr4 ='2 Salamanca Square'; 
var mysuburb4 ='Hobart';
var mystate4 ='TAS';
var myPostcode4 ='7001';

var myaddr5 ='371A Pitt Street'; 
var mysuburb5 ='Sydey';
var mystate5 ='NSW';
var myPostcode5 ='2000';
//webdriverio = require('webdriverjs-angular');


var webdriverio = require('webdriverjs-angular');

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

  it('1 SecurityPage', function (done) {

    client
      .withoutAngular()
      .url(url1)
      .pause(mywait)
      .getTitle().then(function (title) {
        console.log('Title was: ' + title);
        assert(title === title0);
      })
      .call(done);
  })
  /*
   TaxOnlineTest
   Title was: MYOB Account - Sign in
   ok ✓ SecurityPage (6667ms)

   */

  it('2 MYOB Account - Sign in', function (done) {

    client
      .withoutAngular()
      .windowHandleMaximize()
      .setValue('#Username', uemail)
      .setValue('#Password', pw)
      .submitForm('#submit')
      .pause(mywait)
      .getTitle().then(function (title) {
        console.log('Title was: ' + title);
        assert(title === title2);
      })
      .pause(mywait)
      .call(done);
  });
  /*
   Title was: Practice Online
   ok ✓ MYOB Account - Sign in (11467ms)

   */
  it('3 Smoke - Tasks', function (done) {
    client
      .withAngular()
      .click('a[href="/tasks"]')
      .getText('a[href="/tasks"]', function (err, result) {
        console.log(result);
        assert(result === 'Tasks');
      })
      .pause(mywait)
      .call(done);
  })
  //xit
  it('4 Smoke - Accounting', function (done) {
    client
      .withAngular()
      .click('a[href="/ledgers"]')
      .getText('a[href="/ledgers"]', function (err, result) {
        console.log(result);
        assert(result === 'Accounting');
      })
      .pause(mywait)
      .call(done);
  })
  //xit
  it('5 Smoke - Documents', function (done) {
    client
      .withAngular()
      .click('a[href="/documents"]')
      .getText('a[href="/documents"]', function (err, result) {
        console.log(result);
        assert(result === 'Documents');
      })

      .pause(mywait)
      .call(done);
  });

  /**
   * documentsTasks
   Accounting
   Documents
   ok ✓ Smoke (3562ms)


   */

//xit
  it('6 Tax - Add FBT Return', function (done) {
    client
      .withAngular()
      //.click('[class="icon-tax"]') // click on %Tax icon on the task bar
      .url(url1s+'/tax/fbt')
      .pause(mywait)
      .click('[class="page-header-cta btn btn-success"]') //Click on Add new form
      .pause(mywait)
      .getText('[class="page-header ng-scope"]', function (err, result) {
        console.log(result);
        assert(result === 'Add FBT Return');
        //Add FBT Return
      })
      .pause(mywait)
      .call(done);
  });

//xit
  it('7 Tax - Create FBT Return', function (done) {
    client
      .withAngular()
      .waitFor('//select[@id="client"]/option[text()="Please select"]', 2000)
      .selectByValue('#client', '2') //Select the Client from the select client
      .pause(mywait)
      .getText('[class="btn btn-success"]', function (err, result) {
        console.log(result);
        assert(result === 'Create Return')
        //assert(result === 'Create Return');
        //Add FBT Return

      })
      .click('[class="btn btn-success"]') //Click on Create Return
      .pause(mywait)
      .call(done);
  })
  //body > div.wrapper.ng-scope.nav-expanded > div > div.container-fluid > div > div > div > div.panel.panel-default.ng-scope > div > form > button
  ///html/body/div[2]/div/div[2]/div/div/div/div[2]/div/form/button
  //li.list-group-item:nth-child(5) > div:nth-child(1) > div:nth-child(1) > h4:nth-child(2) > a:nth-child(1)
  //li.list-group-item:nth-child(4) > div:nth-child(1) > div:nth-child(1) > h4:nth-child(2) > a:nth-child(1)
  //h2.ng-binding
  //'#input\.ReportingParty\.Employer\.PersonNameDetails\.FamilyName\.Text'
  //'2015 Fringe Benefits Tax Return'
  //.form-section > div:nth-child(1) > div:nth-child(1) > label:nth-child(1)
  //Online Tax Form Scaffolding
  //var url1='http://qa5.addevcloudsites.myob.com';
  //          https://qa5.addevcloudsites.myob.com/tax/fbt
  //var url1='https://qa5.addevcloudsites.myob.com';
xit('8 Tax - Pick Exsit FBT Return', function (done) {
    client
      .withAngular()
      .url(url1s+'/tax/fbt')
      //.click('[class="icon-tax"]') // click on %Tax icon on the task bar
      .pause(mywait)
      .click('li.list-group-item:nth-child(3) > div:nth-child(1) > div:nth-child(1) > h4:nth-child(2) > a:nth-child(1)') //Click on existing FBT form
            //li.list-group-item:nth-child(5) > div:nth-child(1) > div:nth-child(1) > h4:nth-child(2) > a:nth-child(1)
      //body > div.wrapper.ng-scope.nav-expanded > div > div.container-fluid > div > div > div > div.online-tax-list.ng-scope > ul > li:nth-child(6) > div > div.col-xs-9.list-group-item-main > h4 > a
      .pause(mywait)
       .getTitle().then(function (err, result) {
        console.log(result);
        assert(result === result);
        //pick up existing FBT Return
      })
      .pause(mywait)
      .call(done);
  });
  // Enter the details on the Business details tab
//xit
  it('9 Tax - FBT Item TFN', function (done) {
    client
       .withAngular()
      .frame('iFrameResizer0') //Identifying the frame when create a new FBT return
      .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]', function(err, value) {
        mystr = value;
        //.toString().trim();
         if (mystr != '') {
        //string = $.trim(string);
          mytfn01 = value;
          //console.log(value);
          //console.log(mytfn01);
          mystr ='';
        }
        else{
        client.setValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]',mytfn01);  
        }
       })
      .click('[ng-click="save(form)"]')
      .pause(mywait)
      //. setValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]',mytfn01)
      .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]', function(err, value) {
        console.log(value);
        assert(value === mytfn01);
      })
        .pause(mywait)
        .call(done);
  })
//xit
  it('10 Tax - FBT Item ABN', function (done) {
  client
    .withAngular()
    .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.AustralianBusinessNumber.Identifier\'].value"]', function(err, value) {
        mystr = value;
        //.toString().trim();
        
         if (mystr != '') {
        myabn01=value;
          //console.log(value);
          //console.log(myabn01);
      }
      else {
      client.setValue('[ng-model="form.fields[\'ReportingParty.Identifiers.AustralianBusinessNumber.Identifier\'].value"]', myabn01);
       //Enter the ABN;  
      }
      })
      
      .pause(mywait)
      .click('[ng-click="save(form)"]')
      .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.AustralianBusinessNumber.Identifier\'].value"]', function(err, value){
        console.log(value);
        assert(value === myabn01);
      })
      .pause(mywait)
      .call(done);
  })
it('11 Tax - Postal Address', function (done) {
  client
    .withAngular()
    .getValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Line1.Text"]', function(err, value) {
        mystr = value;
        //.toString().trim();
        
         if (mystr != '') {
        myaddr=value;
          //console.log(value);
          //console.log(myabn01);
      }
      else {
      client.setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Line1.Text"]',myaddr) 
      //Enter Addressline1
      }
      })
    .getValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text"]', function(err, value) {
        mystr = value;
        //.toString().trim();
        
         if (mystr != '') {
        mysuburb=value;
          //console.log(value);
          //console.log(myabn01);
      }
      else {
      client.setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text"]',mysuburb) 
      // Enter the suburb
      }
      })

      //.setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Line2.Text"]','AddressLine2')//Enter Addressline2
      //.setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Line4.Text"]','AddressLine4')//Enter Addressline4
      .getValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code\'].value"]', function(err, value) {
        mystr = value;
        //.toString().trim();
        
         if (mystr != '') {
        mystate=value;
          //console.log(value);
      
      }
      else {
      client.selectByValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code\'].value"]', mystate) 
      //Select the state
      }
      })

    .getValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Postcode.Text"]', function(err, value) {
        mystr = value;
        //.toString().trim();
        
         if (mystr != '') {
        myPostcode =value;
          //console.log(value);
      
      }
      else {
      client.setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Postcode.Text"]',myPostcode) 
      //Enter the Postal code
      }
      })
      .pause(mywait)
      .call(done);
      
  })
})
