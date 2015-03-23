//create by cynthia


//verify value before set value , only blank then set value. 2015/03/14
//it('Tax - Postal Address', function (done) working as 2015 March 14

/*
 TaxOnlineTest
Title was: MYOB Account - Sign in
    ✓ 2 SecurityPage (7343ms)
Title was: Practice Online
    ✓ 3 MYOB Account - Sign in (4823ms)
Tasks
    ✓ 4 Smoke - Tasks (13674ms)
Accounting
    ✓ 5 Smoke - Accounting (12876ms)
Documents
    ✓ 6 Smoke - Documents (12588ms)
Add FBT Return
    ✓ 7 Tax - Add FBT Return (17128ms)
Create Return
    ✓ 8 Tax - Create FBT Return (32755ms)
    - 9 Tax - Pick Exsit FBT Return
212511415
212511415
    ✓ 10 Tax - FBT Item TFN (20420ms)
15752416749
    ✓ 11 Tax - FBT Item ABN (16373ms)
    ✓ 12C Tax - Postal Address (49610ms)
    ✓ 13 FBT Item Contact (58857ms)
    ✓ 13B FBT Item Contact (68031ms)
    ✓ 14 FBT ElectronicTransfer (46251ms)
    ✓ 21 Car Calculation (50081ms)
    ✓ 22 LoansGranted Calculation (24874ms)
    ✓ 23 Debtwaiver (16726ms)


  16 passing (8m)
  1 pending


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

  it('2 SecurityPage', function (done) {

    client
      .withoutAngular()
      .url(url1)
      .pause(mywait)
      .getTitle().then(function (title) {
        console.log('Title was: ' + title);
        assert(title === title0);
      })
      .call(done);
  });
  /*
   TaxOnlineTest
   Title was: MYOB Account - Sign in
   ok ✓ SecurityPage (6667ms)

   */

  it('3 MYOB Account - Sign in', function (done) {

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
   //it
  it('4 Smoke - Tasks', function (done) {
    client
      .withAngular()
      .click('a[href="/tasks"]')
      .getText('a[href="/tasks"]', function (err, result) {
        console.log(result);
        assert(result === 'Tasks');
      })
      .pause(mywait)
      .call(done);
  });
  //it
  it('5 Smoke - Accounting', function (done) {
    client
      .withAngular()
      .click('a[href="/ledgers"]')
      .getText('a[href="/ledgers"]', function (err, result) {
        console.log(result);
        assert(result === 'Accounting');
      })
      .pause(mywait)
      .call(done);
  });
  //it
  it('6 Smoke - Documents', function (done) {
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


  it('7 Tax - Add FBT Return', function (done) {
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

//it
  it('8 Tax - Create FBT Return', function (done) {
    client
      .withAngular()
      .waitFor('//select[@id="client"]/option[text()="Please select"]', 2000)
      .selectByValue('#client', '2') //Select the Client from the select client
      .pause(mywait)
      .getText('[class="btn btn-success"]', function (err, result) {
        console.log(result);
        assert(result === 'Create Return');
        //assert(result === 'Create Return');
        //Add FBT Return

      })
      .click('[class="btn btn-success"]') //Click on Create Return
      .pause(mywait)
      .call(done);
  });
 
xit('9 Tax - Pick Exsit FBT Return', function (done) {
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
//it
  it('10 Tax - FBT Item TFN', function (done) {
    client
       .withAngular()
      .frame('iFrameResizer0') //Identifying the frame when create a new FBT return
      .waitFor('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]',2000)
      .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]', function(err,value){
         if (typeof value != 'undefined') {
          mytfn01 = value;
          console.log(value);
         }
        else{
        client.setValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]',mytfn01);  
          }
      })
      .pause(mywait)
      .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]', function(err, value) {
        console.log(value);
        assert(value === mytfn01);
      })
        .pause(mywait)
        .click('[ng-click="save(form)"]')
        .call(done);
  });
//it
  it('11 Tax - FBT Item ABN', function (done) {
  client
    .withAngular()
    .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.AustralianBusinessNumber.Identifier\'].value"]', function(err, value) {
        if (typeof value != 'undefined') {
        myabn01=value;
          //console.log(value);
      
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
  });
  //111217337
  //ok  ✓ 10 Tax - FBT Item TFN (17235ms)
//26133219437
  //ok   ✓ 11 Tax - FBT Item ABN (17953ms)

//ok✓ 12B Tax - Postal Address (18838ms)
//the state cannot be selected.
//
//✓ 12C Tax - Postal Address (49214ms)

it('12C Tax - Postal Address', function (done) {
  client
    .withAngular()
    .setValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.Line1.Text\'].value"]',myaddr) 
    .setValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.Line2.Text\'].value"]',myaddr1) 
        //Enter Addressline1
    .setValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text\'].value"]',mysuburb) 
    .getValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text\'].value"]',function(err,value){
      assert(value === mysuburb);
    }) 
    //<select class="form-control form-input-toggle ng-pristine ng-valid ng-valid-required ng-touched" 
    //ng-model="form.fields['ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code']" 
    //ng-options="state.name for state in selectValues.States track by state.name" ng-change="run()" 
    //required="" ng-disabled="!editable(form)"><option value="" class="">Select...</option><option value="ACT" label="ACT">ACT</option><option value="NSW" label="NSW">NSW</option><option value="NT" label="NT">NT</option><option value="QLD" label="QLD">QLD</option><option value="SA" label="SA">SA</option><option value="TAS" label="TAS">TAS</option><option value="VIC" label="VIC">VIC</option><option value="WA" label="WA">WA</option></select>
    
  
    .waitFor('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code\']"]', 2000)
    .selectByValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code\']"]', mystate)

    //Select the State from the drop down
      
    .setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Postcode.Text"]',myPostcode) 
      //Enter the Postal code
     .click('[ng-click="save(form)"]')
      .pause(mywait)
      .call(done);
     
  });

