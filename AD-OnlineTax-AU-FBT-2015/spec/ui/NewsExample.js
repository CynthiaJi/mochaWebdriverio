/**
 * Created by online on 9/03/15.
 not working
 */

var webdriverjs = require('webdriverio');
//var util = require('../lib/Util.js');
var util = require('Util.js');
var YahooNewsPage = require('./pageobject/YahooNewsPage');
var NYTimesPage = require('./pageobject/NYTimesPage');

var client;

describe('webdriverio tests', function () {
    this.timeout(30000);

    beforeEach(function() {
        client = util.getClient()
    })

    afterEach(function(done) {
        client.end(done);
    });

    it('y! news test',function(done) {
        var yahooNews = new YahooNewsPage(client)
// Uncomment the line below and comment the two below it to see the two tests both getting executed (1 failure, then 1 pass).
//  yahooNews.goToPage(done)
        yahooNews.goToPage()
        done();
    });

    it('nytimes test',function(done) {
        var nytimes = new NYTimesPage(client)
// Uncomment the line below and comment the two below it to see the two tests both getting executed (1 failure, then 1 pass).
//  nytimes.goToPage(done)
        nytimes.goToPage()
        done();
    });

})
