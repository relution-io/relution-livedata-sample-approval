'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name material:material-sidebar-list
 */
angular.module('material')
  .directive('materialSidebarList', function ($rootScope, $state) {
    return {
      templateUrl: 'material/templates/sidebar-list.html',
      restrict: 'AEC',
      require: '^materialSidebar',
      scope: {
        links: '='
      },
      link: function postLink(scope, element, attrs, MaterialSidebarCtrl) {
        var getActive = function (state) {
          for (var i = 0, l = scope.links.length; i < l; i++) {
            if (scope.links[i].state === state) {
              scope.isActive = i;
              MaterialSidebarCtrl.close();
              scope.$applyAsync();
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
