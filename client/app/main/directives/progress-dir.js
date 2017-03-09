'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name main:progress
 */
angular.module('main')

.directive('progressBar', function ProgressBar ($window) {
  return {
    template: '<div id="progress-bar">&nbsp;</div>',
    restrict: 'E',
    scope: {
      'inProgress': '='
    },
    link: function postLink (scope) {
      var mprogress = new $window.Mprogress({
        template: 4,
        parent: '#progress-bar'
      });

      scope.$watch('inProgress', function (newValue, oldValue) {
        if (!angular.equals(newValue, oldValue)) {
          newValue ? mprogress.start() : mprogress.end();
        }
      });
    }
  };
});
