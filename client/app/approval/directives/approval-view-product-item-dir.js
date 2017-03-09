'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name approval:approvalViewProductItem
 */
angular.module('approval')
  .directive('approvalViewProductItem', function ApprovalViewProductItem ($ionicModal) {
    var postLink = function ($scope) {
      //var self = this;
      $ionicModal.fromTemplateUrl('approval/templates/widgets/modal-product-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        ////console.log('clicked');
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function () {
        // Execute action
      });
      ////console.log(this.item);
    };
    return {
      templateUrl: 'approval/templates/directives/approval-view-product-item.html',
      restrict: 'E',
      scope: {
        'item': '=',
        'count': '='
      },
      controller: postLink
    };
  });
