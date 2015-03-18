        .url('http://www.google.com')
7	        .click('input[name="q"]')
8	        .keys([searchString])
9	        .pause(2000)
10	        .keys(['Enter']) //press Enter Key
11	        .call(callback);
12	  }
13	};
 

describe('click', function() {

    before(h.setup());

    it('text should be visible after clicking on .btn1', function(done) {

        this.client
            .isVisible('//html/body/section/div[7]', function(err,isVisible) {
                assert.ifError(err);
                isVisible.should.be.false;
            })
            .click('//html/body/section/button[1]')
            .isVisible('//html/body/section/div[7]', function(err,isVisible) {
                assert.ifError(err);
                isVisible.should.be.true;
            })
            .call(done);

    });

});


cd webdriverio-test/AD-OnlineTax-AU-FBT-2015
 
 mocha --slow 15000 --timeout 30000 --recursive spec/**/*.cjspec.js
  mocha --slow 15000 --timeout 30000 --recursive spec/ui/*.cjspec.js

npm run cjtest


online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015$ npm run cjtest

> au-fbt-2015@0.1.0 cjtest /home/online/webdriverio-test/AD-OnlineTax-AU-FBT-2015

> mocha --slow 15000 --timeout 30000 --recursive spec/**/*.loginpg3.js

//below working
  -s, --slow <ms>                 "slow" test threshold in milliseconds [75]
  -t, --timeout <ms>              set test-case timeout in milliseconds [2000]
  --recursive                     include sub directories

  
cd webdriverio-test/AD-OnlineTax-AU-FBT-2015
  
  
mocha --slow 15000 --timeout 30000 --recursive spec/ui/loginpg2e2.cjspec.js






  .getByClassName(('a[href="/tax"]',function(err, txt){
        for (var k in text) {
          console.log(k);
        }
      })
