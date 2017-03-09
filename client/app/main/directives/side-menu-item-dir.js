'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires $rootScope, $state
 * @name main:SideMenuItem
 */
angular.module('main')
  .directive('sideMenuItem', function SideMenuItem ($rootScope, $state, $ionicSideMenuDelegate, $timeout) {
    return {
      templateUrl: 'main/templates/directives/side-menu-item.html',
      restrict: 'AEC',
      scope: {
        links: '='
      },
      link: function postLink (scope) {
        scope.changeRoute = function () {
          if ($ionicSideMenuDelegate.$getByHandle('app-side-menu').isOpen()) {
            $timeout(function () {
              $ionicSideMenuDelegate.$getByHandle('app-side-menu').toggleLeft();
            }, 100);
          }
        };
        var getActive = function (state) {
          for (var i = 0, l = scope.links.length; i < l; i++) {
            if (scope.links[i].state === state) {
              scope.isActive = i;
              scope.$applyAsync();
              scope.changeRoute();
            }
          }
        };
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState) {
            event.preventDefault();
            getActive(toState.name);
          });
        getActive($state.$current.toString());
      }
    };
  });
