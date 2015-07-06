'use strict';
angular.module('settings', [
  'main'
])
.config(function ($stateProvider) {
  $stateProvider
    .state('ibx.approval.settings', {
      parent:'ibx.approval',
      url: '/settings',
      views: {
        'approval': {
          templateUrl: ionic.Platform.isAndroid() ? 'settings/templates/settings-android.html' : 'settings/templates/settings.html',
          controller: 'SettingsCtrl as settingsC'
        }
      }
    });
});
