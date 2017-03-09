'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name main:approval-view-information
 */
angular.module('approval')
  .directive('approvalViewInformation', function ApprovalViewInformation () {
    return {
      templateUrl: 'approval/templates/directives/approval-view-information.html',
      restrict: 'E',
      scope: {
        'approver': '=',
        'index': '='
      },
      link: function postLink () {
        //console.log(scope.approver);
      }
    };
  });
