"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var constants_1 = require("./constants");
function Namespace(namespace) {
    if (namespace === void 0) { namespace = ''; }
    return function (target, propertyKey, parameterIndex) {
        var types = Reflect.getOwnMetadata(constants_1.ParamTypes, target, propertyKey);
        Object.defineProperty(types[parameterIndex], constants_1.NameProperty, {
            enumerable: false,
            writable: false,
            value: namespace + '.' + types[parameterIndex].name
        });
        Reflect.defineMetadata(constants_1.ParamTypes, types, target, propertyKey);
    };
}
exports.Namespace = Namespace;
