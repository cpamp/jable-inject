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
            console.log("key: ", key);
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

    if (InjectProvider.Instance.hasId(<any>originalConstructor)) {
        InjectProvider.Instance.register(<any>newConstructor, InjectProvider.Instance.getId(<any>originalConstructor));
    }
}

/**
 * Decorate a class as Inject to be injected with Injectables
 * 
 * @export
 * @param {IInjectOptions} [options={}] Options
 * @returns Decorator
 */
export function Inject(options: IInjectOptions = {}) {
    options = getOptions(options, defaultOptions);

    return function(constructor: Function) {
        var metadata = Reflect.getMetadata(ParamTypes, constructor);
        var params = getParams(options.exclude, metadata);
        var newConstructor = getNewConstructor(constructor, params);

        setupNewConstructor(constructor, newConstructor);
        return <any>newConstructor;
    }
}

/**
 * Inject options
 * 
 * @export
 * @interface IInjectOptions
 * @property {{[type: string]: string}} namespaced Namespaced dependencies and their namespace
 * @property {{[type: string]: boolean}} exclude Excluded namespaced types, true to exclude
 */
export interface IInjectOptions {
    namespaced?: {[type: string]: string},
    exclude?: {[type: string]: boolean}
}

const defaultOptions: IInjectOptions = {
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
    }
}