/**
 * Created by Pascal Brewing
 * Copyright (c)
 * 2015
 * M-Way Solutions GmbH. All rights reserved.
 * http://www.mwaysolutions.com
 * Redistribution and use in source and binary forms, with or without
 * modification, are not permitted.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';
angular.module('relutionLiveData', [
  'ionic',
  'ui.router',
  'ngAnimate',
  'angularMoment',
  'LocalForageModule',
  'ngCordova',
  'relutionClientSecurity',
  'push',
  'pascalprecht.translate',
  'translation',
  'translation.service',
  'libs',
  'auth',
  'main',
  'about',
  'network',
  'approval',
  'settings'
])
  .run(function ($ionicPlatform, $window) {
    $ionicPlatform.ready(function () {
      if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if ($window.StatusBar) {
        $window.StatusBar.styleLightContent();
      }
    });
  })
  .config([
    '$compileProvider',
    function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|tel):/);
    }
  ])
  .config(function ($translateProvider, languages, languageDefault) {
    angular.forEach(languages.languages, function (prefix, index) {
      $translateProvider.translations(prefix, languages.promises[index].data);
    });
    $translateProvider.preferredLanguage(languageDefault);
  })
  .constant('$ionicLoadingConfig', {
    templateUrl: 'main/templates/directives/hourglass.html'
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('mway', {
        abstract: true,
        url: '/mway',
        template: '<ion-nav-view name="mway"></ion-nav-view>'
      });
    $urlRouterProvider.otherwise('mway/login');
  })
  .config(function ($ionicConfigProvider) {
    if (ionic.Platform.isAndroid()) {
      $ionicConfigProvider.scrolling.jsScrolling(false);
    }
    //$ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.views.forwardCache(true);
  })
  .config(function ($relutionSecurityConfigProvider, Config) {
    $relutionSecurityConfigProvider.setLayoutStyle('INPUT_ICONS');
    $relutionSecurityConfigProvider.setIcons();
    $relutionSecurityConfigProvider.forwardStateAfterLogin = 'mway.approval.list';
    $relutionSecurityConfigProvider.forwardStateAfterLogout = 'mway.login';
    $relutionSecurityConfigProvider.loginUrl = Config.ENV.SERVER_URL + Config.CURRENT_AUTHORIZATION_LOGIN;
    $relutionSecurityConfigProvider.logoutUrl = Config.ENV.SERVER_URL + Config.CURRENT_AUTHORIZATION_LOGOUT;
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.icon('ion-android-arrow-back');
    $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.navBar.positionPrimaryButtons('left');
    $ionicConfigProvider.navBar.positionSecondaryButtons('right');
  })
  .run(function ($cordovaSplashscreen, $window, $translate, $cordovaGlobalization, $cordovaAppVersion, $rootScope, Config, NetworkService, MomentService) {
    if ($window.cordova) {
      $cordovaAppVersion.getAppVersion().then(function (version) {
        $rootScope.appVersion = version;
      });
    } else {
      $rootScope.appVersion = '0.0.1';
    }
    //listener on off online state
    NetworkService.initial();
    MomentService.setLanguage();
    // checking the language
    if ($window.cordova) {
      $cordovaSplashscreen.hide();
    }
    $rootScope.$on('$stateNotFound',
      function (event, unfoundState, fromState, fromParams) {
        console.log(unfoundState.to); // "lazy.state"
        console.log(unfoundState.toParams); // {a:1, b:2}
        console.log(unfoundState.options); // {inherit:false} + default options
        console.log(fromState); // {inherit:false} + default options
        console.log(fromParams); // {inherit:false} + default options
      });
    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        console.log(error); // "lazy.state"
        console.log(fromState); // {inherit:false} + default options
        console.log(fromParams); // {inherit:false} + default options
      });
  });
