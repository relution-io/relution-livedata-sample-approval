'use strict';
/**
 * providers/sample.js
 * IBX Approval Backend
 *
 * Created by Thomas Beckmann on 02.03.2015
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

// datasync setup
var backbone = require('backbone');
var datasync = require('mcap/datasync.js');
var bson = require('bson');
var BSON = bson.BSONPure.BSON;

var options = {
	entity: 'approvals',
	type: {
		container: 'livedata-approval-sample MetaModelContainer',
		model: 'approval'
	},
	idAttribute: 'id',
	sync: datasync.sync
};
var model = options.model = backbone.Model.extend(options);
var collection = options.collection = backbone.Collection.extend(options);

// business functions
module.exports = {

	refresh: function refreshSample() {
		// fetch ids only to determine whether any data is present
		var fetch = {
			query: com.mwaysolutions.gofer2.crud.GetQuery.createBuilder().fields(options.idAttribute).build()
		};
		fetch.__proto__ = options;
		var collection = new fetch.collection();
		collection.fetch(fetch);
		if(collection.length > 0) {
			return;
		}

		// sample load
		var fs = require('fs');
		var security = require('mcap/security.js');
		var thisuser = security.service().currentAuthorization.name;
		return JSON.parse(fs.readFileSync(module.filename + 'on')).forEach(function sample(approval) {
			var model = new options.model(approval);
			model.attributes.provider = 'sample';
			model.attributes.state = 'open';
			model.attributes.aclEntries = [ thisuser + ':rw' ];
			console.log('saving model: ' + JSON.stringify(model.attributes));
			return model.save();
		});
	},

	destroy: function destroySample(approval) {
		var model = new options.model(approval);
		return model.destroy();
	},
  save: function saveSample(approval) {
		var model = new options.model(approval);
		return model.save();
	},

	approve: function approveSample(approval, callback) {
		setImmediate(module.exports.save.bind(this, approval));
		return callback(undefined, approval);
	},

	reject: function rejectSample(approval, callback) {
		setImmediate(module.exports.save.bind(this, approval));
		return callback(undefined, approval);
	}

};
