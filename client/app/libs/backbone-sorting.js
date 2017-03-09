/**
 * Created by pascalbrewing on 12/05/15
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
 */
/*jshint ignore:start */
// jscs:disable
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['underscore', 'backbone'], factory);
  } else {
    // Browser globals
    factory(_, Backbone);
  }
}(this, function (_, Backbone) {

  // for use by overwritten sort function:
  var backboneSort = Backbone.Collection.prototype.sort;

  // Extending out
  _.extend(Backbone.Collection.prototype, {

    //@Main Sorting object. Format like so: { by: (attribute), type: ("numeric","alpha","date", or "boolean"), direction: ("ascending" or "descending") }
    sorting: null,

    // do not sort when sorting is not enabled
    sort: function() {
      if (this.sorting) {
        console.log('sort');
        return backboneSort.apply(this, arguments);
      }
    },

    //@Default method
    comparator: function (a, b) {
      // Variables
      var idA = a.id || a.cid, idB = b.id || b.cid;
      var a = a.attributes.approver[a.attributes.current || 0].receivedDate,
        b = b.attributes.approver[b.attributes.current || 0].receivedDate,
        isAscending = !this.sorting.direction || this.sorting.direction != 'descending',
        sortType = this.sorting.type || 'numeric';

      // If attributes don't exist, set back
      if (a && b) {

        // Alphabetical
        if (sortType == 'alpha') {
          a = a.toString().toLowerCase();
          b = b.toString().toLowerCase();

          // Compare
          if(a !== b) {
            if (isAscending) {
              return a > b ? 1 : -1;
            } else {
              return a < b ? 1 : -1;
            }
          }

          // Numeric types
        } else {

          // Date: convert date to timestamp
          if (sortType == 'date') {
            a = this._normalizeDate(a).getTime();
            b = this._normalizeDate(b).getTime();

            // Boolean: false = 0 and true = 1
          } else if (sortType == 'boolean') {
            a = Number(a);
            b = Number(b);

            // Other: likely to be a number
          } else {
            a = parseFloat(a) || a;
            b = parseFloat(b) || b;
          }

          // If invalid, just append
          if (!isNaN(a) && !isNaN(b)) {

            // Compare
            if(a !== b) {
              if (isAscending) {
                return a - b;
              } else {
                return b - a;
              }
            }

          }
        }

      }

      // equal, fallback to comparing ids to get a stable order
      if(idA !== idB) {
        if (isAscending) {
          return idA > idB ? 1 : -1;
        } else {
          return idA < idB ? 1 : -1;
        }
      }
      return 0;
    },

    //@Set Sorting method
    setSorting: function (key, val, options) {
      if (key == null) return;

      var data;
      if (typeof key === 'object') {
        data = key;
        options = val;
      } else {
        (data = {})[key] = val;
      }

      this.sorting = _.extend({}, this.sorting || this._sortingDefault, data);
      if (!options || !options.silent) this.sort();
    },

    //@Get Sorting
    getSorting: function (key) {
      return key ? this.sorting[key] : this.sorting;
    },

    //@Flip Sorting Direction
    flipSorting: function () {
      this.setSorting({direction: this.sorting.direction === 'ascending' ? 'descending' : 'ascending'});
    },

    //_Sorting Default object
    _sortingDefault: {
      by: 'id',
      type: 'numeric',
      direction: 'ascending'
    },

    //_Normalize Date (with added support for IE UTC Dates)
    _normalizeDate: function (dateString) {
      if (!dateString) return dateString;

      var date = new Date(dateString);

      if (isNaN(date.getTime()) && dateString.toString().match(/^([0-9]+)\-([0-9]+)\-([0-9]+)T/g)) {
        var dateString = dateString.toString(),
          cal = dateString.split('T')[0].split('-'),
          time = dateString.split('T')[1].split(':');
        date = new Date();
        date.setUTCFullYear(cal[0]);
        date.setUTCMonth(parseInt(cal[1]) - 1);
        date.setUTCDate(cal[2]);
        date.setUTCHours(time[0]);
        date.setUTCMinutes(time[1]);
        date.setUTCSeconds(parseFloat(time[2]) || 0);
      }

      return date;
    }
  });

}));
// jscs:enable
/*jshint ignore:end */