//cannot do select by value
//ok ✓ 13 FBT Item Contact (37218ms)

 it('13 FBT Item Contact', function (done) {
    client
    .withAngular()
      // Name of the person to contact
      //.selectByValue('[ng-model="form.fields[\'ReportingParty.Contact.Title.Text\'].value"]', 'Ms') 
      //Select title
      .setValue('[id="input.ReportingParty.Contact.GivenName.Text"]','Cynthia') 
      //Enter the given name
      .setValue('[id="input.ReportingParty.Contact.OtherGivenName.Text"]','Julia') 
      //Enter the other given name
      .setValue('[id="input.ReportingParty.Contact.FamilyName.Text"]','Ji') 
      //Enter the other given name
      //.selectByValue('[ng-model="form.fields[\'ReportingParty.Contact.NameSuffix.Text\'].value"]', 'JP') 
      //Select the Suffix
      .setValue('[id="input.ReportingParty.ElectronicContact.Telephone.Area.Code"]','612') 
      //Enter the Area code
      .setValue('[id="input.ReportingParty.ElectronicContact.Telephone.Minimal.Number"]','90899038') 
      //Enter the Phone number
      .setValue('[id="input.ReportingParty.ElectronicContact.ElectronicMail.Address.Text"]','cynthia.ji@myob.com') 
      //Enter the email address
      .setValue('[id="input.ReportingParty.Remuneration.FringeBenefits.Recipients.Count"]','2') 
      //Enter the number of employees receiving FB
      .setValue('[id="input.ReportingParty.Report.CompletionHours.Number"]','1') 
      //Enter the hours taken to complete this form
      //.selectByValue('[ng-model="form.fields[\'ReportingParty.Lodgment.FinalReturn.Indicator\'].value"]', 'Yes') 
      //Select expect to lodge FBT return for future year
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.BankStateBranch.Number"]','402112') 
      //Enter the Bank state branch
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccount.Number"]','987654321') 
      //Enter the Bank state branch
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text"]','CynthiaJi&&BankDay') 
      //Enter the Account Name
      .getValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text"]')
      .then(function (value) {
        assert(value === 'CynthiaJi&&BankDay');
      })
      .click('[ng-click="save(form)"]')
      .pause(mywait)
      .call(done);
  });
