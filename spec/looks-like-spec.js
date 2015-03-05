/*global self, describe, it, expect*/
'use strict';

var looksLike = self.looksLike;

describe('looksLike', function() {

    [null, undefined, '', 0, true].forEach(function(testCase) {


        it('should throw an exception if o is not an object (' + testCase + ')', function() {
            //arrange
            var example = {};

            //act & assert
            expect(looksLike.bind(null, testCase, example)).toThrow('o must be an object.');
        });

        it('should throw an exception if example is not an object (' + testCase + ')', function() {
            //arrange
            var o = {};

            //act & assert
            expect(looksLike.bind(null, o, testCase)).toThrow('example must be an object.');
        });

    });


    [null, undefined, 1, {}, true, '', 'foo', '1'].forEach(function(testCase) {

        it('should return true if the object is like the example (' + testCase + ')', function() {
            //arrange
            var example = {
            	foo: testCase
            };

            //act & assert
            expect(looksLike({
            	foo: testCase
            }, example)).toBe(true);
        });

    });

    [[0,0],[0,1],[1,-1],[1,NaN]].forEach(function(testCase) {

        it('should return true if the object is like the example (number: ' + testCase + ')', function() {
            //arrange
            var example = {
            	foo: testCase[0]
            };

            //act & assert
            expect(looksLike({
            	foo: testCase[1]
            }, example)).toBe(true);
        });

    });

    [[true, false]].forEach(function(testCase) {

        it('should return true if the object is like the example (boolean: ' + testCase + ')', function() {
            //arrange
            var example = {
            	foo: testCase[0]
            };

            //act & assert
            expect(looksLike({
            	foo: testCase[1]
            }, example)).toBe(true);
        });

    });

    [[{}, {}],[/foo/g, /bar/g],[[], []]].forEach(function(testCase) {

        it('should return true if the object is like the example (object: ' + testCase + ')', function() {
            //arrange
            var example = {
            	foo: testCase[0]
            };

            //act & assert
            expect(looksLike({
            	foo: testCase[1]
            }, example)).toBe(true);
        });

    });

    [{}, {bam:1}].forEach(function(testCase) {

        it('should return true if the object differs recursively (' + testCase + ')', function() {
            //arrange
            var example = {
            	foo: {
            		bar: 1
            	}
            };

            //act & assert
            expect(looksLike({
            	foo: testCase
            }, example)).toBe(false);
        });

    });

    [{
    	bar: {
    		bam: 'bam1',
    		bat: null
    	},
    	baz: 42
    }].forEach(function(testCase) {

        it('should return true if a nested object does not differ recursively (' + testCase + ')', function() {
            //arrange
            var example = {
            	foo: {
            		bar: {
            			bam: 'bam2'
            		},
            		baz: 1
            	}
            };

            //act & assert
            expect(looksLike({
            	foo: testCase
            }, example)).toBe(true);
        });

    });

});