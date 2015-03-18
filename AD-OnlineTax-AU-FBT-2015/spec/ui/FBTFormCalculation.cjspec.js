//create by cynthia
//mocha --slow 15000 --timeout 30000 --recursive spec/**/loginpg3.cjspec.js
/*
 online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015/spec/ui$ mocha loginpg003.cjspec.js
 first run java stand alone server
 Aonline@OnlineTax-L1:~/webdriverio-test$
 java -jar selenium-server-standalone4.0.jar



 then run the test
 mocha loginpg007.cjspec.js
 This test combine Preethi and Cynthia - working fine

 */


'use strict';



var url0 = 'https://test.secure.myob.com/';
var url1='http://qa5.addevcloudsites.myob.com';

var url2= url1+'/clients';
//url1+'/clients/portals';
var urltax= url1+ '/tax/fbt';


var title0 ='MYOB Account - Sign in';
var uemail ='onlinetax005@gmail.com';
var pw ='Myob1234';
var  title2 ='Practice Online';
var mywait = 3000;

var expect = require('chai').expect;
var assertions = require('mocha').it;
var assert = require('assert');


//webdriverio = require('webdriverjs-angular');


var webdriverio = require('webdriverio');

describe('TaxOnlineTest', function () {

  //var client;
  this.timeout(99999999);
  var client = {};


  before(function(done){
    //client = webdriverio.remote(require('../../conf/webdriver-chrome.conf'));
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'firefox'} });
    client.init(done);
  });
  after(function (done) {
    client.end(done);
  });


  var baseUrl = process.env.BASE_URL || +url1;

  it('SecurityPage', function (done) {

    client
      .url(url1)
      .pause(mywait)
      .getTitle().then(function (title) {
        console.log('Title was: ' + title);
        assert(title === title0);
        return this.url();
      })
      .call(done);
  })
  /*
   TaxOnlineTest
   Title was: MYOB Account - Sign in
   ok ✓ SecurityPage (6667ms)

   */

  it('MYOB Account - Sign in', function (done) {

    client
      .windowHandleMaximize()
      .setValue('#Username', uemail)
      .setValue('#Password', pw)
      .submitForm('#submit')
      .pause(mywait)
      .getTitle().then(function(title) {
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
      .click('a[href="/tasks"]')
      .getText('a[href="/tasks"]', function(err, result){
        console.log(result);
        assert(result === 'Tasks');
      })
      .pause(mywait)
      .call(done);
  })
  it('Smoke - Accounting', function (done) {
    client
      .click('a[href="/ledgers"]')
      .getText('a[href="/ledgers"]', function(err, result){
        console.log(result);
        assert(result === 'Accounting');
      })
      .pause(mywait)
      .call(done);
  })
  it('Smoke - Documents', function (done) {
    client
      .click('a[href="/documents"]')
      .getText('a[href="/documents"]', function(err, result){
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


  it('Tax - Add FBT Return', function (done) {
    client
      .click('[class="icon-tax"]') // click on %Tax icon on the task bar
      .pause(mywait)
      .click('[class="page-header-cta btn btn-success"]') //Click on Add new form
      .pause(mywait)
      .getText('[class="page-header ng-scope"]', function(err, result) {
        console.log(result);
        assert(result === 'Add FBT Return');
        //Add FBT Return
      })
      .pause(mywait)
      .call(done);
  });

  it('Tax - Create FBT Return', function (done) {
    client
      .selectByValue('#client', '2') //Select the Client from the select client
      .pause (mywait)
      .getText('[class="btn btn-success"]', function(err, result) {
        console.log(result);
        assert(result === 'Create Return')
        //assert(result === 'Create Return');
        //Add FBT Return

      })
      .click('[class="btn btn-success"]') //Click on Create Return
      .pause(mywait)
      .call(done);
  })
  //

// Enter the details on the Business details tab
 // Enter the details on the Business details tab
  it('Tax - FBT Item 1- 4', function (done) {
    client
      //.click('=Return Calculation Details')
      .frame('iFrameResizer0') //Identifying the frame
      .setValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]', '999999523') //enter the TFN
      .pause(mywait)
      .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.TaxFileNumber.Identifier\'].value"]')
      .then(function (value) {
        console.log('successfully entered the TFN');
      })

      .setValue('[ng-model="form.fields[\'ReportingParty.Identifiers.AustralianBusinessNumber.Identifier\'].value"]', '98111133334') //Enter the ABN
      .pause(mywait)
      .getValue('[ng-model="form.fields[\'ReportingParty.Identifiers.AustralianBusinessNumber.Identifier\'].value"]')
      .then(function (value) {
        console.log('successfully entered the ABN');
      })
      .pause(mywait)
      .selectByValue('[ng-model="form.fields[\'Myob.ReportingParty.TrusteeSeniorPartner.Required\'].value"]', 'true') //Select the employer a trust or partnership?
      .pause(mywait)
      .selectByValue('[ng-model="form.fields[\'Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual\'].value"]', 'Non-individual') //Select trustee or senior partner individual and non individual
      .pause(mywait)
      .setValue('[id="input.ReportingParty.TrusteeSeniorPartner.OrganisationNameDetails.OrganisationalName.Text"]','trustee or senior partner')
      .selectByValue('[ng-model="form.fields[\'Myob.ReportingParty.Employer.IndividualOrNonIndividual\'].value"]', 'Non-individual') //Select the employer an individual or non-individual
      //top 4 fields filled
      .pause(mywait)
      .call(done);
  })
  it('Tax - FBT Item 5- 8', function (done) {
    client
      .setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Line1.Text"]','84 Joadja road') //Enter Addressline1
      .setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Line2.Text"]','AddressLine2')//Enter Addressline2
      .setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Line4.Text"]','AddressLine4')//Enter Addressline4
      .setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text"]','Melbourne') // Enter the town
      .selectByValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code\'].value"]', 'VIC') //Select the state
      .setValue('[id="input.ReportingParty.Employer.Postal.AddressDetails.Postcode.Text"]','3000') //Enter the Postal code
      // .selectByValue('[ng-model="form.fields[\'ReportingParty.Employer.Postal.AddressDetails.Country.Code\'].value"]', 'AL') //Select country outside Australia
      .selectByValue('[ng-model="form.fields[\'Myob.ReportingParty.Employer.Previous.Name.Required\'].value"]', 'false') //Select employer name changed
      .selectByValue('[ng-model="form.fields[\'Myob.ReportingParty.Employer.Previous.Required\'].value"]', 'false') //Select postal address changed
      .selectByValue('[ng-model="form.fields[\'Myob.ReportingParty.BusinessTradingName.Required\'].value"]', 'false') //Select Business/trading name changed first FBT
      .selectByValue('[ng-model="form.fields[\'Myob.ReportingParty.BusinessTradingAddress.Required\'].value"]', 'false') //Select Business/trading address changed first FBT
      .selectByValue('[ng-model="form.fields[\'Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required\'].value"]', 'true') //Select trustee/senior partner
      .pause(mywait)
      .call(done);
  });

  it('Tax - FBT Item 9- 13', function (done) {
    client
// Name of the person to contact

      //  .selectByValue('[ng-model="form.fields[\'ReportingParty.Contact.Title.Text\'].value"]', 'MR') //Select title

      .setValue('[id="input.ReportingParty.Contact.GivenName.Text"]','First given name') //Enter the given name
      .setValue('[id="input.ReportingParty.Contact.OtherGivenName.Text"]','other given name') //Enter the other given name
      .setValue('[id="input.ReportingParty.Contact.FamilyName.Text"]','Family Name') //Enter the other given name
      .selectByValue('[ng-model="form.fields[\'ReportingParty.Contact.NameSuffix.Text\'].value"]', 'ESQ') //Select the Suffix
      .setValue('[id="input.ReportingParty.ElectronicContact.Telephone.Area.Code"]','1234') //Enter the Area code
      .setValue('[id="input.ReportingParty.ElectronicContact.Telephone.Minimal.Number"]','0465124987') //Enter the Phone number
      .setValue('[id="input.ReportingParty.ElectronicContact.ElectronicMail.Address.Text"]','abcfamily@testonly.com') //Enter the email address
      .setValue('[id="input.ReportingParty.Remuneration.FringeBenefits.Recipients.Count"]','2') //Enter the number of employees receiving FB
      .setValue('[id="input.ReportingParty.Report.CompletionHours.Number"]','1') //Enter the hours taken to complete this form
      .selectByValue('[ng-model="form.fields[\'ReportingParty.Lodgment.FinalReturn.Indicator\'].value"]', 'true') //Select expect to lodge FBT return this year
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.BankStateBranch.Number"]','013000') //Enter the Bank state branch
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccount.Number"]','123456789') //Enter the Bank state branch
      .setValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text"]','Account Name') //Enter the Account Name
      .getValue('[id="input.ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text"]')
      .then(function (value) {
        console.log('successfully entered the data of the business details tab');
      })
      .call(done);
  });


  it('Tax - FBT Calculation1', function (done) {
    client
      //.click('Return Calculation Details')
      .click('#Return Calculation Details')
      .frame('iFrameResizer0') //Identifying the frame
      .click("link=Return Calculation Details")
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.ItemsProvided.Number\'].value"]', '200')
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "300")
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', "100")
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.ItemsProvided.Number\'].value"]', "201")
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "400")
      .setValue('[ng-model="form.fields[\'ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', "50")
      .setValue('[ng-model="form.fields[\'ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number\'].value"]', "202")
      .setValue('[ng-model="form.fields[\'ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "500")
      .setValue('[ng-model="form.fields[\'ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount\'].value"]', "100")
      .setValue('[ng-model="form.fields[\'ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "500")
      .setValue('[ng-model="form.fields[\'ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "600")
      .setValue('[ng-model="form.fields[\'ReportingParty.ExpensePayment.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', "20")
      .setValue('[ng-model="form.fields[\'ReportingParty.ExpensePayment.Remuneration.FringeBenefits.Reduction.Amount\'].value"]', "30")
      .setValue('[ng-model="form.fields[\'ReportingParty.Housing.Remuneration.FringeBenefits.ItemsProvided.Number\'].value"]', "205")
      .setValue('[ng-model="form.fields[\'ReportingParty.Housing.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "700")
      .setValue('[ng-model="form.fields[\'ReportingParty.Housing.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', "10")
      .setValue('[ng-model="form.fields[\'ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.ItemsProvided.Number\'].value"]', "206")
      .setValue('[ng-model="form.fields[\'ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "800")
      .setValue('[ng-model="form.fields[\'ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.Reduction.Amount\'].value"]', "120")
      .setValue('[ng-model="form.fields[\'ReportingParty.Board.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "200")
      .setValue('[ng-model="form.fields[\'ReportingParty.Board.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', "10")
      .setValue('[ng-model="form.fields[\'ReportingParty.Board.Remuneration.FringeBenefits.Reduction.Amount\'].value"]', "10")
      .setValue('[ng-model="form.fields[\'ReportingParty.Property.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "900")
      .setValue('[ng-model="form.fields[\'ReportingParty.Property.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', "100")
      .setValue('[ng-model="form.fields[\'ReportingParty.Property.Remuneration.FringeBenefits.Reduction.Amount\'].value"]', "200")
      .setValue('[ng-model="form.fields[\'ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "1000")
      .setValue('[ng-model="form.fields[\'ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "200")
      .setValue('[ng-model="form.fields[\'ReportingParty.OtherBenefits.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', "20")
      .setValue('[ng-model="form.fields[\'ReportingParty.OtherBenefits.Remuneration.FringeBenefits.Reduction.Amount\'].value"]', "30")
      .setValue('[ng-model="form.fields[\'ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "600")
      .setValue('[ng-model="form.fields[\'ReportingParty.CarParking.Remuneration.FringeBenefits.EmployeeContribution.Amount\'].value"]', "60")
      .setValue('[ng-model="form.fields[\'ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount\'].value"]', "200")
      .setValue('[ng-model="form.fields[\'ReportingParty.Remuneration.FringeBenefits.Type1Aggregate.Amount\'].value"]', "7800")
      .setValue('[ng-model="form.fields[\'ReportingParty.Remuneration.FringeBenefits.Type2Aggregate.Amount\'].value"]', "6400")
      .setValue('[ng-model="form.fields[\'ReportingParty.Remuneration.FringeBenefits.Type2Aggregate.Amount\'].value"]', "6040")
      .setValue('[ng-model="form.fields[\'ReportingParty.FringeBenefitsTax.LiabilityInstalmentsTotal.Amount\'].value"]', "10")
      .pause(mywait)
      .call(done);
  });
  it('Tax - FBT Calculation6', function (done) {
    client

    .setValue('id="input.Intermediary.Abn"]', "78928626495")
    .setValue('id="input.Intermediary.PersonUnstructuredName.FullName.Text"]', "Brian Agent")
    .setValue('id="input.Intermediary.Identifiers.TaxAgentNumber.Identifier"]', "98764532")
    .setValue('id="input.Intermediary.Declaration.SignatoryIdentifier.Text"]', "Brian Agent")
    .setValue('id="input.Intermediary.ElectronicContact.Telephone.Area.Code"]', "02")
    .setValue('id="input.Intermediary.ElectronicContact.Telephone.Minimal.Number"]', "610298776533")
    .setValue('id="input.ReportingParty.Declaration.SignatoryIdentifier.Text"]', "Adam Employer")
      .click("css=button.btn.btn-success")
    //.click("css=button.btn.btn-primary")
    .pause(mywait)
    .call(done);
});

});



//<a href="#" ng-click="togglePage('page-2')">Return Calculation Details</a>
//.click('a[href="/#"]')
