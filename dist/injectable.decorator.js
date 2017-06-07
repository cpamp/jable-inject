"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inject_provider_1 = require("./inject.provider");
var getOptions_1 = require("./getOptions");
function Injectable(options) {
    if (options === void 0) { options = {}; }
    options = getOptions_1.getOptions(options, defaultOptions);
    return function (constructor) {
        var inject = inject_provider_1.InjectProvider.Instance;
        inject.register((options.namespace !== '' ? options.namespace + '.' : '') + constructor.name, constructor);
    };
}
exports.Injectable = Injectable;
var defaultOptions = {
    namespace: ''
};
