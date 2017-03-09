'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @requires
 * @name material:material-sidebar
 */
angular.module('material')
  .directive('materialSidebar', function MaterialSidebar ($timeout) {
    return {
      restrict: 'A',
      controllerAs: 'materialSidebarCtrl',
      bindToController: true,
      controller: function ($scope, $element) {
        var self = this;
        var dragStartRange = 20;
        var overlay = document.querySelector('.sidebar-overlay');
        var maxOpacity = 5;
        var sidebar = document.getElementById('sidebar');
        var startRange = 0;
        var maxRange = 5;
        //var barHeader = document.querySelector('.bar-header');
        //var barSubHeader = document.querySelector('.bar-subheader');
        var screenSize = {
          height: screen.height,
          width: screen.width
        };
        var maxWidth = (screenSize.width * 0.8);
        var lastDirection = null;
        this.range = 0;
        this.isOpen = function () {
          return angular.element(sidebar).hasClass('open');
        };
        this.calculateHeader = function () {
          //var h = screenSize.height;
          //var hBar = angular.element(barHeader).height();
          //var sBar = angular.element(barSubHeader).height();
          //if (hBar) {
          //  h -= hBar;
          //}
          //if (sBar) {
          //  h -= sBar;
          //}
          return screenSize.height - 44;
        };

        this.getPageX = function (event) {
          return event.gesture.center.pageX;
        };

        this.getDirection = function (event) {
          return event.gesture.direction;
        };

        this.setHeight = function () {
          angular.element(sidebar).css({
            height: self.calculateHeader()
          });
        };

        this.toggle = function () {
          if (self.isOpen()) {
            angular.element(sidebar).removeClass('open').animate({minWidth: 0}, 200);
            angular.element(overlay).removeClass('active').css({opacity: 1.0});
            self.range = maxRange;
            $scope.$broadcast('sidebar-state-changed', 'close');
          } else {
            angular.element(sidebar).addClass('open').animate({minWidth: maxWidth}, 200);
            angular.element(overlay).addClass('active').css({opacity: 0.5});
            self.range = startRange;
            $scope.$broadcast('sidebar-state-changed', 'open');
          }
        };
        this.open = function () {
          angular.element(sidebar).addClass('open').css({minWidth: maxWidth});
          angular.element(overlay).addClass('active').css({opacity: 0.5});
          self.range = maxRange;
          $scope.$broadcast('sidebar-state-changed', 'open');
        };

        this.close = function () {
          angular.element(sidebar).removeClass('open').css({minWidth: 0});
          angular.element(overlay).removeClass('active').css({opacity: 1.0});
          self.range = startRange;
          $scope.$broadcast('sidebar-state-changed', 'close');
        };
        var x = 0;
        var inProcess = false;
        $timeout(function () {

          ionic.onGesture('drag', function (event) {
            event.preventDefault();
            if (x !== 0 || self.isOpen()) {
              inProcess = true;
              var to = event.gesture.center.pageX <= maxWidth ? event.gesture.center.pageX : maxWidth;
              var translate = Math.ceil((-1 * maxWidth) - to);
              translate = translate > 0 ? 0 : translate;
              var opPercent = Math.ceil(translate / 100) * -1;
              self.range = opPercent;
              var setOp = opPercent > maxOpacity ? 0.5 : '0.' + opPercent;
              angular.element(overlay).css({opacity: setOp});
              angular.element(sidebar).css({
                minWidth: to,
                transform: 'translate3d(-' + translate + 'px, 0, 0)',
                MozTransform: 'translate3d(-' + translate + 'px, 0, 0)',
                WebkitTransform: 'translate3d(-' + translate + 'px, 0, 0)',
                msTransform: 'translate3d(-' + translate + 'px, 0, 0)'
              });
              lastDirection = self.getDirection(event);
            }
          }, $element[0]);

          ionic.onGesture('dragstart', function (event) {
            event.preventDefault();
            x = self.getPageX(event);
            if (x >= dragStartRange) {
              x = 0;
              return false;
            }
            angular.element(sidebar).addClass('open');
            angular.element(overlay).addClass('active');
          }, $element[0]);

          ionic.onGesture('dragend', function (event) {
            if (inProcess) {
              event.preventDefault();
              if (lastDirection === 'right') {
                self.open();
              } else {
                self.close();
              }
              inProcess = false;
            }
          }, $element[0]);
          self.setHeight();
        }, 1500);
      }
    };
  });
