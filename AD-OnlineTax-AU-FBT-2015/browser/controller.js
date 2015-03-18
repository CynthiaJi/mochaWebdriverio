var run = require('../lib/run'),
  Url = require('url'),
  uuid = require('node-uuid');

angular.module('onlineTax', ['onlineTaxDirectives'])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true)
  })
  .constant('IsEmbedded', window.parent !== window)
  .factory('TaxApiHost', function(IsEmbedded) {
    if (IsEmbedded) {
      return Url.resolve(window.parent.location.href, '/api/tax');
    }

    return 'http://localhost:3000';
  })
  .controller('MainController', function($scope, $http, $location, TaxApiHost) {
    function fetchClient(clientid) {
      $http.get(TaxApiHost + '/clients/' + clientid, {withCredentials: true})
        .success(function (data) {
          $scope.sources.push(data);
          Object.keys(data.fields).forEach(function (fieldId) {
            $scope.form.fields[fieldId] = {
              value: data.fields[fieldId].value,
              source: 'client',
              sourceid: clientid
            }
          });
        })
        .error(function (error) {
          console.log('Error fetching client', error);
        });
    }

    function loadExistingForm(id) {
      $http.get(TaxApiHost + '/returns/' + id, { withCredentials: true })
        .success(function(data) {
          $scope.form = data;
          if ($scope.form.clientid) {
            fetchClient($scope.form.clientid);
          }
          $scope.run();
        })
        .error(function(data) {
          console.log('Error fetching return', data);
        });
    }

    $scope.form = { fields: {} };
    $scope.lodgeable = false;
    $scope.status = '';
    $scope.returnName = '2015 Fringe Benefits Tax Return';
    $scope.visiblePage = 'page-1';
    $scope.sources = [];

    var id = $location.search().id;
    var clientid = $location.search().client;
    var duedate = $location.search().duedate;

    if (id) {
      loadExistingForm(id);
    } else {
      if (!clientid) {
        throw new Error('No client specified, unable to create return')
      }

      id = uuid.v4();
      $scope.form.id = id;
      $scope.form.clientid = clientid;
      fetchClient($scope.form.clientid);
      $scope.form.duedate = duedate;
    }

    $scope.run = function() {
      run($scope.form);
    };

    $scope.save = function(form) {
      $http.put(TaxApiHost + '/returns/' + form.id + (form.duedate ? '/' + form.duedate : ''), form, { withCredentials: true })
        .success(function() {
          console.log('Oh yeah, form saved: ', form.id);
          $scope.status = 'Form saved';
          $scope.lodgeable = true;
        })
        .error(function(data) {
          console.log('Form failed to save', data);
          $scope.status = 'Form failed to save';
          $scope.lodgeable = false;
        });
    };
    $scope.lodge = function(form) {
      $scope.status = 'Form lodging';
      $http.put(TaxApiHost + '/lodge/' + form.id, '', { withCredentials: true })
        .success(function(res) {
          console.log('Oh yeah, form lodged: ', form.id);
          $scope.status = 'Form lodged. ATO returned: ' + res.Details.Messages[0].ErrorCode;
          $scope.lodgeable = true;
        })
        .error(function(data) {
          console.log('Form failed to lodge', data);
          $scope.status = 'Form failed to lodge';
          $scope.lodgeable = false;
        });
    };


    $scope.togglePage = function(page) {
      $scope.visiblePage = page;
    };
  });
