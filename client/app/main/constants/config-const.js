'use strict';
angular.module('main')
  .constant('Config', {
    ENV: {
      /*inject-env*/
      'SERVER_URL': 'http://10.21.4.130:8080',
      'PUSH': {
        'SERVER': '',
        'GOOGLE_SENDER_ID': '608280733216'
      }
      /*endinject*/
    },
    SERVER_API_PATH: '/mway/livedata-approval-sample',
    COLLECTIONS_URLS: {
      APPROVALS: '/approvals',
      APPROVALS_CHANGES: '/changes',
      REGISTER_DEVICES: '/approval/api/v1/devices'
    },
    CURRENT_AUTHORIZATION_LOGIN: '/gofer/security/rest/auth/login',
    CURRENT_AUTHORIZATION_LOGOUT: '/gofer/security-logout',
    RELUTION_SESSION_ID_KEY: 'JSESSIONID',
    LANGUAGES: ['de-DE', 'en-IN'],
    LANGUAGE_FILES_FOLDER: 'translation/assets/i18n/',
    LANGUAGE_STORE_DEFAULT_KEY: 'approval-translation',
    SIDEBAR_LINKS: [
      {
        state: 'mway.approval.list',
        iconOn: 'ion-ios-checkmark',
        iconOff: 'ion-ios-checkmark-outline',
        translate: 'APPROVALS'
      },
      {
        state: 'mway.approval.settings',
        iconOn: 'ion-ios-gear',
        iconOff: 'ion-ios-gear-outline',
        translate: 'SETTINGS'
      },
      {
        state: 'mway.approval.about',
        iconOn: 'ion-ios-information',
        iconOff: 'ion-ios-information-outline',
        translate: 'ABOUT'
      }
    ],
    BOWER_DEPENDENCIES: [
      {name: 'ionic', version: ionic.version},
      {name: 'angular', version: angular.version.full},
      {name: 'bikini', version: Relution.LiveData.Version},
      'angular-animate',
      'angular-sanitize',
      'angular-ui-router',
      'ngCordova',
      'angular-translate',
      'angular-localForage',
      'angular-deferred-bootstrap',
      'relution-client-security'
    ],
    PUSH_DEVICE_KEY: '__PUSH_DEVICE__',
    //PUSH_APP_UUID: '5D1E25BA-3ED3-4919-84C1-B79B19D6A097',
    PUSH_APP_UUID: 'af6124a6-f216-4387-b664-fcdaa6cdcf0d',
    API_PUSH: '/push/api/v1/apps'
  });
