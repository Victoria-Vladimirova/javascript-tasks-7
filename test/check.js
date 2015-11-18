/*jscs:disable maximumLineLength*/

var check = require('../src/check');
var assert = require('assert');

check.init();

describe('Check', function () {
    var person = { name: 'John', age: 20 };
    var numbers = [1, 2, 3];
    var func = function (a, b) {};
    var str = 'some string';

    if ({}.check) {
        describe('Extra credit', function () {

            // проверки прямых условий
            it('should check that target hasKeys', function () {
                assert.ok(person.check.hasKeys(['name', 'age']));
            });

            it('should check that target hasValueType', function () {
                assert.ok(person.check.hasValueType('name', String));
            });

            it('should check that target hasKeys', function () {
                assert.ok(numbers.check.hasKeys(['0', '1', '2']));
            });

            it('should check that target hasLength', function () {
                assert.ok(numbers.check.hasLength(3));
            });

            it('should check that target containsValues', function () {
                assert.ok(numbers.check.containsValues([2, 1]));
            });

            it('should check that target hasParamsCount', function () {
                assert.ok(func.check.hasParamsCount(2));
            });

            it('should check that target hasWordsCount', function () {
                assert.ok(str.check.hasWordsCount(2));
            });

            // проверки отрицательных условий
            it('should check that target not hasKeys', function () {
                assert.ok(person.check.not.hasKeys(['name', 'birthDate']));
            });

            it('should check that target not hasValueType', function () {
                assert.ok(person.check.not.hasValueType('name', Number));
            });

            it('should check that target not hasKeys', function () {
                assert.ok(numbers.check.not.hasKeys(['0', '3', '2']));
            });

            it('should check that target not hasLength', function () {
                assert.ok(numbers.check.not.hasLength(4));
            });

            it('should check that target not containsValues', function () {
                assert.ok(numbers.check.not.containsValues([2, 1, 37]));
            });

            it('should check that target not hasParamsCount', function () {
                assert.ok(func.check.not.hasParamsCount(3));
            });

            it('should check that target not hasWordsCount', function () {
                assert.ok(str.check.not.hasWordsCount(3));
            });

            // проверки обёртки
            it('should check that wrapped target hasKeys', function () {
                assert.ok(check.wrap(person).check.hasKeys(['name', 'age']));
            });

            it('should check that wrapped target not hasKeys', function () {
                assert.ok(check.wrap(person).check.not.hasKeys(['name', 'birthDate']));
            });

            it('should check that wrapped null isNull', function () {
                assert.ok(check.wrap(null).isNull());
            });


            // проверка того, что методы не передаются по иерархии наследования
            it('should check that inherited check attribute is undefined', function () {
                assert.ok(new Date().check === undefined);
            });
        });
    } else {
        describe('Required tasks', function () {
            it('should check that target hasKeys', function () {
                assert.ok(person.checkHasKeys(['name', 'age']));
            });

            it('should check that target hasValueType', function () {
                assert.ok(person.checkHasValueType('name', String));
            });

            it('should check that target hasKeys', function () {
                assert.ok(numbers.checkHasKeys(['0', '1', '2']));
            });

            it('should check that target hasLength', function () {
                assert.ok(numbers.checkHasLength(3));
            });

            it('should check that target containsValues', function () {
                assert.ok(numbers.checkContainsValues([2, 1]));
            });

            it('should check that target hasParamsCount', function () {
                assert.ok(func.checkHasParamsCount(2));
            });

            it('should check that target hasWordsCount', function () {
                assert.ok(str.checkHasWordsCount(2));
            });
        });
    }
});
