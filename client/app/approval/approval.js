'use strict';
angular.module('approval', ['main'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('mway.approval', {
        parent: 'mway',
        url: '/approval',
        abstract: true,
        views: {
          mway:{
            templateUrl: ionic.Platform.isAndroid() ? 'approval/templates/approval-android.html' : 'approval/templates/approval.html'
          }
        },
        resolve: {
          'hasToken': function (LoginService, $q, $state, $relutionSecurityConfig) {
            if (!LoginService.isLoggedIn) {
              return $q.when($state.go($relutionSecurityConfig.forwardStateAfterLogout));
            }
            return $q.when(true);
          }
        }
      })
      .state('mway.approval.list', {
        parent: 'mway.approval',
        url: '/list',
        views: {
          'approval': {
            templateUrl: ionic.Platform.isAndroid() ? 'approval/templates/android-list.html' : ionic.Platform.isIPad() ? 'approval/templates/list-ipad.html' : 'approval/templates/list.html',
            controller: 'ApprovalListCtrl as approvalListC'
          }
        },
        resolve: {
          //'loadingHide': function ($ionicLoading, $q) {
          //  return $q.when($ionicLoading.hide());
          //},
          //'killIframe': function ($q) {
          //  var frames = document.getElementsByTagName('iframe');
          //  var gapFrames = [];
          //  angular.forEach(frames, function (value) {
          //    if (value.src === 'gap://ready') {
          //      gapFrames.push(value);
          //    }
          //  });
          //
          //  // delete all but the last one.
          //  var deleteCounter = 0;
          //  if (gapFrames.length > 1) {
          //    for (var i = gapFrames.length - 2; i >= 0; i--) {
          //      //console.log ("Deleting gapFrame " + i + " of " + totalLength);
          //      angular.element(gapFrames[i]).remove();
          //      deleteCounter++;
          //    }
          //  }
          //  return $q.when(console.log('Deleted ' + deleteCounter + ' gapFrames'));
          //}
        }
      })
      .state('mway.approval.view', {
        parent: 'mway.approval',
        url: '/view/:id',
        views: {
          'approval': {
            templateUrl: 'approval/templates/view.html',
            controller: 'ApprovalViewCtrl as approvalViewC'
          }
        }
      })
      .state('mway.approval.edit', {
        parent: 'mway.approval',
        url: '/edit/:id/:state',
        views: {
          'approval': {
            templateUrl: 'approval/templates/edit.html',
            controller: 'ApprovalEditCtrl as approvalEditC'
          }
        }
      });
  })
;
