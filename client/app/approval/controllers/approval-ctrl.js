'use strict';
/**
 * @ngdoc controller
 * @name approval:ApprovalCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('approval')
  .controller('ApprovalCtrl', function ApprovalCtrl(Config, UserService, LoginService, $relutionSecurityConfig) {
    this.sideBarLinks = Config.SIDEBAR_LINKS;
    this.user = UserService.getUser();
    this.config = $relutionSecurityConfig;
    this.logout = function () {
      LoginService.secureLogout();
    };
  });
