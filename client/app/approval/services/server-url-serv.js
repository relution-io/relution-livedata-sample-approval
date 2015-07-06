'use strict';
/**
 * @ngdoc service
 * @name approval:ServerUrlService
 * @description add your description
 */
angular.module('approval')
  .service('ServerUrlService', function ServerUrlService($localForage, $q, AlertService, Config) {
    var self = this;
    this.connection = null;
    this.key = 'server-url';
    this.save = function (url) {
      return $localForage.setItem(self.key, url);
    };
    this.init = function () {
      return $localForage.getItem(self.key);
    };
    this.get = function () {
      return this.connection;
    };
    this.set = function (url) {
      this.connection = url;
      Config.ENV.SERVER_URL = this.connection;
      Config.ENV.PUSH.SERVER = this.connection;
      return this.connection;
    };
  });
