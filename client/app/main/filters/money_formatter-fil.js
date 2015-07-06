'use strict';
/**
 * @ngdoc filter
 * @name .filter:money_formatter
 * @function
 */
angular.module('main')
  .filter('moneyFormatter', function MoneyFormatter($translate) {
    return function (number) {
      if (number) {
        number = Number(number);
        ////console.log(number.toLocaleString($translate.use()), $translate.use());
        return number.toLocaleString($translate.use());
      }
    };
  });