//with title selection
//   ✓ 13B FBT Item Contact (67156ms)
it('13B FBT Item Contact', function (done) {
    client
    .withAngular()
    //<select class="form-control form-input-toggle ng-valid ng-valid-required ng-touched ng-dirty ng-valid-parse" 
    //ng-model="form.fields['ReportingParty.Contact.Title.Text']" 
     //.waitFor('[ng-model="form.fields[\'ReportingParty.Contact.Title.Text\']"]',2000)
      //.selectByValue('[ng-model="form.fields[\'ReportingParty.Contact.Title.Text\']"]','MRS')
      // Name of the person to contact
      //Select title
    
      .setValue('[id="input.ReportingParty.Contact.GivenName.Text"]','Cynthia') 
      //Enter the given name
      .setValue('[id="input.ReportingParty.Contact.OtherGivenName.Text"]','Julia') 
      //Enter the other given name
      .setValue('[id="input.ReportingParty.Contact.FamilyName.Text"]','Ji') 
      //Enter the other given name
      //.selectByValue('[ng-model="form.fields[\'ReportingParty.Contact.NameSuffix.Text\'].value"]', 'JP') 
      //Select the Suffix
      //<select class="form-control form-input-toggle ng-pristine ng-valid ng-valid-required ng-touched" 
      //ng-model="form.fields['ReportingParty.Contact.NameSuffix.Text']" ng-options="suffix.name for suffix in selectValues.Suffixes track by suffix.value" ng-change="run()" required="" ng-disabled="!editable(form)"><option value="" class="">Select...</option><option value="ESQ" label="ESQ">ESQ</option><option value="II" label="II">II</option><option value="III" label="III">III</option><option value="IV" label="IV">IV</option><option value="JNR" label="JNR">JNR</option><option value="JP" label="JP">JP</option><option value="MHA" label="MHA">MHA</option><option value="MHR" label="MHR">MHR</option><option value="MLA" label="MLA">MLA</option><option value="MLC" label="MLC">MLC</option><option value="MP" label="MP">MP</option><option value="QC" label="QC">QC</option><option value="SNR" label="SNR">SNR</option></select>
      .waitFor('[ng-model="form.fields[\'ReportingParty.Contact.NameSuffix.Text\']" ]',2000)
      .selectByValue('[ng-model="form.fields[\'ReportingParty.Contact.NameSuffix.Text\']" ]','JP')
      .setValue('[id="input.ReportingParty.ElectronicContact.Telephone.Area.Code"]','612') 
      //Enter the Area code
      .setValue('[id="input.ReportingParty.ElectronicContact.Telephone.Minimal.Number"]','90899038') 
      //Enter the Phone number
      .setValue('[id="input.ReportingParty.ElectronicContact.ElectronicMail.Address.Text"]','cynthia.ji@myob.com') 
      .getValue('[id="input.ReportingParty.ElectronicContact.ElectronicMail.Address.Text"]',function(err, value){
        assert(value == 'cynthia.ji@myob.com')
      }) 
      //Enter the email address
      .setValue('[id="input.ReportingParty.Remuneration.FringeBenefits.Recipients.Count"]','2') 
      //Enter the number of employees receiving FB
      .setValue('[id="input.ReportingParty.Report.CompletionHours.Number"]','1') 
      //Enter the hours taken to complete this form
      
       .click('[ng-click="save(form)"]')
      .pause(mywait)
      .call(done);
 
    })
it('14 FBT ElectronicTransfer', function (done) {
    client
    .withAngular()
      
      //.selectByValue('[ng-model="form.fields[\'ReportingParty.Lodgment.FinalReturn.Indicator\'].value"]', 'Yes') 
      //Select expect to lodge FBT return for future year
      //<select class="form-control form-input-toggle ng-pristine ng-invalid ng-invalid-required ng-touched" 
      //ng-model="form.fields['ReportingParty.Lodgment.FinalReturn.Indicator'].value" ng-change="run()" required="" ng-disabled="!editable(form)">
      .waitFor('[ng-model="form.fields[\'ReportingParty.Lodgment.FinalReturn.Indicator\'].value"]',1000)
      .selectByValue('[ng-model="form.fields[\'ReportingParty.Lodgment.FinalReturn.Indicator\'].value"]','true')
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.BankStateBranch.Number"]','402112') 
      //Enter the Bank state branch
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccount.Number"]','987654321') 
      //Enter the Bank state branch
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text"]','CynthiaJi&&BankDay') 
      //Enter the Account Name
      .getValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text"]')
      .then(function (value) {
        assert(value === 'CynthiaJi&&BankDay');
      })
      .click('[ng-click="save(form)"]')
      .pause(mywait)
      .call(done);
  });


