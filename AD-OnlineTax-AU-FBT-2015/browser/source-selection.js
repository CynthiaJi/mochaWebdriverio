angular.module('onlineTaxDirectives', [])
  .directive('sourceSelection', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var fieldName = element.attr('source-selection');
        element.on('focus', function () {
          var sources = scope.sources.filter(function (source) {
            return source.fields[fieldName] && source.fields[fieldName].value
          });

          if (sources.length > 0) {
            var content = $('<div />')
              .append(sources.map(function (source) {
                var value = source.fields[fieldName].value;
                return $('<button class="btn btn-default">')
                  .text(value)
                  .append($('<small style="display: block; font-weight: normal;" />').text(source.formtype))
                  .click(function () {
                    scope.$apply(function () {
                      scope.form.fields[fieldName].value = value;
                      scope.form.fields[fieldName].source = source.formtype;
                      scope.form.fields[fieldName].sourceId = source.id;
                      scope.run()
                    });
                    $(element).popover('destroy')
                  })
              }));

            $(element).popover({
              container: 'body',
              content: content,
              html: true
            })
          }
        });
        element.on('blur', function () {
          $(element).popover('destroy');
        });
      }
    }
  })
  .directive('radioWithChange', [function radioWithChange() {
    // https://github.com/angular/angular.js/issues/4516
    return {
      replace: false,
      require: 'ngModel',
      scope: false,
      link: function (scope, element, attrs, ngModelCtrl) {
        element.on('change', function () {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element[0].type.toLowerCase() == 'radio' ? element[0].value : element[0].checked);
          });
        });
      }
    };
  }])
  .directive('booleanSelect', function(){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        fields: '='
      },
      link: function(scope, element, attrs){
        console.log(scope.fields);
      },
      template: '<select ng-options="field as fields"></select>'
    }
  });
