'use strict';
/**
 * @ngdoc controller
 * @name approval:ApprovalCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('approval')
  .controller('ApprovalCtrl', function ApprovalCtrl(Config, TokenService) {
    this.sideBarLinks = Config.SIDEBAR_LINKS;
    this.user = TokenService.storeObject;
  });
