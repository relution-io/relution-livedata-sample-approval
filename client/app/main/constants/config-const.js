'use strict';
angular.module('main')
  .constant('Config', {
    ENV: {
      /*inject-env*/
      'SERVER_URL': 'http://10.21.4.130:8080'
      /*endinject*/
    },
    SERVER_API_PATH: '/mway/livedata-approval-sample',
    APPROVALS: '/approvals',
    CURRENT_AUTHORIZATION_LOGIN: '/gofer/security/rest/auth/login',
    CURRENT_AUTHORIZATION_LOGOUT: '/gofer/security-logout',
    RELUTION_SESSION_ID_KEY: 'JSESSIONID',
    LANGUAGES: ['de-DE', 'en-IN'],
    LANGUAGE_FILES_FOLDER: 'translation/assets/i18n/',
    LANGUAGE_STORE_DEFAULT_KEY: 'approval-translation',
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
    ]
  });
