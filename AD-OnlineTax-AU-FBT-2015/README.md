# Australia FBT 2015 form

## Setup

After cloning, run this command to install the dependencies:

    npm install

An additional step is required to install Selenium Standalone, required for the UI tests:

    npm run selenium-install

## Tests

To run all unit tests, including tests of all the calculation and validation rules, run:

    npm test

To run UI tests, run this command:

    npm run uitest
    
You can optionally specify a browser to be used for the test (Google Chrome is the default):

    SELENIUM_BROWSER=phantomjs npm run uitest 

## Packaging

To package the tax form for deployment, run the `package-client` script. Ensure you have run `npm install` prior to packaging.

    ./package-client au-fbt-2015.tar.gz


##Cynthia
cd onlinetax/AD-OnlineTax-AU-FBT-2015
 
 npm run cjtest
mocha --slow 15000 --timeout 30000 --recursive spec/**/loginpg2.cjspec.js


cd onlinetax/AD-OnlineTax-AU-FBT-2015 && mocha --slow 15000 --timeout 30000 --recursive spec/**/loginpg2.cjspec.js

cd webdriverio-test/AD-OnlineTax-AU-FBT-2015 && mocha --slow 15000 --timeout 30000 --recursive spec/**/loginpg2.cjspec.js


