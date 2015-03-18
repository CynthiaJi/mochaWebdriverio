
	var expect=require('chai').expect;
	var word = require('../index.js');

describe('Sanitize', function() {
  it('returns lowercase of a string',function(){
   
 var inputWord = 'HELLO WORLD';
    var sanitizedWord = word.sanitize(inputWord);

    expect(sanitizedWord).to.equal('hello world');
    expect(sanitizedWord).to.not.equal('hello earth');
    expect(sanitizedWord).to.be.a('string');
    expect(sanitizedWord).to.not.be.a('number');
    expect(sanitizedWord).to.contain('hello');
    /*
    expect(word).to.equal('hello world');
    expect(word).to.not.equal('hello earth');
    expect(word).to.be.a('string');
    expect(word).to.not.be.a('number');
    expect(word).to.contain('hello');
    */
});
  it('returns an array of words', function() {
    var sentence = 'hello world';
    var tokenizedSentence = word.tokenize(sentence);

    expect(tokenizedSentence).to.include.members(['hello', 'world'])
  });
  it('removes any hyphen');
});

describe('Github info', function() {
  it('returns repo info from github', function(done) {
    word.info(function(reply) {
      expect(reply.language).to.equal('JavaScript');
      expect(reply.watchers).to.equal(193);
      console.log('RECEIVED');
      //call(done);
      done();
    });
    console.log('HELLO');
  })
});


describe('Github infoLang', function() {
  it('returns language information from github', function(done) {

    var ghRepo = {
      "language": "Assembly"
    };
    var stub = sinon.stub().callsArgWith(0, ghRepo);

    word.infoLang(stub, function(reply) {
      console.log(reply);
      expect(reply).to.be.equal('Language: Assembly');
      done();
    })
  })
})


/*
online@OnlineTax-L1:~/webdriverio-test/mocha4cji$ npm test

> mocha4cji@1.0.0 test /home/online/webdriverio-test/mocha4cji
> mocha && mocha test --require blanket --reporter html-cov > coverage.html



  Sanitize
    ✓ returns lowercase of a string 
    ✓ returns an array of words 
    - removes any hyphen

  Github info
HELLO
RECEIVED
    ✓ returns repo info from github (1016ms)

  Github infoLang
    1) returns language information from github

  from Homepage
    2) "before each" hook
    3) "after all" hook


  3 passing (11s)
  1 pending
  3 failing

  1) Github infoLang returns language information from github:
     ReferenceError: sinon is not defined
      at Context.<anonymous> (/home/online/webdriverio-test/mocha4cji/test/indexSpec.js:53:16)
      at Test.Runnable.run (/home/online/webdriverio-test/mocha4cji/node_modules/mocha/lib/runnable.js:233:15)
      at Runner.runTest (/home/online/webdriverio-test/mocha4cji/node_modules/mocha/lib/runner.js:387:10)
      at /home/online/webdriverio-test/mocha4cji/node_modules/mocha/lib/runner.js:470:12
      at next (/home/online/webdriverio-test/mocha4cji/node_modules/mocha/lib/runner.js:312:14)
      at /home/online/webdriverio-test/mocha4cji/node_modules/mocha/lib/runner.js:322:7
      at next (/home/online/webdriverio-test/mocha4cji/node_modules/mocha/lib/runner.js:257:23)
      at Object._onImmediate (/home/online/webdriverio-test/mocha4cji/node_modules/mocha/lib/runner.js:289:5)
      at processImmediate [as _immediateCallback] (timers.js:345:15)

  

*/