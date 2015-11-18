'use strict';

function Wrapper(object) {
    this._object = object;
}

Wrapper.prototype.isNull = function () {
    return this._object === null;
};

exports.wrap = function (object) {
    return new Wrapper(object);
};

exports.init = function () {

    var getValues = function (object) {
        return Object.keys(object).map(function (key) {
            return object[key];
        });
    };

    var methods = {
        containsKeys: [function (keys) {
            return keys.every(function (key) {
                return Object.keys(this).indexOf(key) >= 0;
            }.bind(this));
        }, [Object.prototype, Array.prototype, Wrapper.prototype]],

        hasKeys: [function (keys) {
            return (keys.length === Object.keys(this).length && this.check.containsKeys(keys));
        }, [Object.prototype, Array.prototype, Wrapper.prototype]],

        containsValues: [function (values) {
            return values.every(function (value) {
                return getValues(this).indexOf(value) >= 0;
            }.bind(this));
        }, [Object.prototype, Array.prototype, Wrapper.prototype]],

        hasValues: [function (values) {
            return (values.length === getValues(this).length && this.check.containsValues(values));
        }, [Object.prototype, Array.prototype, Wrapper.prototype]],

        hasValueType: [function (key, type) {
            return ([String, Number, Function, Array].indexOf(type) >= 0) ?
            typeof this[key] === typeof type() : undefined;
        }, [Object.prototype, Array.prototype, Wrapper.prototype]],

        hasLength: [function (length) {
            return this.length === length;
        }, [Array.prototype, String.prototype, Wrapper.prototype]],

        hasParamsCount: [function (count) {
            return this.length === count;
        }, [Function.prototype, Wrapper.prototype]],

        hasWordsCount: [function (count) {
            return count === this.split(/\s+/).length;
        }, [String.prototype, Wrapper.prototype]]
    };

    var createCheckFunctions = function (proto, thisObj, initObj, generateFn) {
        return Object.keys(methods).reduce(function (check, name) {
            var methodDef = methods[name];
            if (methodDef[1].indexOf(proto) >= 0) {
                check[name] = generateFn(methodDef[0]);
            }
            return check;
        }.bind(thisObj), initObj);
    };

    [Object.prototype, Array.prototype, String.prototype,
        Function.prototype, Wrapper.prototype].forEach(
        function (proto) {
            Object.defineProperty(proto, 'check', {
                get: function () {
                    var callee = proto === Wrapper.prototype ? this._object : this;
                    // атрибут check должен быть недоступен по цепочке наследования
                    if (Object.getPrototypeOf(this) !== proto) {
                        return undefined;
                    }
                    return createCheckFunctions(proto, callee, {
                        get not() {
                            return createCheckFunctions(proto, callee, {}, function (def) {
                                return function () {
                                    var result = def.apply(callee, arguments);
                                    if (typeof result === 'boolean') {
                                        return !result;
                                    }
                                    return undefined;
                                };
                            });
                        }
                    }, function (def) {
                        return def.bind(callee);
                    });
                }
            });
        });
};
