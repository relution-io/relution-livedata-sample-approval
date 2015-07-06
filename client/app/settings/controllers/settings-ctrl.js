'use strict';
/**
 * @ngdoc controller
 * @name settings:SettingsCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('settings')
  .controller('SettingsCtrl', function SettingsCtrl($scope, $ionicLoading, $rootScope, isAuthorized, TokenService, Config, ServerUrlService) {
    var self = this;
    this.name = TokenService.storeObject.userID;
    this.device = TokenService.storeObject.name;
    this.tenant = TokenService.storeObject.tenant;
    var a = function () {
      return ServerUrlService.connection;
    };
    //console.log(isAuthorized, TokenService.storeObject);
    $scope.$on('$ionicView.enter', function () {
      self.server = a();
      $ionicLoading.hide();
      $rootScope.$broadcast('show-content');
    });
  });
