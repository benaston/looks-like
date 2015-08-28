;(function(root) {

	'use strict';

	var namespace = {};

	;
(function(namespace) {

    'use strict';

    /**
     * Ensures `o` is defined and "looks like" 
     * `example`. If validation fails, throws 
     * an exception containing the name of the 
     * key that caused the validation failure.
     */
    function looksLike(o, example, options) {
        var returnValue = {};

        if (!isObject(o, options)) {
            throw 'o must be an object.';
        }
        if (!isObject(example, options)) {
            throw 'example must be an object.';
        }

        returnValue.value = areAlike(o, example, options, returnValue);

        return returnValue;
    }

    /**
     * Usage: `verify(actual).vs(example);`.
     * Options can contain the following properties:
     *  - `evaluateGetters`: Verify getter contents.
     *  - `treatFunctionsAsObjects`: Verify function own-properties.
     */
    looksLike.verify = function(source, o, options) {
        if (!source || (typeof source !== 'string')) {
            throw new Error('source not supplied. Client code should bind the source filename to the first argument.');
        }
        if (!isObject(o, options)) {
            throw new Error('o must be an object.');
        }

        return {
            vs: function(example) {
                var result = looksLike(o, example, options);

                if (!result.value) {
                    throw new Error('invalid argument (verify the presence and type of the following property: ' + result.key + '). Source file: ' + source + '.');
                }
            }
        };
    };

    /**
     * Defaults to *not* evaluating getters.
     */
    function isAlike(o, example, options, returnValue, k) {
        returnValue.key = k;

        if (isGetter(example, k) && !shouldEvaluateGetters(options)) {
            return spread(compareGetters, arguments);
        }

        if (isSetter(example, k)) {
            return isSetter(o, k); // Based on the above, is *only* a setter.
        }

        if (!typesMatch(o[k], example[k])) {
            return false; // Confirm basic type correspondence.
        }

        // Confirm contents of array (if example item is supplied).
        if (Array.isArray(example[k]) && ('0' in example[k])) {
            debugger;
            return o[k].every(function(arrItem, index) {
                // If value types, compare directly.
                if (!isObject(example[k][0], options)) {
                    return typesMatch(example[k][0], arrItem);
                }

                // Use normal comparison for objects.
                return areAlike(arrItem, example[k][0], options, returnValue);
            });
        }

        // If property is an object, confirm the contents, recursively.
        if (isObject(example[k], options)) {
            return areAlike(o[k], example[k], options, returnValue);
        }

        return true;
    }

    function isGetter(o, k) {
        var descriptor = Object.getOwnPropertyDescriptor(o, k);

        if (!descriptor) {
            return false;
        }

        return !!(descriptor.get);
    }

    function isSetter(o, k) {
        var descriptor = Object.getOwnPropertyDescriptor(o, k);

        if (!descriptor) {
            return false;
        }

        return !!(descriptor.set);
    }

    function isObject(o, options) {
        if (options && options.treatFunctionAsObject) {
            return o !== null && (typeof o === 'object' || typeof o === 'function');
        }

        return o !== null && (typeof o === 'object');
    }

    /**
     * Note 1: because typeof null === 'object'.
     */
    function typesMatch(a, b) {
        if (a === null) { // See note 1.
            return a === b;
        }

        if (Array.isArray(b)) { // We use the example object here.
            return Array.isArray(a);
        }

        return typeof a === typeof b;
    }

    function areAlike(o, example, options, returnValue) {
        return Object.keys(example)
            .every(isAlike.bind(null, o, example, options, returnValue));
    }

    /**
     * If options is null or undefined, 
     * then returns false.
     */
    function shouldEvaluateGetters(options) {
        return (!!options || (options && !options.evaluateGetters));
    }

    function compareGetters(o, example, options, returnValue, k) {
        if (!isGetter(o, k)) {
            return false; // Actual is not a matching getter.
        }

        if (isSetter(example, k)) {
            return isSetter(o, k); // Example is also a setter, do they match?
        }

        return true; // Actual is a getter, like example.
    }

    function spread(fn, arr) {
        fn.apply(null, arr);
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