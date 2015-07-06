'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name approval:ApprovalViewRequesterItem
 */
angular.module('approval')
  .directive('approvalViewRequesterItem', function ApprovalViewRequesterItem () {
    var postLink = function () {};
    return {
      templateUrl: 'approval/templates/directives/approval-view-requester-item.html',
      restrict: 'E',
      scope: {
        'approval': '='
      },
      controllerAs: 'approvalRequester',
      bindToController: true,
      controller: postLink
    };
  });
