'use strict';
/**
 * @ngdoc service
 * @name push:PushIosService
 * @description add your description
 */
angular.module('push')
  .service('PushIosService', function PushIosService ($cordovaPush, $rootScope) {
    var self = this;
    this.url = null;
    this.provider = 'APNS';
    /**
     * @ngdoc property
     * @name iosConfig
     * @propertyOf push:PushIosService
     * @returns {Object}
     */
    this.iosConfig = {
      'badge': 'true',
      'sound': 'true',
      'alert': 'true'
    };
    /**
     * @ngdoc method
     * @name eventListener
     * @description register push notifications
     * @methodOf push:PushIosService
     */
    this.register = function () {
      return $cordovaPush.register(self.iosConfig).then(function (deviceToken) {
        $rootScope.$broadcast('push', {
          type: 'registered',
          body: deviceToken
        });
        return deviceToken;
      }, function (err) {
        return err;
      });
    };
    /**
     * @ngdoc method
     * @name eventListener
     * @description register push notifications
     * @methodOf push:PushIosService
     */
    this.eventListener = function (event, notification) {
      var vo = {};
      if (notification && notification.id && notification.badge <= 0) {
        vo = {
          type: 'message',
          body: {
            payload: {
              id: notification.id,
              badge: notification.badge
            }
          },
          msgCount: 1
        };
      }
      $rootScope.$broadcast('push', vo);
    };
  });
