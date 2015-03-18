/**
 * Created by online on 9/03/15.
 */

// /pages/YahooNewsPage.js

var webdriverjs = require('webdriverjs')
var chai = require('chai')
var assert = chai.assert

var strings = {
    title : 'Yahoo News - Latest News & HeadlinesXX',
}

function YahooNewsPage(client) {
    this.client = client;
}

YahooNewsPage.prototype = {
    goToPage : function(done) {
        this.client
            .url('http://news.yahoo.com')
            .waitFor('body',10000)
            .getTitle(function(err,title) {
                assert.equal(title,strings['title'],"title not as expected")
            })
            .call(done)
    }
}

module.exports = YahooNewsPage;
