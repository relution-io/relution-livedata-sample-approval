'use strict';
/**
 * providers/index.js
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

var assert = require('assert');
var fs = require('fs');
var path = require('path');

// absolute path to folder this file is located
module.dirname = path.dirname(module.filename);

// module.exports is dictionary of provider implementations
fs.readdirSync(module.dirname).forEach(function provider(filename) {
	var pathname = path.join(module.dirname, filename);
	if(pathname == module.filename || path.extname(pathname) != '.js') {
		return; // skip this file as well as non-js files
	}

	var provider = path.basename(pathname, '.js');
	assert(!module.exports[provider], 'provider ' + provider + ' registered twice!');
	return module.exports[provider] = require(pathname);
});
