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
 *
 * @ngdoc service
 * @name network.NetworkService
 * @requires $replace_me
 *
 * */
'use strict';
angular.module('network', [])
  .service('NetworkService', function NetworkService ($rootScope) {
    var self = this, initial = true;
    this.onlineStatus = initial;
    $rootScope.onlineStatus = initial;
    this.initial = function () {
      // listen for Online event
      $rootScope.$on('$cordovaNetwork:online', function () {
        $rootScope.onlineStatus = true;
        self.onlineStatus = $rootScope.onlineStatus;
      });
      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function () {
        $rootScope.onlineStatus = false;
        self.onlineStatus = $rootScope.onlineStatus;
      });
    };
  });
