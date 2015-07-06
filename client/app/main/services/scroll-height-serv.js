'use strict';
/**
 * @ngdoc service
 * @name main:ScrollHeight
 * @description add your description
 */
angular.module('main')
  .service('ScrollHeightService', function ScrollHeightService() {
    var self = this;

    this.screen = {
      height: screen.height,
      width: screen.width
    };

    this.calculate = {
      subHeader: function (height) {
        return height - 88;
      },
      header: function (height) {
        return height - 44;
      },
      footer: function (height) {
        return height - 44;
      },
      subFooter: function (height) {
        return height - 88;
      }
    };

    this.getHeight = function (attrs) {
      var height = angular.copy(self.screen.height);
      angular.forEach(attrs, function (attr) {
        height = self.calculate[attr](height);
      });
      return height;
    };
  });
