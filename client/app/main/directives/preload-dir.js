'use strict';
/**
 * @ngdoc directive
 * @restrict AEC
 * @name main:preloadBody
 */
angular.module('main')

.directive('preloadBody', function PreloadBody ($rootScope) {
  return {
    restrict: 'AEC',
    link: function postLink () {
      $rootScope.$on('show-content', function () {
        var preloadDiv = jQuery('.preload');
        preloadDiv.animate({
          opacity: '0'
        }, 1200, function () {
          preloadDiv.remove();
        });
      });
    }
  };
});
