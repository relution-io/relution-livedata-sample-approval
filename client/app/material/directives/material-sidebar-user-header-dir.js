'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name material:material-sidebar-user-header
 */
angular.module('material')
.directive('materialSidebarUserHeader', function MaterialSidebarUserHeader(TokenService) {
  return {
    templateUrl: 'material/templates/user-header.html',
    restrict: 'E',
    link: function postLink (scope) {
      scope.user = TokenService.storeObject;
    }
  };
});