it('21 Car Calculation', function (done) {
  var carAmount = 1000;
  var carContri =100;
    client
      .withAngular()
      //Identifying the frame
      .click('[ng-click="togglePage(\'page-2\')"]')
      //Cars using the Statutory formula
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.ItemsProvided.Number\'].value"]', '1')
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', carAmount)
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', carContri)
      //ng-model="form.fields['ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitNetTaxable.Amount'].value"
      
      .getValue('[ng-model="form.fields[\'ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitNetTaxable.Amount\'].value"]', function(err, value){
        assert(value == (carAmount - carContri));
      })
      //Cars using the operating cost method
      //ng-model="form.fields['ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitNetTaxable.Amount'].value"  
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.ItemsProvided.Number\'].value"]', "2")
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', carAmount)
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', carContri)
      .getValue('[ng-model="form.fields[\'ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitNetTaxable.Amount\'].value"]', function(err,value){
         assert(value == (carAmount - carContri));
      })
      //ng-click="save(form)">Save</button>
      .click('[ng-click="save(form)"]')
      .pause(mywait)
      .call(done)
    })

it('22 LoansGranted Calculation', function (done) {
    var carAmount = 1000;
    var carContri =100;
    client
      .withAngular()
      //loans granted
      //ng-model="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number'].value" ng-change="run()" class="form-control ng-pristine ng-valid ng-touched" ng-readonly="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number'].source === 'calculation'" source-selection="ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number" ng-disabled="!editable(form)">
      .setValue('[ng-model="form.fields[\'ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number\'].value"]', "3")
      //ng-model="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount'].value" ng-change="run()" class="form-control ng-pristine ng-valid ng-touched" ng-readonly="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount'].source === 'calculation'" source-selection="ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount" ng-disabled="!editable(form)">
      .setValue('[ng-model="form.fields[\'ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', carAmount)
      //ng-model="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount'].value" ng-change="run()" class="form-control ng-pristine ng-valid ng-touched" ng-readonly="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount'].source === 'calculation'" source-selection="ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount" ng-disabled="!editable(form)">
      .setValue('[ng-model="form.fields[\'ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount\'].value"]', carContri)
      //ng-model="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitNetTaxable.Amount'].value" ng-change="run()" class="form-control ng-pristine ng-valid ng-touched" ng-readonly="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitNetTaxable.Amount'].source === 'calculation'" source-selection="ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitNetTaxable.Amount" ng-disabled="!editable(form)" readonly="readonly">
      .getValue('[ng-model="form.fields[\'ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitNetTaxable.Amount\'].value"]', function(err, value){
        assert(value == (carAmount - carContri));
      })
      .click('[ng-click="save(form)"]')
      .pause(mywait)
      .call(done);
  });

it('23 Debtwaiver', function (done) {
    var carAmount = 1000;
    var carContri =100;
    client
      .withAngular()
      //loans granted
      
      //ng-model="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number'].value" ng-change="run()" class="form-control ng-pristine ng-valid ng-touched" ng-readonly="form.fields['ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number'].source === 'calculation'" source-selection="ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number" ng-disabled="!editable(form)">
      .setValue('[ng-model="form.fields[\'ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', carAmount)
      //<input id="input.ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount" type="text" 
      //ng-model="form.fields['ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount'].value" ng-change="run()" class="form-control ng-pristine ng-valid ng-touched" ng-readonly="form.fields['ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount'].source === 'calculation'" source-selection="ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount" ng-disabled="!editable(form)" readonly="readonly">
      .getValue('[ng-model="form.fields[\'ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount\'].value"]', function(err, value){
        assert(value == carAmount );
      })
      .click('[ng-click="save(form)"]')
      .pause(mywait)
      .call(done);
  });



  });
