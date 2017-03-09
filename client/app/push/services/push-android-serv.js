'use strict';
/**
 * @ngdoc service
 * @name push:PushAndroidService
 * @description add your description
 */
angular.module('push')
  .service('PushAndroidService', function PushAndroidService ($cordovaPush, Config, $rootScope) {
    var self = this;
    this.provider = 'GCM';
    /**
     * @ngdoc property
     * @name config
     * @propertyOf push:PushAndroidService
     * @returns {Object}
     */
    this.config = {
      'senderID': Config.ENV.PUSH.GOOGLE_SENDER_ID
    };
    /**
     * @ngdoc method
     * @name register
     * @description register on Google Server
     * @methodOf push:PushAndroidService
     */
    this.register = function () {
      return $cordovaPush.register(self.config).then(function (result) {
        return result;
      }, function (err) {
        return err;
      });
    };
    /**
     * @ngdoc method
     * @name eventListener
     * @description register push notifications
     * @methodOf push:PushAndroidService
     */
    this.eventListener = function (event, notification) {
      var vo = {};
      switch (notification.event) {
        case 'registered':
          if (notification.regid.length > 0) {
            vo = {
              type: 'registered',
              body: notification.regid
            };
          }
          break;
        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          vo = {
            type: 'message',
            body: notification,
            msgCount: notification.msgcnt
          };
          break;
        case 'error':
          vo = {
            type: 'error',
            body: notification.msg
          };
          break;
        default:
          vo = {
            type: 'unknown'
          };
          break;
      }
      $rootScope.$broadcast('push', vo);
      return vo;
    };
  });
