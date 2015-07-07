'use strict';
/**
 * @ngdoc service
 * @name libs:Moment
 */
angular.module('libs')
  .service('MomentService', function MomentService($translate, amMoment, $rootScope) {
    var self = this;
    /**
     * @ngdoc method
     * @name getLanguage
     * @methodOf libs:Moment
     */
    this.getLanguage = function () {
      return $translate.use();
    };
    /**
     * @ngdoc property
     * @name langSuffix
     * @description which language is in use
     * @propertyOf libs:Moment
     */
    var langSuffix = this.getLanguage;
    /**
     * @ngdoc property
     * @name langPrefix
     * @propertyOf libs:Moment
     */
    this.langPrefix = 'de';
    /**
     * @ngdoc method
     * @name getLanguagePrefix
     * @methodOf libs:Moment
     */
    this.getLanguagePrefix = function () {
      var int = langSuffix().split('-');
      self.langPrefix = int[0];
      return self.langPrefix;
    };
    /**
     * @ngdoc method
     * @name setLanguage
     * @description change locale on momentjs
     * @methodOf libs:Moment
     */
    this.setLanguage = function () {
      //console.log('changeLocal');
      amMoment.changeLocale(self.getLanguagePrefix());
      debugger;
      $rootScope.$broadcast('amMoment:localeChanged');
    };

    $rootScope.$on('$translateChangeSuccess', function () {
      console.log('translation changed momentservice');
      self.setLanguage();
    });
  });
