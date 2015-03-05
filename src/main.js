;(function(root) {

	'use strict';

	var namespace = {};

	@@looks-like

	if ((typeof exports === 'object') && module) {
		module.exports = namespace.looksLike; // CommonJS
	} else if ((typeof define === 'function') && define.amd) {
		define(function() {
			return namespace.looksLike;
		}); // AMD
	} else {
		root.looksLike = namespace.looksLike; // Browser
	}

}(this));