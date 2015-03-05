;(function(root) {

	'use strict';

	var namespace = {};

	;
(function(namespace) {

    'use strict';

    function looksLike(o, example) {
        if (!isObject(o)) {
            throw 'o must be an object.';
        }
        if (!isObject(example)) {
            throw 'example must be an object.';
        }

        return areAlike(o, example);
    }

    function areAlike(o, example) {
        return Object.keys(example)
            .every(isAlike.bind(null, o, example));
    }

    function isAlike(o, example, k) {
        if (!typesMatch(o[k], example[k])) {
            return false;
        }

        if (isObject(example[k])) {
            return areAlike(o[k], example[k]);
        }

        return true;
    }

    function isObject(o) {
        return o !== null && typeof o === 'object';
    }

    function typesMatch(a, b) {
        return typeof a === typeof b;
    }

    namespace.looksLike = looksLike;

}(namespace));

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