'use strict';
/**
 * @ngdoc directive
 * @restrict E
 * @name material:material-sidebar-toggle
 */
angular.module('material')
  .directive('materialSidebarToggle', function MaterialSidebarToggle(Config, $timeout) {
    return {
      require: '^materialSidebar',
      template: '<button class="button button-clear material-toggle-button" side="primary" ng-click="openSideBar()"></button>',
      restrict: 'AEC',
      link: function postlink(scope, element, attrs, SidebarCtrl) {
        var _options = {
          h: 64,
          w: 64,
          speed: 200,
          easing: mina.linear,
          vB: ['viewBox', '0 0 64 64']
        };
        var config = Config.MATERIAL_SVG_CONFIG.hamburgerCross;
        var toggled = false;
        var toggle = function (motion, svg) {
          if (!config.animation) {
            return;
          }
          for (var i = 0, len = config.animation.length; i < len; ++i) {
            var a = config.animation[i],
              el = svg.select(a.el),
              animProp = toggled ? a.animProperties.from : a.animProperties.to,
              val = animProp.val,
              timeout = motion && animProp.delayFactor ? animProp.delayFactor : 0;
            if (animProp.before) {
              el.attr(JSON.parse(animProp.before));
            }

            if (motion) {
              /*jshint -W083 */
              /*jshint -W062 */
              $timeout(function (el, val, animProp) {
                return function () {
                  el.animate(JSON.parse(val), _options.speed, _options.easing, function () {
                    if (animProp.after) {
                      this.attr(JSON.parse(animProp.after));
                    }
                    if (animProp.animAfter) {
                      this.animate(JSON.parse(animProp.animAfter), _options.speed, _options.easing);
                    }
                  });
                };
              }(el, val, animProp), timeout * _options.speed);
              /*jshint +W083 */
              /*jshint +W062 */
            }
            else {
              el.attr(JSON.parse(val));
            }
          }
          toggled = !toggled;
        };
        $timeout(function () {
          var svg = new Snap(_options.w, _options.h);
          svg.attr(_options.vB[0], _options.vB[1]);
          svg.attr({fill: '#cccccc'});
          element.children('button').append(svg.node);
          Snap.load(config.url, function (f) {
            var g = f.select('g');
            svg.append(g);
          });
          scope.$on('sidebar-state-changed', function (event, state) {
            console.log('changed');
            if (state === 'open') {
              toggled = false;
            } else {
              toggled = true;
            }
            toggle(true, svg);
          });
          scope.openSideBar = function () {
            toggle(true, svg);
            SidebarCtrl.toggle();
          };
        }, 500);
      }
    };
  });
