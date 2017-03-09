'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name main:approval-icon
 */
angular.module('main')
  .directive('approvalIcon', function ApprovalIcon () {
    return {
      template: '<i class="icon icon-{{getIcon()}} approval-{{state}} object-type-{{objectType}}"></i>',
      restrict: 'E',
      scope: {
        state: '=',
        objectType: '='
      },
      link: function postLink (scope) {
        scope.getIcon = function () {
          if (scope.state !== 'open' && scope.objectType === 'SC') {
            return 'ic_type_order_change';
          } else if (scope.state === 'open' && scope.objectType === 'SC') {
            return 'ic_type_order';
          } else if (scope.objectType === 'PO') {
            return 'ic_document-text';
          } else {
            scope.ObjectType = 'undefined';
            return 'ic_help';
          }
        };
      }
    };
  });
