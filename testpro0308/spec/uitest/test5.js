/**
 * Created by online on 6/03/15.
 */


    /**
var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();
*/
describe('basic test', function () {
    it('should be on correct page', function () {
        browser.get('http://www.wingify.com');
        browser.getTitle().then(function(title) {
            expect(title).toEqual('Wingify');
            console.log(title);
        });
    });
});


//expect(todoList.get(1).getText()).toEqual('build an angular app');