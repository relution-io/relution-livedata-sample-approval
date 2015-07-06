'use strict';
/**
 * @ngdoc controller
 * @name approval:ApprovalCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('approval')
  .controller('ApprovalCtrl', function ApprovalCtrl(Config, UserService) {
    this.sideBarLinks = Config.SIDEBAR_LINKS;
    this.user = UserService.getUser();
  });
