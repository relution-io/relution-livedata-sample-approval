'use strict';
/**
 * @ngdoc controller
 * @name approval:ApprovalViewCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('approval')
  .controller('ApprovalViewCtrl', function ApprovalViewCtrl ($scope, $stateParams, $q, ApprovalsService, $ionicSlideBoxDelegate, ScrollHeightService, $ionicLoading) {
    var _slideDelegate = 'approval-view-slider';
    var self = this;
    var tabButtons = null;
    /**
     * @ngdoc property
     * @name approvalId
     * @description the approval id
     * @propertyOf approval:ApprovalViewCtrl
     */
    this.approvalId = $stateParams.id;
    /**
     * @ngdoc property
     * @name approval
     * @description the approval Object
     * @propertyOf approval:ApprovalViewCtrl
     */
    this.approval = [];

    /**
     * @ngdoc method
     * @name toggleButtons
     * @methodOf approval:ApprovalViewCtrl
     * @description toggl ethe tab navigation
     */
    this.toggleButtons = function (index) {
      tabButtons = angular.element(document.getElementById(self.approval.id));
      var buttons = tabButtons.children();
      angular.forEach(buttons, function (element, key) {
        if (key === index) {
          angular.element(element).addClass('button-active');
          angular.element(element).addClass('button-active');
        } else {
          angular.element(element).removeClass('button-active');
        }
      });
    };
    /**
     * @ngdoc method
     * @name slideHasChanged
     * @methodOf approval:ApprovalViewCtrl
     * @description whenever the slider has changed (is needed on swiping)
     */
    this.slideHasChanged = function (index) {
      self.toggleButtons(index);
    };
    /**
     * @ngdoc method
     * @name slide
     * @methodOf approval:ApprovalViewCtrl
     * @description slide to a specific index
     */
    this.slide = function ($event, index) {
      $event.stopPropagation();
      $ionicSlideBoxDelegate.$getByHandle(_slideDelegate).slide(index);
      self.toggleButtons(index);
    };
    /**
     * @ngdoc method
     * @name getScrollHeight
     * @methodOf approval:ApprovalViewCtrl
     * @description calculate the height for the scroll content because ionic fails when slidebox  has slides with lists
     */
    this.getScrollHeight = function (attrs) {
      return ScrollHeightService.getHeight(attrs) + 'px';
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      var promise = $q.when(ApprovalsService.entries.get($stateParams.id));
      promise.then(function (doc) {
        $ionicLoading.hide();
        if (doc && doc.attributes) {
          self.approval = doc.attributes;
          //console.log('doc', self.approval);
        }
      }).catch(function () {
        //(e)
        $ionicLoading.hide();
        //console.error(e);
      });
      self.toggleButtons($ionicSlideBoxDelegate.$getByHandle(_slideDelegate).currentIndex());
    });
  });
