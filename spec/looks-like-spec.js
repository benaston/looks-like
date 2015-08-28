/*global self, describe, it, expect*/
'use strict';

var verify = self.looksLike.verify.bind(null, 'looks-like-spec');

describe('verify', function() {

    [
        null,
        undefined,
        '',
        0,
        true
    ].forEach(function(testCase) {

        it('should throw an exception if o is not an object (' + testCase + ')', function() {
            //arrange
            var example = {};

            //act & assert
            expect(function() {
                verify(testCase).vs(example);
            }).toThrowError(Error, 'o must be an object.');
        });

        it('should throw an exception if example is not an object (' + testCase + ')', function() {
            //arrange
            var o = {};

            //act & assert
            expect(function() {
                verify(o).vs(testCase);
            }).toThrow('example must be an object.');
        });

    });


    [
        null,
        undefined,
        1, {},
        true,
        '',
        'foo',
        '1'
    ].forEach(function(testCase) {

        it('should not throw an exception if the object is like the example (' + testCase + ')', function() {
            //arrange
            var example = {
                foo: testCase
            };

            //act & assert
            expect(verify({
                foo: testCase,
            }).vs(example)).toBe(undefined);
        });

    });

    [
        [0, 0],
        [0, 1],
        [1, -1],
        [1, NaN]
    ].forEach(function(testCase) {

        it('should not throw an exception if the object is like the example (number: ' + testCase + ')', function() {
            //arrange
            var example = {
                foo: testCase[0]
            };

            //act & assert
            expect(verify({
                foo: testCase[1]
            }).vs(example)).toBe(undefined);
        });

    });

    [
        [true, false]
    ].forEach(function(testCase) {

        it('should not throw an exception if the object is like the example (boolean: ' + testCase + ')', function() {
            //arrange
            var example = {
                foo: testCase[0]
            };

            //act & assert
            expect(verify({
                foo: testCase[1]
            }).vs(example)).toBe(undefined);
        });

    });

    [
        [{}, {}],
        [/foo/g, /bar/g],
        [
            [],
            []
        ]
    ].forEach(function(testCase) {

        it('should not throw an exception if the object is like the example (object: ' + testCase + ')', function() {
            //arrange
            var example = {
                foo: testCase[0]
            };

            //act & assert
            expect(verify({
                foo: testCase[1]
            }).vs(example)).toBe(undefined);
        });

    });

    [{}, {
        bam: 1
    }].forEach(function(testCase) {

        it('should throw an exception if the object differs recursively (' + JSON.stringify(testCase) + ')', function() {
            //arrange
            var example = {
                foo: {
                    bar: 1
                }
            };

            //act & assert
            expect(function() {
                verify({
                    foo: testCase
                }).vs(example);
            }).toThrowError(Error, 'invalid argument (verify the presence and type of the following property: bar). Source file: looks-like-spec.');
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
            expect(
                verify({
                    foo: testCase
                }).vs(example)
            ).toBe(undefined);
        });

    });

    it('should throw an exception if example defines a setter property and actual does not', function() {
        //arrange
        var example = {
            foo: {
                get bar() {
                    return '';
                },
            }
        };

        //act & assert
        expect(function() {
            verify({
                foo: {
                    bar: 'bar',
                }
            }).vs(example);
        }).toThrowError(Error, 'invalid argument (verify the presence and type of the following property: bar). Source file: looks-like-spec.');
    });

    it('should throw an exception if example defines a setter property and actual does not', function() {
        //arrange
        var example = {
            foo: {
                get bar() {},
                set bar(v) {},
            }
        };

        //act & assert
        expect(function() {
            verify({
                foo: {
                    get bar() {},
                }
            }).vs(example);
        }).toThrowError(Error, 'invalid argument (verify the presence and type of the following property: bar). Source file: looks-like-spec.');
    });

    it('should not throw an exception if example defines a property and actual does not, but verify is configured to evaluate getters and they evaluate to the same type', function() {
        //arrange
        var example = {
            foo: {
                get bar() {
                    return '';
                },
            }
        };

        //act & assert
        expect(
            verify({
                foo: {
                    bar: 'bar',
                }
            }, {
                evaluateGetters: true
            }).vs(example)).toBe(undefined);
    });

    it('should verify the contents of arrays per the example', function() {
        //arrange
        var example = {
            foo: ['']
        };

        //act & assert
        expect(function() {
            verify({
                foo: [0] // Second item!
            }).vs(example);
        }).toThrowError(Error, 'invalid argument (verify the presence and type of the following property: foo). Source file: looks-like-spec.');
    });

    it('should verify the contents of arrays per the example (multiple array items)', function() {
        //arrange
        var example = {
            foo: ['']
        };

        //act & assert
        expect(function() {
            verify({
                foo: ['', 0] // Second item!
            }).vs(example);
        }).toThrowError(Error, 'invalid argument (verify the presence and type of the following property: foo). Source file: looks-like-spec.');
    });

    it('should verify the contents of arrays per the example, and not throw if contents match', function() {
        //arrange
        var example = {
            foo: ['']
        };

        //act & assert
        expect(
            verify({
                foo: ['foo', 'bar']
            }).vs(example)).toBe(undefined);
    });

});
