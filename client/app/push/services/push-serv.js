'use strict';
/**
 * @ngdoc service
 * @name push:PushService
 * @description add your description
 */
angular.module('push')
  .service('PushService', function PushService ($cordovaDevice, $http, $localForage, $q, $rootScope, $window, PushAndroidService, PushIosService, Config) {
    var self = this;
    this.storageKey = Config.PUSH_DEVICE_KEY || '__PUSH_DEVICE__';
    this.registerService = null;
    this.url = Config.ENV.PUSH.SERVER + Config.API_PUSH + '/' + Config.PUSH_APP_UUID + '/devices';
    this.userUUID = null;

    $rootScope.$on('push', function (event, args) {
      self.log('push incoming', args);
      if (args.type === 'registered') {
        self.registerPushDevice(self.registerService.provider, args.body);
      }
    });

    /**
     * @ngdoc method
     * @name log
     * @description log some messages in console if is enabled
     * @methodOf push:PushService
     */
    this.log = function () {
      //(message, vo)
      if (Config.ENV.DEBUG.PUSH) {
        //console.log('############## Start - ' + message + '##############');
        //console.log(vo);
        //console.log('############## END - ' + message + '##############');
      }
    };

    this.success = function (result) {
      self.log('success on $http', result);
    };
    /**
     * @ngdoc method
     * @name fail
     * @description register success Push service
     * @methodOf push:PushService
     */
    this.fail = function (error) {
      self.log('error on $http', error);
    };
    /**
     * @ngdoc method
     * @name errorPushServer
     * @description register success Push service
     * @methodOf push:PushService
     */
    this.errorPushServer = function (error) {
      self.log('registerAtPushServer: Updating Error: ', error);
    };
    /**
     * @ngdoc method
     * @name successPushServer
     * @description register success Push service
     * @methodOf push:PushService
     */
    this.successPushServer = function (pushDevice) {
      if (pushDevice) {
        self.log('successPushServer: ' + JSON.stringify(pushDevice));
        $localForage.setItem(Config.PUSH_DEVICE_KEY, pushDevice).then(function (res) {
          self.log('successPushServer: pushDevice saved', res);
        });
      }
    };
    /**
     * @ngdoc method
     * @name createPushDevice
     * @description register Push service
     * @methodOf push:PushService
     */
    this.createPushDevice = function (provider, token) {

      var pushDevice = {
        'providerType': provider,
        'token': token,
        'user': self.userUUID,
        'vendor': $cordovaDevice.getPlatform(),
        'name': $cordovaDevice.getModel(),
        'osVersion': $cordovaDevice.getVersion(),
        'language': $window.navigator.language || $window.navigator.userLanguage,
        'badge': 0
      };
      self.log('createPushDevice', pushDevice);
      $http.post(self.url, pushDevice).success(self.successPushServer).error(self.errorPushServer);
    };
    /**
     * @ngdoc method
     * @name updatePushDevice
     * @description register Push service
     * @methodOf push:PushService
     */
    this.updatePushDevice = function (pushDevice, token) {
      pushDevice.token = token;
      $http.put(self.url + '/' + pushDevice.uuid, pushDevice).success(self.success).error(self.fail);
    };
    /**
     * @ngdoc method
     * @name registerPushDevice
     * @description register Push service
     * @methodOf push:PushService
     */
    this.registerPushDevice = function (provider, token) {
      self.getLocalStore().then(function (deviceInfo) {
        if (deviceInfo) {
          self.updatePushDevice(deviceInfo, token);
        } else {
          self.createPushDevice(provider, token);
        }
      });
    };
    /**
     * @ngdoc method
     * @name getLocalStore
     * @description check if data already exist in localStore
     * @methodOf push:PushService
     */
    this.getLocalStore = function () {
      return $localForage.getItem(self.storageKey);
    };
    /**
     * @ngdoc method
     * @name setLocalStore
     * @description set data in localStore
     * @methodOf push:PushService
     */
    this.setLocalStore = function (item) {
      return $localForage.setItem(self.storageKey, item);
    };
    /**
     * @ngdoc method
     * @name register
     * @description register Device on PushService
     * @methodOf push:PushService
     */
    this.register = function () {
      if (!$window.cordova) {
        return /*console.log*/('works only on devices');
      }
      if (ionic.Platform.isAndroid()) {
        self.registerService = PushAndroidService;
      } else if (ionic.Platform.isIOS()) {
        //return false;
        self.registerService = PushIosService;
      } else {
        return /*console.log*/('This Platform is still not supported');
      }
      var promise = $q(function (resolve) {
        resolve(self.registerService.register());
      });
      promise.then(function (res) {
        //console.log('res', res);
        $rootScope.$on('$cordovaPush:notificationReceived', self.registerService.eventListener);
        self.log('response', res);
      });
    };
  });
