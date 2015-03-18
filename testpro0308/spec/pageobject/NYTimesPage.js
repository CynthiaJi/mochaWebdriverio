/**
 * Created by online on 9/03/15.
 */


var chai = require('chai');
var assert = chai.assert;

var strings = {
    title: 'The New York Times - Breaking News, World News & Multimedia',
};

function YahooNewsPage(client) {
    this.client = client;
}

YahooNewsPage.prototype = {
    goToPage: function(done) {
        this.client
            .url('http://www.nytimes.com')
            .waitFor('body', 10000)
            .getTitle(function(err, title) {
                assert.equal(title, strings.title, "title not as expected");
            })
            .call(done);
    }
};

module.exports = YahooNewsPage;
