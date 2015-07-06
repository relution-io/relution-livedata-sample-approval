'use strict';
/**
 * @ngdoc controller
 * @name approval:ApprovalEditCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('approval')
  .controller('ApprovalEditCtrl', function ApprovalEditCtrl($scope, $q, $stateParams, $filter, $timeout, ApprovalsService, AlertService, $ionicLoading, $ionicHistory, $state) {
    var self = this;
    this.state = $stateParams.state;
    this.translationKey = this.state.toUpperCase();
    this.model = null;
    this.approval = null;
    /**
     * @type {{comment: null}}
     */
    this.fields = {
      comment: null
    };
    /**
     * @ngdoc method
     * @descripton redirect return to list
     * @name redirect
     * @methodOf approval:ApprovalEditCtrl
     */
    this.redirect = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('ibx.approval.list');
    };
    this.getApprovalFromCollection = function () {
      return $q.when(ApprovalsService.entries.get($stateParams.id));
    };
    /**
     * @ngdoc method
     * @descripton form is submitted
     * @name submit
     * @methodOf approval:ApprovalEditCtrl
     */
    this.submit = function (valid) {
      if (valid) {
        var promise = self.getApprovalFromCollection();
        promise.then(function () {
          var model = self.model;
          model.attributes.state = self.state;
          model.attributes.comment = self.fields.comment ? self.fields.comment : ' ';
          model.attributes = angular.fromJson(angular.toJson(model.attributes));
          ApprovalsService.addPending(model.attributes.id);
          $q.when(self.model.save()).then(function () {
            ApprovalsService.removePending(model.attributes.id);
          }).catch(function (error) {
            ApprovalsService.handleError(model, error);
          });
          self.redirect();
          //console.log('doc', self.approval, model.attributes);
        }).catch(function (e) {
          console.error('Cant find model with id ' + $stateParams.id);
          console.error(e);
        });
      }
    };
    $scope.$on('$ionicView.enter', function () {
      $ionicLoading.hide();
      var promise = self.getApprovalFromCollection();
      promise.then(function (doc) {
        self.model = doc;
        self.approval = doc.attributes;
      }).catch(function (e) {
        console.error(e);
      });
    });
  });
