'use strict';
angular.module('settings', [
  'main'
])
.config(function ($stateProvider) {
  $stateProvider
    .state('mway.approval.settings', {
      parent: 'mway.approval',
      url: '/settings',
      views: {
        'approval': {
          templateUrl: ionic.Platform.isAndroid() ? 'settings/templates/settings-android.html' : 'settings/templates/settings.html',
          controller: 'SettingsCtrl as settingsC'
        }
      }
    });
});
