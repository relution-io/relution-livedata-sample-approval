'use strict';
/**
 * @ngdoc controller
 * @name approval:ApprovalCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('approval')
  .controller('ApprovalCtrl', function ApprovalCtrl(Config, UserService, LoginService, $state, $relutionSecurityConfig, $scope) {
    this.sideBarLinks = Config.SIDEBAR_LINKS;
    this.user = UserService.getUser();
    $scope.$on('ionicView.beforeEnter', function () {
      if (!LoginService.isLoggedIn) {
        return $state.go($relutionSecurityConfig.forwardStateAfterLogout);
      }
    });
  });
