'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name approval:ViewFooterBar
 */
angular.module('approval')
  .directive('approvalViewFooterBar', function ApprovalViewFooterBar() {
    var postLink = function () {
      ////console.log($scope);
      var self = this;
      this.commentOpen = false;
      this.elementHeight = 44;
      this.toggleComment = function () {
        if (this.commentOpen) {
          self.elementHeight = 44;
        } else {
          self.elementHeight = 200;
        }
        this.commentOpen = !this.commentOpen;
      };
    };
    return {
      templateUrl: 'approval/templates/directives/approval-view-footer-bar.html',
      restrict: 'E',
      scope: {
        'item': '='
      },
      controllerAs: 'approvalViewFooterC',
      bindToController: true,
      controller: postLink
    };
  });
