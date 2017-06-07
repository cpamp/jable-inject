"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inject_provider_1 = require("./inject.provider");
var getOptions_1 = require("./getOptions");
var constants_1 = require("./constants");
function Inject(options) {
    if (options === void 0) { options = {}; }
    options = getOptions_1.getOptions(options, defaultOptions);
    return function (constructor) {
        var metadata = Reflect.getMetadata(constants_1.ParamTypes, constructor);
        console.log(metadata);
        var params = [];
        for (var _i = 0, metadata_1 = metadata; _i < metadata_1.length; _i++) {
            var meta = metadata_1[_i];
            params.push(inject_provider_1.InjectProvider.Instance.get(meta));
        }
        var newConstructor = function () {
            return constructor.apply(this, params);
        };
        newConstructor.prototype = Object.create(constructor.prototype);
        return newConstructor;
    };
}
exports.Inject = Inject;
var defaultOptions = {
    namespaced: {}
};
