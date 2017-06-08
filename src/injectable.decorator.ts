import "reflect-metadata";
import { InjectProvider } from "./inject.provider";
import { getOptions } from "./getOptions";
import { ParamTypes } from "./constants";
import { getName } from "./getName";

function getNewConstructor(constructor: Function, params: any[]) {
    return function(...args: any[]) {
        var newParams = params.slice(0);
        for (var arg of args) {
            for (var i = 0; i < newParams.length; i++) {
                if (newParams[i] === void 0) {
                    (<any>newParams)[i] = arg;
                    break;
                }
            }
        }
        return constructor.apply(this, newParams);
    }
}

function getParams(excludes: any, metadata: any) {
    var params: any[] = [];
    for (var meta of metadata) {
        var key = getName(meta);
        if (excludes[key] !== true) {
            params.push(InjectProvider.Instance.get(meta));
        } else {
            params.push(void 0);
        }
    }
    return params;
}

function setupNewConstructor(originalConstructor: Function, newConstructor: Function) {
    newConstructor.prototype = Object.create(originalConstructor.prototype);
    Object.defineProperty(newConstructor, 'name', { value: getName(<any>originalConstructor), enumerable: false, writable: false });
}

/**
 * Inject dependencies into constructor
 * 
 * @export
 * @param {IInjectOptions} [options={}] Options
 * @param {Function} constructor Constructor to inject into
 * @returns {Function} New constructor
 */
export function Inject(options: IInjectableOptions, constructor: Function) {
    var metadata = Reflect.getMetadata(ParamTypes, constructor);
    var params = getParams(options.exclude, metadata);
    var newConstructor = getNewConstructor(constructor, params);
    setupNewConstructor(constructor, newConstructor);

    return <any>newConstructor;
}

/**
 * Decorate an object as Injectable into classes that are also decorated as Injectable
 * 
 * @export
 * @param {IInjectableOptions} [options={}] Options
 * @returns Decorator
 */
export function Injectable(options: IInjectableOptions = {}) {
    options = getOptions(options, defaultOptions);
    return function(constructor: Function) {
        InjectProvider.Instance.setName(<string>options.namespace, <any>constructor);

        if (options.inject === true) {
            constructor = Inject(options, constructor);
        }

        InjectProvider.Instance.register(<any>constructor);
        return <any>constructor;
    }
}

/**
 * Injectable options
 * 
 * @export
 * @interface IInjectableOptions
 * @property {string} namespace Namespace of the Injectable
 * @property {{[type: string]: string}} namespaced Namespaced dependencies and their namespace
 * @property {{[type: string]: boolean}} exclude Excluded namespaced types, true to exclude
 */
export interface IInjectableOptions {
    namespace?: string;
    namespaced?: {[type: string]: string};
    exclude?: {[type: string]: boolean};
    inject?: boolean;
}

const defaultOptions: IInjectableOptions = {
    namespace: '',
    namespaced: {},
    exclude: {
        string: true,
        String: true,
        number: true,
        Number: true,
        object: true,
        Object: true,
        boolean: true,
        Boolean: true
    },
    inject: true
}