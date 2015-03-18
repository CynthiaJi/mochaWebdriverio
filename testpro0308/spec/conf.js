/**
 * Created by online on 6/03/15.
 */
// conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['uitest/*.js'],
    capabilities: {
        browserName: 'firefox'
    }
}