'use strict';
/**
 * @ngdoc controller
 * @name approval:ApprovalListCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('approval')
  .controller('ApprovalListCtrl', function ApprovalListCtrl($scope, $q, $filter, $timeout, $ionicScrollDelegate, $ionicLoading, $window, MomentService, $rootScope, PushService, ApprovalsService) {
    this.available = true;
    this.inProgress = false;
    this.overflowScroll = ionic.Platform.isAndroid();
    $scope.filter = {
      value: ''
    };
    /**
     * @ngdoc property
     * @name self
     * @propertyOf approval:ApprovalListCtrl
     */
    var self = this;
    /**
     * @ngdoc property
     * @name search
     * @description is in serach mode or not
     * @propertyOf approval:ApprovalListCtrl
     */
    this.search = false;
    /**
     * @ngdoc property
     * @name approvals
     * @description the approvals
     * @propertyOf approval:ApprovalListCtrl
     */
    this.approvals = [];
    /**
     * @ngdoc property
     * @name noResult
     * @description is needed for ui
     * @propertyOf approval:ApprovalListCtrl
     */
    this.noResult = false;
    /**
     * @ngdoc property
     * @name noResult
     * @description is needed for ui
     * @propertyOf approval:ApprovalListCtrl
     */
    var filterCount = 0;
    $scope.filterBy = function (item) {
      if ($scope.filter.value.length <= 2) {
        return true;
      }
      var regex = new RegExp($scope.filter.value, 'gi');
      if (regex.exec(item.attributes.header.objectId) || regex.exec(item.attributes.requester.name)) {
        filterCount++;
        self.noResult = false;
        return true;
      }
      filterCount++;
      if (filterCount === self.approvals.rows.length) {
        filterCount = 0;
        self.scrollTop();
        self.noResult = true;
      }
      return false;

    };
    /**
     * @ngdoc method
     * @name sync
     * @methodOf approval:ApprovalListCtrl
     */
    this.sync = function () {
      self.inProgress = true;
      $scope.$broadcast('scroll.refreshComplete');
      var queue = [ApprovalsService.resetCollection()];
      $q.all(queue).then(function () {
        //self.approvals.rows = $filter('orderBy')(ApprovalsService.entries.models, '-attributes.approver[attributes.current || 0].receivedDate');
        self.approvals.rows = ApprovalsService.entries.models;
        self.inProgress = false;
        return true;
      }).catch(function () {
        self.inProgress = false;
      });
    };
    /**
     * @ngdoc method
     * @name scrollTop
     * @methodOf approval:ApprovalListCtrl
     */
    this.scrollTop = function () {
      $ionicScrollDelegate.$getByHandle('approval-list').scrollTop();
    };
    /**
     * @ngdoc method
     * @name switchToInput
     * @methodOf approval:ApprovalListCtrl
     */
    this.switchToInput = function () {
      if (self.search) {
        $scope.filter.value = '';
      }
      self.search = !self.search;
      if (self.search) {
        $timeout(function () {
          document.querySelector('.search-input').focus();
        }, 150);
      }
    };
    /**
     * @ngdoc method
     * @name promise
     * @methodOf approval:ApprovalListCtrl
     * @description fetch the collection
     */
    $scope.$on('$ionicView.beforeEnter', function () {
      self.inProgress = true;
    });
    $scope.$on('$ionicView.enter', function () {
      MomentService.getLanguagePrefix();
      $timeout(function () {
        if (ApprovalsService.entries.models) {
          self.approvals.rows = ApprovalsService.entries.models;
          self.inProgress = false;
          $rootScope.$broadcast('show-content');
        }
      }, 2000);
      var promise = $q(function (resolve) {
        resolve(ApprovalsService.fetchCollection());
      });
      promise
        .then(function () {
          self.inProgress = false;
          if (!self.approvals.rows) {
            self.approvals.rows = ApprovalsService.entries.models;
          }
        })
        .catch(function (e) {
          self.inProgress = false;
          console.error(e);
        });
    });

    $rootScope.$on('$translateChangeSuccess', function () {
      $rootScope.$broadcast('amMoment:localeChanged');
    });
  })
  .directive('delayedModel', function () {
    return {
      scope: {
        model: '=delayedModel'
      },
      link: function (scope, element, attrs) {

        element.val(scope.model);

        scope.$watch('model', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            element.val(scope.model);
          }
        });

        var timeout;
        element.on('keyup paste search', function () {
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            scope.model = element[0].value;
            element.val(scope.model);
            scope.$apply();
          }, attrs.delay || 500);
        });
      }
    };
  });
