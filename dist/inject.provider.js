"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getName_1 = require("./getName");
var InjectProvider = (function () {
    function InjectProvider() {
        this.injectables = {};
    }
    Object.defineProperty(InjectProvider, "Instance", {
        /**
         * Instance of InjectProvider
         *
         * @readonly
         * @static
         * @type {InjectProvider}
         * @memberOf InjectProvider
         */
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get an instance of an injectable
     *
     * @param {Function} Class Type of instance to get
     * @returns Instance of injectable or null
     *
     * @memberOf InjectProvider
     */
    InjectProvider.prototype.get = function (Class) {
        var key = getName_1.getName(Class);
        if (this.injectables[key] != null) {
            if (typeof this.injectables[key] === 'function') {
                return this.injectables[key] = new (this.injectables[key])();
            }
            return this.injectables[key];
        }
        return null;
    };
    /**
     * Register an injectable
     *
     * @template T Type of injectable
     * @param {string} key Key to register injectable
     * @param {{new(...args: any[]): T}} instanceType Instance type to create
     *
     * @memberOf InjectProvider
     */
    InjectProvider.prototype.register = function (key, instanceType) {
        if (this.injectables[key] == null) {
            this.injectables[key] = instanceType;
        }
    };
    return InjectProvider;
}());
exports.InjectProvider = InjectProvider;
