/**
 * Created by online on 25/02/15.
 */


var webdriverio = require('webdriverjs-angular');
  assert      = require('assert');

describe('angularjs homepage', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'firefox'} });
    client.init(done);
  });



  it('should be AngularJS', function(done) {
    client
      .url('http://www.angularjs.org')
      .click('body > header > div > div > div > ul > li.active > a')
      .getValue('body > header > div > div > div > ul > li.active > a', function (err, value) {
        console.log(value);
      })
      .getTitle()
      .then(function (err, title) {
        console.log(title);
        assert(value === 'AngularJS — Superheroic JavaScript MVW Framework');
      })
      .call(done);
  });
  it('should be GitHub2', function(done) {
    client
      .click('btn btn-large btn primary')
      .getTitle()
      .then(function(err, title){
        console.log(title);
        //assert(title === 'angular/angular.js · GitHub')
      })
      .call(done);
  });

  it('should be GitHub2', function(done) {
    client
      .click('btn btn-large btn primary')
      .getTitle()
      .then(function(err, title){
        console.log(title);
        //assert(title === 'angular/angular.js · GitHub')
      })
      .call(done);
  });
  after(function(done) {
    client.end(done);
  });
});

/**
 *
 *     it('should be GitHub', function(done) {
      client
        .click('body > div:nth-child(2) > div.stage-container > div > div.center.stage-buttons > a:nth-child(1)')
        .click('body > div:nth-child(2) > div.stage-container > div > div.center.stage-buttons > a.btn.btn-large.btn-warning')
        .getTitle()
        .then(function(err, title){
          console.log(title);
          //assert(title === 'angular/angular.js · GitHub')
      })
      .call(done);
      });
 *   it('todo list', function(done) {
    client
      .url('http://www.angularjs.org')
      .elements("[ng-repeater='todo in todos']", function (err, result) {
        var i;
        for (i = 0; i < result.length; i++) {
          console.log(result[i]);
        }
        assert(result.count() === 2);
        assert(result.get(1).getText() === 'build an angular app');
        })
      .call(done);
  });
    it('should add a todo', function() {
      var addTodo = element(by.model('todoText'));
      var addButton = element(by.css('[value="add"]'));

      addTodo.sendKeys('write a protractor test');
      addButton.click();

      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write a protractor test');
    });
  });

*/
