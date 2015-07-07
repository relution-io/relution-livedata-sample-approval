'use strict';
/**
 * routes/approvals.js
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

// approval APIs
var providers = require('../providers');

// node.js APIs
var util = require('util');

// relution APIs
var bikini = require('mcap/bikini.js');
var datasync = require('mcap/datasync.js');

// set up datasync middleware for /approvals endpoint allowing only:
// - GET all
// - GET by id
// - PATCH state
module.exports = function approvals(app) {

	// filtering of CRUDs not allowed,
	// infrastructure permits arbitrary update/patch operations,
	// for our use case we allow patching the state and comment only
	var errorStatus = function errorStatus(status, req, res) {
		res.send(status);
	};
	//app.put('/approvals/:id', errorStatus.bind(undefined, 405)); // no update
	app.patch('/approvals/:id', function filterPatch(req, res, next) {
		if(req.body.state) {
			next('route'); // acceptable patch request targeting the state and comment field only
		} else {
			next(); // disallowed patch request
		}
	}, errorStatus.bind(undefined, 400)); // patch for state updates only

	// following is the case already as our backend does not implement create/delete:
	//app.post('/approvals', errorStatus.bind(undefined, 405)); // no creation
	//app.delete('/approvals/:id', errorStatus.bind(undefined, 405)); // no deletion
	//app.delete('/approvals', errorStatus.bind(undefined, 405)); // no purge

	app.get('/refresh', function(req, res) {
		res.send(200, providers['sample'].refresh());
	});

	// error constructor used for CRUD interface
	function HttpError(status) {
		Error.call(this, Array.prototype.slice.call(arguments, 1));
		this.status = status;
	};
	util.inherits(HttpError, Error);

	// hook-in refresh mechanism executed on client connect
	app.use('/approvals/info', function refreshApproval(req, res, next) {
		for(var provider in providers) {
			var impl = providers[provider];
			if (impl.refresh) {
				impl.refresh();
			}
		};
		return next();
	});

	// approvals CRUD interface
	var options = {
		entity: 'approvals',
		type: {
			container: 'livedata-approval-sample MetaModelContainer',
			model: 'approval'
		},
		idAttribute: 'id',
		backend: new datasync.Backend({
			// incoming patch request is translated to an update by infrastructure,
			// process update to access additional data of the approval, such as provider field
			update: function updateApproval(approval, callback) {
				// select provider
				var provider = providers[approval.provider];
				if(!provider) {
					return callback(new HttpError(400, 'unknown provider: ' + approval.provider));
				}

				// apply approve/reject function of provider
				switch(approval.state) {
					case 'approved':
						return provider.approve.apply(this, arguments);
					case 'rejected':
						return provider.reject.apply(this, arguments);
					default:
						return callback(new HttpError(400, 'unknown state: ' + approval.state));
				}
			}
			// read is supplied by infrastructure to fetch data from live store only
		})
	};
	app.use('/approvals', bikini.middleware(options));
	return options;

}(global.app);
